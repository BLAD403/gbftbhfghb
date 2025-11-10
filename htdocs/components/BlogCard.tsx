import { Link } from "react-router-dom";
import { Card } from "./ui/card";
import { Badge } from "./ui/badge";
import { Calendar } from "lucide-react";

interface BlogCardProps {
  title: string;
  excerpt: string;
  date: string;
  category: string;
  image: string;
  slug: string;
}

const BlogCard = ({ title, excerpt, date, category, image, slug }: BlogCardProps) => {
  const getCategoryColor = (cat: string) => {
    switch (cat.toLowerCase()) {
      case "productivity": return "bg-primary text-foreground";
      case "money": return "bg-secondary text-background";
      case "vlogs": return "bg-accent text-background";
      default: return "bg-muted text-foreground";
    }
  };

  return (
    <Link to={`/blog/${slug}`}>
      <Card className="overflow-hidden hover-lift border-2 border-foreground shadow-lg hover:shadow-2xl transition-all duration-300 hover:border-primary">
        <div className="aspect-video overflow-hidden">
          <img 
            src={image} 
            alt={title}
            className="w-full h-full object-cover hover:scale-110 transition-transform duration-500"
          />
        </div>
        <div className="p-6">
          <div className="flex items-center gap-2 mb-3">
            <Badge className={`${getCategoryColor(category)} font-display`}>
              {category.toUpperCase()}
            </Badge>
            <div className="flex items-center gap-1 text-sm text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span>{date}</span>
            </div>
          </div>
          <h3 className="font-display text-2xl mb-2 hover:text-primary transition-colors">
            {title}
          </h3>
          <p className="text-muted-foreground line-clamp-2">{excerpt}</p>
        </div>
      </Card>
    </Link>
  );
};

export default BlogCard;
