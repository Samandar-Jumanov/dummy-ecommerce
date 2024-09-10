import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu } from 'lucide-react';
import { ICategory } from '@/types/category.type';

interface CategoryListProps {
  categories: ICategory[];
  selectedCategory: string;
  onCategoryChange: (category: string) => void;
  loading: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  selectedCategory,
  onCategoryChange,
  loading
}) => {
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);

  return (
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
      {loading ? (
        <div className="animate-pulse space-y-2">
          {Array.from({ length: 5 }).map((_, index) => (
            <div key={index} className="h-8 bg-gray-200 rounded"></div>
          ))}
        </div>
      ) : (
        <div className={`space-y-2 ${isCategoryListOpen ? 'block' : 'hidden lg:block'}`}>
          {categories.map((category) => (
            <Button
              key={category.slug}
              onClick={() => onCategoryChange(category.slug)}
              className={`w-full justify-start px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                selectedCategory === category.slug
                  ? 'bg-blue-500 text-white'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
              }`}
            >
              {category.name}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;