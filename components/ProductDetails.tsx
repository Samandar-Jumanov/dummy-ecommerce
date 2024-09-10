import React from "react";
import { IProduct } from "@/types/product";
import { Badge } from "@/components/ui/badge";
import { Star, Tag, Package } from "lucide-react";

const ProductDetails: React.FC<{ product: IProduct }> = ({ product }) => {
  return (
    <div className="space-y-4 p-6 rounded-lg shadow-md">
      <h1 className="text-3xl font-bold text-green-700">{product.title}</h1>
      <div className="flex items-center space-x-2 flex-wrap">
        <Badge variant="outline" className="inline-flex items-center">
          <Tag className="mr-1 h-4 w-4" /> {product.category}
        </Badge>
        <Badge variant="outline" className="inline-flex items-center">
          <Package className="mr-1 h-4 w-4" /> {product.brand}
        </Badge>
      </div>
      <p className="text-2xl font-semibold">
        ${product.price.toFixed(2)}
        <span className="text-sm ml-2">+ tax</span>
      </p>
      <div className="flex items-center space-x-2">
        <div className="flex items-center">
          {[...Array(5)].map((_, i) => (
            <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'fill-current' : ''}`} />
          ))}
        </div>
        <span className="text-sm">({product.rating.toFixed(1)})</span>
      </div>
      <p>{product.description}</p>
      <div className="flex items-center space-x-4">
        <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
          {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
        </Badge>
      </div>
    </div>
  );
};

export default ProductDetails;