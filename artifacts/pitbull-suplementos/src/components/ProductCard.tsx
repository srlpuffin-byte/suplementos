import { Product, formatPrice } from "@/data/products";
import { Card } from "@/components/ui/card";
import { Link } from "wouter";

export function ProductCard({ product }: { product: Product }) {
  const imageUrl = product.imageUrl || `/product-placeholder.jpg`;

  return (
    <Link href={`/productos/${product.id}`} className="block group">
      <Card className="relative overflow-hidden border-border transition-all duration-300 hover:shadow-lg hover:scale-[1.02] bg-white rounded-sm h-full flex flex-col">
        {/* Discount Badge */}
        {product.discountBadge && (
          <div className="absolute top-2 left-2 bg-[#e53e3e] text-white text-xs font-bold px-2 py-1 z-10">
            {product.discountBadge}
          </div>
        )}
        
        {/* Image */}
        <div className="aspect-square p-4 flex items-center justify-center bg-white">
          <img 
            src={imageUrl} 
            alt={product.name} 
            className="object-contain w-full h-full mix-blend-multiply group-hover:scale-105 transition-transform duration-500" 
            onError={(e) => {
              (e.target as HTMLImageElement).src = `data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='400' height='400' viewBox='0 0 400 400'%3E%3Crect width='400' height='400' fill='%23f5f5f5'/%3E%3Ctext x='50%25' y='50%25' dominant-baseline='middle' text-anchor='middle' font-family='sans-serif' font-size='24' fill='%23999'%3EProducto%3C/text%3E%3C/svg%3E`;
            }}
          />
        </div>

        {/* Content */}
        <div className="p-4 flex flex-col flex-grow border-t border-gray-100">
          <h3 className="font-heading text-lg leading-tight line-clamp-2 mb-2 group-hover:text-primary transition-colors">
            {product.name}
          </h3>
          
          <div className="mt-auto">
            {product.originalPrice && (
              <span className="text-muted-foreground text-sm line-through block mb-1">
                {formatPrice(product.originalPrice)}
              </span>
            )}
            <span className="text-xl font-bold text-black block">
              {formatPrice(product.price)}
            </span>
          </div>
        </div>
      </Card>
    </Link>
  );
}
