// models/employeeProfile.ts
import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class EmployeeProfile extends Model {
    static associate(db: any) {
      EmployeeProfile.belongsTo(db.Employee, { foreignKey: "employee_id" });
    }
  }

  EmployeeProfile.init(
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
      place_of_birth: DataTypes.STRING,
      date_of_birth: DataTypes.STRING,
      gender: DataTypes.ENUM("Laki-Laki", "Perempuan"),
      is_married: DataTypes.BOOLEAN,
      prof_pict: DataTypes.STRING(255),
      created_by: DataTypes.STRING(255),
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
      tableName: "employee_profile",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return EmployeeProfile;
};
