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

app.use("/", express.static(__dirname + '/webapp'));

app.listen(1234, function(){
    console.log("http://localhost:1234");
});