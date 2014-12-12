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
	router.post('/api/surveys', apiController.create);
	router.delete('/api/surveys/:id', apiController.delete);

	router.get('/surveys', surveysController.index);

	router.get('/', startController.index);

	router.get('/:survey/:option', surveysController.clickOption);

};