// // config/database.js
// const { Sequelize } = require('sequelize');
// require('dotenv').config();

// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//     host: process.env.DB_HOST,
//     dialect: 'postgres',
//     port: process.env.DB_PORT,
// });

// module.exports = sequelize;


const { Sequelize, DataTypes } = require("sequelize");
const sequelize = new Sequelize('ecom', 'postgres', 'qwert@123', {
  host: 'localhost',
  dialect: 'postgres',
});
 
// const adminDb = new Sequelize('Admin', 'postgres', 'qwert@123', {
//     host: 'localhost',
//     dialect: 'postgres',
//   });
const User = require("../src/models/users")(sequelize,DataTypes)
const dashboard = require("../src/models/dashboard")(sequelize, DataTypes);
const CartItem = require("../models/cart")(sequelize, DataTypes);
let db = {};
 
 
db.sequelize = sequelize;
// db.adminDb=adminDb;
db.User = User;
db.dashboard = dashboard ;
 db.CartItem= CartItem;
