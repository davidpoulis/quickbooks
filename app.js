var express = require('express');
var app = express();

var bodyParser = require('body-parser');
var vendorRouter = require('./routes/vendor')
var authRouter = require('./routes/auth').authRouter



app.use(bodyParser.json());

app.use('/vendor', vendorRouter)
app.use('/auth', authRouter)

const server = app.listen(process.env.PORT || 3000, () => {
    console.log("server is up")
})