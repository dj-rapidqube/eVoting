let multichain = require("multichain-node")({
    port: 6302 ,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "753Mg9VFB3EuNj6iSHeQ6VGcEyCWEvEvi3e5CzQW9xy"
 });
 
 
 function readRequest(params) {
    
   return new Promise((resolve) => {
        var partyAddress = params.partyAddress;
          
   multichain.getAddressBalances({address:partyAddress}, (err, res) => {
        console.log(res)
        if(err == null){
         return resolve({voteCount:res[0].qty});
        }else{
            console.log(err)
        }
    })
 
 })
   
 }
 
 
 
 
 
 
 module.exports = {
 
    readRequest:readRequest
    
 
 };