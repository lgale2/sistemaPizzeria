import { Model, DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";
import Client from "../models/client.js";

class Address extends Model {}

Address.init(
  {
    Code: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    Address: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Client: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: Client,
        key: "Code",
      },
      field: "Client",
    },
  },
  {
    sequelize,
    tableName: "address",
    timestamps: false,
  }
);

Client.hasMany(Address, { foreignKey: "Client" });
Address.belongsTo(Client, { foreignKey: "Client", as: "ClientAssociation" });

export default Address;
