import { useContext } from "react";
import { NavBar } from "../../components/navbar";
import { useGetProducts } from "../../hooks/useGetProducts";
import { Product } from "./product";
import { IShopContext, ShopContext } from "../../context/shop-context";
export const ShopPage = () => {
  const { products } = useGetProducts();
  const { characterURL } = useContext<IShopContext>(ShopContext);
  const dialogue: string =
    "Mortimer Mystifire is known throughout the realm for his eccentric personality, mystical merchandise, and penchant for amusing banter with adventurers. He's always ready to spark excitement and curiosity in his customers, making every visit to his shop an unforgettable experience. Embrace the whimsy of Mortimer Mystifire's emporium and embark on your next epic quest with a smile!";
  //stlying would be a scroll box
  return (
    <>
      <NavBar />
      <div>
        {products.map((product) => (
          <Product key={product.productId} product={product} />
        ))}
      </div>
      <div>
        <figure>
          <img
            src="https://cdn.discordapp.com/attachments/1227266468513710201/1236005491365122058/d7f6066469e75c76dcdb04c87968e67c.png?ex=66366f51&is=66351dd1&hm=dc0c921cdd6fb1baee18f61a96150469b0432a0b2fd51b8e0d16b58fde5d7363&"
            alt={dialogue}
          />
          <figcaption>{"Mortimer Mystifire"}</figcaption>
        </figure>
        <p>
          Ah, greetings, brave adventurer! Welcome to 'Adventurer’s Shop'—where
          every item tells a tale and every purchase is a step toward glory!
          Looking to wield the 'Starfall Scepter' and shoot stars like a cosmic
          wizard? Or perhaps you fancy the 'Dragonflame Burger' for a sizzling
          break between quests? We've got it all, and more! Just remember, no
          returns, mind you—once you've unraveled their mysteries, there's no
          turning back. Consider it a little touch of magic in every purchase!
          What happens in the dungeon, stays in the dungeon! Now, what'll it be,
          hero? Let's make this adventure legendary!"
        </p>
      </div>
    </>
  );
};
