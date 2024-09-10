import React from 'react';
import { IProduct } from '@/types/product';
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star } from "lucide-react";
import Image from 'next/image';

interface ProductCardProps {
  product: IProduct;
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <Card className="h-full flex flex-col justify-between hover:shadow-lg transition-shadow duration-300">
      <CardContent className="p-4">
        <div className="aspect-square w-full relative mb-3">
          <Image
            src={product.thumbnail}
            alt={product.title}
            layout="fill"
            objectFit="cover"
            className="rounded-md"
            sizes='100vw'
          />
        </div>
        <h3 className="font-semibold text-lg mb-2 line-clamp-2">{product.title}</h3>
        <p className="text-sm text-muted-foreground mb-2 line-clamp-2">{product.description}</p>
        <div className="flex justify-between items-center mb-2">
          <span className="font-bold text-lg">${product.price.toFixed(2)}</span>
          <div className="flex items-center">
            <Star className="h-4 w-4 fill-current text-yellow-400 mr-1" />
            <span className="text-sm font-semibold">{product.rating.toFixed(1)}</span>
          </div>
        </div>
        <Badge variant="outline" className="mr-2">
          {product.category}
        </Badge>
      </CardContent>
    </Card>
  );
}