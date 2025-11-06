import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowRight, Package, Sparkles, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import heroImage from "@/assets/hero-artisan.jpg";
import ceramicBowl from "@/assets/product-ceramic-bowl.jpg";
import textile from "@/assets/product-textile.jpg";
import brass from "@/assets/product-brass.jpg";
import pottery from "@/assets/product-pottery.jpg";

const Index = () => {
  const featuredProducts = [
    { id: "1", title: "Handcrafted Ceramic Bowl", price: 2499, image: ceramicBowl, artisan: "Priya Devi" },
    { id: "2", title: "Embroidered Textile Scarf", price: 1899, image: textile, artisan: "Ravi Kumar" },
    { id: "3", title: "Brass Candle Holder", price: 3299, image: brass, artisan: "Meera Singh" },
    { id: "4", title: "Artisan Pottery Vase", price: 2799, image: pottery, artisan: "Anand Rao" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Artisan crafting gifts" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/50 to-transparent" />
        </div>
        
        <div className="relative z-10 text-center px-6 max-w-4xl animate-fade-up">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Fast. Beautiful.<br />
            <span className="gradient-text">Thoughtful.</span>
          </h1>
          <p className="text-xl md:text-2xl text-muted-foreground mb-8 max-w-2xl mx-auto">
            Handcrafted luxury gifts from Indian artisans, delivered with care and speed.
          </p>
          <div className="flex gap-4 justify-center">
            <Link to="/shop">
              <Button size="lg" className="bg-primary hover:bg-primary/90 shadow-elegant">
                Explore Collection
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
            <Link to="/about">
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5">
                Our Story
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* How It Works */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">How It Works</h2>
            <p className="text-muted-foreground text-lg">Three simple steps to thoughtful gifting</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Sparkles,
                title: "Discover",
                description: "Browse our curated collection of handcrafted gifts from skilled Indian artisans.",
              },
              {
                icon: Heart,
                title: "Choose",
                description: "Select the perfect gift that tells a story and supports traditional craftsmanship.",
              },
              {
                icon: Package,
                title: "Delivered Fast",
                description: "Enjoy Blinkit-speed delivery with eco-friendly packaging and care.",
              },
            ].map((step, index) => (
              <div 
                key={index} 
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <step.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{step.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="container mx-auto max-w-7xl">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Featured Collection</h2>
            <p className="text-muted-foreground text-lg">Handpicked treasures from our artisans</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {featuredProducts.map((product, index) => (
              <div 
                key={product.id}
                className="animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <Link to="/shop">
              <Button size="lg" variant="outline" className="border-primary/30 hover:bg-primary/5">
                View All Products
                <ArrowRight className="ml-2 h-5 w-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">Loved by Gift Givers</h2>
            <p className="text-muted-foreground text-lg">Stories from our community</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: "Anjali Sharma",
                text: "The ceramic bowl I ordered was absolutely stunning. The craftsmanship is impeccable, and it arrived faster than expected!",
                location: "Mumbai",
              },
              {
                name: "Vikram Patel",
                text: "Supporting local artisans while getting beautiful gifts is a win-win. SerenAuraa makes it so easy!",
                location: "Delhi",
              },
              {
                name: "Priya Menon",
                text: "Every piece tells a story. The quality and attention to detail is unmatched. Highly recommend!",
                location: "Bangalore",
              },
            ].map((testimonial, index) => (
              <div 
                key={index}
                className="bg-card border border-border/50 rounded-lg p-8 shadow-soft animate-fade-up"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-muted-foreground mb-6 leading-relaxed italic">
                  "{testimonial.text}"
                </p>
                <div>
                  <p className="font-semibold">{testimonial.name}</p>
                  <p className="text-sm text-muted-foreground">{testimonial.location}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Index;
