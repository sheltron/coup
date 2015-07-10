module.exports = function(app, dir) {

	var express = require('express');

	app.use('/assets', express.static(dir + '/assets'));

	app.get('/', function(req, res) {
		res.sendFile(dir + '/index.html');
	});

};