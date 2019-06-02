require('dotenv').config();
var request = require('./helpers/request')
const {PubSub} = require('@google-cloud/pubsub');
var trans=require('./helpers/transformObject').transform
var url = '/v3/company/123146517189229/customer?minorversion=38'
var base_url_sandbox = 'https://sandbox-quickbooks.api.intuit.com'
var base_url_production = 'https://quickbooks.api.intuit.com'
const END_POINT = base_url_sandbox+url
const METHOD = 'POST'
const pubsub = new PubSub();


const subscriptionName = 'my-sub2';
const subscription = pubsub.subscription(subscriptionName);

const messageHandler = message => {
  console.log(`Received message ${message.id}:`);
  console.log(`Data: ${message.data}`);
  console.log(`tAttributes: ${message.attributes}`);
  //transform data from buffer to json
  msgString=JSON.parse(message.data.toString('utf8')) 
  sendData=[]
  
  transObj = trans(msgString)
  
  for(var key in transObj){
    if (transObj.hasOwnProperty(key)) {
      sendData.push({name:key,value:transObj[key]})
   }
  }
  request.send(sendData,END_POINT,METHOD )

  // Ack the messae
  message.ack();
};

// Listen for new messages until timeout is hit
subscription.on(`message`, messageHandler);
