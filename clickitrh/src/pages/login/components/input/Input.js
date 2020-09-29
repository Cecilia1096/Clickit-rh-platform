import React, {useState,useContext} from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../../../commons/context/UserContext";
import Axios from "axios";
import TextField from '@material-ui/core/TextField';
import  Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import  './Input.css';
import usePasswordToggle from '../passwordToggle/usePasswordToggle';

const styles = {
  widthnew:{
    width: 300,
    'display':'flex',
    'flex-direction': 'column',
     marginTop: 20,
     margin: 'auto'
  },
  widthbutton:{
    width: 300,
    borderRadius: 20,
    backgroundColor: '#007bff',
    margin: 20,
    boxShadow: '0 0 0 0',
    height: '40px'
  },

};

const Input = (props) => {

    const {classes} = props;
    const [PasswordInputType,ToggleIcon] = usePasswordToggle();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
  

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
      e.preventDefault();
        const loginUser = { email, password };
        const loginRes = await Axios.post(
          "http://localhost:4000/",
          loginUser
        );
        setUserData({
          token: loginRes.data.token,
          user: loginRes.data.user,
        });
        localStorage.setItem("auth-token", loginRes.data.token);
        history.push("/dashboard");
      };
    return(

        <div >
        <form onSubmit={submit}>
        <TextField className={classes.widthnew}
          id ="filled-basic" 
          label="Email" 
          type="email"
          variant="filled"
          onChange={(e) => setEmail(e.target.value)}
         />
        <TextField className={classes.widthnew}
          id="filled-password-input"
          label="Password"
          type={PasswordInputType}
          autoComplete="current-password"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
        />
        <span className="password-toogle-icon">
          {ToggleIcon}</span>

        <Button 
         className={classes.widthbutton}
         type="submit"
         variant="contained" 
         color="primary"
        >Iniciar Sesion</Button>
        </form>
        </div>
        
        
    )

};

export default withStyles(styles)(Input);