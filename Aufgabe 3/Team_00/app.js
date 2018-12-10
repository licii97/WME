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

function pad(n) {
  n = n + '';
  return n.length >= 3 ? n : new Array(3 - n.length + 1).join(0) + n;
}

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
	const id = req.params.id;
	let filteredJson = [];
	filteredJson = csvToJsonObj.filter(country => country['id'] === id);

	if (filteredJson != []){
		res.contentType('application/json');
		res.send(filteredJson);

	}else{
		res.send("No such id " + id + " in database.");
	}
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
	let properties = [];
	for (var index in csvToJsonObj[0]){
		console.log(index);
		properties.push(index);
	}
	res.contentType('application/json');
	res.send(properties);
})

app.get('/properties/:num', function (req, res) {
	var num = req.params.num;
	let property = [];
	let counter = 0;

	for (var index in csvToJsonObj[0]){
		counter++;
		if (num == counter){
			res.contentType('application/json');
			property.push(index);
			res.send(property);
		}
	}
	if(num > counter){
		res.send("No such property available!");
	}

})

app.post('/items', function (req, res) {
	let id1 ="0";
	let id2 ="0";
	csvToJsonObj.forEach(function(element){
		id2 = element['id'];
		if (id2 > id1) {
			id1 = id2;
		}
	});

	id1 = parseInt(id1);
	id1++;
	const newCountryId = pad(id1);
	let newCountry = {id:newCountryId,
										name:req.body["name"],
										birth_rate_per_1000: req.body["birth_rate_per_1000"],
										cell_phones_per_100: req.body["cell_phones_per_100"],
										children_per_woman:"-",
										electricity_consumption_per_capita:"-",
										gdp_per_capita:"-",
										gdp_per_capita_growth:"-",
										inflation_annual:"-",
										internet_user_per_100:"-",
										life_expectancy:"-",
										military_expenditure_percent_of_gdp:"-",
										gps_lat:"-",
										gps_long:"-"};
	csvToJsonObj.push(newCountry);
	res.send('Added country ' + req.body["name"] + ' to list!');
})

app.delete('/items', function (req, res) {
	const deletedCountry = csvToJsonObj.pop();
	res.send('Deleted last country: ' + deletedCountry["name"] +'!');
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
