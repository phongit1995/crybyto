let express = require("express");
let router = express.Router();
import {checkGetInfoUser} from './userModel';
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
module.exports = router ;