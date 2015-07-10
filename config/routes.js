var express = require('express');

module.exports = function(app, dir) {
	app.use('/assets', express.static(dir + '/assets'));

	app.get('/', function(req, res) {
		res.sendFile(dir + '/index.html');
	});
};