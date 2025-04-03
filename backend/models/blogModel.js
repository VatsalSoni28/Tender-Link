// models/Blog.js

const { Sequelize } = require("sequelize");
const sequelize = require("../database/connection");

const Blog = sequelize.define('Blog', {
  blogId: {
    type: Sequelize.DataTypes.INTEGER,
    primaryKey: true,
    autoIncrement: true,
    allowNull: false,
  },
  name: {
    type: Sequelize.DataTypes.STRING,
    allowNull: false,
  },
  description: {
    type: Sequelize.DataTypes.TEXT, // TEXT type for longer content
    allowNull: false,
  },
  date: {
    type: Sequelize.DataTypes.DATE,
    allowNull: false,
    defaultValue: Sequelize.NOW, // Automatically sets the current date
  },
  
});

module.exports = Blog;
