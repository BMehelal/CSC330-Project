import { useState, SyntheticEvent, useContext } from "react";
import axios from "axios";
import { UserError } from "../../models/errors";
import { useCookies } from "react-cookie";
import { useNavigate } from "react-router-dom";
import { IShopContext, ShopContext } from "../../context/shop-context";
import {
  AppBar,
  Avatar,
  Button,
  Card,
  CardContent,
  Grid,
  MenuItem,
  TextField,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
export const AuthPage = () => {
  const StyledAppBar = styled(AppBar)({
    marginBottom: "20px", // Add margin bottom to create space below the AppBar
  });
  return (
    <>
      <StyledAppBar position="static" sx={{ backgroundColor: "#1A1A1A", p: 2 }}>
        <Toolbar>
          <Avatar
            sx={{ weight: 60, height: 50, m: 1 }}
            src="https://i.ibb.co/mCJMXmg/Relm-removebg-preview.png"
          ></Avatar>
          <Typography
            variant="h2"
            component="div"
            sx={{ flexGrow: 1, color: "#FAF9F6" }}
          >
            Adventurer's Store
          </Typography>
        </Toolbar>
      </StyledAppBar>
      <Grid container justifyContent="center" spacing={15}>
        <Grid item>
          <Card elevation={10}>
            <CardContent sx={{ p: 5, m: 2 }}>
              <Register />
            </CardContent>
          </Card>
        </Grid>
        <Grid item>
          <Card elevation={10}>
            <CardContent sx={{ p: 4, m: 2, height: "490px" }}>
              <Login />
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </>
  );
};

const Register = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [gender, setGender] = useState<string>("");
  const [characterURL, setCharacterURL] = useState<string>("");
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [genderError, setGenderError] = useState<boolean>(false);
  const [characterError, setCharacterError] = useState<boolean>(false);
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    setUsernameError(false);
    setPasswordError(false);
    setGenderError(false);
    setCharacterError(false);
    if (username === "") {
      setUsernameError(true);
    } else if (password === "") {
      setPasswordError(true);
    } else if (gender === "") {
      setGenderError(true);
    } else if (characterURL === "") {
      setCharacterError(true);
    } else {
      try {
        await axios.post("https://csc-330-server.onrender.com/api/register", {
          username,
          password,
          gender,
          characterURL,
        });
        setUsername("");
        setPassword("");
        setGender("");
        setCharacterURL("");
        alert(
          "You have successfully registered for an account! Now please login."
        );
      } catch (err) {
        if (String(err?.response?.data) === UserError.USERNAME_ALREADY_EXISTS) {
          alert(
            "ERROR: Usernameis already in use, please use a different one."
          );
        } else {
          alert("ERROR: Something went wrong");
        }
      }
    }
  };
  return (
    <>
      <Typography sx={{ p: 1 }} variant="h2">
        Register
      </Typography>
      <form autoComplete="off" onSubmit={handleSubmit}>
        <div>
          <TextField
            sx={{ m: 1 }}
            onChange={(e) => setUsername(e.target.value)}
            label="username"
            value={username}
            variant="outlined"
            required
            error={usernameError}
          ></TextField>
        </div>
        <div>
          <TextField
            sx={{ m: 1 }}
            onChange={(e) => setPassword(e.target.value)}
            label="password"
            type="password"
            value={password}
            variant="outlined"
            required
            error={passwordError}
          ></TextField>
        </div>
        <div>
          <TextField
            sx={{ m: 1 }}
            select
            label="Select your gender"
            value={gender}
            required
            fullWidth
            error={genderError}
            onChange={(e) => setGender(e.target.value)}
          >
            <MenuItem value="male">Male</MenuItem>
            <MenuItem value="female">Female</MenuItem>
            <MenuItem value="other">Other</MenuItem>
          </TextField>
        </div>
        <div>
          <TextField
            sx={{ m: 1 }}
            select
            label="Select your character"
            value={characterURL}
            required
            fullWidth
            error={characterError}
            onChange={(e) => setCharacterURL(e.target.value)}
          >
            <MenuItem value="">Select Character</MenuItem>
            {(gender === "female" || gender === "other") && (
              <MenuItem value="https://i.ibb.co/kqbj54L/female-warrior.png">
                Female Warrior
              </MenuItem>
            )}
            {(gender === "female" || gender === "other") && (
              <MenuItem value="https://art.pixilart.com/8e5fd81934755df.png">
                Female Cleric
              </MenuItem>
            )}
            {(gender === "female" || gender === "other") && (
              <MenuItem value="https://i.ibb.co/CVBhvkH/female-wizard.png">
                Female Wizard
              </MenuItem>
            )}
            {(gender === "male" || gender === "other") && (
              <MenuItem value="https://i.ibb.co/drWR30G/thief-2.png">
                Male Thief
              </MenuItem>
            )}
            {(gender === "male" || gender === "other") && (
              <MenuItem value="https://i.ibb.co/gwRn2ss/warrior.jpg">
                Male Warrior
              </MenuItem>
            )}
            {(gender === "male" || gender === "other") && (
              <MenuItem value="https://i.ibb.co/G59N8Xt/wizard-3.png">
                Male Wizard
              </MenuItem>
            )}
          </TextField>
        </div>
        <Button
          sx={{
            m: 1,
          }}
          variant="contained"
          type="submit"
        >
          Register
        </Button>
      </form>
    </>
  );
};

const Login = () => {
  const [username, setUsername] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [usernameError, setUsernameError] = useState<boolean>(false);
  const [passwordError, setPasswordError] = useState<boolean>(false);
  const [_, setCookies] = useCookies(["access_token"]);
  const { setIsLoggedIn } = useContext<IShopContext>(ShopContext);
  const navigate = useNavigate();
  const handleSubmit = async (event: SyntheticEvent) => {
    event.preventDefault();
    try {
      setUsernameError(false);
      setPasswordError(false);
      if (username === "") {
        setUsernameError(true);
      } else if (password === "") {
        setPasswordError(true);
      } else {
        const result = await axios.post("https://csc-330-server.onrender.com/api/login", {
          username,
          password,
        });
        setCookies("access_token", result.data);
        localStorage.setItem("userID", result.data);
        setIsLoggedIn(true);
        localStorage.setItem("login", JSON.stringify(true));
        setUsername("");
        setPassword("");
        navigate("/shop");
      }
    } catch (e) {
      let errorMessage: string = "";
      switch (e?.response?.data) {
        case UserError.NO_USER_FOUND:
          errorMessage = "User doesn't exist.";
          break;
        case UserError.WRONG_CREDENTIALS:
          errorMessage = "Wrong username/password combination";
          break;
        default:
          errorMessage = "Failed to login.";
          break;
      }
      alert("ERROR: " + errorMessage);
    }
  };
  return (
    <>
      <div>
        <form onSubmit={handleSubmit}>
          <Typography sx={{ p: 2 }} variant="h2">
            Login
          </Typography>
          <div>
            <TextField
              sx={{ m: 2 }}
              onChange={(e) => setUsername(e.target.value)}
              label="username"
              value={username}
              variant="outlined"
              required
              error={usernameError}
            ></TextField>
          </div>

          <div>
            <TextField
              sx={{ m: 2 }}
              onChange={(e) => setPassword(e.target.value)}
              label="password"
              type="password"
              value={password}
              variant="outlined"
              required
              error={passwordError}
            ></TextField>
          </div>
          <Button sx={{ p: 1, m: 2 }} variant="contained" type="submit">
            Login
          </Button>
        </form>
      </div>
    </>
  );
};
