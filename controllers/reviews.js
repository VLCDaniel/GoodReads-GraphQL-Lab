const db = require('../models');

module.exports.getAllReviews = () => {
	return db.Review.findAll();
}