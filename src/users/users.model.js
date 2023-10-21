import { DataTypes } from "sequelize";
import {sequelize} from "../config/database/database.js";
import { encryptedPassword } from "../plugins/encrypted-password-plugin.js";

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
},{
  hooks: {
    beforeCreate: async (user) => {
      user.password = await encryptedPassword(user.password
      )
    }
  }
});

export default User;
