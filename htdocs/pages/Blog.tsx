import { useState, useEffect } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import BlogCard from "@/components/BlogCard";
import { Button } from "@/components/ui/button";
import { supabase } from "@/integrations/supabase/client";
import { toast } from "sonner";

interface Article {
  id: string;
  title: string;
  excerpt: string | null;
  created_at: string;
  featured_image: string | null;
  slug: string;
  category_id: string | null;
  categories?: {
    name: string;
  };
}

interface Category {
  id: string;
  name: string;
}

const Blog = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>("All");
  const [articles, setArticles] = useState<Article[]>([]);
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchArticlesAndCategories();
  }, []);

  const fetchArticlesAndCategories = async () => {
    try {
      // Fetch published articles with categories
      const { data: articlesData, error: articlesError } = await supabase
        .from("articles")
        .select(`
          id,
          title,
          excerpt,
          created_at,
          featured_image,
          slug,
          category_id,
          categories (
            name
          )
        `)
        .eq("published", true)
        .order("created_at", { ascending: false });

      if (articlesError) throw articlesError;

      // Fetch categories
      const { data: categoriesData, error: categoriesError } = await supabase
        .from("categories")
        .select("id, name")
        .order("name");

      if (categoriesError) throw categoriesError;

      setArticles(articlesData || []);
      setCategories(categoriesData || []);
    } catch (error: any) {
      toast.error("Failed to load articles: " + error.message);
    } finally {
      setLoading(false);
    }
  };

  const allCategories = ["All", ...categories.map(cat => cat.name)];
  
  const filteredPosts = selectedCategory === "All" 
    ? articles 
    : articles.filter(article => article.categories?.name === selectedCategory);

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric"
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="font-display text-5xl md:text-7xl mb-4">
            THE <span className="text-gradient-primary">DERP</span> BLOG
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Unfiltered thoughts on productivity, money, and life. Updated whenever I feel like it.
          </p>
        </header>
        
        {/* Category Filter */}
        <div className="flex flex-wrap gap-3 justify-center mb-12">
          {allCategories.map((category) => (
            <Button
              key={category}
              onClick={() => setSelectedCategory(category)}
              variant={selectedCategory === category ? "default" : "outline"}
              className={`font-display hover-wiggle ${
                selectedCategory === category 
                  ? "bg-gradient-derp text-foreground" 
                  : "border-2 border-foreground"
              }`}
            >
              {category.toUpperCase()}
            </Button>
          ))}
        </div>
        
        {/* Blog Grid */}
        {loading ? (
          <div className="text-center text-muted-foreground">Loading articles...</div>
        ) : filteredPosts.length === 0 ? (
          <div className="text-center text-muted-foreground">
            No articles published yet. Check back soon!
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {filteredPosts.map((article) => (
              <BlogCard 
                key={article.id}
                title={article.title}
                excerpt={article.excerpt || ""}
                date={formatDate(article.created_at)}
                category={article.categories?.name || "Uncategorized"}
                image={article.featured_image || "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?w=800&h=450&fit=crop"}
                slug={article.slug}
              />
            ))}
          </div>
        )}
      </main>
      
      <Footer />
    </div>
  );
};

export default Blog;
