// models/TendorInfo.js

const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection");
const ROLES = require("../helpers/roles");

const TendorInfo = sequelize.define('TendorInfo', {
  tendorId: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  tendorName: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  state: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  phone: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
    validate: {
      isNumeric: true,
      len: [10, 15], // Adjust based on phone number format
    },
  },
});

module.exports = TendorInfo;