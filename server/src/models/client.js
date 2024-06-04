import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

class Client extends Model {}

Client.init(
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
    Phone: {
      type: DataTypes.STRING,
    },
  },
  {
    sequelize,
    tableName: "client",
    timestamps: false,
  }
);
export default Client;
