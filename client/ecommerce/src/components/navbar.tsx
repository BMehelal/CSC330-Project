import { useContext } from "react";
import { useCookies } from "react-cookie";
import { Link, useNavigate } from "react-router-dom";
import { IShopContext, ShopContext } from "../context/shop-context";
export const NavBar = () => {
  // ADD THE LOGOUT LOGIC
  const [_, setCookies] = useCookies(["access_token"]);
    const navigate = useNavigate(); 
    const {deleteAll, availableMoney} = useContext<IShopContext>(ShopContext);

  const logout = () => {
    try {
        setCookies("access_token", null, { path: '/' });
        localStorage.removeItem("userID");
        deleteAll();
        navigate("/");
        
    } catch (e) {
      alert("Unable to logout!");
    }
  };
  return (
    <>
      <div>
        <h1> Adventurer's Store</h1>
      </div>
          <div>
              <span>{availableMoney}</span>
        <Link to="/shop">Store</Link>
        <Link to="/purchased-items">Purchases</Link>
        <Link to="/checkout">Checkout</Link>
        <button onClick={logout}>Logout</button>
      </div>
    </>
  );
};
