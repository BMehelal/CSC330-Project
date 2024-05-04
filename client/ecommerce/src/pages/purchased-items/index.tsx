import { useContext, useState, useEffect } from "react";
import { NavBar } from "../../components/navbar";
import { IShopContext, ShopContext } from "../../context/shop-context";

export const PurchasedItemsPage = () => {
  const { purchasedItems, addToCart, getCartItemCount } =
    useContext<IShopContext>(ShopContext);
  const [itemsList, setItemsList] = useState<{ [productId: string]: number }>(
    {}
  );

  useEffect(() => {
    const updatedItemsList: { [productId: string]: number } = {};
    purchasedItems.forEach((item) => {
      const productId = item.productId;
      if (!updatedItemsList[productId]) {
        updatedItemsList[productId] = 1;
      } else {
        updatedItemsList[productId]++;
      }
    });
    setItemsList(updatedItemsList);
  }, [purchasedItems]);

  const uniquePurchasedItems = purchasedItems.filter(
    (item, index, self) =>
      self.findIndex((t) => t.productId === item.productId) === index
  );

  return (
    <>
      <NavBar />
      <div>
        <h1>Adventurer's Archive</h1>
      </div>
      <div>
        {uniquePurchasedItems.length > 0 ? (
          uniquePurchasedItems.map((item) => {
            const count = getCartItemCount(item.productId);
            return (
              <div key={item.productId}>
                <span>{itemsList[item.productId]}</span>
                <h3>{item.productName}</h3>
                <img src={item.productURL} alt={item.productName} />
                <p>Cost: {item.price} Relm</p>
                <button onClick={() => addToCart(item.productId)}>
                  Purchase Again {count > 0 && `(${count})`}
                </button>
              </div>
            );
          })
        ) : (
          <h1>Your Satchel is Empty</h1>
        )}
      </div>
    </>
  );
};
