'use strict';

var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');

var API_PASSWORD = process.env.ONECLICKSURVEY_PASSWORD;

module.exports = {

	list: function (req, res, next) {
		var searchQuery = {};
		if (req.query.from) {
			var currentTime = new Date();
			searchQuery = { dateCreated: { "$gte": new Date(req.query.from), "$lt": currentTime } };
		}

		Survey.find(searchQuery, null, { sort: {dateCreated: -1} }, function (err, surveys) {
			if (err) {
				return res.json(400, err);
			}
			else {
				return res.json(surveys);
			}
		});
	},

	// Create new survey
	create: function (req, res, next) {
		if (req.query.password === API_PASSWORD) {
			var newSurvey = new Survey(req.body);
			newSurvey.save(function (err) {
				if (err) {
					return res.json(400, err);
				}
				else {
					return res.json(newSurvey);
				}
			});
		}
		else {
			return res.json(401, 'Unauthorized');
		}
	},

	// Delete survey
	delete: function (req, res, next) {
		if (req.query.password === API_PASSWORD) {
			var searchParams;
			if (req.params.id === 'ALL') {
				searchParams = {};
			}
			else {
				{ _id: req.params.id }
			}

			Survey.remove(
				searchParams,
				function(surveyErr, numberAffected, rawResponse) {
					if (surveyErr) {
						res.json(500, surveyErr);
					}
					else {
						res.json(200, 'Deletion complete');
					}
				}
			);
		}
		else {
			return res.json(401, 'Unauthorized');
		}
	}

}