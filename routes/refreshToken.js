const router = require("express").Router();
const jwt = require("jsonwebtoken")
const UserModel = require("../model/users")

//redis store
const redis = require("redis");
const client  = redis.createClient();

client.on("error",(err)=>{
    console.log(err)
});
//redis client 
const {atk,rtk} = require("../config.js")

router.post("/refreshtoken",async (req,res)=>{
    const refreshToken = req.headers.authorization.split(" ")[1]
    //tokenization
    const rtokenData = jwt.verify(refreshToken,rtk);
    client.hgetall(rtokenData.uuid,(err,data)=>{
        if(err){return console.log(err)}
        if(data==null){res.send("no user with the id logged in")}
        const newAccessToken = jwt.sign({username : data.username,uuid : rtokenData.uuid},atk,{expiresIn : 15})
        client.hmset(rtokenData.uuid,"accessToken",newAccessToken)
        res.json({data: newAccessToken})
    })

})



module.exports = router