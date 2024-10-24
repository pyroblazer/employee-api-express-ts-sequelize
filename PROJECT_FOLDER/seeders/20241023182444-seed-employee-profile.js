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
    return queryInterface.bulkInsert("employee_profile", [
      {
        employee_id: 1,
        place_of_birth: "Jakarta",
        date_of_birth: "1997-05-02",
        gender: "Laki-Laki",
        is_married: true,
        created_by: "admin",
        created_at: "2022-12-12",
        updated_at: "2022-12-12",
      },
      {
        employee_id: 2,
        place_of_birth: "Sukabumi",
        date_of_birth: "1996-05-02",
        gender: "Laki-Laki",
        is_married: false,
        created_by: "admin",
        created_at: "2022-12-12",
        updated_at: "2022-12-12",
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
    return queryInterface.bulkDelete("employee_profile", null, {});
  },
};
