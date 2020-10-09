
  const WebSocket = require('ws');
  const URL_SOCKET="wss://stream.crypto.com/v2/market";
  class WebSocketTransfer {
        wss ;
        socket ;
        constructor(socket){
            this.socket = socket ;
            this.wss = new WebSocket(URL_SOCKET, {
                perMessageDeflate: true
            });
            this.wss.on('open',()=> {
                console.log('Connection OPENED');
                var msg  =
                  {
                      id: 1602210066267, 
                      method: "subscribe", 
                      params: {channels: ["trade.ETH_BTC"]}, 
                      nonce: 1602210066267
                  }
                this.wss.send(JSON.stringify(msg));
            });
            this.wss.on('close', ()=> {
                console.log('Connection CLOSED');
            });
            this.wss.on("message",(data)=>{
                data=JSON.parse(data);
                if(data.method=="public/heartbeat"){
                    this.wss.send(JSON.stringify({id:data.id,method: "public/respond-heartbeat"}))
                }
                else {
                    console.log("Send To Client");
                   this.socket.emit("send-data",JSON.stringify(data));
                }
            })
        }
         disConnect(){
            this.wss.close();
        }
        sendEvent (name,data){
            this.socket.emit(name,data);
        }
  }
  module.exports = WebSocketTransfer ;