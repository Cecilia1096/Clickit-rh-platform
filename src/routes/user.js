const express = require("express");
const router = express.Router();
const bcrypt = require('bcryptjs'); // hash users passwords
const jwt = require('jsonwebtoken'); // auth token that signifies user is logged in
const auth = require('../middlewares/auth');
const user = require("../models/user");


router.post("/register", async (req,res)=> {
try{
let {email, password, passwordCheck, displayName} = req.body;

//validation

if(!email || !password || !passwordCheck)
  return res
   .status(400)
     .json({msg:"No all fields have been entered."});
if(password.length < 10)
  return res
   .status(400)
     .json({msg:"The password needs to be at least 10 charactres long."});
if(password !== passwordCheck)
  return res
    .status(400)
     .json({ msg:"Enter the same password twice for verification."});

  const existingUser = await user.findOne({email:email})
  if(existingUser)
    return res
     .status(400)
      .json({msg:"An account with email already exists."});

if(!displayName) displayName = email;

const salt = await bcrypt.genSalt();
const passwordHash = await bcrypt.hash(password,salt);

const newUser = new user({
    email,
    password:passwordHash,
    displayName
});
const savedUser = await newUser.save();
res.json(savedUser);
}catch(error){
        res.status(500).json({error:err.message});
}
});


router.post("/", async (req, res) => {
  try {
    const { email, password } = req.body;

    // validate
    if (!email || !password)
      return res
      .status(400)
       .json({ msg: "No se han introducido todos los campos." });

    const User = await user.findOne({ email: email });
    if (!User)
      return res
        .status(400)
        .json({ msg: "No se ha registrado ninguna cuenta con este correo electrónico." });

    const isMatch = await bcrypt.compare(password, User.password);
    if (!isMatch)
       return res
       .status(400)
        .json({ msg: "Credenciales no válidas." });

    const token = jwt.sign({ id: User._id }, process.env.JWT_SECRET);
    res.json({
      token,
      user: {
        id: User._id,
        displayName: User.displayName,
        email: User.email,
      },
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete("/delete", auth, async (req, res) => {
  try {
    const deletedUser = await user.findByIdAndDelete(req.user);
    res.json(deletedUser);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});



router.post("/tokenisvalid", async (req, res) => {
  try {
    const token = req.header("x-auth-token");
    if (!token) return res.json(false);

    const verified = jwt.verify(token, process.env.JWT_SECRET);
    if (!verified) return res.json(false);

    const User = await user.findById(verified.id);
    if (!User) return res.json(false);

    return res.json(true);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


router.get("/dashboard", auth, async (req, res) => {
  const User = await user.findById(req.user);
  res.json({
    displayName: User.displayName,
    id: User._id,
  });
});


module.exports = router;