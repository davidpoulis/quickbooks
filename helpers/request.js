var request = require('request-promise')

let shared = require('../shared')

shared.connect((accessToken) => {

  exports.send = async (data, url, method) => {
//let accesstoken='eyJlbmMiOiJBMTI4Q0JDLUhTMjU2IiwiYWxnIjoiZGlyIn0..3xTY20fHI9j1nHWQSO16kg.rhjurY50z9nsoMq08GAobgy7_QnGNYek5hGiiOX8JySYzW9bqnxKHB8KjE8RZ8cfH5GFowA41jH4jtRNkLCzn9lAijK6HR72yNVP8MOUbysvXfPoHvtIivoKwNIjh4n4WIMgpSfULKfYq6TZwFkQQQ4w36Pte_HoSWBZUxO5-5v8mVmPT_ommhp0QQej5DtdGyGHWVlE0rYeAKcQ7_CVOT72fA7fIyzo8DwlK-X1uh_9iN8QOvLyYZVaAgp053Zh16OG1zgEOffUEYHvgwvEBD40pGzt5bIITOtfScR8HbkAQRyGz2zlHzTD7nu8XTLuCVecuNUl7O3VBO1QkD47peDtCgTBiDKrSJieULZ1gBS27ugAgINCavrFmJtI9wLWWRV8ImK90GrYZraLfHdc6WAR1YMor8jeej9hhZeBVzA8-Dcuj0cxU9OmAGhtgxyX9qsBWTcDu-IF4PO3diO3sDnkkrWMFR5SLDajm3sSvNNQaX2HBYq-0qaKomJwRn1ZDFr1e0Xfz8b-MXqgC8W7pI6PKXB8H5bW9t_4xMMMiILYZ-OcUdkNsbcx4Rc_YzH50ca123Zsb2A9mBv3lV98Wy38n2o77xhMERxc1azOr-pNR-mkE23u79lLKqTynpKt95rEjCVu44CAYgS0TJTB-ICaRAjufxb8d9WXnWq7ozQtvREy7lcB24sO9yCnM5ag.J5LLfxN6nwQ2h0MJa-N-ag'
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
        console.log("portalId: ", parsedBody.portalId, " \n objectId: ", parsedBody.objectId);
      })
      .catch(function (err) {
        console.log('we have error: ', err)
      });
  }
})