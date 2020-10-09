var request         = require("request");
var SHA256          = require("crypto-js/sha256");
var formurlencoded  = require('form-urlencoded').default;

params              = {};
params["api_key"]   = "uoWPsCrJr7HkAvjbmJuXrD"; // to replace by real API key => better to get as input and encrypt with shared secret input 
params["time"]      = new Date().getTime();;
var secret_key      = "qRCFvnzur5J25udTTQDBFE"; // to replace by real secret key => => better to get as input and encrypt with shared secret input 
var apiUrl          = "https://api.crypto.com/v1/";

console.log("params: " + JSON.stringify(params));
var messageNotEncoded = "";

for(var key in params) {
    messageNotEncoded += key;
    messageNotEncoded += params[key];
}
messageNotEncoded   += secret_key;
console.log(messageNotEncoded);
var sign = SHA256(messageNotEncoded).toString();
console.log("Encoded message: " + sign);

params["sign"] = sign;
console.log("params: " + JSON.stringify(params));

var formParams  = {"form": formurlencoded(params)};
var apiCallPath = "account";
var postUrl     = apiUrl + apiCallPath;
console.log("Post URL: " + postUrl);
console.log("Post Form: " + JSON.stringify(formParams));

request.post(postUrl, formParams, function(error, response) {
    if(!error) {
        console.log(response.body)    
        var responseJson = JSON.parse(response.body);
        console.log(responseJson["msg"]);
        console.log(responseJson["data"]);
    }
});