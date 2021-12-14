const db = require('../models');
const { Op } = require('sequelize');

module.exports.search = async (query) => {
	try {
		const authors = await db.Author.findAll({
			where: {
				firstName: { [Op.like]: `%${query}%` }
			}
		});
		const books = await db.Book.findAll({
			where: {
				title: { [Op.like]: `%${query}%` }
			}
		});

		return [...authors, ...books]

	} catch (err) {
		console.log(err);
		return []
	}
}