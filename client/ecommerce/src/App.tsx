import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthPage } from "./pages/auth";
import { CheckoutPage } from "./pages/checkout";
import { PurchasedItemsPage } from "./pages/purchased-items";
import { ShopPage } from "./pages/shop";
import { ShopContextProvider } from "./context/shop-context";
import { CssBaseline, ThemeProvider, createTheme } from "@mui/material";
import "@fontsource/im-fell-dw-pica";

function App() {
  const theme = createTheme({
    palette: {
      primary: {
        main: "#404040",
        light: "#e79edb"
      },
      secondary: {
        main: "#FAF9F6",
      },
      background: {
        default: "#FAF9F6",
      },
    },
    typography: {
      fontFamily: "IM Fell DW Pica, serif",
      fontWeightRegular: 500,
    },
  });
  return (
    <ThemeProvider theme={theme}>
      <Router>
        <ShopContextProvider>
          <CssBaseline />
          <Routes>
            <Route path="/" element={<AuthPage />} />
            <Route path="/shop" element={<ShopPage />} />
            <Route path="/checkout" element={<CheckoutPage />} />
            <Route path="/purchased-items" element={<PurchasedItemsPage />} />
          </Routes>
        </ShopContextProvider>
      </Router>
    </ThemeProvider>
  );
}

export default App;
