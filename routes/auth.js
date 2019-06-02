const express = require('express')
var OAuthClient = require('intuit-oauth');
const authRouter = express.Router()
let property = require('../config.js')
let oauth2_token_json = null
let oauthClient = null

authRouter.use('/authUri', function(req,res) {
    oauthClient = new OAuthClient({
        clientId: property.clientID,
        clientSecret: property.clientSecret,
        environment: 'sandbox',
        redirectUri: 'http://localhost:3000/auth/callback'
    });

    var authUri = oauthClient.authorizeUri({scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId],state:'testState'});  // can be an array of multiple scopes ex : {scope:[OAuthClient.scopes.Accounting,OAuthClient.scopes.OpenId]}
    res.redirect(authUri);
 
});

authRouter.use('/callback', function(req, res) {
// Parse the redirect URL for authCode and exchange them for tokens
var parseRedirect = req.url;

// Exchange the auth code retrieved from the **req.url** on the redirectUri
oauthClient.createToken(parseRedirect)
    .then(function(authResponse) {
        console.log('The Token is  '+ JSON.stringify(authResponse.getJson()));
        res.end('The Token is  '+ JSON.stringify(authResponse.getJson()));

    })
    .catch(function(e) {
        console.error("The error message is :"+e.originalMessage);
        console.error(e.intuit_tid);
       

        res.end("error message is :"+e.error_description);

    });
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