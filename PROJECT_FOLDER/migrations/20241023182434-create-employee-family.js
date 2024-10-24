//migrations/create-employee-family.js
"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    /**
     * Add altering commands here.
     *
     * Example:
     * await queryInterface.createTable('users', { id: Sequelize.INTEGER });
     */
    await queryInterface.createTable("employee_family", {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER,
      },
      employee_id: {
        type: Sequelize.INTEGER,
        allowNull: false,
        references: {
          model: "employee",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      name: {
        type: Sequelize.STRING(255),
      },
      identifier: {
        type: Sequelize.STRING(255),
      },
      job: {
        type: Sequelize.STRING(255),
      },
      place_of_birth: {
        type: Sequelize.STRING,
      },
      date_of_birth: {
        type: Sequelize.DATE,
      },
      religion: {
        type: Sequelize.ENUM(
          "Islam",
          "Katolik",
          "Buda",
          "Protestan",
          "Konghucu"
        ),
      },
      is_life: {
        type: Sequelize.BOOLEAN,
      },
      is_divorced: {
        type: Sequelize.BOOLEAN,
      },
      relation_status: {
        type: Sequelize.ENUM("Suami", "Istri", "Anak", "Anak Sambung"),
      },
      created_by: {
        type: Sequelize.STRING(255),
      },
      updated_by: {
        type: Sequelize.STRING(255),
      },
      created_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        field: "created_at",
      },
      updated_at: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        field: "updated_at",
      },
    });
  },

  async down(queryInterface, Sequelize) {
    /**
     * Add reverting commands here.
     *
     * Example:
     * await queryInterface.dropTable('users');
     */
    await queryInterface.dropTable("employee_family");
  },
};
