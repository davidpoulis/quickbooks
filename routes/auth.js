const express = require('express')
var OAuthClient = require('intuit-oauth');
const authRouter = express.Router()
let property = require('../config.js')
let oauth2_token_json = null
let oauthClient = null

//authRouter.use('/authUri', function(req,res) {
    oauthClient = new OAuthClient({
        clientId: property.clientID,
        clientSecret: property.clientSecret,
        environment: 'sandbox',
        redirectUri: 'http://localhost:3000/auth/callback'
    });

    var authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.Accounting],state:'intuit-test'});
   // res.redirect(authUri);
 
//});

authRouter.use('/callback', function(req, res) {

    oauthClient.createToken(req.url)
    .then(function(authResponse) {
          oauth2_token_json = JSON.stringify(authResponse.getJson(), null,2);
          oauthClient.setToken(oauth2_token_json); 
          res.json({token:oauth2_token_json});
        })
     .catch(function(e) {
          console.error(e);
          res.json({err:e});

      });
});
exports.verifytoken = function(req,res,next) {
    if(oauthClient.isAccessTokenValid()) {
        next()
    } 
    if(!oauthClient.isAccessTokenValid()){
        oauthClient.refresh()
            .then(function(authResponse) {
                console.log('Tokens refreshed : ' + JSON.stringify(authResponse.json()));
                oauthClient.setToken(authResponse.json()); 
                next()
            })
            .catch(function(e) {
                console.error("The error message is :"+e.originalMessage);
                console.error(e.intuit_tid);
             
            });
      
    }
}
module.exports =authRouter
module.exports = oauthClient
