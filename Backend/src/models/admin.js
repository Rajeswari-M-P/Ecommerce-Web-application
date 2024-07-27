

const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('ecom', 'postgres', 'qwert@123', {
  host: 'localhost',
  port: 5432,
  dialect: 'postgres',
});

const Admin = sequelize.define('Admin', {
  username: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  email: {
    type: DataTypes.STRING,
    allowNull: false,
  },
  password: {
    type: DataTypes.STRING,
    allowNull: false,
 
  },
}, {
  tableName: 'admin',  // Ensure table name matches the actual table name in PostgreSQL
  timestamps: false,
});

// Sync the model with the database
const syncDatabase = async () => {
  try {
    await sequelize.sync({ alter: true });
    console.log('Admin Database synced!');
  } catch (error) {
    console.error('Error syncing database:', error);
  }
};

syncDatabase();

module.exports = Admin;
