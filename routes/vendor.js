const express = require('express')

const vendorRouter = express.Router()

let request = require('../helpers/request')
let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
let productionBaseURL = 'https://quickbooks.api.intuit.com'

vendorRouter.get('/',(req,res)=>{
    let method = 'GET'
    let query = 'select * from vendor'
    let sandBoxBaseURL = 'https://sandbox-quickbooks.api.intuit.com'
     let productionBaseURL = 'https://quickbooks.api.intuit.com'
     let companyID = '123146326711484'
    let endpoint = `/v3/company/123146326711484/query?query=${query}&minorversion=38`
    let url = `${sandBoxBaseURL}${endpoint}`

    request.send(null,url,method).then(resp=>{
       res.json(resp)
    },err=>res.json(err))
    

});



module.exports =vendorRouter