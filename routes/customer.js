const express = require('express')
const customerRouter = express.Router()
const verifyToken = require('./auth.js').verifytoken;
const oauthClient = require('./auth.js').oauthClient;

customerRouter.post('/', verifyToken,function(req,res){

    let method = 'POST'
    let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
    let productionBaseURL = 'https://quickbooks.api.intuit.com'
    let url = `/v3/company/123146517189229/customer?minorversion=38`
    
    oauthClient.makeApiCall({url: sandBoxBaseURL+url , method: method,data:req.body})
        .then(function(authResponse){
            console.log("The response for API call is :"+JSON.stringify(authResponse));
            res.send(JSON.parse(authResponse.text()));
        })
        .catch(function(e) {
            console.error(e);
        });

});
customerRouter.get('/',verifyToken, function(req,res){

    let method = 'GET'
    let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
    let productionBaseURL = 'https://quickbooks.api.intuit.com'
    let query = 'select * from Customer'
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
customerRouter.get('/customers/:id', verifyToken,function(req,res){

    let method = 'GET'
    let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
    let productionBaseURL = 'https://quickbooks.api.intuit.com'
    let url = `/v3/company/123146517189229/customer/${req.params.id}?minorversion=38`
    
    oauthClient.makeApiCall({url: sandBoxBaseURL+url , method: method})
    .then(function(authResponse){
        console.log("The response for API call is :"+JSON.stringify(authResponse));
        res.send(JSON.parse(authResponse.text()));
    })
    .catch(function(e) {
        console.error(e);
    });

});
module.exports =customerRouter