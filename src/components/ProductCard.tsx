// Product cards should not navigate to a product detail page anymore.
// Keep actions (add to cart / wishlist) on the card itself.
import { Card, CardContent } from "@/components/ui/card";
import { ShoppingCart, Heart } from "lucide-react";
import { addToCart, isInWishlist, toggleWishlist } from "@/lib/cart";
import { toast } from "@/hooks/use-toast";
import { useEffect, useState } from "react";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  artisan?: string;
}

const ProductCard = ({ id, title, price, image, artisan }: ProductCardProps) => {
  const [liked, setLiked] = useState(false);

  useEffect(() => {
    setLiked(isInWishlist(id));
  }, [id]);
  const handleAddToCart = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    addToCart({ id, title, price, image });
    toast({ title: "Added to cart", description: `${title} was added to your cart.` });
  };

  const handleToggleWishlist = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const nowLiked = toggleWishlist(id);
    setLiked(nowLiked);
    toast({ title: nowLiked ? "Added to wishlist" : "Removed from wishlist", description: title });
  };

  return (
    <div className="group relative">
      <Card className="overflow-hidden border-border/50 bg-card hover:shadow-elegant transition-all duration-500 cursor-default">
        <div className="aspect-square overflow-hidden bg-muted/20 relative">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />

          {/* Overlay actions - visible on hover */}
          <div className="absolute inset-0 flex items-end justify-end p-3 pointer-events-none">
            <div className="flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 pointer-events-auto">
              <button
                onClick={handleToggleWishlist}
                aria-label="Add to wishlist"
                className={`p-2 rounded-full bg-white/90 shadow-md ${liked ? 'text-primary' : 'text-muted-foreground'}`}
              >
                <Heart className="h-4 w-4" />
              </button>
              <button
                onClick={handleAddToCart}
                aria-label="Add to cart"
                className="p-2 rounded-full bg-white/90 shadow-md"
              >
                <ShoppingCart className="h-4 w-4" />
              </button>
            </div>
          </div>
        </div>
        <CardContent className="p-6">
          <h3 className="font-semibold text-lg mb-1 group-hover:text-primary transition-colors">
            {title}
          </h3>
          {artisan && (
            <p className="text-xs text-muted-foreground mb-3">by {artisan}</p>
          )}
          <p className="text-primary font-semibold text-xl">₹{price.toLocaleString()}</p>
        </CardContent>
      </Card>
    </div>
  );
};

export default ProductCard;
