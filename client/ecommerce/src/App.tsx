import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/auth";
import { CheckoutPage } from "./pages/checkout";
import { PurchasedItemsPage } from "./pages/purchased-items";
import { ShopPage } from "./pages/shop";
import { ShopContextProvider } from "./context/shop-context";

function App() {
  return (
    <Router>
      <ShopContextProvider>
        <Routes>
          <Route path="/" element={<AuthPage />} />
          <Route path="/shop" element={<ShopPage />} />
          <Route path="/checkout" element={<CheckoutPage />} />
          <Route path="/purchased-items" element={<PurchasedItemsPage />} />
        </Routes>
      </ShopContextProvider>
    </Router>
  );
}

export default App;
