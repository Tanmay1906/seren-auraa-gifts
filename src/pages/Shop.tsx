import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { Button } from "@/components/ui/button";
import { SlidersHorizontal } from "lucide-react";
import ceramicBowl from "@/assets/product-ceramic-bowl.jpg";
import textile from "@/assets/product-textile.jpg";
import brass from "@/assets/product-brass.jpg";
import pottery from "@/assets/product-pottery.jpg";

const Shop = () => {
  const products = [
    { id: "1", title: "Handcrafted Ceramic Bowl", price: 799, image: ceramicBowl, artisan: "Priya Devi" },
    { id: "2", title: "Embroidered Textile Scarf", price: 599, image: textile, artisan: "Ravi Kumar" },
    { id: "3", title: "Brass Candle Holder", price: 749, image: brass, artisan: "Meera Singh" },
    { id: "4", title: "Artisan Pottery Vase", price: 699, image: pottery, artisan: "Anand Rao" },
    { id: "5", title: "Decorative Ceramic Plate", price: 649, image: ceramicBowl, artisan: "Lakshmi Bai" },
    { id: "6", title: "Handwoven Table Runner", price: 549, image: textile, artisan: "Ravi Kumar" },
    { id: "7", title: "Brass Wall Hanging", price: 799, image: brass, artisan: "Meera Singh" },
    { id: "8", title: "Terracotta Planter Set", price: 499, image: pottery, artisan: "Anand Rao" },
  ];

  return (
    <div className="min-h-screen bg-background">
      <Navbar />

      <div className="pt-32 pb-24 px-6">
        <div className="container mx-auto max-w-7xl">
          {/* Header */}
          <div className="mb-12 animate-fade-up">
            <h1 className="text-5xl md:text-6xl font-bold mb-4">Our Collection</h1>
            <p className="text-muted-foreground text-lg mb-8">
              Discover handcrafted treasures from skilled Indian artisans
            </p>

            <div className="flex items-center justify-between flex-wrap gap-4">
              <Button variant="outline" className="border-primary/30">
                <SlidersHorizontal className="mr-2 h-4 w-4" />
                Filters
              </Button>
              <p className="text-sm text-muted-foreground">
                {products.length} products
              </p>
            </div>
          </div>

          {/* Products Grid - Asymmetric Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {products.map((product, index) => (
              <div
                key={product.id}
                className={`animate-fade-up ${
                  index % 5 === 0 ? 'md:col-span-2 md:row-span-2' : ''
                }`}
                style={{ animationDelay: `${index * 50}ms` }}
              >
                <ProductCard {...product} />
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  );
};

export default Shop;
