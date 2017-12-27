//here only routing is done
'use strict';
const savetransaction = require('./functions/savetransaction');
const readRequest = require('./functions/readRequest');
const cors = require('cors');

var request = require('request-promise');
var mongoose = require('mongoose');



var express = require('express');

var Promises = require('promise');
module.exports = router => {
    // file upload API
    
    
    
    //saveVoteA -  routes user input to function saveVoteA. 
    router.post("/saveVoteA", (req, res) => {
          
        var  partyA = req.body.transactiondetails.partyA;
        console.log("transactiondetails" + partyA);
        
         var object={"voterID":partyA.voterID,"partyAddress":partyA.partyAddress,"qty":partyA.qty}
        
         savetransaction.savetransaction(object)
                    .then(result => {
                                        res
                                            .status(200)
                                            .json({
                                                "message": "voted sucessfully!",
                                                "txid": result.query
                                            });
                                    })
                              
    });
    router.post("/saveVoteB", (req, res) => {
        
        var  partyB = req.body.transactiondetails.partyB;
        console.log("transactiondetails" + partyB);
        
         var object={"voterID":partyB.voterID,"partyAddress":partyB.partyAddress,"qty":partyB.qty}
         savetransaction.savetransaction((object))
                    .then(result => {
                                        res
                                            .status(200)
                                            .json({
                                                "message": "voted sucessfully!",
                                                "txid": result.query
                                            });
                                    })

    });
 router.post('/getResult', cors(), (req, res) => {
       
        const partyAaddress = req.body.partyAaddress;
        const partyBaddress = req.body.partyBaddress;
        var voteCountA;
        var voteCountB;
        
        if (!partyAaddress || !partyBaddress || !partyAaddress.trim() || !partyBaddress.trim()) {
            res
                .status(400)
                .json({
                    message: 'Invalid Request !'
                });
        } else {
            var firstMethod = function() {
                var promise = new Promise(function(resolve, reject) {
                         readRequest
                .readRequest(partyAaddress)
                .then(function(result) {
                   voteCountA = result.count;
                  resolve(voteCountA)
                 
                })
                .catch(err => res.status(err.status).json({
                    message: err.message
                }));
                });
                return promise;
            };
            var secondMethod = function() {
                
                
                        readRequest
                .readRequest(partyBaddress)
                .then(function(result) {
                   voteCountB = result.count;
                 res
                                .status(200)
                                .json({
                                   "voteCountA":voteCountA,
                                   "voteCountB":voteCountB
                                });
                 
                })
                
                           
                        
                    
                    .catch(err => res.status(err.status).json({
                        message: err.message
                    }));
            };
            firstMethod().then(secondMethod);
        }
    });
    
   
  
}