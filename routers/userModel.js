const request = require("request-promise");
var SHA256   = require("crypto-js/sha256");
const crypto = require("crypto-js");
const API_V1="https://api.crypto.com/v1/";
const API_V2="https://api.crypto.com/v2/"
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
export const getOrderHistory =async (api_key,secret_key)=>{
    let time = new Date().getTime();
    let requestData = {
        id: 11,
        method: "private/get-order-history",
        api_key:api_key,
        params:{},
        nonce:time
    }
    let body = JSON.stringify(signRequest(requestData,api_key,secret_key));
    var options = {
        method: 'POST',
        url:API_V2+"private/get-order-history",
        headers: {
          'Content-Type': 'application/json'
        },
       body:body
    }
    let data = await request(options);
    return data ;
}

const signRequest = (request, apiKey, apiSecret) => {
    const { id, method, params, nonce } = request;
  
    const paramsString =
      params == null
        ? ""
        : Object.keys(params)
            .sort()
            .reduce((a, b) => {
              return a + b + params[b];
            }, "");
  
    const sigPayload = method + id + apiKey + paramsString + nonce;
  
    request.sig = crypto
      .HmacSHA256(sigPayload, apiSecret)
      .toString(crypto.enc.Hex);
  
    return request;
};
  