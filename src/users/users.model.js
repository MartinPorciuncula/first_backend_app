import { DataTypes } from "sequelize";
import {sequelize} from "../config/database/database.js";

const User = sequelize.define("user", {
  id: {
    primaryKey: true,
    allowNull: false,
    autoIncrement: true,
    type: DataTypes.INTEGER,
    field: "user_id",
  },

  name: {
    allowNull: false,
    type: DataTypes.STRING(100),
  },
  email: {
    allowNull: false,
    type: DataTypes.STRING(100),
    unique: true,
  },

  password: {
    allowNull: false,
    type: DataTypes.STRING(100),
    unique: false,
  },

  role: {
    type: DataTypes.ENUM('employee', 'client'),
    allowNull: false,
  },

  status: {
    type: DataTypes.ENUM("available", "disabled"),
    allowNull: false,
    defaultValue: "available",
  },
});

export default User;
