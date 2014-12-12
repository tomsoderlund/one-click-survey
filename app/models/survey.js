'use strict';

var mongoose = require('mongoose'),
	Schema = mongoose.Schema;

var SurveySchema = new Schema({
	name: { type: String, required: true },
	redirectUrl: { type: String, required: true },
	dateCreated: { type: Date, default: Date.now },
	surveyOptions: {}
});

// SurveySchema.virtual('date')
// 	.get(function(){
// 		return this._id.getTimestamp();
// 	});

mongoose.model('Survey', SurveySchema);