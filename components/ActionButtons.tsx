import React from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart } from "lucide-react";

interface ActionButtonsProps {
  stock: number;
  onUpdate: () => void;
  onDelete: () => void;
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ stock, onUpdate, onDelete }) => {
  return (
    <div className="mt-8 flex space-x-4">
      <Button
        className="py-3 px-6 rounded-lg shadow-lg transform transition-all hover:scale-105 disabled:cursor-not-allowed"
        disabled={stock === 0}
      >
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
      <Button
        className="py-3 px-6 rounded-lg shadow-lg"
        onClick={onUpdate}
      >
        Update Product
      </Button>
      <Button
        className="py-3 px-6 rounded-lg shadow-lg"
        onClick={onDelete}
      >
        Delete Product
      </Button>
    </div>
  );
};

export default ActionButtons;