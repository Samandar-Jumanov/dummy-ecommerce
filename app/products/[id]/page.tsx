"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { IProduct } from "@/types/product";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Star, ShoppingCart, ArrowLeft, Tag, Package, AlertTriangle } from "lucide-react";
import { Button } from "@/components/ui/button";
import { IReview } from "@/types/review.type";
import { useRouter } from "next/navigation";

const Product = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [reviews, setReviews] = useState<IReview[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

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

  const handleDeleteProduct = async () => {
    const confirmed = window.confirm("Are you sure you want to delete this product?");
    if (!confirmed) return;

    try {
      const response = await fetch(`https://dummyjson.com/products/${params.id}`, {
        method: "DELETE",
      });

      if (response.ok) {
        alert("Product deleted successfully!");
        router.push("/");
      } else {
        throw new Error("Failed to delete product");
      }
    } catch (err) {
      alert("An error occurred while deleting the product. Please try again later.");
    }
  };

  const handleUpdateProduct = () => {
    router.push(`/products/${params.id}/edit`); 

  };

  if (loading) {
    return <div className="flex justify-center items-center h-screen text-gray-700">Loading...</div>;
  }

  if (error || !product) {
    return (
      <Alert variant="destructive" className="bg-red-50 border-red-300 text-red-800 shadow">
        <AlertTriangle className="mr-2 h-5 w-5" />
        <AlertDescription>{error || "Product not found"}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center mb-6 text-gray-700 hover:text-gray-900">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <div className="relative w-full aspect-square rounded-lg overflow-hidden shadow-lg hover:scale-105 transition-transform duration-300">
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
                <div key={index} className="relative aspect-square rounded-md overflow-hidden shadow hover:scale-105 transition-transform duration-200">
                  <Image
                    src={image}
                    alt={`${product.title} ${index + 1}`}
                    layout="fill"
                    objectFit="cover"
                  />
                </div>
              ))}
            </div>

            <div className="space-y-4 bg-gray-50 p-6 rounded-lg shadow-md">
              <h1 className="text-3xl font-bold text-gray-800">{product.title}</h1>
              <div className="flex items-center space-x-2 flex-wrap">
                <Badge className="bg-gray-200 text-gray-800 inline-flex items-center">
                  <Tag className="mr-1 h-4 w-4" /> {product.category}
                </Badge>
                <Badge variant="outline" className="text-gray-700 border-gray-300 inline-flex items-center">
                  <Package className="mr-1 h-4 w-4" /> {product.brand}
                </Badge>
              </div>
              <p className="text-2xl font-semibold text-gray-700">
                ${product.price.toFixed(2)} 
                <span className="text-sm text-gray-600 ml-2">+ tax</span>
              </p>
              <div className="flex items-center space-x-2">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className={`h-5 w-5 ${i < Math.round(product.rating) ? 'text-blue-500 fill-current' : 'text-gray-300'}`} />
                  ))}
                </div>
                <span className="text-sm text-gray-600">({product.rating.toFixed(1)})</span>
              </div>
              <p className="text-gray-700">{product.description}</p>
              <div className="flex items-center space-x-4">
                <Badge
                  variant={product.stock > 0 ? "secondary" : "destructive"}
                  className={`inline-flex items-center ${
                    product.stock > 0 ? "bg-blue-100 text-blue-800" : "bg-red-100 text-red-800"
                  }`}
                >
                  {product.stock > 0 ? `${product.stock} in stock` : "Out of Stock"}
                </Badge>
              </div>
            </div>
          </div>

          <div className="lg:col-span-1">
            <Card className="sticky top-4 bg-gray-50 border-gray-200 shadow-lg">
              <CardHeader>
                <CardTitle className="text-gray-800">Reviews</CardTitle>
              </CardHeader>
              <CardContent>
                {reviews.length > 0 ? (
                  <div className="space-y-6 max-h-[calc(100vh-300px)] overflow-y-auto pr-4">
                    {reviews.map((review) => (
                      <div key={review.reviewerEmail} className="border-b border-gray-200 pb-4 last:border-b-0">
                        <div className="flex justify-between items-center mb-2">
                          <span className="font-semibold text-gray-700">{review.reviewerName}</span>
                          <div className="flex items-center">
                            {[...Array(5)].map((_, i) => (
                              <Star key={i} className={`h-4 w-4 ${i < Number(review.rating) ? 'text-blue-500 fill-current' : 'text-gray-300'}`} />
                            ))}
                          </div>
                        </div>
                        <p className="text-gray-600">{review.comment}</p>
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

        <div className="mt-8 flex space-x-4">
          <Button
            className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg shadow-lg transform transition-all hover:scale-105 disabled:bg-gray-400 disabled:cursor-not-allowed"
            disabled={product.stock === 0}
          >
            <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
          </Button>
          <Button
            className="bg-yellow-500 hover:bg-yellow-600 text-white py-3 px-6 rounded-lg shadow-lg"
            onClick={handleUpdateProduct}
          >
            Update Product
          </Button>
          <Button
            className="bg-red-600 hover:bg-red-700 text-white py-3 px-6 rounded-lg shadow-lg"
            onClick={handleDeleteProduct}
          >
            Delete Product
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Product;
