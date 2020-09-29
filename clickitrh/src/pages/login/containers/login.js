import React from 'react';
import logo from  '../../../assets/images/logo.png'
import Input from '../components/input/Input';
import {withStyles} from '@material-ui/core/styles';


const styles = {
   logincontainer:{
     
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
     imglogo:{
     margin: '15px auto',
     width: '30%'
   }

  };

const Login = (props)  => {

    const {classes} = props;
    return(
        <div className={classes.logincontainer}>
            <div className={classes.cardcontainer}>
            <img className={classes.imglogo} src={logo} alt=""/>
            <Input/>
        </div>
        </div>
    )
};

export default withStyles(styles)(Login);




