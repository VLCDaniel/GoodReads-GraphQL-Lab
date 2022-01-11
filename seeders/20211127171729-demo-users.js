"use strict";
const faker = require("faker");
const bcrypt = require("bcryptjs");

module.exports = {
  up: async (queryInterface, Sequelize) => {
    const data = [];
    for (let i = 0; i < 100; i++) {
      data.push({
        id: i,
        userName: faker.internet.userName(),
        email: faker.internet.email(),
        password: await bcrypt.hash("123456", 10),
        firstName: faker.name.firstName(),
        lastName: faker.name.lastName(),
        createdAt: new Date(),
        updatedAt: new Date(),
        roleId: 0,
      });
    }
    await queryInterface.bulkInsert("Users", data, {});
  },

  down: async (queryInterface, Sequelize) => {
    await queryInterface.bulkDelete("Users", null, {});
  },
};
