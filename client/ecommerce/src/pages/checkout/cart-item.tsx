import { useContext } from "react";
import { IProduct } from "../../models/interfaces";
import { IShopContext, ShopContext } from "../../context/shop-context";
import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  TextField,
  Typography,
} from "@mui/material";

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
    deleteItem,
  } = useContext<IShopContext>(ShopContext);
  const cartItemCount = getCartItemCount(productId);

  return (
    <>
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
          mb: 3,
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
          <Button
            sx={{
              transition: "background-color 0.5s ease", // Specify transition with ease timing function
              "&:hover": {
                backgroundColor: "#853F85", // Target color on hover
              },
            }}
            variant="contained"
            onClick={() => removeFromCart(productId)}
          >
            -
          </Button>
          <TextField
            type="number"
            value={cartItemCount}
            onChange={(e) =>
              updateCartItemAmount(productId, Number(e.target.value))
            }
          ></TextField>
          <Button
            sx={{
              transition: "background-color 0.5s ease", // Specify transition with ease timing function
              "&:hover": {
                backgroundColor: "#853F85", // Target color on hover
              },
            }}
            variant="contained"
            onClick={() => addToCart(productId)}
          >
            +
          </Button>
        </CardActions>
        <CardActions>
          <Button
            sx={{
              transition: "background-color 0.5s ease", // Specify transition with ease timing function
              "&:hover": {
                backgroundColor: "#853F85", // Target color on hover
              },
            }}
            variant="contained"
            onClick={() => deleteItem(productId)}
          >
            Delete
          </Button>
        </CardActions>
      </Card>
    </>
  );
};
