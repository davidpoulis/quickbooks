var request = require('request-promise')

let shared = require('../shared')

shared.connect((accessToken,realmId) => {

  exports.send = async (data, url, method) => {
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
    console.log("options", options)

    await request(options)
      .then(function (parsedBody) {
        console.log("response: ",parsedBody);
      })
      .catch(function (err) {
        console.log('we have error: ', err)
      });
  }
})