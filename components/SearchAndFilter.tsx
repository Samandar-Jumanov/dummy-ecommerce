import React from 'react';
import { Input } from "@/components/ui/input";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface SearchAndFilterProps {
  searchQuery: string;
  sortBy: string;
  sortOrder: string;
  onSearch: (query: string) => void;
  onSortChange: (value: string) => void;
  onSortOrderChange: (value: string) => void;
}

const SearchAndFilter: React.FC<SearchAndFilterProps> = ({
  searchQuery,
  sortBy,
  sortOrder,
  onSearch,
  onSortChange,
  onSortOrderChange
}) => {
  return (
    <div className="mb-8 flex flex-col sm:flex-row gap-4 items-center ">
      <Input
        type="text"
        placeholder="Search products..."
        value={searchQuery}
        onChange={(e) => onSearch(e.target.value)}
        className="w-full sm:w-96 shadow-sm"
      />
      <Select onValueChange={onSortChange} value={sortBy} >
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
      <Select onValueChange={onSortOrderChange} value={sortOrder}>
        <SelectTrigger className="w-full sm:w-48">
          <SelectValue placeholder="Sort order" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="asc">Ascending</SelectItem>
          <SelectItem value="desc">Descending</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default SearchAndFilter;