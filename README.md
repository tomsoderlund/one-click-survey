# One Click Survey

API service for creating simple one-click email surveys.

## Usage

1) Create a new survey (see “Create new survey” under [API](#api) below).

2) Send an email to a group of users with multi-choice questions:

> “What flavour is your favourite?
> 
> 1. Chocolate (link to `http://localhost:3004/my_survey/chocolate?user=[USER_ID]`)
> 2. Strawberry (link to `http://localhost:3004/my_survey/strawberry?user=[USER_ID]`)
> 3. Vanilla (link to `http://localhost:3004/my_survey/vanilla?user=[USER_ID]`)”

[USER_ID] can be any unique identifier for the user, and verifies that each user is only counted once.

3) See a report on what the users clicked the most: `http://localhost:3004/surveys?password=MYPASSWORD`

## How to Run

Just start with:

	# Set password used in API requests
	export ONECLICKSURVEY_PASSWORD=MYPASSWORD

	grunt

Server will default to **http://localhost:3004**

## API

	http://localhost:3004/api/surveys

Create new survey:

	curl -X POST -H "Content-Type: application/json" -d '{ "name": "my_survey", "redirectUrl": "http://www.google.com" }' http://localhost:3004/api/surveys?password=MYPASSWORD

Delete survey:

	curl -X DELETE http://localhost:3004/api/surveys/5477a6f88906b9fc766c843e?password=MYPASSWORD

Delete all surveys:

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
