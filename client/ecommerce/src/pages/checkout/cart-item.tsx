import { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";

interface Props {
  product: IProduct;
}
export const CartItem = (props: Props) => {
  const {
    productURL,
    productName,
    description,
    price,
    vocation,
    sellerName,
    productId,
  } = props.product;
  const {
    addToCart,
    removeFromCart,
    updateCartItemAmount,
    getCartItemCount,
    deleteItem
  } = useContext<IShopContext>(ShopContext);
  const cartItemCount = getCartItemCount(productId);

  return (
    <>
      <div>
        <img src={productURL} />{" "}
        <div>
          <h3>{productName}</h3>
          <p>{description}</p>
          <p>Cost: {price} Relm</p>
          <p>Speciality: {vocation}</p>
          <p>Seller: {sellerName}</p>
          <div>
            <button onClick={() => removeFromCart(productId)}>-</button>
            <input
              type="number"
              value={cartItemCount}
              onChange={(e) =>
                updateCartItemAmount(productId, Number(e.target.value))
              }
            />
            <button onClick={() => addToCart(productId)}>+</button>
            <button onClick={() => deleteItem(productId)}>Delete</button>
          </div>
        </div>
      </div>
    </>
  );
};
