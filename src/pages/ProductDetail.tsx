import { useParams, Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { ArrowLeft, ShoppingCart, Heart } from "lucide-react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import ceramicBowl from "@/assets/product-ceramic-bowl.jpg";
import textile from "@/assets/product-textile.jpg";
import brass from "@/assets/product-brass.jpg";

const ProductDetail = () => {
  const { id } = useParams();

  // Mock product data - in real app, fetch based on id
  const product = {
    id: "1",
    title: "Handcrafted Ceramic Bowl",
    price: 2499,
    image: ceramicBowl,
    artisan: "Priya Devi",
    location: "Jaipur, Rajasthan",
    description: "This exquisite ceramic bowl is handcrafted by Priya Devi, a master artisan from Jaipur. Each piece is unique, featuring traditional Indian patterns hand-painted with gold accents. The bowl combines ancient pottery techniques with contemporary design.",
    details: [
      "Handcrafted by skilled artisans",
      "Traditional Indian patterns",
      "Food-safe ceramic glaze",
      "Diameter: 8 inches",
      "Hand-wash recommended",
    ],
    story: "Priya has been practicing pottery for over 20 years, learning the craft from her grandmother. Each piece she creates carries forward generations of artistic heritage while incorporating modern sensibilities.",
  };

  const relatedProducts = [
    { id: "2", title: "Embroidered Textile Scarf", price: 1899, image: textile, artisan: "Ravi Kumar" },
    { id: "3", title: "Brass Candle Holder", price: 3299, image: brass, artisan: "Meera Singh" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Back Button */}
          <Link to="/shop" className="inline-flex items-center text-muted-foreground hover:text-primary mb-8 transition-colors">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Shop
          </Link>

          {/* Product Details */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 mb-24">
            {/* Image */}
            <div className="animate-fade-in">
              <div className="aspect-square rounded-lg overflow-hidden bg-muted/20 shadow-elegant">
                <img 
                  src={product.image} 
                  alt={product.title}
                  className="w-full h-full object-cover"
                />
              </div>
            </div>

            {/* Info */}
            <div className="animate-fade-up">
              <h1 className="text-4xl md:text-5xl font-bold mb-4">{product.title}</h1>
              <p className="text-muted-foreground mb-2">
                by <span className="text-primary font-medium">{product.artisan}</span>
              </p>
              <p className="text-sm text-muted-foreground mb-8">{product.location}</p>

              <p className="text-3xl font-bold text-primary mb-8">₹{product.price.toLocaleString()}</p>

              <p className="text-muted-foreground leading-relaxed mb-8">
                {product.description}
              </p>

              <div className="space-y-4 mb-8">
                <h3 className="font-semibold text-lg">Product Details</h3>
                <ul className="space-y-2">
                  {product.details.map((detail, index) => (
                    <li key={index} className="text-muted-foreground flex items-start">
                      <span className="text-primary mr-2">•</span>
                      {detail}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex gap-4">
                <Button size="lg" className="flex-1 bg-primary hover:bg-primary/90 shadow-elegant">
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart
                </Button>
                <Button size="lg" variant="outline" className="border-primary/30">
                  <Heart className="h-5 w-5" />
                </Button>
              </div>

              {/* Artisan Story */}
              <div className="mt-12 p-6 bg-muted/20 rounded-lg border border-border/50">
                <h3 className="font-semibold text-lg mb-3">Artisan's Story</h3>
                <p className="text-muted-foreground leading-relaxed">
                  {product.story}
                </p>
              </div>
            </div>
          </div>

          {/* Related Products */}
          <div>
            <h2 className="text-3xl font-bold mb-8">You May Also Like</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              {relatedProducts.map((relatedProduct) => (
                <ProductCard key={relatedProduct.id} {...relatedProduct} />
              ))}
            </div>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default ProductDetail;
