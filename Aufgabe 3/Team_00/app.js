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
				console.log(jsonObj);
			})
/**************************************************************************
********************** handle HTTP METHODS ***********************
**************************************************************************/

// DO NOT CHANGE!
// bind server to port
var server = app.listen(3000, function () {
    var host = server.address().address;
    var port = server.address().port;
    console.log('Example app listening at http://%s:%s', host, port);
});

app.get('/items', function(req, res) {
		res.contentType('application/json');
		res.send(csvToJsonObj);
})

app.get('/items/:id', function (req, res) {
	res.contentType('application/json');
	const id = req.params.id;
	const filteredJson = csvToJsonObj.filter(country => country['id'] === id);
	res.send(filteredJson);
})

app.get('/items/:id1/:id2', function (req, res) {
	const id_1 = req.params.id1;
	const id_2 = req.params.id2;

	if (id_1 <= id_2){
		res.contentType('application/json');
	 	var filteredJson = csvToJsonObj.filter(country => country['id'] >= id_1);
		filteredJson = filteredJson.filter(country => country['id'] <= id_2);
		res.send(filteredJson);
	}
	else {
		res.send('Range not possible!');
	}
})

app.get('/properties', function (req, res) {
	res.contentType('application/json');
})

app.get('/properties/:num', function (req, res) {
	res.contentType('application/json');
	var num = req.params.num;
})

app.post('/items', function (req, res) {
//evtl "push()" benutzen
	res.send('Added country {name} to list!');
})

app.delete('/items', function (req, res) {
	const deletedCountry = csvToJsonObj.pop();
	res.send('Deleted last country: ' + deletedCountry["id"] +'!');
})

app.delete('/items/:id', function (req, res) {
	var id = req.params.id;
	const elemExists = csvToJsonObj.find(country => country.id === id);
	if (elemExists == undefined){
		res.send('No such id ' + id + ' in database');
	}
	else {
		csvToJsonObj = csvToJsonObj.filter(country => country['id'] != id);
		res.send('Item ' + id + ' deleted successfully.');
	}
})
