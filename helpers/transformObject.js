
 exports.transform = function(obj){
   var data= `{
        "FullyQualifiedName":"${obj.firstName | ""} ${obj.lastName | ""}", 
        "PrimaryEmailAddr": {
          "Address":" ${obj.email | ""}"
        }, 
        "DisplayName": "${obj.firstName | ""} ${obj.lastName | ""}", 
        "Suffix": "", 
        "Title": "", 
        "MiddleName": "", 
        "Notes": "Here are other details.", 
        "FamilyName":"${obj.lastName | ""}" , 
        "PrimaryPhone": {
          "FreeFormNumber":"${obj.phoneNumber| ""}"
        }, 
        "CompanyName": "", 
        "BillAddr": {
          "CountrySubDivisionCode": "", 
          "City": "", 
          "PostalCode": "", 
          "Line1": "", 
          "Country": ""
        }, 
        "GivenName": ""
      }`
      return JSON.parse(data)
}