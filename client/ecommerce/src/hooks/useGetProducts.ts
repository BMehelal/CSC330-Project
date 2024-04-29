import axios from "axios";
import { useEffect, useState } from "react"


export const useGetProducts = () => {
    const [products, setProducts] = useState([]);


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