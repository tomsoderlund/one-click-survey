# One Click Survey

API service for a “click counter”, e.g. for creating simple one-click email surveys.

## Usage

1) Create a new survey (see “Create new survey” under [API](#api) below).

2) Send an email to a group of users with multi-choice questions:

> “What flavour is your favourite?
> 
> 1. Chocolate (link to `http://localhost:3004/flavour_survey/chocolate?user=[USER_ID]`)
> 2. Strawberry (link to `http://localhost:3004/flavour_survey/strawberry?user=[USER_ID]`)
> 3. Vanilla (link to `http://localhost:3004/flavour_survey/vanilla?user=[USER_ID]`)”

or:

> “How likely is it you would recommend our product (1-3, where 3 is best)?
> 
> 1. (link to `http://localhost:3004/recommend_survey/1?user=[USER_ID]`)
> 2. (link to `http://localhost:3004/recommend_survey/2?user=[USER_ID]`)
> 3. (link to `http://localhost:3004/recommend_survey/3?user=[USER_ID]`)”

[USER_ID] can be any unique identifier for the user (email, internal user ID), and verifies that each user is only counted _once_, and that each user only gets _one_ vote.

3) See a report on what the users clicked the most: `http://localhost:3004/surveys?password=MYPASSWORD`

> flavour_survey
>
> chocolate: 42
> strawberry: 25
> vanilla: 7

## How to Run

Just start with:

	# Set password used in API requests
	export ONECLICKSURVEY_PASSWORD=MYPASSWORD

	grunt

Server will default to **http://localhost:3004**

## Survey properties	

* `name`: your own unique name/reference to this survey.
* `redirectUrl`: where to forward the user after clicking.

## API

List surveys

	curl http://localhost:3004/api/surveys?password=MYPASSWORD

Create new survey:

	curl -X POST -H "Content-Type: application/json" -d '{ "name": "my_survey", "redirectUrl": "http://www.google.com" }' http://localhost:3004/api/surveys?password=MYPASSWORD

Update survey:

	curl -X PUT -H "Content-Type: application/json" -d '{ "name": "my_new_survey", "redirectUrl": "https://duckduckgo.com" }' http://localhost:3004/api/surveys/548cbb2b1ad50708212193d8?password=MYPASSWORD

Delete survey:

	curl -X DELETE http://localhost:3004/api/surveys/5477a6f88906b9fc766c843e?password=MYPASSWORD

Delete all surveys:

	curl -X DELETE http://localhost:3004/api/surveys/ALL?password=MYPASSWORD

## Implementation

Based on the [Yeoman Express generator](https://github.com/petecoop/generator-express) with the "MVC" option.
Built on Node.js, Express (with EJS) and MongoDB.

## Deploying on Heroku

	# Set up and configure app
	heroku create MYAPPNAME
	heroku addons:add mongolab
	heroku config:set NODE_ENV=production

	# Set password used in API requests
	heroku config:set ONECLICKSURVEY_PASSWORD=MYPASSWORD
