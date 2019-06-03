const express = require('express')

const vendorRouter = express.Router()

let request = require('../helpers/request')
let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
let productionBaseURL = 'https://quickbooks.api.intuit.com'

vendorRouter.get('/', (req, res) => {
    
    request.getAccessToken().then((body) => {
        let method = 'GET'
        let query = 'select * from vendor'
        let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
        let productionBaseURL = 'https://quickbooks.api.intuit.com'

        let endpoint = `/v3/company/${body.realmid}/query?query=${query}&minorversion=38`
        let url = `${sandBoxBaseURL}${endpoint}`
        console.log(body)
        request.send(null, url, method,body.token).then(resp => {
            res.json(resp)
        })
    }).catch((err)=>res.json(err))



});



module.exports = vendorRouter