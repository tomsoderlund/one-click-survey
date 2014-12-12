'use strict';

var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');

var API_PASSWORD = 'no4EgsuY7PDZi';

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
	/*
curl -X POST -H "Content-Type: application/json" -d '{ "name": "my_survey", "redirectUrl": "http://www.google.com" }' http://localhost:3004/api/surveys?password=no4EgsuY7PDZi
curl -X POST -H "Content-Type: application/json" -d '{ "name": "my_survey_with_options", "redirectUrl": "http://www.google.com", "surveyOptions": { "option1": {"count": 1}, "option2": {"count": 0} } }' http://localhost:3004/api/surveys?password=no4EgsuY7PDZi
	*/
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
	/*
		curl -X DELETE http://localhost:3004/api/surveys/5477a6f88906b9fc766c843e?password=no4EgsuY7PDZi
		curl -X DELETE http://localhost:3004/api/surveys/ALL?password=no4EgsuY7PDZi
	*/
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