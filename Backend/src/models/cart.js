const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('ecom', 'postgres', 'qwert@123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

const User = require('./users');
const Product = require('./product');

const CartItem = sequelize.define('CartItem', {
  userid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'users', // Name of the User model
      key: 'id',      // Column in the User model
    },
    onDelete: 'CASCADE', // Optional: Automatically delete orders if the user is deleted
  },
  productid: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: 'product', // Name of the Product model
      key: 'productid', // Column in the Product model
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
  tableName: 'cart', // Ensure table name matches the actual table name in PostgreSQL
  timestamps: false,     // Disable timestamps if not needed
});

// User.hasMany(CartItem, { foreignKey: 'userid' });
// CartItem.belongsTo(User, { foreignKey: 'userid' });

// Product.hasMany(CartItem, { foreignKey: 'productid' });
// CartItem.belongsTo(Product, { foreignKey: 'productid' });


// const syncDatabase = async () => {
//   try {
//     await User.sync({ force: true }); // Use force to recreate the table
//     console.log('Cart table synced!');
//   } catch (error) {
//     console.error('Error syncing database:', error);
//   } finally {
//     await sequelize.close();
//   }
// };

// syncDatabase();

module.exports = CartItem; // Ensure the model is exported correctly
