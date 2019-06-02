var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var vendorRouter = require('./routes/vendor')



app.use(bodyParser.json());

app.use('/vendor', vendorRouter)


const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server is up")
})