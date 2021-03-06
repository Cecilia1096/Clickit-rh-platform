import React from 'react';
import logo from  '../../../assets/images/Brand-02.png'
import Input from '../components/input/Input';
import {withStyles} from '@material-ui/core/styles';
import login from '../containers/login.css';



const styles = {
   logincontainer:{
    marginTop: '6%'
   },
    cardcontainer:{
     backgroundColor: '#f8f9fa',
     display:'flex',
     'flex-direction': 'column',
     minWidth:0,
     backgroundClip: 'border-box',
     border:'1px solid rgba(0,0,0,.125)',
     borderRadius: '.25rem',
     marginTop: '9rem'
   },
     logo:{
     'display': 'flex',
     'justify-content': 'center',
      /*margin: '3% auto',*/
   },
     imglogo:{
      width: '10%',
      position: 'absolute',
      left: '2%',
      top: '3%',
     },
  };

const Login = (props)  => {

    const {classes} = props;
    return(
        <div className={classes.logincontainer}>
          <div >
            <div className={classes.logo}>
             <img className={classes.imglogo}src={logo} alt=""/>
            </div>
            <Input/>
        </div>
        </div>
    )
};

export default withStyles(styles)(Login);




