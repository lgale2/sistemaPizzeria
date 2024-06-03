import { Sequelize, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const Product = sequelize.define(
  "product",
  {
    Code: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Price: {
      type: DataTypes.DECIMAL,
    },
    Unit: {
      type: DataTypes.INTEGER,
    },
    Tax: {
      type: DataTypes.DECIMAL,
    },
  },
  {
    tableName: "product",
    timestamps: false,
  }
);

export default Product;
