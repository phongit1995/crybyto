
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
                //this.subscribeChannel("KNC_USDT");
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
                   this.socket.emit("send-data",JSON.stringify(data));
                }
            })
            
        }
        async subscribeChannel(channel){
            const intrasleep = 200 ;
            while(this.wss.readyState==0){
                await new Promise(resolve => setTimeout(resolve, intrasleep))   
            }
            let msg = {
                id: 1, 
                method: "subscribe", 
                params: {channels: [`trade.${channel}`,`book.${channel}.10`]}, 
                nonce: new Date().getTime()
            }
            this.wss.send(JSON.stringify( msg));
        }
         disConnect(){
            this.wss.close();
        }
        sendEvent (name,data){
            this.socket.emit(name,data);
        }
  }
  module.exports = WebSocketTransfer ;