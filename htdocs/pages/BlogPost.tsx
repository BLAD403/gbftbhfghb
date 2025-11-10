import { useParams, Link } from "react-router-dom";
import { useEffect, useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Calendar, ArrowLeft, Share2 } from "lucide-react";
import { toast } from "sonner";
import { supabase } from "@/integrations/supabase/client";

interface Article {
  id: string;
  title: string;
  content: string;
  created_at: string;
  featured_image: string | null;
  slug: string;
  categories?: {
    name: string;
  };
}

const BlogPost = () => {
  const { slug } = useParams();
  const [post, setPost] = useState<Article | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (slug) {
      fetchArticle();
    }
  }, [slug]);

  const fetchArticle = async () => {
    try {
      const { data, error } = await supabase
        .from("articles")
        .select(`
          id,
          title,
          content,
          created_at,
          featured_image,
          slug,
          categories (
            name
          )
        `)
        .eq("slug", slug)
        .eq("published", true)
        .single();

      if (error) throw error;
      setPost(data);
    } catch (error: any) {
      toast.error("Failed to load article");
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  if (loading) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center text-muted-foreground">
            Loading article...
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col">
        <Navigation />
        <div className="flex-1 flex items-center justify-center">
          <div className="text-center">
            <h1 className="font-display text-4xl mb-4">POST NOT FOUND</h1>
            <Button asChild>
              <Link to="/blog">Back to Blog</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    );
  }

  const handleShare = () => {
    navigator.clipboard.writeText(window.location.href);
    toast.success("Link copied to clipboard!");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <article className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <Button 
          asChild 
          variant="outline" 
          className="mb-8 hover-wiggle"
        >
          <Link to="/blog">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Blog
          </Link>
        </Button>
        
        <header className="mb-8">
          <div className="flex items-center gap-3 mb-4">
            <Badge className="bg-primary text-foreground font-display">
              {post.categories?.name?.toUpperCase() || "UNCATEGORIZED"}
            </Badge>
            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{formatDate(post.created_at)}</span>
            </div>
          </div>
          
          <h1 className="font-display text-4xl md:text-6xl mb-6 leading-tight">
            {post.title}
          </h1>
          
          <Button
            onClick={handleShare}
            variant="outline"
            className="hover-wiggle"
          >
            <Share2 className="mr-2 h-4 w-4" />
            Share This Post
          </Button>
        </header>
        
        <div className="aspect-video mb-8 overflow-hidden rounded-lg border-4 border-foreground">
          <img 
            src={post.featured_image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=1200&h=600&fit=crop"}
            alt={post.title}
            className="w-full h-full object-cover"
          />
        </div>
        
        <div className="prose prose-lg max-w-none">
          {post.content.split('\n').map((paragraph, index) => {
            if (paragraph.startsWith('# ')) {
              return <h2 key={index} className="font-display text-3xl mt-8 mb-4">{paragraph.replace('# ', '')}</h2>;
            } else if (paragraph.startsWith('## ')) {
              return <h3 key={index} className="font-display text-2xl mt-6 mb-3">{paragraph.replace('## ', '')}</h3>;
            } else if (paragraph.startsWith('### ')) {
              return <h4 key={index} className="font-display text-xl mt-4 mb-2">{paragraph.replace('### ', '')}</h4>;
            } else if (paragraph.startsWith('- ')) {
              return <li key={index} className="ml-6">{paragraph.replace('- ', '')}</li>;
            } else if (paragraph.trim()) {
              return <p key={index} className="mb-4 leading-relaxed">{paragraph}</p>;
            }
            return null;
          })}
        </div>
        
        <div className="mt-12 p-6 bg-card border-4 border-primary rounded-lg">
          <h3 className="font-display text-2xl mb-3">ENJOYED THIS POST?</h3>
          <p className="mb-4 text-muted-foreground">
            Join the Derp Fleet for more chaotic wisdom, exclusive content, and behind-the-scenes shenanigans.
          </p>
          <Button 
            asChild
            className="bg-gradient-derp font-display hover-wiggle"
          >
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              SUBSCRIBE ON YOUTUBE
            </a>
          </Button>
        </div>
      </article>
      
      <Footer />
    </div>
  );
};

export default BlogPost;
