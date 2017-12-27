'use strict';


const bcSdk = require('../query.js');

exports.readRequest = (partyAddress) => {
   return new Promise((resolve, reject) => {
       console.log("entering into readRequest function.......!")
       
     bcSdk.readRequest({
           partyAddress: partyAddress
       })

     .then((votes) => {
           console.log("data in votes " + votes)

         return resolve({
               status: 200,
               count: votes
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