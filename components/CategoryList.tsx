import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, Check } from 'lucide-react';
import { ICategory } from '@/types/category.type';

interface CategoryListProps {
  categories: ICategory[];
  chosenCategories: string[];
  onCategoryToggle: (category: string) => void;
  loading: boolean;
}

const CategoryList: React.FC<CategoryListProps> = ({
  categories,
  chosenCategories,
  onCategoryToggle,
  loading
}) => {
  const [isCategoryListOpen, setIsCategoryListOpen] = useState(false);

  return (
    <div className="bg-white p-6 rounded-lg shadow-sm mb-4 border border-gray-200">
      <div className="flex justify-between items-center mb-4">
        <h2 className="font-semibold text-lg text-gray-700">Categories</h2>
        <Button
          className="lg:hidden"
          onClick={() => setIsCategoryListOpen(!isCategoryListOpen)}
          variant="outline"
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
              onClick={() => onCategoryToggle(category.slug)}
              className={`w-full justify-between px-4 py-2 text-sm font-medium rounded-md transition-colors ${
                chosenCategories.includes(category.slug)
                  ? 'bg-green-50 text-green-700 hover:bg-green-100'
                  : 'bg-white text-gray-700 hover:bg-gray-50'
              } border border-gray-200`}
              variant="outline"
            >
              <span>{category.name}</span>
              {chosenCategories.includes(category.slug) && (
                <Check size={16} className="text-blue-700" />
              )}
            </Button>
          ))}
        </div>
      )}
    </div>
  );
};

export default CategoryList;