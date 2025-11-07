import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter, Heart, Mail } from "lucide-react";

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-b from-muted/20 to-muted/50 border-t border-border/50 mt-32 overflow-hidden">
      {/* Decorative Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute top-20 left-10 w-72 h-72 bg-primary rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-purple-500 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          {/* Brand Section */}
          <div className="space-y-4">
            <h3 className="text-2xl font-bold bg-gradient-to-r from-primary via-purple-500 to-pink-500 bg-clip-text text-transparent">
              SerenAuraa
            </h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Handcrafted luxury gifts from Indian artisans, delivered with care and speed.
            </p>
            
            {/* Social Links with Enhanced Styling */}
            <div className="flex gap-3 pt-4">
              <a 
                href="#" 
                className="group relative h-10 w-10 rounded-full bg-muted/50 hover:bg-gradient-to-br hover:from-primary hover:to-purple-500 transition-all duration-300 flex items-center justify-center"
              >
                <Instagram className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-110 transition-transform duration-300"></div>
              </a>
              <a 
                href="#" 
                className="group relative h-10 w-10 rounded-full bg-muted/50 hover:bg-gradient-to-br hover:from-primary hover:to-purple-500 transition-all duration-300 flex items-center justify-center"
              >
                <Facebook className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-110 transition-transform duration-300"></div>
              </a>
              <a 
                href="#" 
                className="group relative h-10 w-10 rounded-full bg-muted/50 hover:bg-gradient-to-br hover:from-primary hover:to-purple-500 transition-all duration-300 flex items-center justify-center"
              >
                <Twitter className="h-5 w-5 text-muted-foreground group-hover:text-white transition-colors" />
                <div className="absolute inset-0 rounded-full bg-primary/20 scale-0 group-hover:scale-110 transition-transform duration-300"></div>
              </a>
            </div>

            {/* Newsletter Signup */}
            <div className="pt-4">
              <div className="flex gap-2">
                <div className="flex-1 relative">
                  <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                  <input 
                    type="email" 
                    placeholder="Subscribe to newsletter" 
                    className="w-full pl-10 pr-4 py-2 text-sm bg-background/50 border border-border/50 rounded-full focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Shop Links */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground relative inline-block">
              Shop
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-purple-500"></div>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/shop" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  All Products
                </Link>
              </li>
              <li>
                <Link to="/shop" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Ceramics
                </Link>
              </li>
              <li>
                <Link to="/shop" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Textiles
                </Link>
              </li>
              <li>
                <Link to="/shop" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Brass & Metal
                </Link>
              </li>
            </ul>
          </div>

          {/* About Links */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground relative inline-block">
              About
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-purple-500"></div>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <Link to="/about" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Our Story
                </Link>
              </li>
              <li>
                <Link to="/about" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Artisans
                </Link>
              </li>
              <li>
                <a href="#" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Sustainability
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Press
                </a>
              </li>
            </ul>
          </div>

          {/* Support Links */}
          <div>
            <h4 className="font-semibold mb-6 text-foreground relative inline-block">
              Support
              <div className="absolute -bottom-2 left-0 w-8 h-0.5 bg-gradient-to-r from-primary to-purple-500"></div>
            </h4>
            <ul className="space-y-3 text-sm">
              <li>
                <a href="#" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Contact Us
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Shipping & Returns
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  FAQs
                </a>
              </li>
              <li>
                <a href="#" className="group flex items-center text-muted-foreground hover:text-primary transition-colors">
                  <span className="mr-2 opacity-0 group-hover:opacity-100 transition-opacity">→</span>
                  Terms & Conditions
                </a>
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom Section */}
        <div className="mt-12 pt-8 border-t border-border/50">
          <div className="flex flex-col md:flex-row items-center justify-between gap-4">
            <p className="text-sm text-muted-foreground flex items-center gap-2">
              &copy; 2025 SerenAuraa. Handcrafted with 
              <Heart className="h-4 w-4 text-red-500 fill-red-500 animate-pulse" /> 
              in India.
            </p>
            <div className="flex gap-6 text-xs text-muted-foreground">
              <a href="#" className="hover:text-primary transition-colors">Privacy Policy</a>
              <span className="text-border">|</span>
              <a href="#" className="hover:text-primary transition-colors">Cookie Policy</a>
              <span className="text-border">|</span>
              <a href="#" className="hover:text-primary transition-colors">Sitemap</a>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;