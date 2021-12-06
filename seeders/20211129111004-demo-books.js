'use strict';
const faker = require('faker');
const db = require('../models');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const allAuthors = await db.Author.findAll();
    const allCategories = await db.Category.findAll();
    const data = [];
    for (let i = 0; i < 100; i++) {
      const authorId = Math.floor(Math.random() * (allAuthors.length - 1));
      const categoryId = Math.floor(Math.random() * (allCategories.length - 1));
      data.push({
        id: i,
        title: faker.name.title(),
        description: faker.commerce.productDescription(),
        releaseDate: faker.date.past(20),
        authorId,
        categoryId,
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Books', data, {});

    const reviews = [];
    const allUsers = await db.User.findAll();
    const allBooks = await db.Book.findAll({ attributes: ['id'] });
    const _status = ['reading', 'read'];
    for (let i = 0; i < 100; i++) {
      const userId = Math.floor(Math.random() * (allUsers.length - 1));
      const bookId = Math.floor(Math.random() * (allBooks.length - 1));
      reviews.push({
        id: i,
        userId,
        bookId,
        status: _status[Math.floor(Math.random() * 2)],
        rating: Math.floor(1 + Math.random() * 5),
        comment: faker.lorem.sentence(),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Reviews', reviews, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete('Books', null, {});
    await queryInterface.bulkDelete('Reviews', null, {});
  }
};
