"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    return queryInterface.bulkInsert("employee", [
      {
        nik: "11012",
        name: "Budi",
        is_active: true,
        start_date: "2022-12-12",
        end_date: "2029-12-12",
        created_at: new Date(),
        updated_at: new Date(),
      },
      {
        nik: "11013",
        name: "Jarot",
        is_active: true,
        start_date: "2021-09-01",
        end_date: "2028-09-01",
        created_at: new Date(),
        updated_at: new Date(),
      },
    ]);
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    return queryInterface.bulkDelete("employee", null, {});
  },
};
