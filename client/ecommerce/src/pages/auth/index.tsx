import { useState, SyntheticEvent} from 'react';
import axios from 'axios'
import { UserError } from '../../errors';
export const AuthPage = () => {
    return (<>
        <Register />
        <Login/>
    
    </>);
}


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
               await axios.post("http://localhost:8090/api/register", { username, password, gender, characterURL })
                alert("You have successfully registered for an account!")
            } catch (err) { 
                if (err?.response?.data === UserError.USERNAME_ALREADY_EXISTS) {
                    alert("Username already in use.");
                } else {
                    alert("ERROR: Something went wrong");
                }
            }
            
        }
  }
    return (
      <>
        <form onSubmit={handleSubmit}>
          <h2>Register</h2>
          <div>
            <label htmlFor="username">Username:</label>
            <input
              type="text"
              id="username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label htmlFor="password">Password:</label>
            <input
              type="password"
              id="password"
              value={password}
              onChange={(e) => setPassword(e.target.value
              )
              
              }
            />
          </div>
          <div>
            <label htmlFor="gender">Gender:</label>
            <select
              id="gender"
              name="gender"
              value={gender}
              onChange={(e) => setGender(e.target.value)}
                    >
                        <option value = "">Select Gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div>
            <label htmlFor="character">Character:</label>
            <select
              id="character"
              name="character"
              value={characterURL}
              onChange={(e) => setCharacterURL(e.target.value)}
                    >
                        <option value="">Select Character</option>
              {(gender === "female" || gender === "other") && (
                <option value="https://i.ibb.co/kqbj54L/female-warrior.png">
                  Female Warrior
                </option>
                        )}
                        {(gender === "female" || gender === "other") && (
                <option value="https://art.pixilart.com/8e5fd81934755df.png">
                  Female Cleric
                </option>
                        )}
                         {(gender === "female" || gender === "other") && <option value ="https://i.ibb.co/CVBhvkH/female-wizard.png">Female Wizard</option>}
              {(gender === "male" || gender === "other") && (
                <option value="https://i.ibb.co/drWR30G/thief-2.png">
                  Male Thief
                </option>
              )}
              {(gender === "male" || gender === "other") && (
                <option value="https://i.ibb.co/gwRn2ss/warrior.jpg">
                  Male Warrior
                </option>
              )}
                        {(gender === "male" || gender === "other") && <option value="https://i.ibb.co/G59N8Xt/wizard-3.png">Male Wizard</option>}
                       
            </select>
          </div>
          <button type="submit">Register</button>
        </form>
      </>
    );
  };

const Login = () => {

    return (<>
        {/* <div>
            <label htmlFor="username"></label>
            <input type="text" id= "username" />
        </div>
        
        <div>
            <label htmlFor="password"></label><input type="text" id= "password"/>
    </div> */}
    
    </>);
}