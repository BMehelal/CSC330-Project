import { useContext } from "react";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IShopContext, ShopContext } from "../context/shop-context";
import LogoutIcon from "@mui/icons-material/Logout";
import { makeStyles } from "mui-styles-hook";
import {
  AppBar,
  Avatar,
  Button,
  Stack,
  Toolbar,
  Typography,
  colors,
  styled,
  Link,
} from "@mui/material";

const useStyles = makeStyles((theme) => ({
  link: {
    color: "#FAF9F6",
    textDecoration: "none",
    marginRight: 20,
    fontSize: "1.5rem",
    transition: "color 0.4s",
    "&:hover": {
      color: "#b464b1",
    },
  },
}));
export const NavBar = () => {
  // ADD THE LOGOUT LOGIC
  const [_, setCookies] = useCookies(["access_token"]);
  const navigate = useNavigate();
  const { deleteAll, availableMoney, setIsLoggedIn } =
    useContext<IShopContext>(ShopContext);

  const logout = () => {
    try {
      setCookies("access_token", null, { path: "/" });
      localStorage.clear();
      deleteAll();
      setIsLoggedIn(false);
      navigate("/");
    } catch (e) {
      alert("Unable to logout!");
    }
  };
  // const classes = useStyles();
  const StyledAppBar = styled(AppBar)({
    marginBottom: "20px", // Add margin bottom to create space below the AppBar
  });
  return (
    <>
      <StyledAppBar position="static" sx={{ backgroundColor: "#1A1A1A", p: 2 }}>
        <Toolbar>
          <Avatar
            sx={{weight: 60, height: 50, m: 1 }}
            src="https://i.ibb.co/mCJMXmg/Relm-removebg-preview.png"
          ></Avatar>
          <Typography
            variant="h2"
            component="div"
            sx={{ flexGrow: 1, color: "#FAF9F6" }}
          >
            Adventurer's Store
          </Typography>
          <div style={{ display: "flex", alignItems: "center" }}>
            <Typography variant="h4" sx={{ color: "#FAF9F6", mr: 1 }}>
              {availableMoney}
            </Typography>
            <Avatar
              sx={{ mr: 2 }}
              src="https://cdn.discordapp.com/attachments/1227266468513710201/1235336515618344990/CBB8B9E4-8E6A-426D-BF99-0A2C313FC77C.png?ex=6639ef08&is=66389d88&hm=040be63353cc6d552945da1cde9595506917663b770829f2cd323e53dc0626cd&"
            ></Avatar>
            <Link
              href="/shop"
              sx={{
                color: "#FAF9F6",
                textDecoration: "none",
                marginRight: 2,
                fontSize: "1.5rem",
                transition: "color 0.4s",
                "&:hover": {
                  color: "#b464b1",
                },
              }}
            >
              Store
            </Link>
            <Link
              href="/purchased-items"
              sx={{
                color: "#FAF9F6",
                textDecoration: "none",
                marginRight: 2,
                fontSize: "1.5rem",
                transition: "color 0.4s",
                "&:hover": {
                  color: "#b464b1",
                },
              }}
            >
              Purchases
            </Link>
            <Link
              href="/checkout"
              sx={{
                color: "#FAF9F6",
                textDecoration: "none",
                marginRight: 5,
                fontSize: "1.5rem",
                transition: "color 0.4s",
                "&:hover": {
                  color: "#b464b1",
                },
              }}
            >
              Checkout
            </Link>
            <Button
              sx={{
                m: -3,

                backgroundColor: "#FF0000 ",
                color: "#FAF9F6",
                "&:hover": {
                  backgroundColor: "#b464b1",
                  color: "#FAF9F6",
                },
              }}
              variant="contained"
              onClick={logout}
            >
              <LogoutIcon></LogoutIcon>
            </Button>
          </div>
        </Toolbar>
      </StyledAppBar>
    </>
  );
};
