import { IProduct } from "../../models/interfaces";

interface Props {
  product: IProduct;
}
export const Product = (props: Props) => {
  const {
    productId,
    productName,
    description,
    price,
    productURL,
    sellerName,
    vocation,
    stockQuanity,
  } = props.product;
// styling would be turn all of these into cards
  return (
    <>
      <img src={productURL} />{" "}
      <div>
        <h3>{productName}</h3>
        <p>{description}</p>
        <p>Cost: {price} Relm</p>
        <p>Speciality: {vocation}</p>
        <p>Seller: {sellerName}</p>
      </div>
      <div>{stockQuanity > 0 && <button>Add To Cart</button>}</div>
    </>
  );
};
