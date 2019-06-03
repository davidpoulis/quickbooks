var request = require('request-promise')

  exports.getAccessToken = async() =>{
    var options = {
      method: 'GET',
      uri: 'https://earlybreakfast.co/quickbooks/token',
      
      headers: {
        "Authorization": `Bearer ${accessToken}`
      },
      json: true // Automatically stringifies the body to JSON
    };
    await request(options)
      .then((parsedBody)=>{
        return parsedBody
      })
      .catch(err=> {return err});
  }

  exports.send = async (data, url, method, accessToken) => {
    var options = {
      method: method,
      uri: url,
      body: data,
      headers: {
        "Authorization": `Bearer ${accessToken}`,
       "Content-Type":"text/plain"

      },
      json: true // Automatically stringifies the body to JSON
    };

    await request(options)
      .then(function (parsedBody) {
        console.log("#################################################")
       console.log("response:",parsedBody)
       return parsedBody;
      })
      .catch(function (err) {
        console.log("++++++++++++++++++++++++++++++++++++++++++++++++++")
        
       return err;
      });
  }
