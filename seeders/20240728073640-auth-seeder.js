'use strict';

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
    await queryInterface.bulkInsert('auths', [
      {
        name: 'John Doe',
        email:'jhondoe@gmail.com',
        address:'abc',
        password:'123456'
      },
      {
        name: 'Joydip Manna',
        email:'joydip@gmail.com',
        address:'narajole',
        password:'123456'
      }
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete('auths', null, {});
  }
};
