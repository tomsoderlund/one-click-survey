'use strict';

var _ = require('lodash');
var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');

var API_PASSWORD = process.env.ONECLICKSURVEY_PASSWORD;

module.exports = {

	index: function (req, res, next) {
		if (req.query.password === API_PASSWORD) {
			Survey.find(function (err, surveys) {
				if (err) return next(err);
				res.render('surveys/index', {
					title: 'Surveys - One Click Survey',
					surveys: surveys
				});
			});
		}
		else {
			return res.send(401, 'Unauthorized');
		}
	},

	show: function (req, res, next) {
		if (req.params.nameHash) {
			var buf = new Buffer(req.params.nameHash, 'base64')
			var surveyName = buf.toString();
			Survey.find(
				{ name: surveyName },
				function(findErr, surveys) {
					if (!findErr) {
						// Found!
						if (surveys[0] !== undefined) {
							var survey = surveys[0];

							var optionValues = _.values(survey.votes);
							var optionCount = _.countBy(optionValues, function (option) {
								return option;
							});
							var optionCountArray = _.pairs(optionCount);
							optionCountArray = _.sortBy(optionCountArray, function (option) { return -option[1]; });

							res.render('surveys/show', {
								title: survey.name + ' - One Click Survey',
								survey: survey,
								optionCount: optionCountArray
							});
						}
					}
					else {
						// Error
						res.send(404, findErr);
					}
				}
			);
		}
		else {
			return res.send(401, 'Unauthorized');
		}
	},

	click: function (req, res, next) {
		if (req.query.user) {
			var surveyName = req.params.survey;
			var optionName = req.params.option;
			var userId = req.query.user.replace(/\./g, '_');

			var searchParams = { name: surveyName };

			Survey.find(
				searchParams,
				function(findErr, surveys) {
					if (!findErr) {
						// Found!
						if (surveys[0] !== undefined) {
							var survey = surveys[0];

							survey.votes = survey.votes || {};
							survey.votes[userId] = optionName;

							// Fix URL
							var urlWithOption = survey.redirectUrl;
							urlWithOption += (urlWithOption.indexOf('?') === -1 ? '?' : '&') + 'surveyOption=' + optionName;

							Survey.update( { name: surveyName }, { $set: {votes: survey.votes} }, function (updateErr, numberAffected, raw) {
								if (!updateErr) {
									res.render('surveys/click', {
										title: 'One Click Survey - redirecting...',
										survey: survey,
										optionName: optionName,
										redirectUrl: urlWithOption
									});
								}
								else {
									// Error
									res.send(500, updateErr);
								}

							});
						}
						else {
							// Error
							res.send(404, 'Survey not found');
						}
					}
					else {
						// Error
						res.send(404, findErr);
					}
				}
			);
		}
		else {
			// Error
			res.send(400, 'User not specified.');
		}


		}

}