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
    return queryInterface.bulkInsert("employee_family", [
      {
        employee_id: 1,
        name: "Mami",
        identifier: "32100594109960002",
        job: "Ibu Rumah Tangga",
        place_of_birth: "Denpasar",
        date_of_birth: "1995-10-17",
        religion: "Islam",
        is_life: true,
        is_divorced: false,
        relation_status: "Istri",
        created_by: "admin",
        created_at: "2022-12-12",
        updated_by: "admin",
        updated_at: "2022-12-12",
      },
      {
        employee_id: 1,
        name: "Clara",
        identifier: "32100594109020004",
        job: "Pelajar",
        place_of_birth: "Bangkalan",
        date_of_birth: "2008-10-17",
        religion: "Islam",
        is_life: true,
        is_divorced: false,
        relation_status: "Anak",
        created_by: "admin",
        created_at: "2022-12-12",
        updated_by: "admin",
        updated_at: "2022-12-12",
      },
      {
        employee_id: 1,
        name: "Stephanie",
        identifier: "32100594109020005",
        job: "Pelajar",
        place_of_birth: "Bangkalan",
        date_of_birth: "2008-10-17",
        religion: "Islam",
        is_life: true,
        is_divorced: false,
        relation_status: "Anak",
        created_by: "admin",
        created_at: "2022-12-12",
        updated_by: "admin",
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
    return queryInterface.bulkDelete("employee_family", null, {});
  },
};
