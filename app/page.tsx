"use client"

import React, { useState, useEffect } from 'react';
import { IProduct } from '@/types/product';
import ProductCard from '@/components/ProductCard';
import ProductCardSkeleton from '@/components/ProductSkeleton';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Alert, AlertDescription } from "@/components/ui/alert";
import Pagination from '@/components/Pagination';
import Link from 'next/link';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import { ICategory } from '@/types/category.type';

const ITEMS_PER_PAGE = 20;

export default function ProductList() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [sortOrder, setSortOrder] = useState('asc');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);
  const [loadingCategories, setLoadingCategories] = useState(true);

  useEffect(() => {
    fetchCategories();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, sortBy, sortOrder, selectedCategory, currentPage]);

  const fetchCategories = async () => {
    setLoadingCategories(true);
    try {
      const res = await fetch('https://dummyjson.com/products/categories');
      if (!res.ok) throw new Error('Failed to fetch categories');
      const data: ICategory[] = await res.json();
      setCategories(data);
    } catch (err) {
      console.error('Error fetching categories:', err);
      setError('Failed to load categories. Please try again later.');
    } finally {
      setLoadingCategories(false);
    }
  };

  const fetchProducts = async () => {
    setLoading(true);
    setError(null);
    try {
      let url = `https://dummyjson.com/products?limit=${ITEMS_PER_PAGE}&skip=${(currentPage - 1) * ITEMS_PER_PAGE}`;
      
      if (searchQuery) {
        url = `https://dummyjson.com/products/search?q=${searchQuery}&limit=${ITEMS_PER_PAGE}&skip=${(currentPage - 1) * ITEMS_PER_PAGE}`;
      } else if (selectedCategory !== 'all') {
        url = `https://dummyjson.com/products/category/${selectedCategory}?limit=${ITEMS_PER_PAGE}&skip=${(currentPage - 1) * ITEMS_PER_PAGE}`;
      }

      if (sortBy !== 'default') {
        url += `&sortBy=${sortBy}&order=${sortOrder}`;
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error('Failed to fetch products');

      const data = await res.json();
      setProducts(data.products);
      setTotalPages(Math.ceil(data.total / ITEMS_PER_PAGE));
    } catch (err) {
      setError('An error occurred while fetching products. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchQuery(e.target.value);
    setCurrentPage(1);
  };

  const handleSortChange = (value: string) => {
    setSortBy(value);
    setCurrentPage(1);
  };

  const handleSortOrderChange = (value: string) => {
    setSortOrder(value);
    setCurrentPage(1);
  };

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category);
    setCurrentPage(1);
    setIsCategoryListOpen(false);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="bg-gray-100 min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800">Our Products</h1>
          <Link href="/post-new-product">
            <Button className="bg-green-500 hover:bg-green-600 text-white">
              Post New Product
            </Button>
          </Link>
        </div>
        
        <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center">
          <Input
            type="text"
            placeholder="Search products..."
            value={searchQuery}
            onChange={handleSearch}
            className="w-full sm:w-96 shadow-sm"
          />
          <Select onValueChange={handleSortChange} value={sortBy}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort by" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="default">None</SelectItem>
              <SelectItem value="title">Name</SelectItem>
              <SelectItem value="price">Price</SelectItem>
              <SelectItem value="rating">Rating</SelectItem>
            </SelectContent>
          </Select>
          <Select onValueChange={handleSortOrderChange} value={sortOrder}>
            <SelectTrigger className="w-full sm:w-48">
              <SelectValue placeholder="Sort order" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="asc">Ascending</SelectItem>
              <SelectItem value="desc">Descending</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <div className="bg-white p-6 rounded-lg shadow-sm mb-4">
              <div className="flex justify-between items-center mb-4">
                <h2 className="font-semibold text-lg text-gray-700">Categories</h2>
                <Button 
                  className="lg:hidden"
                  onClick={() => setIsCategoryListOpen(!isCategoryListOpen)}
                >
                  <Menu size={24} />
                </Button>
              </div>
              {loadingCategories ? (
                <div className="animate-pulse space-y-2">
                  {Array.from({ length: 5 }).map((_, index) => (
                    <div key={index} className="h-8 bg-gray-200 rounded"></div>
                  ))}
                </div>
              ) : (
                <div className={`space-y-2 ${isCategoryListOpen ? 'block' : 'hidden lg:block'}`}>
                  {categories.map((category : ICategory ) => (
                    <Button
                      key={category.slug}
                      onClick={() => handleCategoryChange(category.slug)}
                      className={`w-full justify-start px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                        selectedCategory === category.slug
                          ? 'bg-blue-500 text-white'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                    </Button>
                  ))}
                </div>
              )}
            </div>
          </div>
          
          <div className="lg:w-3/4">
            {loading ? (
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: ITEMS_PER_PAGE }).map((_, index) => (
                  <ProductCardSkeleton key={index} />
                ))}
              </div>
            ) : products.length > 0 ? (
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
                    onPageChange={handlePageChange}
                  />
                </div>
              </>
            ) : (
              <Alert>
                <AlertDescription>No products found. Try adjusting your search or filters.</AlertDescription>
              </Alert>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}