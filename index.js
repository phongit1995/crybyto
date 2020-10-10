require("dotenv").config();
let express = require("express");
var bodyParser = require('body-parser');
let cors = require("cors");
let WebSocketTransfer = require("./socket");
let userRouter = require("./routers/user");
let app= express();
app.use(cors());
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());
app.use("/user",userRouter);
app.get("/",(req,res)=>{
    res.send("Phong");
})
//Socket Io
var server = require("http").Server(app);
var io = require("socket.io")(server);
io.on("connection",(socket)=>{
    console.log("Client Connected Server");
    let wss = new WebSocketTransfer(socket);
    socket.on("disconnect",function(){
        wss.disConnect();
    })
})
server.listen(process.env.PORT||3000,function(){
    console.log("App Running On Port: "+ (process.env.PORT||3000))
});