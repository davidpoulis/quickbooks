const express = require('express')
const verifyToken = require('./auth').verifyToken;
const oauthClient = require('./auth.js').oauthClient;
const vendorRouter = express.Router()

let request = require('../helpers/request')
let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
let productionBaseURL = 'https://quickbooks.api.intuit.com'

vendorRouter.get('/',(req,res)=>{
    let method = 'GET'
    let query = 'select * from vendor'
    let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
     let productionBaseURL = 'https://quickbooks.api.intuit.com'
    let endpoint = `/v3/company/123146326711484/query?query=${query}&minorversion=38`
    let url = `${sandBoxBaseURL} ${endpoint}`

    request.send(null,url,method).then(resp=>{
        console.log(resp)
    },err=>console)
    

});
vendorRouter.post('/',function(req,res){

    let method = 'POST'
    let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
    let productionBaseURL = 'https://quickbooks.api.intuit.com'
    let url = `/v3/company/123146326711484/vendor?minorversion=38`
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