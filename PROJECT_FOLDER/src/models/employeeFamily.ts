// models/employeeFamily.ts
import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class EmployeeFamily extends Model {
    static associate(db: any) {
      EmployeeFamily.belongsTo(db.Employee, { foreignKey: "employee_id" });
    }
  }

  EmployeeFamily.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      employee_id: {
        type: DataTypes.INTEGER,
        references: {
          model: "employee",
          key: "id",
        },
        onDelete: "CASCADE",
      },
      name: DataTypes.STRING(255),
      identifier: DataTypes.STRING(255),
      job: DataTypes.STRING(255),
      place_of_birth: DataTypes.STRING,
      date_of_birth: DataTypes.DATE,
      religion: DataTypes.ENUM(
        "Islam",
        "Katolik",
        "Buda",
        "Protestan",
        "Konghucu"
      ),
      is_life: DataTypes.BOOLEAN,
      is_divorced: DataTypes.BOOLEAN,
      relation_status: DataTypes.ENUM("Suami", "Istri", "Anak", "Anak Sambung"),
      created_by: DataTypes.STRING(255),
      updated_by: DataTypes.STRING(255),
      created_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        field: "created_at",
      },
      updated_at: {
        allowNull: false,
        type: DataTypes.DATE,
        defaultValue: Sequelize.literal("NOW()"),
        field: "updated_at",
      },
    },
    {
      sequelize,
      tableName: "employee_family",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return EmployeeFamily;
};
