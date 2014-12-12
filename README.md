# One Click Survey

API service for creating simple one-click email surveys.

## How to Run

Just start with:

	# Set password used in API requests
	export ONECLICKSURVEY_PASSWORD=MYPASSWORD

	grunt

Server will default to **http://localhost:3004**

## Usage

	http://localhost:3004/api/surveys

API requests:

	curl -X POST -H "Content-Type: application/json" -d '{ "name": "my_survey", "redirectUrl": "http://www.google.com" }' http://localhost:3004/api/surveys?password=MYPASSWORD
	curl -X POST -H "Content-Type: application/json" -d '{ "name": "my_survey_with_options", "redirectUrl": "http://www.google.com", "surveyOptions": { "option1": {"count": 1}, "option2": {"count": 0} } }' http://localhost:3004/api/surveys?password=MYPASSWORD

	curl -X DELETE http://localhost:3004/api/surveys/5477a6f88906b9fc766c843e?password=MYPASSWORD
	curl -X DELETE http://localhost:3004/api/surveys/ALL?password=MYPASSWORD

## Implementation

Based on the [Yeoman Express generator](https://github.com/petecoop/generator-express) with the "MVC" option.

## Deploying on Heroku

	# Set up and configure app
	heroku create MYAPPNAME
	heroku addons:add mongolab
	heroku config:set NODE_ENV=production

	# Set password used in API requests
	heroku config:set ONECLICKSURVEY_PASSWORD=MYPASSWORD
