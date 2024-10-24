// models/index.ts
import dotenv from "dotenv";
import { Sequelize, DataTypes } from "sequelize";
import config from "../../config/config";

dotenv.config();

const env = process.env.NODE_ENV || "development";

interface DB {
  [key: string]: any;
  sequelize: Sequelize;
  Sequelize: typeof Sequelize;
}

const sequelize = new Sequelize(
  config[env].database!,
  config[env].username!,
  config[env].password!,
  {
    host: config[env].host,
    dialect: config[env].dialect as
      | "mysql"
      | "postgres"
      | "sqlite"
      | "mariadb"
      | "mssql",
    port: Number(config[env].port) || 5432,
    logging: false,
    ...(env === "production"
      ? { dialectOptions: {} }
      : {
          dialectOptions: {
            ssl: {
              require: config[env].dialectOptions?.ssl?.require || false,
              rejectUnauthorized:
                config[env].dialectOptions?.ssl?.rejectUnauthorized || false,
            },
          },
        }),
  }
);

const db: DB = {
  sequelize: sequelize,
  Sequelize: Sequelize,
};

db.Employee = require("./employee").default(sequelize, DataTypes);
db.EmployeeProfile = require("./employeeProfile").default(sequelize, DataTypes);
db.Education = require("./education").default(sequelize, DataTypes);
db.EmployeeFamily = require("./employeeFamily").default(sequelize, DataTypes);

Object.keys(db).forEach((modelName) => {
  if (db[modelName].associate) {
    db[modelName].associate(db);
  }
});

export default db;
