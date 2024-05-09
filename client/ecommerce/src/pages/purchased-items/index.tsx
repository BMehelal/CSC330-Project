import { useContext, useState, useEffect } from "react";
import { NavBar } from "../../components/navbar";
import { IShopContext, ShopContext } from "../../context/shop-context";
import {
  Button,
  Card,
  CardActions,
  CardContent,
  CardHeader,
  CardMedia,
  Grid,
  Typography,
} from "@mui/material";

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
        <Typography sx={{ ml: 3, mb: 3 }} variant="h2">
          <u>Adventurer's Archive</u>
        </Typography>
      </div>
      <Grid container>
        {uniquePurchasedItems.length > 0 ? (
          uniquePurchasedItems.map((item) => {
            const count = getCartItemCount(item.productId);
            return (
              <Grid item key={item.productId} xs={12} sm={7} md={4} lg={4}>
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
                    p: 2,
                  }}
                >
                  <CardHeader
                    title={
                      <Typography variant="h4">
                        {item.productName} ({itemsList[item.productId]})
                      </Typography>
                    }
                  ></CardHeader>

                  <CardMedia component="img" image={item.productURL} />

                  <CardContent
                    sx={{
                      border: "2px solid #8A8A8A",
                      backgroundColor: "#E0E0E0",
                      borderRadius: 3,
                      p: 2,
                      mt: 1,
                    }}
                  >
                    <Typography variant="h6">{item.description}</Typography>
                    <Typography variant="h6">
                      <u>Cost:</u> {item.price} Relm
                    </Typography>
                    <Typography variant="h6">
                      <u>Speciality:</u> {item.vocation}
                    </Typography>
                    <Typography variant="h6">
                      <u>Seller:</u> {item.sellerName}
                    </Typography>
                  </CardContent>
                  <CardActions>
                    {item.stockQuanity > 0 && (
                      <Button
                        sx={{
                          transition: "background-color 0.5s ease", // Specify transition with ease timing function
                          "&:hover": {
                            backgroundColor: "#853F85", // Target color on hover
                          },
                          mt: 1,
                        }}
                        variant="contained"
                        onClick={() => addToCart(item.productId)}
                      >
                        Purchase Again {count > 0 && `(${count})`}
                      </Button>
                    )}
                  </CardActions>
                </Card>
              </Grid>
            );
          })
        ) : (
          <Typography sx={{ ml: 1, p: 2 }} variant="h3">
            Your Satchel is Empty
          </Typography>
        )}
      </Grid>
    </>
  );
};
