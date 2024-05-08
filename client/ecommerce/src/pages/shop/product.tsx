import { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";

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
  const { addToCart, getCartItemCount } = useContext<IShopContext>(ShopContext);
  const cartItemCount: number = getCartItemCount(productId);
  // styling would be turn all of these into cards
  return (
    <>
      {/* <div> */}
      <Card
        sx={{
          width: "100%",
          maxWidth: 400,
          margin: "auto",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          alignItems: "center",
          backgroundColor: "#F0F0F0",
          border: "3px solid #8A8A8A",
          borderRadius: 5,
          boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
          p: 1,
        }}
      >
        <CardHeader
          title={<Typography variant="h4">{productName}</Typography>}
        ></CardHeader>
        <CardMedia component="img" image={productURL} />

        <CardContent
          sx={{
            border: "2px solid #8A8A8A",
            backgroundColor: "#E0E0E0",
            borderRadius: 3,
            p: 2,
            mt: 1,
          }}
        >
          <Typography variant="h6">{description}</Typography>
          <Typography variant="h6">
            <u>Cost:</u> {price} Relm
          </Typography>
          <Typography variant="h6">
            <u>Speciality:</u> {vocation}
          </Typography>
          <Typography variant="h6">
            <u>Seller:</u> {sellerName}
          </Typography>
        </CardContent>

        <CardActions>
          {stockQuanity > 0 ? (
            <Button
              sx={{
                transition: "background-color 0.5s ease", // Specify transition with ease timing function
                "&:hover": {
                  backgroundColor: "#853F85", // Target color on hover
                },
                mt: 1,
              }}
              variant="contained"
              onClick={() => addToCart(productId)}
            >
              Add To Satchel {cartItemCount > 0 && <>({cartItemCount})</>}
            </Button>
          ) : (
            <Typography sx={{ fontWeight: 1000 }} variant="h5">
              SOLD OUT
            </Typography>
          )}
        </CardActions>
      </Card>
    </>
  );
};
