const express = require('express')
var OAuthClient = require('intuit-oauth');
const authRouter = express.Router()
let property = require('../config.js')
let oauth2_token_json = null
let oauthClient = null
let request=require('../helpers/request')

authRouter.use('/authUri', function(req,res) {
    /** GET https://appcenter.intuit.com/connect/oauth2?
   client_id=Q3ylJatCvnkYqVKLmkH1zWlNzNWB5CkYB36b5mws7HkKUEv9aI&
   response_type=code&
   scope=com.intuit.quickbooks.accounting com.intuit.quickbooks.payment&
   redirect_uri=https://www.mydemoapp.com/oauth-redirect&
   state=security_token%3D138r5719ru3e1%26url%3Dhttps://www.mydemoapp.com/oauth-redirect&
     */
   request.send('',`https://appcenter.intuit.com/connect/oauth2?
   client_id=${property.clientID}&
   response_type=code&
   scope=com.intuit.quickbooks.accounting&
   redirect_uri=${property.redirectURL}&
   state=testState&
     `,'GET');
 
});

authRouter.use('/callback', function(req, res) {
 
 //get code from response
  let code = req.query.code
  let realmId = req.query.realmId
  let state = req.query.state
  res.send("code:",code)
  res.send("realmid:",realmId)
  res.end("state:",state)


});

var verifyToken = function(req,res,next) {
    if(oauthClient.isAccessTokenValid()) {
        next()
    } 
    else {
        oauthClient.refresh()
            .then(function(authResponse) {
                console.log('Tokens refreshed : ' + JSON.stringify(authResponse.json()));
                oauthClient.setToken(authResponse.json()); 
                next()
            })
            .catch(function(e) {
                console.error("The error message is :"+e.originalMessage);
                console.error(e.intuit_tid);
              next(e)
            });
      
    }
}
exports.authRouter =authRouter
exports.oauthClient= oauthClient
exports.verifyToken =verifyToken