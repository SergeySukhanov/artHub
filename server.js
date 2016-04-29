/**
 *
 * @author SNSukhanov <sergey.n.sukhanov@firstlinesoftware.com>
 * @version 04/21/2016
 * @see
 *
 * © 2016 All Rights Reserved
 */

var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var router = require('./api/router');
var mongoose = require('mongoose');
mongoose.connect('mongodb://localhost/test');

var port = 8080;

app.use(bodyParser.urlencoded({extended:true}));
app.use(bodyParser.json());
app.use(express.static('webapp'));
app.use('/api', router);

app.get('/', function(req, res){
    res.send(null);
});

app.listen(port, function(){
    console.log("http://localhost:" + port);
});