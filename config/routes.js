/**
 * Application routes for REST
 */

'use strict';

var express = require('express');

module.exports = function (app, config) {

	var router = express.Router();
	app.use('/', router);

	// Controllers
	var startController = require(config.root + '/app/controllers/start');
	var apiController = require(config.root + '/app/controllers/api');
	var surveysController = require(config.root + '/app/controllers/surveys');

	router.get('/api/surveys', apiController.list);
	router.get('/api/surveys/:id', apiController.read);
	router.post('/api/surveys', apiController.create);
	router.put('/api/surveys/:id', apiController.update);
	router.delete('/api/surveys/:id', apiController.delete);

	router.get('/surveys', surveysController.index);
	router.get('/surveys/:id', surveysController.show);
	router.get('/:survey/:option', surveysController.click);

	router.get('/', startController.index);

};