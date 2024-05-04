import { useContext } from "react";
import { NavBar } from "../../components/navbar";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";

export const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount } =
    useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div>
        <h1>Your Satchel Assortment</h1>
      </div>
      <div>
        {products.map((product: IProduct) => {
          if (getCartItemCount(product.productId) > 0) {
            return <CartItem product={product} />;
          }
        })}
        {totalAmount > 0 ? (
          <div>
            <p>Subtotal: {totalAmount}</p>
            <button onClick = {()=>navigate("/shop")}>Continue Shopping</button>
            <button>Checkout</button>
          </div>
        ) : (
          <div>
            <h1>Your Satchel is Empty</h1>
          </div>
        )}
      </div>
    </>
  );
};
