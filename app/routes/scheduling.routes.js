'use strict';

const scheduler=require('../controllers/scheduling.controller');
const verifier=require ('../middleware/auth.middle');

module.exports = function (app, apiVersion) {

    app.get(apiVersion+"/hello", function(req, res){
        res.send("hello")
        });
    app.post(apiVersion+"/doctor/schedule/slots",scheduler.addSlots);
    


};