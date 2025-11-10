import { useState } from "react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Mail, Send } from "lucide-react";
import { supabase } from "@/integrations/supabase/client";
import { z } from "zod";

const contactSchema = z.object({
  name: z.string().trim().min(1, "Name is required").max(100, "Name must be less than 100 characters"),
  email: z.string().trim().email("Invalid email address").max(255, "Email must be less than 255 characters"),
  message: z.string().trim().min(10, "Message must be at least 10 characters").max(5000, "Message must be less than 5000 characters")
});

const Contact = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: ""
  });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    try {
      // Validate input
      const validatedData = contactSchema.parse(formData);
      
      const { error } = await supabase
        .from("contact_entries")
        .insert([{
          name: validatedData.name,
          email: validatedData.email,
          message: validatedData.message
        }]);

      if (error) throw error;

      toast.success("Message sent! Admiral Derp will respond soon (or never, he's chaotic like that).");
      setFormData({ name: "", email: "", message: "" });
    } catch (error: any) {
      if (error instanceof z.ZodError) {
        toast.error(error.errors[0].message);
      } else {
        toast.error("Failed to send message. Please try again.");
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Navigation />
      
      <main className="flex-1 container mx-auto px-4 py-12 max-w-4xl">
        <div className="text-center mb-12">
          <Mail className="h-16 w-16 mx-auto mb-4 text-primary animate-wiggle" />
          <h1 className="font-display text-5xl md:text-7xl mb-4">
            GET IN <span className="text-gradient-primary">TOUCH</span>
          </h1>
          <p className="text-xl text-muted-foreground max-w-2xl mx-auto">
            Got questions? Collaboration ideas? Just want to say hi? Drop me a message below.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          <div className="p-6 bg-card border-4 border-primary rounded-lg hover-lift">
            <h3 className="font-display text-2xl mb-3">FOR BUSINESS</h3>
            <p className="text-muted-foreground mb-4">
              Sponsorships, partnerships, or collaboration opportunities? Let's talk.
            </p>
            <p className="font-bold">Response time: 2-3 business days</p>
          </div>
          
          <div className="p-6 bg-card border-4 border-secondary rounded-lg hover-lift">
            <h3 className="font-display text-2xl mb-3">JUST CHATTING</h3>
            <p className="text-muted-foreground mb-4">
              Questions, feedback, or random thoughts? I read everything (eventually).
            </p>
            <p className="font-bold">Response time: When the chaos allows</p>
          </div>
        </div>
        
        <form onSubmit={handleSubmit} className="space-y-6 p-8 bg-card border-4 border-foreground rounded-lg">
          <div>
            <Label htmlFor="name" className="font-display text-xl mb-2 block">
              YOUR NAME
            </Label>
            <Input
              id="name"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Admiral [Your Name]"
              className="border-2 border-foreground focus:border-primary"
            />
          </div>
          
          <div>
            <Label htmlFor="email" className="font-display text-xl mb-2 block">
              YOUR EMAIL
            </Label>
            <Input
              id="email"
              name="email"
              type="email"
              value={formData.email}
              onChange={handleChange}
              placeholder="derp@example.com"
              className="border-2 border-foreground focus:border-primary"
            />
          </div>
          
          <div>
            <Label htmlFor="message" className="font-display text-xl mb-2 block">
              YOUR MESSAGE
            </Label>
            <Textarea
              id="message"
              name="message"
              value={formData.message}
              onChange={handleChange}
              placeholder="Tell me what's on your mind..."
              rows={6}
              className="border-2 border-foreground focus:border-primary resize-none"
            />
          </div>
          
          <Button
            type="submit"
            size="lg"
            className="w-full bg-gradient-derp font-display text-xl hover:scale-105 transition-transform hover-wiggle"
          >
            <Send className="mr-2 h-5 w-5" />
            SEND MESSAGE
          </Button>
        </form>
        
        <div className="mt-12 text-center p-6 bg-muted rounded-lg">
          <p className="text-lg text-muted-foreground">
            <strong>Pro tip:</strong> For the fastest response, catch me on social media or YouTube. 
            I'm more active there because, let's be honest, checking email is boring.
          </p>
        </div>
      </main>
      
      <Footer />
    </div>
  );
};

export default Contact;
