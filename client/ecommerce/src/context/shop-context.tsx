import { createContext, useEffect, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { IProduct } from "../models/interfaces";
import axios from "axios";
import { useNavigate } from "react-router-dom";
export interface IShopContext {
  addToCart: (itemId: string) => void;
  removeFromCart: (itemId: string) => void;
  updateCartItemAmount: (itemId: string, newAmount: number) => void;
  getCartItemCount: (itemId: string) => number;
  deleteItem: (itemId: string) => void;
  getTotalCartAmount: () => number;
  deleteAll: () => void;
  checkout: () => void;
  availableMoney: number;
}
const defaultVal: IShopContext = {
  addToCart: () => null,
  removeFromCart: () => null,
  updateCartItemAmount: () => null,
  getCartItemCount: () => 0,
  deleteItem: () => null,
  getTotalCartAmount: () => 0,
  deleteAll: () => null,
  checkout: () => null,
  availableMoney: 0,
};
export const ShopContext = createContext<IShopContext>(defaultVal);
export const ShopContextProvider = (props) => {
  const [cartItems, setCartItems] = useState<{ string: number } | {}>({});
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const { products } = useGetProducts();
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const navigate = useNavigate();
  const fetchAvailableMoney = async () => {
    try {
      const res = await axios.get(
        `http://localhost:8090/api/available-money/${localStorage.getItem(
          "userID"
        )}`
      );
      setAvailableMoney(res.data);
    } catch (e) {
      alert("ERROR: Something went wrong.");
    }
  };
  
  const getCartItemCount = (itemId: string): number => {
    if (itemId in cartItems) {
      return cartItems[itemId];
    } else {
      return 0;
    }
  };
  const addToCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      setCartItems((prev) => ({ ...prev, [itemId]: 1 }));
    } else {
      setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] + 1 }));
    }
  };
  const removeFromCart = (itemId: string) => {
    if (!cartItems[itemId]) {
      return;
    }
    if (cartItems[itemId] <= 0) {
      return;
    }
    setCartItems((prev) => ({ ...prev, [itemId]: prev[itemId] - 1 }));
  };
  const updateCartItemAmount = (itemId: string, newAmount: number) => {
    if (newAmount <= 0) {
      return 0;
    }
    setCartItems((prev) => ({ ...prev, [itemId]: newAmount }));
  };
  const deleteItem = (itemId: string) => {
    if (!cartItems[itemId]) {
      return;
    }
    setCartItems((prev) => ({ ...prev, [itemId]: 0 }));
  };
  const getTotalCartAmount = (): number => {
    let totalAmount = 0;
    for (const item in cartItems) {
      if (cartItems[item] > 0) {
        let itemInfo: IProduct = products.find(
          (product) => product.productId === item
        );
        totalAmount += itemInfo.price * cartItems[item];
      }
    }
    return totalAmount;
  };
  const deleteAll = () => {
    setCartItems({});
  };
  const checkout = async () => {
    const body = {
      customerId: localStorage.getItem("userID"),
      cartItem: cartItems,
    };
    try {
      await axios.post("http://localhost:8090/api/checkout", body);
      setCartItems({});
      fetchAvailableMoney();
      navigate("/shop");
    } catch (err) {
      alert("ERROR: Something went wrong.");
    }
  };
  useEffect(() => {
    fetchAvailableMoney();
  }, []);
  const contextValue: IShopContext = {
    addToCart,
    removeFromCart,
    updateCartItemAmount,
    getCartItemCount,
    deleteItem,
    getTotalCartAmount,
    deleteAll,
    checkout,
    availableMoney,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
