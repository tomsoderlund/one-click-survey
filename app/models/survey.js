'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SurveySchema = new Schema({
	name: { type: String, unique: true, required: true },
	redirectUrl: { type: String, required: true },
	dateCreated: { type: Date, default: Date.now },
	votes: {}
});

mongoose.model('Survey', SurveySchema);