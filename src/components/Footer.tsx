import { Link } from "react-router-dom";
import { Instagram, Facebook, Twitter } from "lucide-react";

const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t border-border mt-32">
      <div className="container mx-auto px-6 py-16">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
          <div className="space-y-4">
            <h3 className="text-xl font-bold gradient-text">SerenAuraa</h3>
            <p className="text-sm text-muted-foreground leading-relaxed">
              Handcrafted luxury gifts from Indian artisans, delivered with care and speed.
            </p>
            <div className="flex gap-4 pt-4">
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Instagram className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Facebook className="h-5 w-5" />
              </a>
              <a href="#" className="text-muted-foreground hover:text-primary transition-colors">
                <Twitter className="h-5 w-5" />
              </a>
            </div>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Shop</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">All Products</Link></li>
              <li><Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">Ceramics</Link></li>
              <li><Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">Textiles</Link></li>
              <li><Link to="/shop" className="text-muted-foreground hover:text-primary transition-colors">Brass & Metal</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">About</h4>
            <ul className="space-y-3 text-sm">
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Our Story</Link></li>
              <li><Link to="/about" className="text-muted-foreground hover:text-primary transition-colors">Artisans</Link></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Sustainability</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Press</a></li>
            </ul>
          </div>

          <div>
            <h4 className="font-semibold mb-4">Support</h4>
            <ul className="space-y-3 text-sm">
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Contact Us</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Shipping & Returns</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">FAQs</a></li>
              <li><a href="#" className="text-muted-foreground hover:text-primary transition-colors">Terms & Conditions</a></li>
            </ul>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t border-border text-center text-sm text-muted-foreground">
          <p>&copy; 2025 SerenAuraa. Handcrafted with love in India.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
