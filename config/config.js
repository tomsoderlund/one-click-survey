var path = require('path'),
	rootPath = path.normalize(__dirname + '/..'),
	env = process.env.NODE_ENV || 'development';

var config = {

	development: {
		root: rootPath,
		app: {
			name: 'one-click-survey'
		},
		port: 3004,
		db: 'mongodb://localhost/one-click-survey-development'
		
	},

	test: {
		root: rootPath,
		app: {
			name: 'one-click-survey'
		},
		port: 3000,
		db: 'mongodb://localhost/one-click-survey-test'
		
	},

	production: {
		root: rootPath,
		app: {
			name: 'one-click-survey'
		},
		port: 3000,
		db: process.env.MONGOHQ_URL || 'mongodb://localhost/one-click-survey-production'

	}

};

module.exports = config[env];