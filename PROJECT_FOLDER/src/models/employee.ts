import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class Employee extends Model {
    static associate(db: any) {
      Employee.hasOne(db.EmployeeProfile, {
        foreignKey: "employee_id",
        as: "employee_profile",
      });
      Employee.hasMany(db.EmployeeFamily, {
        foreignKey: "employee_id",
        as: "employee_family",
      });
      Employee.hasMany(db.Education, {
        foreignKey: "employee_id",
        as: "education",
      });
    }
  }
  Employee.init(
    {
      id: {
        type: DataTypes.INTEGER,
        autoIncrement: true,
        primaryKey: true,
      },
      nik: {
        type: DataTypes.STRING,
      },
      name: {
        type: DataTypes.STRING,
      },
      is_active: {
        type: DataTypes.BOOLEAN,
      },
      start_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      end_date: {
        allowNull: false,
        type: DataTypes.DATE,
      },
      created_by: {
        type: DataTypes.STRING,
      },
      updated_by: {
        type: DataTypes.STRING,
      },
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
      tableName: "employee",
      timestamps: true,
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Employee;
};
