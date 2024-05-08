import { useContext } from "react";
import { NavBar } from "../../components/navbar";
import { useGetProducts } from "../../hooks/useGetProducts";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";
import { CartItem } from "./cart-item";
import { useNavigate } from "react-router-dom";
import { Box, Button, Grid, Typography } from "@mui/material";

export const CheckoutPage = () => {
  const { getCartItemCount, getTotalCartAmount, checkout } =
    useContext<IShopContext>(ShopContext);
  const { products } = useGetProducts();
  const totalAmount = getTotalCartAmount();
  const navigate = useNavigate();
  return (
    <>
      <NavBar />
      <div>
        <Typography sx={{ ml: 3, mb: 3 }} variant="h2">
          <u>Your Satchel Assortment</u>
        </Typography>
      </div>
      <div>
        <Grid container>
          {products.map((product: IProduct) => {
            if (getCartItemCount(product.productId) > 0) {
              return (
                <>
                  <Grid key={product.productId} xs={12} sm={7} md={4} lg={4}>
                    <CartItem product={product} />
                  </Grid>
                </>
              );
            }
          })}
        </Grid>
        {totalAmount > 0 ? (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              marginTop: "20px", // Adjust as needed for spacing
            }}
          >
            <Typography
              sx={{
                backgroundColor: "#F0F0F0",
                border: "3px solid #7a5b82",
                borderRadius: 5,
                boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
                p: 2,
              }}
              variant="h3"
            >
              Subtotal: {totalAmount}
            </Typography>
            <Box
              sx={{
                display: "flex",
                justifyContent: "center",
                gap: "10px", // Adjust the gap between buttons
                marginTop: "10px", // Adjust spacing between subtotal and buttons
              }}
            >
              <Button
                sx={{
                  transition: "background-color 0.5s ease",
                  "&:hover": {
                    backgroundColor: "#853F85",
                  },
                }}
                variant="contained"
                onClick={() => navigate("/shop")}
              >
                Continue Shopping
              </Button>
              <Button
                sx={{
                  transition: "background-color 0.5s ease",
                  "&:hover": {
                    backgroundColor: "#853F85",
                  },
                }}
                variant="contained"
                onClick={checkout}
              >
                Checkout
              </Button>
            </Box>
          </Box>
        ) : (
          <div>
            <Typography sx={{ ml: 1, p: 2 }} variant="h3">
              Your Satchel is Empty
            </Typography>
          </div>
        )}
      </div>
    </>
  );
};
