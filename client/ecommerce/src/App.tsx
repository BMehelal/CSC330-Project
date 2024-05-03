import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import { AuthPage } from "./pages/auth";
import { CheckoutPage } from "./pages/checkout";
import { PurchasedItemsPage } from "./pages/purchased-items";
import { ShopPage } from "./pages/shop";

function App() {

  return (
   <Router>
    
     
      <Routes>
        <Route path="/" element={<AuthPage />} />
        <Route path="/shop" element={<ShopPage />} />
        <Route path="/checkout" element={<CheckoutPage />} />
        <Route path="/purchased-items" element={<PurchasedItemsPage />} />
      </Routes>
    </Router>
  );
}

export default App;
