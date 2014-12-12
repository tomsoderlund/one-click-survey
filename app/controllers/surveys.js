'use strict';

var mongoose = require('mongoose');
var Survey = mongoose.model('Survey');

module.exports = {

	index: function (req, res, next) {
		Survey.find(function (err, surveys) {
			if (err) return next(err);
			res.render('surveys/index', {
				title: 'One Click Survey',
				surveys: surveys
			});
		});
	},

	clickOption: function (req, res, next) {

console.log('clickOption', req.params);
		var surveyName = req.params.survey;
		var optionName = req.params.option;

		var searchParams = { name: surveyName };

		Survey.find(
			searchParams,
			function(findErr, surveys) {
				if (!findErr) {
					// Found!
					if (surveys[0] !== undefined) {
						surveys[0].surveyOptions = surveys[0].surveyOptions || {};
						surveys[0].surveyOptions[optionName] = surveys[0].surveyOptions[optionName] || { count: 0 };
						surveys[0].surveyOptions[optionName].count = surveys[0].surveyOptions[optionName].count + 1;

						Survey.update( { name: surveyName }, { $set: {surveyOptions: surveys[0].surveyOptions} }, function (updateErr, numberAffected, raw) {
							if (!updateErr) {
								res.render('surveys/click', {
									title: 'One Click Survey - redirecting...',
									survey: surveys[0],
									optionName: optionName,
									optionCount: surveys[0].surveyOptions[optionName].count
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
					res.send(500, findErr);
				}
			}
		);
	}

}