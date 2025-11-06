import { Link } from "react-router-dom";
import { Card, CardContent } from "@/components/ui/card";

interface ProductCardProps {
  id: string;
  title: string;
  price: number;
  image: string;
  artisan?: string;
}

const ProductCard = ({ id, title, price, image, artisan }: ProductCardProps) => {
  return (
    <Link to={`/product/${id}`} className="group">
      <Card className="overflow-hidden border-border/50 bg-card hover:shadow-elegant transition-all duration-500">
        <div className="aspect-square overflow-hidden bg-muted/20">
          <img
            src={image}
            alt={title}
            className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
          />
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
    </Link>
  );
};

export default ProductCard;
