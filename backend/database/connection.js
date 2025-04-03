const mysql = require("mysql2");
const { Sequelize } = require("sequelize");
const dotenv = require("dotenv");

dotenv.config();

// All this details are in .env file

let host = process.env.DEVELOPMENT_DB;
let database = process.env.DEVELOPMENT_DB_NAME;
let user = process.env.DEVELOPMENT_DB_USER;
let password = process.env.DEVELOPMENT_DB_PASSWORD;


const sequelize = new Sequelize(database, user, password, {
  host: host,
  dialect: process.env.DB_DIALECT,
  logging: false,
  dialectOptions: {
    // Your mysql2 options here
    timezone: "local",
  },
  timezone: process.env.DB_TIMEZONE,
});

module.exports = sequelize;
