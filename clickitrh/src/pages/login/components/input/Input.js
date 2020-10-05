import React, {useState,useContext} from 'react';
import { useHistory } from "react-router-dom";
import UserContext from "../../../../commons/context/UserContext";
import Axios from "axios";
import TextField from '@material-ui/core/TextField';
import  Button from '@material-ui/core/Button';
import {withStyles} from '@material-ui/core/styles';
import  './Input.css';
import usePasswordToggle from '../passwordToggle/usePasswordToggle';
import ErrorNotice from '../input/ErrorNotice';
import logo from '../../containers/login.css';

const styles = {
  widthnew:{
    width: 300,
    'display':'flex',
    'flex-direction': 'column',
     marginTop: 20,
     margin: 'auto'
  },
  widthbutton:{
    width: '300px',
    borderRadius: 20,
    backgroundColor: '#0088fb',
    margin: '-3px 0px 0px',
    height: '40px'
  },
};


const Input = (props) => {
   
    const {classes} = props;
    const [PasswordInputType,ToggleIcon] = usePasswordToggle();

    const [email, setEmail] = useState();
    const [password, setPassword] = useState();
    const [error,setError] = useState();
;  

    const { setUserData } = useContext(UserContext);
    const history = useHistory();

    const submit = async (e) => {
      e.preventDefault();
      try{
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
      } catch (err){
         err.response.data.msg && setError(err.response.data.msg);
      }
    };
    return(

      <div >
      {error &&(
        <ErrorNotice message={error} clearError={() => setError(undefined)}/>
      )}
      <div className="bienvenido-content"><h1>¡Bienvenido!</h1></div>
      <form className="content-form" onSubmit={submit}>
        <TextField className={classes.widthnew}
          id ="filled-basic" 
          label="Correo" 
          type="email"
          variant="filled"
          onChange={(e) => setEmail(e.target.value)}
         />
        <TextField className={classes.widthnew}
          id="filled-password-input"
          label="Contraseña"
          type={PasswordInputType}
          autoComplete="current-password"
          variant="filled"
          onChange={(e) => setPassword(e.target.value)}
        />
         <div className="password-toogle-content">
          <span className="password-toogle-icon">
          {ToggleIcon}</span>
          </div>
         <div className="forgot-password">
           <a href="...">¿Olvidaste tu contraseña?</a>
         </div>
         <div className="button-login">
         <Button 
          className={classes.widthbutton}
          type="submit"
          variant="contained" 
          >Iniciar Sesión</Button>
         </div>
        </form>
        </div>
        
        
    )

};

export default withStyles(styles)(Input);