const router = require("express").Router();
const UserModel = require("../model/users")

router.post ("/register",async (req,res)=>{
    //try and catch block here 
    const data = await UserModel.insertMany(req.body)
    console.log(data)
    res.send( "registered successfully")

})

module.exports = router