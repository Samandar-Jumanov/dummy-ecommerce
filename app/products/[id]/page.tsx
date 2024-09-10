"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";

interface Review {
  rating: string;
  comment: string;
  date: string;
  reviewerName: string;
  reviewerEmail: string;
}

const Product = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [reviews, setReviews] = useState<Review[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function fetchProductAndReviews() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product or reviews");
        }

        const productData = await response.json();

        setProduct(productData);
        setReviews(productData.reviews || []);
      } catch (err) {
        setError("An error occurred while fetching the product. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProductAndReviews();
  }, [params.id]);

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error || !product) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error || "Product not found"}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <Link href="/" className="inline-flex items-center mb-6 text-blue-600 hover:text-blue-800">
        <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
      </Link>
      
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="lg:col-span-2 space-y-6">
          <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg">
            <Image 
              src={product.thumbnail} 
              alt={product.title} 
              layout="fill"
              objectFit="cover"
              priority
            />
          </div>
          <div className="grid grid-cols-4 gap-2">
            {product.images.slice(0, 4).map((image, index) => (
              <div key={index} className="relative aspect-square rounded-md overflow-hidden shadow">
                <Image 
                  src={image} 
                  alt={`${product.title} ${index + 1}`} 
                  layout="fill"
                  objectFit="cover"
                />
              </div>
            ))}
          </div>
          <div className="space-y-4">
            <h1 className="text-3xl font-bold">{product.title}</h1>
            <div className="flex items-center space-x-2 flex-wrap">
              <Badge variant="secondary">{product.category}</Badge>
              <Badge variant="outline">{product.brand}</Badge>
            </div>
            <p className="text-xl font-semibold">${product.price.toFixed(2)}</p>
            <div className="flex items-center space-x-2">
              <div className="flex items-center">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                ))}
              </div>
              <span className="text-sm text-gray-600">({product.rating.toFixed(1)})</span>
            </div>
            <p className="text-gray-700">{product.description}</p>
            <div className="flex items-center space-x-4">
              <Badge variant={product.stock > 0 ? "secondary" : "destructive"}>
                {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
              </Badge>
            </div>
          </div>
        </div>
        
        <div className="lg:col-span-1">
          <Card className="sticky top-4">
            <CardHeader>
              <CardTitle>Reviews</CardTitle>
            </CardHeader>
            <CardContent>
              {reviews.length > 0 ? (
                <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto">
                  {reviews.map((review) => (
                    <div key={review.reviewerEmail} className="border-b pb-4 last:border-b-0">
                      <div className="flex justify-between items-center mb-2">
                        <span className="font-semibold">{review.reviewerName}</span>
                        <div className="flex items-center">
                          {[...Array(5)].map((_, i) => (
                            <Star key={i} className={`h-4 w-4 ${i < Number(review.rating) ? 'text-yellow-400 fill-current' : 'text-gray-300'}`} />
                          ))}
                        </div>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-gray-500 italic">No reviews yet.</p>
              )}
            </CardContent>
          </Card>
        </div>
      </div>
      
      <div className="mt-8">
        <Button className="w-full md:w-auto" disabled={product.stock === 0}>
          <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
        </Button>
      </div>
    </div>
  );
};

export default Product;