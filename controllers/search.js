const db = require('../models');
const { Op } = require('sequelize');

module.exports.search = async (query) => {
	try {
		const users = db.User.findAll({
			where: {
				firstName: { [Op.like]: `%${query}%` }
			}
		});
		const books = db.Book.findAll({
			where: {
				title: { [Op.like]: `%${query}%` }
			}
		});
		const result = await Promise.all([books, users]);

		return [...result[0], ...result[1]]

	} catch (err) {
		console.log(err);
		return []
	}
}