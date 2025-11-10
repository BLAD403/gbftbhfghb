import { Link } from "react-router-dom";
import { Button } from "./ui/button";
import logo from "@/assets/logo.png";
const Navigation = () => {
  return <nav className="sticky top-0 z-50 bg-background/80 backdrop-blur-md border-b-4 border-foreground">
      <div className="container mx-auto px-4 py-3 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-3 hover-wiggle">
          <h3 className="font-display text-2xl text-primary">ADMIRAL DERP</h3>
        </Link>
        
        <div className="flex items-center gap-6">
          <Link to="/blog" className="font-display text-lg hover:text-primary transition-colors hover-wiggle">
            BLOG
          </Link>
          <Link to="/about" className="font-display text-lg hover:text-secondary transition-colors hover-wiggle">
            ABOUT
          </Link>
          <Link to="/contact" className="font-display text-lg hover:text-accent transition-colors hover-wiggle">
            CONTACT
          </Link>
          <Button asChild className="bg-gradient-derp font-display text-foreground hover:scale-110 transition-transform shadow-lg">
            <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
              JOIN THE FLEET
            </a>
          </Button>
        </div>
      </div>
    </nav>;
};
export default Navigation;