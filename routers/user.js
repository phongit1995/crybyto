let express = require("express");
let router = express.Router();
import {checkGetInfoUser,getOrderHistory,createOrder} from './userModel';
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
router.post("/create-order",async(req,res)=>{
    try {
        let {api_key,secret_key,side,price,quantity,channel}= req.body;
        if(typeof channel=="undefined" ||typeof api_key=="undefined" || typeof secret_key=="undefined" ||typeof side=="undefined" ||typeof price=="undefined" ||typeof quantity=="undefined"){
            return res.json({
                status:"Validation Fail"
            }) 
        }
        let resultCreate = await createOrder(channel,api_key,secret_key,side,price,quantity);
        return res.json({
            status:"success",
            data:JSON.parse(resultCreate)
        })
    } catch (error) {
        
    }
})
module.exports = router ;