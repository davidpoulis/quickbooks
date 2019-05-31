// Instance of client
var express = require('express');
var app = express();
var path = require('path');
var OAuthClient = require('intuit-oauth');
var bodyParser = require('body-parser');
var vendorRouter= require('./routes/vendor')
var customerRouter = require('./routes/customer')
var authRouter = require('./routes/authenticate')
app.use(bodyParser.json());

app.use('/customer',customerRouter)
app.use('/vendor',vendorRouter)
app.use('/auth',authRouter)



let request = require('./request')
function accessToken(){
    if(oauthClient.isAccessTokenValid()) {
        console.log("The access_token is valid");
    } 
    if(!oauthClient.isAccessTokenValid()){
        oauthClient.refresh()
            .then(function(authResponse) {
                console.log('Tokens refreshed : ' + JSON.stringify(authResponse.json()));
            })
            .catch(function(e) {
                console.error("The error message is :"+e.originalMessage);
                console.error(e.intuit_tid);
            });
      
    }
}

app.get('/retrieveToken', function(req, res) {
    var authToken = oauthClient.token.getToken();
    res.send(oauth2_token_json);
    res.end(authToken);

});
app.get('/refreshAccessToken', function(req,res){

    oauthClient.refresh()
        .then(function(authResponse){
            console.log('The Refresh Token is  '+ JSON.stringify(authResponse.getJson()));
            oauth2_token_json = JSON.stringify(authResponse.getJson(), null,2);
            res.send(oauth2_token_json);
        })
        .catch(function(e) {
            console.error(e);
        });


});


const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server is up")
})