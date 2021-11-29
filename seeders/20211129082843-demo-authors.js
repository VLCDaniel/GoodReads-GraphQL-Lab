'use strict';
const faker = require('faker');

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    for(let i = 0; i < 100; i++){
      const bday = faker.date.past(80, new Date("2002-01-01"));
      data.push({
        id: i,
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        description: faker.commerce.productDescription(),
        birthday: new Date(bday.getFullYear(), bday.getMonth(), bday.getDay()),
        createdAt: new Date(),
        updatedAt: new Date()
      });
    }
    await queryInterface.bulkInsert('Authors', data, {});
  },

  down: async (queryInterface, Sequelize) => {
     await queryInterface.bulkDelete('Authors', null, {});
  }
};
