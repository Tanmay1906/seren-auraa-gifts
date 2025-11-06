import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Heart, Users, Sparkles } from "lucide-react";
import aboutImage from "@/assets/about-crafts.jpg";

const About = () => {
  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      {/* Hero */}
      <section className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-4xl text-center animate-fade-up">
          <h1 className="text-5xl md:text-6xl font-bold mb-6">
            Our <span className="gradient-text">Story</span>
          </h1>
          <p className="text-xl text-muted-foreground leading-relaxed">
            Bridging ancient craftsmanship with modern convenience, one thoughtful gift at a time.
          </p>
        </div>
      </section>

      {/* Mission */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="container mx-auto max-w-6xl">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div className="animate-fade-in">
              <img 
                src={aboutImage}
                alt="Handcrafted items"
                className="rounded-lg shadow-elegant"
              />
            </div>
            <div className="animate-fade-up">
              <h2 className="text-4xl font-bold mb-6">Fast. Beautiful. Thoughtful.</h2>
              <p className="text-muted-foreground leading-relaxed mb-6">
                SerenAuraa was born from a simple belief: that the gifts we give should carry meaning, 
                support skilled artisans, and arrive with the speed and care you deserve.
              </p>
              <p className="text-muted-foreground leading-relaxed mb-6">
                We've partnered with master craftspeople across India, from the pottery villages of 
                Rajasthan to the weaving communities of Gujarat, bringing their incredible work to 
                your doorstep with Blinkit-inspired efficiency.
              </p>
              <p className="text-muted-foreground leading-relaxed">
                Every purchase tells a story, preserves a tradition, and supports a family of artisans 
                keeping ancient crafts alive in the modern world.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-24 px-6">
        <div className="container mx-auto max-w-6xl">
          <div className="text-center mb-16 animate-fade-up">
            <h2 className="text-4xl md:text-5xl font-bold mb-4">What We Stand For</h2>
            <p className="text-muted-foreground text-lg">Our commitment to craft, community, and care</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
            {[
              {
                icon: Heart,
                title: "Artisan First",
                description: "Fair wages, sustainable partnerships, and deep respect for traditional craftsmanship guide every decision we make.",
              },
              {
                icon: Users,
                title: "Community Driven",
                description: "We work directly with artisan cooperatives, ensuring that your purchase makes a meaningful impact on entire communities.",
              },
              {
                icon: Sparkles,
                title: "Quality & Speed",
                description: "Handcrafted excellence meets modern logistics. Beautiful gifts, delivered fast, without compromise.",
              },
            ].map((value, index) => (
              <div 
                key={index}
                className="text-center animate-fade-up"
                style={{ animationDelay: `${index * 150}ms` }}
              >
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 mb-6">
                  <value.icon className="h-8 w-8 text-primary" />
                </div>
                <h3 className="text-xl font-semibold mb-3">{value.title}</h3>
                <p className="text-muted-foreground leading-relaxed">{value.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-24 px-6 bg-muted/20">
        <div className="container mx-auto max-w-5xl">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 text-center">
            {[
              { number: "500+", label: "Artisan Partners" },
              { number: "50+", label: "Villages Supported" },
              { number: "10,000+", label: "Happy Customers" },
            ].map((stat, index) => (
              <div 
                key={index}
                className="animate-scale-in"
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <p className="text-5xl font-bold gradient-text mb-2">{stat.number}</p>
                <p className="text-muted-foreground">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
