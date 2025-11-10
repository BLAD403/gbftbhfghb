import { Link } from "react-router-dom";
import { Youtube, Twitter, Instagram } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-foreground text-background py-12 mt-20 border-t-4 border-primary">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="font-display text-2xl mb-4 text-primary">ADMIRAL DERP</h3>
            <p className="text-muted-foreground">
              Chaotic wisdom for productivity, money, and life. Join the Derp Fleet!
            </p>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-4 text-secondary">NAVIGATE</h4>
            <ul className="space-y-2">
              <li>
                <Link to="/blog" className="hover:text-primary transition-colors hover-wiggle inline-block">
                  Blog
                </Link>
              </li>
              <li>
                <Link to="/about" className="hover:text-secondary transition-colors hover-wiggle inline-block">
                  About
                </Link>
              </li>
              <li>
                <Link to="/contact" className="hover:text-accent transition-colors hover-wiggle inline-block">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          
          <div>
            <h4 className="font-display text-xl mb-4 text-accent">FOLLOW THE DERP</h4>
            <div className="flex gap-4">
              <a 
                href="https://youtube.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-primary transition-colors hover:scale-125 transform duration-200"
              >
                <Youtube className="h-8 w-8" />
              </a>
              <a 
                href="https://twitter.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-secondary transition-colors hover:scale-125 transform duration-200"
              >
                <Twitter className="h-8 w-8" />
              </a>
              <a 
                href="https://instagram.com" 
                target="_blank" 
                rel="noopener noreferrer"
                className="hover:text-accent transition-colors hover:scale-125 transform duration-200"
              >
                <Instagram className="h-8 w-8" />
              </a>
            </div>
          </div>
        </div>
        
        <div className="mt-8 pt-8 border-t border-muted text-center">
          <p>&copy; {new Date().getFullYear()} Admiral Derp. All rights reserved. Stay Derpy.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
