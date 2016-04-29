/**
 * Created by developer on 23.04.16.
 */

var express = require("express");
var User = require('../models/user');

var router =  express.Router();

router.use(function(res, req, next){
    console.log("Something is happening");
    next();
});

router.get('/', function(req, res){
    res.json({message:"Start api"});
});

module.exports = router;