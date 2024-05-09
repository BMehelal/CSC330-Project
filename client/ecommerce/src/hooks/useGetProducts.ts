import axios from "axios";
import { useEffect, useState } from "react"
import { IProduct } from "../models/interfaces";


export const useGetProducts = () => {
    const [products, setProducts] = useState<IProduct[]>([]);


    const fetchProducts = async () => {
        try {
            const fetchedProducts = await axios.get("https://csc-330-server.onrender.com/api/products");
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