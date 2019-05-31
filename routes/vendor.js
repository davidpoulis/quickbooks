const express = require('express')
const vendorRouter = express.Router()
let verifyToken = require('./auth').verifytoken
let oauthClient = require('./auth.js').oauthClient;

let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
let productionBaseURL = 'https://quickbooks.api.intuit.com'
vendorRouter.use(verifyToken)
vendorRouter.get('/',(req,res)=>{
    let method = 'GET'
    let query = 'select * from vendor'
    let url = `/v3/company/123146517189229/query?query=${query}&minorversion=38`
    
    oauthClient.makeApiCall({url: sandBoxBaseURL+url , method: method})
    .then(function(authResponse){
        console.log("The response for API call is :"+JSON.stringify(authResponse));
        res.send(JSON.parse(authResponse.text()));
    })
    .catch(function(e) {
        console.error(e);
    });

});
vendorRouter.post('/', verifyToken,function(req,res){

    let method = 'POST'
    let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
    let productionBaseURL = 'https://quickbooks.api.intuit.com'
    let url = `/v3/company/123146517189229/vendor?minorversion=38`
    oauthClient.makeApiCall({url: sandBoxBaseURL+url , method: method,data:req.body})
        .then(function(authResponse){
            console.log("The response for API call is :"+JSON.stringify(authResponse));
            res.send(JSON.parse(authResponse.text()));
        })
        .catch(function(e) {
            console.error(e);
        });

});


module.exports =vendorRouter