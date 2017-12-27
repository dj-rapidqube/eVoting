'use strict';

var express = require('express');
var router = express.Router();
var cors = require('cors');
var bodyParser = require('body-parser');
var bcSdk = require('../invoke');
var user = 'dhananjay.p';
var affiliation = 'supplyv11';
var requestid=requestid;

exports.savetransaction = (object) => {
   return new Promise((resolve, reject) => {
       console.log("entering into savetransaction function.......!")
       
       bcSdk.savetransaction({
           transactionDetails: object
       })

       .then((responseout) => {
           console.log("data in requestArray " + responseout)

           return resolve({
               status: 200,
               query: responseout
           })
       })

       .catch(err => {

           if (err.code == 401) {

               return reject({
                   status: 401,
                   message: 'cant fetch !'
               });

           } else {
               console.log("error occurred" + err);

               return reject({
                   status: 500,
                   message: 'Internal Server Error !'
               });
           }
       })
   })
};