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
var csvToJsonObj = {};
const csvFilePath='./world_data.csv';
const csv=require('csvtojson');
csv().fromFile(csvFilePath)
			.then(function(jsonObj){
				csvToJsonObj = jsonObj;
			})

/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

/*$id = $_GET["id"];
$range = $_GET["range"];*/

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

app.get('/items', function(req, res) {
		res.contentType('application/json'); //default ist text/html, deswegen extra angeben
		res.send(csvToJsonObj); //gibt das jsonObj zurück, also die daten, die könnte man jetzt vorher noch bearbeiten, also irgendwas löschen oder so
})

app.get('/items/:id', function (req, res) { // wenn man var haben möchte, dann muss noch ein : davor
	res.contentType('application/json');	
	var id = req.params.id;
	//aus dem jsob das passende ding raussuchen
})

app.get('/items/:id1/:id2', function (req, res) {
	res.contentType('application/json');	
	var id_1 = req.params.id1;
	var id_2 = req.params.id2;
})

app.get('/properties', function (req, res) {
	res.contentType('application/json');	
})

app.get('/properties/:num', function (req, res) {
	res.contentType('application/json');	
	var num = req.params.num;
})

app.post('/items', function (req, res) {
	res.send('Added country {name} to list!');
})

app.delete('/items', function (req, res) {
	res.send('Deleted last country: {name}!');
})

app.delete('/items/:id', function (res, req) {
	res.send('Item {id} deleted successfully.');
	res.send('No such id {id} in database');
})
