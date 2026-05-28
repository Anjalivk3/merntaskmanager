const bcrypt  = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/userModel");

const signup = async(req, res)=>{
  try{
    const {name, email, password} = req.body;
    
    const user = await userModel.findOne({email});
    
    if(user){
      return res.status(409).json({
        message: "user is already exist, You can login", success: false
      });
    }

    const newUser = new userModel({name, email, password})
    newUser.password = await bcrypt.hash(password, 10);
    await newUser.save();
    res.status(201).json({message:"Signedup Successfully", success: true});
  }catch(err){
    res.status(500).json({message: `Internal server error ${err.message}`, success: false})
  }
}


const login = async(req, res) =>{
  try {
    const {name, email, password} = req.body;
    const user = await userModel.findOne({email});
    const errorMsg = "Auth failed email or password is wrong";
    if(!user){
      return res.status(400).json({
        message: errorMsg, success: false
      });
    }
    const isPasswordEqual = await bcrypt.compare(password, user.password);
    if(!isPasswordEqual){
      return res.status(400).json({
        message: errorMsg, success: false
      });
    }
    
    const jwtToken = jwt.sign({email: user.email,
      id: user._id
    }, process.env.JWT_SECRET, {expiresIn: "24hr"});

    res.status(200).json({message:"Login Success", Success: true, jwtToken, email, name: user.name});
  } catch (err) {
    return res.status(500).json({
        message: `Internal server error ${err.message}`, success: false
      });
  }
}

module.exports = { signup, login}