// models/education.ts
import { DataTypes, Model, Sequelize } from "sequelize";

export default (sequelize: Sequelize) => {
  class Education extends Model {
    static associate(db: any) {
      Education.belongsTo(db.Employee, { foreignKey: "employee_id" });
    }
  }

  Education.init(
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
      level: DataTypes.ENUM(
        "TK",
        "SD",
        "SMP",
        "SMA",
        "Strata 1",
        "Strata 2",
        "Doktor",
        "Profesor"
      ),
      description: DataTypes.STRING(255),
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
      tableName: "education",
      createdAt: "created_at",
      updatedAt: "updated_at",
    }
  );
  return Education;
};
