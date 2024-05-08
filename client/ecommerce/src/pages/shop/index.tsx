import { useContext, useEffect, useState } from "react";
import { NavBar } from "../../components/navbar";
import { useGetProducts } from "../../hooks/useGetProducts";
import { Product } from "./product";
import { IShopContext, ShopContext } from "../../context/shop-context";
import {
  Avatar,
  Box,
  Container,
  Fade,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import "./styles.css";
export const ShopPage = () => {
  const { products } = useGetProducts();
  const { characterURL } = useContext<IShopContext>(ShopContext);
  const dialogue: string =
    "Mortimer Mystifire is known throughout the realm for his eccentric personality, mystical merchandise, and penchant for amusing banter with adventurers. He's always ready to spark excitement and curiosity in his customers, making every visit to his shop an unforgettable experience. Embrace the whimsy of Mortimer Mystifire's emporium and embark on your next epic quest with a smile!";
  const [displayedText, setDisplayedText] = useState("");
  const textToDisplay =
    "Ah, greetings, brave adventurer! Welcome to 'Adventurer’s Shop'—where every item tells a tale and every purchase is a step toward glory! Looking to wield the 'Starfall Scepter' and shoot stars like a cosmic wizard? Or perhaps you fancy the 'Dragonflame Burger' for a sizzling break between quests? We've got it all, and more! Just remember, no returns, mind you—once you've unraveled their mysteries, there's no turning back. Consider it a little touch of magic in every purchase! What happens in the dungeon, stays in the dungeon! Now, what'll it be, hero? Let's make this adventure legendary!";

  // useEffect(() => {
  //   const displayText = async () => {
  //     for (let i = 0; i <= textToDisplay.length; i++) {
  //       setDisplayedText(textToDisplay.slice(0, i));
  //       await new Promise((resolve) => setTimeout(resolve, 50)); // Adjust the delay between characters (in milliseconds)
  //     }
  //   };

  //   displayText();
  // }, [textToDisplay]);
  //stlying would be a scroll box
  return (
    <>
      <NavBar />
      <Stack direction="row">
        <Avatar
          sx={{
            height: 210,
            width: 210,
            ml: 3,
            border: "5px solid #7a5b82",
            boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.4)",
          }}
          src={characterURL}
        ></Avatar>
        <Container maxWidth="lg" sx={{ mr: 10 }}>
          <Box
            sx={{
              maxHeight: "625px", // Adjust as needed
              overflowY: "auto", // Enable vertical scrolling when content exceeds maxHeight
              padding: 1,
              border: "3px solid #b494bf",
              borderRadius: "8px",
              boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.4)",
            }}
          >
            <Grid container spacing={2}>
              {/* Loop through products and render each in a grid item */}
              {products.map((product) => (
                <Grid key={product.productId} item xs={12} sm={7} md={4} lg={4}>
                  {/* Adjust xs, sm, md, lg values to control item layout */}
                  <Product product={product} />
                </Grid>
              ))}
            </Grid>
          </Box>
        </Container>
      </Stack>
      <div>
        <Stack direction="row">
          <figure>
            <Avatar
              sx={{
                height: 400,
                width: 300,
                border: "2px solid #7a5b82",
                boxShadow: "0px 2px 5px rgba(0, 0, 0, 0.4)",
              }}
              src="https://i.ibb.co/KXJTCf7/shop-keeper.png"
              alt={dialogue}
            />
            <Typography variant="h6" sx={{ ml: 9 }}>
              {"Mortimer Mystifire"}
            </Typography>
          </figure>

          <Typography
            variant="h6"
            sx={{
              mt: 15,
              mr: 2.3,
              p: 4,
              mb: 15,
              border: "3px solid #b494bf",
              borderRadius: 5,
              boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.3)",
            }}
          >
            Ah, greetings, brave adventurer! Welcome to 'Adventurer’s
            Shop'—where every item tells a tale and every purchase is a step
            toward glory! Looking to wield the 'Starfall Scepter' and shoot
            stars like a cosmic wizard? Or perhaps you fancy the 'Dragonflame
            Burger' for a sizzling break between quests? We've got it all, and
            more! Just remember, no returns, mind you—once you've unraveled
            their mysteries, there's no turning back. Consider it a little touch
            of magic in every purchase! What happens in the dungeon, stays in
            the dungeon! Now, what'll it be, hero? Let's make this adventure
            legendary!
          </Typography>
        </Stack>
      </div>
    </>
  );
};
