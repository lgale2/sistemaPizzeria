import { DataTypes } from "sequelize";
import { sequelize } from "../config/db.js";

const User = sequelize.define(
  "user",
  {
    Code: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true,
    },
    UserName: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    Password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
  },
  //{
  //     freezeTableName: true,
  //     instanceMethods:{
  //         generateHash(Password){
  //             return bcrypt.hash(Password, bcrypt.genSaltSync(8))
  //         },
  //         validPassword(Password){
  //             return bcrypt.compare(Password, this.Password);
  //         }
  //     }
  //   },
  {
    tableName: "user",
    timestamps: false,
  }
);

export default User;
