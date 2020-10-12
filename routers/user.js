let express = require("express");
let router = express.Router();
import {checkGetInfoUser,getOrderHistory} from './userModel';
router.get("/",async(req,res)=>{
    res.send("Phong");
})
router.post("/info",async(req,res)=>{
    try {
        let data = await checkGetInfoUser(req.body.api_key,req.body.secret_key);
        return res.json({
            status:"success",
            data:JSON.parse(data)
        })
    } catch (error) {
        return res.json({
            status:"error",
            data:error
        })
    }
})
router.post("/order-history",async(req,res)=>{
    try {
        let data = await getOrderHistory(req.body.api_key,req.body.secret_key);
        //console.log(data);
        return res.json({
            status:"success",
            data:JSON.parse(data)
        })
    } catch (error) {
        console.log(error);
        return res.json({
            status:"error",
            data:error
        })
    }
})
module.exports = router ;