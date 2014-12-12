module.exports = {

	index: function (req, res, next) {
		res.render('index', { title: 'one-click-survey' });
	}

}