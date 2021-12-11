const router = require("express").Router();
const jwt = require("jsonwebtoken");
//redis config
const redis = require("redis");
const client  = redis.createClient();
client.on("error",(err)=>{
    console.log(err)
});

const {atk,rtk} = require("../config")
const UserModel = require("../model/users")

router.post("/gettoken", async (req,res)=>{

    const userData = await UserModel.find({username : req.body.username});
    if(userData.length != 0){
        //check password
        if(req.body.password != userData[0].password){
            return res.send("password doesnot match")
        }
        //send tokens here
        const accessToken = jwt.sign(
                            {username : userData[0].username,
                             uuid: userData[0]._id}
                             ,atk,{expiresIn : 15})
        const refreshToken = jwt.sign({uuid: userData[0]._id},rtk)
        const userObj = {
            accessToken,
            refreshToken,
            username : userData[0].username,
            userId : userData[0]._id.toString()
        }
        redis_store(userObj)
        return res.json({status : "login successful",userObj})
    }    

   return res.send("user does not exits please register")

})

const redis_store=(data)=>{
    client.hmset(data.userId,"username",data.username,
                 "accessToken",data.accessToken,"refreshToken",data.refreshToken);
}

module.exports = router