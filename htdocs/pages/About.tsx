import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import logo from "@/assets/logo.png";

const About = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <img 
            src={logo}
            alt="Admiral Derp"
            className="h-32 w-auto mx-auto mb-6 animate-float"
          />
          <h1 className="font-display text-5xl md:text-7xl mb-4">
            ABOUT <span className="text-gradient-primary">ADMIRAL DERP</span>
          </h1>
        </div>
        
        <div className="prose prose-lg max-w-none space-y-6">
          <div className="p-6 bg-card border-4 border-primary rounded-lg hover-lift">
            <h2 className="font-display text-3xl mb-4">WHO IS THIS MANIAC?</h2>
            <p className="text-lg leading-relaxed">
              Admiral Derp is what happens when productivity advice meets internet chaos. 
              Part entrepreneur, part meme lord, fully unhinged. I've built multiple businesses, 
              failed spectacularly a few times, and learned that the secret to success isn't 
              following some boring playbook—it's embracing your own brand of crazy.
            </p>
          </div>
          
          <div className="p-6 bg-card border-4 border-secondary rounded-lg hover-lift">
            <h2 className="font-display text-3xl mb-4">THE MISSION</h2>
            <p className="text-lg leading-relaxed">
              This blog exists to share real talk about productivity, money, and life—without 
              the corporate BS or fake guru energy. Just honest, chaotic advice from someone 
              who's figured out how to make it work while staying completely themselves.
            </p>
            <p className="text-lg leading-relaxed mt-4">
              Whether you're trying to build a side hustle, fix your productivity, or just 
              want to see someone else's organized chaos, you're in the right place.
            </p>
          </div>
          
          <div className="p-6 bg-card border-4 border-accent rounded-lg hover-lift">
            <h2 className="font-display text-3xl mb-4">WHAT TO EXPECT</h2>
            <ul className="space-y-3 text-lg">
              <li className="flex items-start">
                <span className="text-primary mr-2">→</span>
                <span>Productivity tips that actually work for chaotic brains</span>
              </li>
              <li className="flex items-start">
                <span className="text-secondary mr-2">→</span>
                <span>Real money-making strategies (no get-rich-quick schemes)</span>
              </li>
              <li className="flex items-start">
                <span className="text-accent mr-2">→</span>
                <span>Behind-the-scenes vlogs and unfiltered life updates</span>
              </li>
              <li className="flex items-start">
                <span className="text-primary mr-2">→</span>
                <span>Way too many memes and unhinged takes</span>
              </li>
            </ul>
          </div>
          
          <div className="text-center mt-12 p-8 bg-gradient-derp rounded-lg">
            <h2 className="font-display text-3xl mb-4 text-foreground">JOIN THE DERP FLEET</h2>
            <p className="text-xl mb-6 text-foreground">
              Ready to embrace the chaos? Subscribe for weekly videos, exclusive content, 
              and a community of fellow productivity degenerates.
            </p>
            <Button 
              asChild
              size="lg"
              className="bg-foreground text-background font-display text-xl hover:scale-110 transition-transform hover-wiggle"
            >
              <a href="https://youtube.com" target="_blank" rel="noopener noreferrer">
                SUBSCRIBE NOW
              </a>
            </Button>
          </div>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default About;
