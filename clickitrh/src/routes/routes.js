import React ,{useState,useEffect} from 'react';
import {BrowserRouter as Router, Switch,Route} from 'react-router-dom';
import Axios from "axios";
import "../commons/fontawsomeIcons/AwsomeIcons";
import login from  '../pages/login/containers/login';
import UserContext from '../commons/context/UserContext';

const Routes = () => {
    const [userData, setUserData] = useState({
     token: undefined,
     user:undefined,
    });

    useEffect(() =>{
     const checkLoggeadIn = async () =>{
         let token = localStorage.getItem("auth-token");
         if (token === null){
             localStorage.setItem("auth-token", "");
             token ="";
         }
         const tokenRes = await Axios.post(
         "http://localhost:4000/tokenisvalid",null,
         { headers: {"x-auth-token": token}}
         );
         if(tokenRes.data){
           const userRes = await Axios.get("http://localhost:4000/dashboard",{
              headers:{"x-auth-token":token},
           });
           setUserData({
            token,
            user: userRes.data,
          });
         }
         };
         checkLoggeadIn();
        }, []);
    return(
       <Router>
           <UserContext.Provider value={{userData,setUserData}}>
          <Switch>
              <Route path='/' exact component= {login}/>
          </Switch> 
          </UserContext.Provider>
       </Router>

    ) ;
};

export default Routes;
