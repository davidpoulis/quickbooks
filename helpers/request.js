var request = require('request-promise')

  exports.getAccessToken = (callback,err) =>{
    var options = {
      method: 'GET',
      uri: 'https://earlybreakfast.co/quickbooks/token',
       json: true // Automatically stringifies the body to JSON
    };
      request(options)
      .then((parsedBody)=>{
      
        callback(parsedBody,null) 
      })
      .catch(err=> {callback(null,err) });
  }

  exports.send = (data, url, method, accessToken,callback) => {
    var options = {
      method: method,
      uri: url,
      body: data,
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
      json: true // Automatically stringifies the body to JSON
    };

     request(options)
      .then(function (parsedBody) {
        
        callback(parsedBody,null);
      })
      .catch(function (err) {

      callback(null,err)
      });
  }
