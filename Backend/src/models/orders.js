const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('ecom', 'postgres', 'qwert@123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

// Define the Orders model
const Orders = sequelize.define('Orders', {
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the User model
      key: 'userid',      // Column in the User model
    },
    onDelete: 'CASCADE', // Optional: Automatically delete orders if the user is deleted
  },
  productid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'product', // Name of the Product model
      key: 'productid',         // Column in the Product model
    },
    onDelete: 'CASCADE', // Optional: Automatically delete orders if the product is deleted
  },
  quantity: {
    type: DataTypes.INTEGER,
    allowNull: false,
  },
  totalprice: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: false,
  },
}, {
  tableName: 'orders', // Ensure table name matches the actual table name in PostgreSQL
  timestamps: false,   // Disable timestamps if not needed
});

// Sync the model with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Orders Database synced!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

module.exports = Orders;
