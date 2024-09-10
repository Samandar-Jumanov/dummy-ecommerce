import React from 'react';
import { IProduct } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductSkeleton';
import { Alert, AlertDescription } from "@/components/ui/alert";
import Pagination from '@/components/Pagination';
import Link from 'next/link';

interface ProductListProps {
  products: IProduct[];
  loading: boolean;
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

const ProductList: React.FC<ProductListProps> = ({
  products,
  loading,
  currentPage,
  totalPages,
  onPageChange
}) => {
  if (loading) {
    return (
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Array.from({ length: 20 }).map((_, index) => (
          <ProductCardSkeleton key={index} />
        ))}
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <Alert>
        <AlertDescription>No products found. Try adjusting your search or filters.</AlertDescription>
      </Alert>
    );
  }

  return (
    <>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {products.map((product) => (
          <Link href={`/products/${product.id}`} key={product.id} className="transform transition-transform hover:scale-105">
            <ProductCard product={product} />
          </Link>
        ))}
      </div>
      <div className="mt-8 flex justify-center">
        <Pagination
          currentPage={currentPage}
          totalPages={totalPages}
          onPageChange={onPageChange}
        />
      </div>
    </>
  );
};

export default ProductList;