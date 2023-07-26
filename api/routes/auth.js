const router = require("express").Router();
const User = require("../model/User");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const SECRET_KEY = process.env.SECRET_KEY;

//register

router.post("/register", async(req,res)=>{
    try {

        const salt = await bcrypt.genSalt(10);
        const hashedPass = await bcrypt.hash(req.body.password, salt);
        
        const newUser = new User({
            username : req.body.username,
            email : req.body.email,
            password : hashedPass,
        });

        const user = await newUser.save();
        res.status(200).json(user);
    } catch (err) {
        res.status(500).json(err)
    }
})

//login

router.post("/login", async(req,res)=>{
    try {
        const user = await User.findOne({username: req.body.username});
        !user && res.status(400).json("буруу username or password!!!");


        const validated = await bcrypt.compare(req.body.password, user.password);
        !validated && res.status(400).json("буруу username or password !!!");

        const accessToken = jwt.sign({ 
            id: user._id, isAdmin: user.isAdmin}, 
            SECRET_KEY, {expiresIn: "7d"});

        res.status(200).json({user, accessToken});
    } catch (err) {
        res.status(500).json(err)
    }
})

 module.exports = router