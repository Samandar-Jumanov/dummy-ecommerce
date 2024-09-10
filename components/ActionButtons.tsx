import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { ShoppingCart, AlertTriangle } from "lucide-react";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";
import { useRouter } from "next/navigation";

interface ActionButtonsProps {
  stock: number;
  id : string 
}

const ActionButtons: React.FC<ActionButtonsProps> = ({ stock , id  }) => {
  const [isDeleting, setIsDeleting] = useState(false);
  const router = useRouter();
  const [showModal , setShowModal] = useState(false);

  const handleDelete = async () => {
    setIsDeleting(true);
    try {
        const response = await fetch(`https://dummyjson.com/products/${id}`, {
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
      } finally {
       setIsDeleting(false);
       setShowModal(false)
    }
  };

  const openModal = ( ) => {
     setShowModal(true);
  }

  return (
    <div className="mt-8 flex space-x-4">
      <Button
        className="py-3 px-6 rounded-lg shadow-lg transform transition-all hover:scale-105 disabled:cursor-not-allowed"
        disabled={stock === 0 || isDeleting}

      >
        <ShoppingCart className="mr-2 h-4 w-4" /> Add to Cart
      </Button>
      <Button
        className="py-3 px-6 rounded-lg shadow-lg"
        disabled={isDeleting}
        onClick={( ) => router.push(`/products/${id}/edit`)}
      >
        Update Product
      </Button>

      <AlertDialog  open={showModal}>
        <AlertDialogTrigger asChild>
          <Button
            variant="destructive"
            className="py-3 px-6 rounded-lg shadow-lg bg-red-600 hover:bg-red-700"
            disabled={isDeleting}
            onClick={openModal}
          >
            Delete Product
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent className="bg-white" >
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure you want to delete this product?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the product from the database.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>

            <AlertDialogCancel onClick={( )  => setShowModal(false)}>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDelete} disabled={isDeleting}>
              {isDeleting ? (
                <>
                  <AlertTriangle className="mr-2 h-4 w-4 animate-pulse" />
                  Deleting...
                </>
              ) : (
                'Delete'
              )}
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
};

export default ActionButtons;