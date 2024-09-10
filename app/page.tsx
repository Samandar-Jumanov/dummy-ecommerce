"use client"

import React, { useState, useEffect } from 'react';
import { IProduct } from '@/types/product';
import { ICategory } from '@/types/category.type';
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Button } from "@/components/ui/button";
import ProductList from '@/components/ProductList';
import SearchAndFilter from '@/components/SearchAndFilter';
import CategoryList from '@/components/CategoryList';
import Cookies from "js-cookie";
import { useRouter } from 'next/navigation';

const ITEMS_PER_PAGE = 20;

export default function Home() {
  const [products, setProducts] = useState<IProduct[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortBy, setSortBy] = useState('default');
  const [sortOrder, setSortOrder] = useState('asc');
  const [chosenCategories, setChosenCategories] = useState<string[]>([]);
  const [categories, setCategories] = useState<ICategory[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loadingCategories, setLoadingCategories] = useState(true);
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  
  const router = useRouter();

  useEffect(() => {
    fetchCategories();
    checkAuthStatus();
  }, []);

  useEffect(() => {
    fetchProducts();
  }, [searchQuery, sortBy, sortOrder, chosenCategories, currentPage]);

  const checkAuthStatus = () => {
    const token = Cookies.get("token");
    setIsAuthenticated(!!token);
  };

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
      } else if (chosenCategories.length > 0) {
        const categoryPromises = chosenCategories.map(category => 
          fetch(`https://dummyjson.com/products/category/${category}?limit=${ITEMS_PER_PAGE}&skip=${(currentPage - 1) * ITEMS_PER_PAGE}`)
            .then(res => res.json())
        );
        const categoryResults = await Promise.all(categoryPromises);
        const allProducts = categoryResults.flatMap(result => result.products);
        setProducts(allProducts);
        setTotalPages(Math.ceil(allProducts.length / ITEMS_PER_PAGE));
        setLoading(false);
        return;
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

  const handleSearch = (query: string) => {
    setSearchQuery(query);
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

  const handleCategoryToggle = (categorySlug: string) => {
    setChosenCategories(prev => 
      prev.includes(categorySlug)
        ? prev.filter(cat => cat !== categorySlug)
        : [...prev, categorySlug]
    );
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleAuthAction = () => {
    if (isAuthenticated) {
      router.push('/new');
    } else {
      router.push('/login');
    }
  };

  if (error) {
    return (
      <Alert variant="destructive">
        <AlertDescription>{error}</AlertDescription>
      </Alert>
    );
  }

  return (
    <div className="bg-white min-h-screen">
      <div className="container mx-auto px-4 py-8">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-green-800">Next shop</h1>
          <Button 
            onClick={handleAuthAction}
            className="bg-green-700 hover:bg-green-600 text-white"
          >
            {isAuthenticated ? "Post New Product" : "Login"}
          </Button>
        </div>
        
        <SearchAndFilter
          searchQuery={searchQuery}
          sortBy={sortBy}
          sortOrder={sortOrder}
          onSearch={handleSearch}
          onSortChange={handleSortChange}
          onSortOrderChange={handleSortOrderChange}
        />
        
        <div className="flex flex-col lg:flex-row gap-8">
          <div className="lg:w-1/4">
            <CategoryList
              categories={categories}
              chosenCategories={chosenCategories}
              onCategoryToggle={handleCategoryToggle}
              loading={loadingCategories}
            />
          </div>
          
          <div className="lg:w-3/4">
            <ProductList
              products={products}
              loading={loading}
              currentPage={currentPage}
              totalPages={totalPages}
              onPageChange={handlePageChange}
            />
          </div>
        </div>
      </div>
    </div>
  );
}