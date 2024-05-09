import { createContext, useEffect, useState } from "react";
import { useGetProducts } from "../hooks/useGetProducts";
import { IProduct } from "../models/interfaces";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { ProductError } from "../models/errors";
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
  purchasedItems: IProduct[];
  isLoggedIn: boolean;
  setIsLoggedIn: (loggedIn: boolean) => void;
  characterURL: string;
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
  purchasedItems: [],
  isLoggedIn: false,
  setIsLoggedIn: () => null,
  characterURL: "",
};
export const ShopContext = createContext<IShopContext>(defaultVal);
export const ShopContextProvider = (props) => {
  const initialCartItems = JSON.parse(localStorage.getItem("cartItems")) || {};
  const [cartItems, setCartItems] = useState<{ string: number } | {}>(
    initialCartItems
  );
  const [availableMoney, setAvailableMoney] = useState<number>(0);
  const { products } = useGetProducts();
  const [purchasedItems, setPurchasedItems] = useState<IProduct[]>([]);
  const [isLoggedIn, setIsLoggedIn] = useState<boolean>(false);
  const [characterURL, setCharacterURL] = useState<string>("");
  const navigate = useNavigate();
  const fetchAvailableMoney = async () => {
    try {
      const res = await axios.get(
        `https://csc-330-server.onrender.com/api/available-money/${localStorage.getItem(
          "userID"
        )}`
      );
      setAvailableMoney(res.data);
    } catch (e) {
      alert("ERROR: Something went wrong.");
    }
  };
  const fetchPurchasedItems = async () => {
    try {
      const res = await axios.get(
        `https://csc-330-server.onrender.com/api/purchased-items/${localStorage.getItem(
          "userID"
        )}`
      );
      setPurchasedItems(res.data);
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
        if (itemInfo && itemInfo.price) {
          totalAmount += itemInfo.price * cartItems[item];
        } else {
          console.error(`Product with ID ${item} not found or has no price.`);
        }
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
      await axios.post("https://csc-330-server.onrender.com/api/checkout", body);
      setCartItems({});
      fetchAvailableMoney();
      fetchPurchasedItems();
      navigate("/shop");
    } catch (err) {
      let errorMessage: string = "";
      switch (err.response.data) {
        case ProductError.INSUFFICIENT_FUNDS:
          errorMessage = ProductError.INSUFFICIENT_FUNDS;
          break;
        case ProductError.CANNOT_BUY_YOUR_OWN_PRODUCT:
          errorMessage = ProductError.CANNOT_BUY_YOUR_OWN_PRODUCT;
          break;
        case ProductError.NOT_ENOUGH_STOCK:
          errorMessage = ProductError.NOT_ENOUGH_STOCK;
          break;
        default:
          errorMessage = "Something went wrong.";
          break;
      }
      errorMessage = "ERROR: " + errorMessage;
      alert(errorMessage);
    }
  };

  const fetchCharacterURL = async () => {
    try {
      const res = await axios.get(
        `https://csc-330-server.onrender.com/api/character/${localStorage.getItem("userID")}`
      );
      setCharacterURL(res.data);
    } catch (e) {
      alert("ERROR: Something went wrong.");
    }
  };

  useEffect(() => {
    const check = localStorage.getItem("login");
    if (check === null) {
      return;
    }
    setIsLoggedIn(JSON.parse(check));
    if (isLoggedIn) {
      fetchAvailableMoney();
      fetchPurchasedItems();
      fetchCharacterURL();
    }
  }, [isLoggedIn]);

  useEffect(() => {
    if (isLoggedIn) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
    }
  }, [cartItems]);

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
    purchasedItems,
    isLoggedIn,
    setIsLoggedIn,
    characterURL,
  };

  return (
    <ShopContext.Provider value={contextValue}>
      {props.children}
    </ShopContext.Provider>
  );
};
