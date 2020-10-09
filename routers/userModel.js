const request = require("request-promise");
var SHA256   = require("crypto-js/sha256");
const API_V1="https://api.crypto.com/v1/";
export const checkGetInfoUser =async  (api_key,secret_key)=>{
    let time = new Date().getTime();
    const message ="api_key" + api_key + "time" + time + secret_key ;
    let sign =SHA256("api_key" + api_key + "time" + time + secret_key).toString();
    var options = {
        method: 'POST',
        url:API_V1+"account",
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded'
        },
        form:{
            time:time,
            api_key:api_key,
            sign: sign
        }
    }
    let data = await request(options);
    return data ;
}

    