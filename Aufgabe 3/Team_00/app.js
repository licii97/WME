// DO NOT CHANGE!
//init app with express, util, body-parser, csv2json
var express = require('express');
var app = express();
var sys = require('util');
var path = require('path');
var bodyParser = require('body-parser');
var Converter = require("csvtojson").Converter;

//register body-parser to handle json from res / req
app.use( bodyParser.json() );

//register public dir to serve static files (html, css, js)
app.use( express.static( path.join(__dirname, "public") ) );

// END DO NOT CHANGE!


//https://www.npmjs.com/package/csvtojson
const csvToJsonObj;
const csvFilePath='./world_data.csv';
const csv=require('csvtojson');
csv()
.fromFile(csvFilePath)
.then((jsonObj)=>{
    console.log(jsonObj);
    csvToJsonObj = jsonObj;

})

// Async / await usage
const jsonArray = await csv().fromFile(csvFilePath);

/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

$id = $_GET["id"];
$range = $_GET["range"];

//jetzt muss man wahrscheinlich irgendwo im json objekt den scheiß suchen mit id und range & das zurückgeben
// also echo: "<table>";
// echo "<td>id = $id</td>";
// nur bsp


// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});
