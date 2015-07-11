module.exports = function(app, dir) {

	var express = require('express');
	var bodyParser = require('body-parser');

	app.use(bodyParser.urlencoded({
		extended: true
	}));

	app.use('/assets', express.static(dir + '/assets'));

	app.get('/', function(req, res) {
		res.sendFile(dir + '/index.html');
	});

};