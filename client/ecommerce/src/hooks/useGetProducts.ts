import axios from "axios";
import { useEffect, useState } from "react"
import { IProduct } from "../models/interfaces";


export const useGetProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);


    const fetchProducts = async () => {
        try {
            const fetchedProducts = await axios.get("http://localhost:8090/api/products");
            setProducts(fetchedProducts.data); 
        } catch (err) {
            alert("ERROR: Something went wrong");
        }

        
    
    }
    useEffect(() => {
        fetchProducts();
    }, []);

    return { products };
}