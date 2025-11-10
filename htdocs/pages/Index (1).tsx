import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import logo from "@/assets/logo.png";
import { ArrowRight, Zap, DollarSign, Video } from "lucide-react";
const Index = () => {
  return <div className="min-h-screen flex flex-col">
      <Navigation />
      
      {/* Hero Section */}
      <section className="flex-1 container mx-auto px-4 py-20 flex flex-col items-center justify-center text-center">
        <div className="animate-float mb-8">
          
        </div>
        
        <h1 className="font-display text-6xl md:text-8xl mb-6 leading-tight">
          WELCOME TO THE
          <br />
          <span className="text-gradient-primary animate-pulse-glow">
            DERP FLEET
          </span>
        </h1>
        
        <p className="text-xl md:text-2xl max-w-2xl mb-8 text-muted-foreground">
          Chaotic wisdom on productivity, money, and life. No boring corporate BS. 
          Just memes, hustle, and unhinged advice from your favorite internet admiral.
        </p>
        
        <div className="flex gap-4 flex-wrap justify-center">
          <Button asChild size="lg" className="bg-gradient-derp font-display text-xl hover:scale-110 transition-transform shadow-xl hover-wiggle">
            <Link to="/blog">
              READ THE BLOG
              <ArrowRight className="ml-2 h-6 w-6" />
            </Link>
          </Button>
          
          <Button asChild size="lg" variant="outline" className="font-display text-xl border-2 border-foreground hover:bg-foreground hover:text-background hover-wiggle">
            <a href="https://www.youtube.com/@AdmiralDerp" target="_blank" rel="noopener noreferrer">
              JOIN ON YOUTUBE
            </a>
          </Button>
        </div>
        
        {/* Feature Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-20 max-w-5xl">
          <div className="p-6 border-4 border-primary bg-card hover-lift hover:shadow-2xl transition-all">
            <Zap className="h-12 w-12 mb-4 text-primary mx-auto" />
            <h3 className="font-display text-2xl mb-2">PRODUCTIVITY</h3>
            <p className="text-muted-foreground">
              Get stuff done with chaotic energy and unconventional methods
            </p>
          </div>
          
          <div className="p-6 border-4 border-secondary bg-card hover-lift hover:shadow-2xl transition-all">
            <DollarSign className="h-12 w-12 mb-4 text-secondary mx-auto" />
            <h3 className="font-display text-2xl mb-2">MONEY</h3>
            <p className="text-muted-foreground">
              Make bank without selling your soul (probably)
            </p>
          </div>
          
          <div className="p-6 border-4 border-accent bg-card hover-lift hover:shadow-2xl transition-all">
            <Video className="h-12 w-12 mb-4 text-accent mx-auto" />
            <h3 className="font-display text-2xl mb-2">VLOGS</h3>
            <p className="text-muted-foreground">
              Behind-the-scenes chaos and unfiltered life updates
            </p>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>;
};
export default Index;