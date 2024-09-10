import { IProduct } from "@/types/product";

export const  fetchProduct = async ( id : string , setProduct : ( data : IProduct )=> void , setError : ( value : string ) => void , setLoading:( data : boolean ) => void ) =>  {
    try {
      const response = await fetch(`https://dummyjson.com/products/${id}`);
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
