import { Sequelize } from "sequelize";
import dotenv from "dotenv";
dotenv.config({ path: "./variables.env" });

export const sequelize = new Sequelize(
  process.env.DB_NAME,
  process.env.DB_USER,
  process.env.DB_PASSWORD,
  {
    host: process.env.DB_HOST,
    dialect: process.env.DB_DIALECT,
  }
);

export const connectionDB = async () => {
  try {
    await sequelize.authenticate();
    console.log("DB Connection");
  } catch (error) {
    console.log(error);
  }
};
