"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { IProduct } from "@/types/product";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { AlertTriangle, ArrowLeft } from "lucide-react";
import { useRouter } from "next/navigation";
import ProductDetails from "@/components/ProductDetails";
import ImageGallery from "@/components/ImageGallery";
import ReviewSection from "@/components/ReviewSection";
import ActionButtons from "@/components/ActionButtons";

const Product = ({ params }: { params: { id: string } }) => {
  const [product, setProduct] = useState<IProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  useEffect(() => {
    async function fetchProduct() {
      try {
        const response = await fetch(`https://dummyjson.com/products/${params.id}`);
        if (!response.ok) {
          throw new Error("Failed to fetch product");
        }
        const productData = await response.json();
        setProduct(productData);
      } catch (err) {
        setError("An error occurred while fetching the product. Please try again later.");
      } finally {
        setLoading(false);
      }
    }

    fetchProduct();
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
    return <div className="flex justify-center items-center h-screen">Loading...</div>;
  }

  if (error || !product) {
    return (
      <Alert variant="destructive">
        <AlertTriangle className="mr-2 h-5 w-5" />
        <AlertDescription>{error || "Product not found"}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <Link href="/" className="inline-flex items-center mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" /> Back to Home
        </Link>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 space-y-6">
            <ImageGallery images={product.images} thumbnail={product.thumbnail} title={product.title} />
            <ProductDetails product={product} />
          </div>

          <div className="lg:col-span-1">
            <ReviewSection reviews={product.reviews || []} />
          </div>
        </div>

        <ActionButtons
          stock={product.stock}
          onUpdate={handleUpdateProduct}
          onDelete={handleDeleteProduct}
        />
      </div>
    </div>
  );
};

export default Product;