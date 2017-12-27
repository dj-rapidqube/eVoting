let multichain = require("multichain-node")({
    port: 6302 ,
    host: '127.0.0.1',
    user: "multichainrpc",
    pass: "753Mg9VFB3EuNj6iSHeQ6VGcEyCWEvEvi3e5CzQW9xy"
 });
 
 
 function savetransaction(params) {
  
    return new Promise((resolve) => {
        var response;
 
   var TransactionDetails = params.transactionDetails;
 
    
   multichain.sendAssetFrom({from:TransactionDetails.voterID,to:TransactionDetails.partyAddress,asset:"votes",qty:TransactionDetails.qty}, (err, res) => {
        console.log(res)
        if(err == null){
         return resolve({response:res});
        }else{
            console.log(err)
        }
    })
 
 })
   
 }

 
 module.exports = {
    savetransaction: savetransaction
    
 
 };