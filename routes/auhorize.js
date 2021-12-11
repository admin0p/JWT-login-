const router = require("express").Router();
const jwt = require("jsonwebtoken")
const UserModel = require("../model/users")

const {atk,rtk} = require("../config")

router.post("/auth",async (req,res)=>{
    const accessToken = req.headers.authorization.split(" ")[1]
    const userData = await authorize(accessToken)
    res.json({data : userData})
})

const authorize = async (token)=>{
       try{
            var userData = jwt.verify(token,atk);   
            const check = await UserModel.find({_id : userData.uuid})
            if(check.length===0){
                 return "invalid user token"
            }
            return {status : "success"}     
       }catch(err){
            console.log(err)
            return err.message
       }
       
}

module.exports = router