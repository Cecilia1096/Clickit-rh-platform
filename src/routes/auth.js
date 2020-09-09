const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs'); // hash users passwords
const jwt = require('jsonwebtoken'); // auth token that signifies user is logged in

const User = require('../models/user');
router.post("/", async (req, res) =>{
    const { email, password} = req.body;
    if(password.length < 10) {
      res.status(500).json({msg: "Password length must greater tan 10 characters."});
      return;
    }
    
    let newUser = new User({
      email,
      password:bcrypt.hashSync(password,10)

    })

    newUser
     .save()
     .then(user =>{
       jwt.sign({
         email: newUser.email
       },'secret', (err, token) =>{
          if(err) throw err;
          res.send({
           token,
           user:{
              email: user.email
           }

          });
       });
     }).catch(err => {
        console.log(err);
        res.status(500).json({msg:`User ${err.keyValue['email']} already exists. Try Loggin In.`});
     });

})

router.post("/login", (req, res) => {
  const { email, password} = req.body;
  User.findOne({email})
    .then(user => {
      if(!user){
        res.status(500).json({msg:"No user with that username:" + email });
      } else if(!bcrypt.compareSync(password, user.password)){
        res.status(500).json({msg:"Invalid Password"});
      }

      jwt.sign({
        email: newUser.email
      },'secret', (err, token) =>{
         if(err) throw err;
         res.send({
          token,
          user:{
             email: user.email
          }

         });
      });
    }).catch(err => {
       console.log(err);
       res.status(500).send(err);

    });
})


module.exports = router;