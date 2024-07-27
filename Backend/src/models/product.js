// models/Product.js
const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('ecom', 'postgres', 'qwert@123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});


const Product = sequelize.define('Product', {
  productid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,
  },
    productname: {
        type: DataTypes.STRING,
        allowNull: false,
    },
    description: {
        type: DataTypes.TEXT,
        allowNull: false,
    },
    price: {
        type: DataTypes.FLOAT,
        allowNull: false,
  
    },
}, {
  tableName: 'product',  // Ensure table name matches the actual table name in PostgreSQL
  timestamps: false,
});

// Sync the model with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Product Database synced!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

module.exports = Product;

