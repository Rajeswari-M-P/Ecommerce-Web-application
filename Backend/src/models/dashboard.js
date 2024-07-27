// // models/Dashboard.js
// const { Sequelize, DataTypes } = require('sequelize');


// const sequelize = new Sequelize('ecom', 'postgres', 'qwert@123', {
//   host: 'localhost',
//   port: 5432,
//   dialect: 'postgres',
// });

module.exports=(sequelize,DataTypes)=>{


const dashboard = sequelize.define('dashboard', {
  productid: {
    type: DataTypes.INTEGER,
    autoIncrement: true,
    primaryKey: true,

    image: {
        type: DataTypes.BLOB, // Store image URL as text
        allowNull: true,
      },
  },
  productname: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  category: {
    type: DataTypes.STRING,
    allowNull: true,
  },
  price: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
  stock: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  sold: {
    type: DataTypes.INTEGER,
    allowNull: true,
  },
  revenue: {
    type: DataTypes.DECIMAL(10, 2),
    allowNull: true,
  },
 
}, {
  tableName: "dashboard",  // Ensure table name matches the actual table name in PostgreSQL
  timestamps: false,
});

// Sync the model with the database
// const syncDatabase = async () => {
//   try {
//     await sequelize.sync({ force: true });
//     console.log('Dashboard Database synced!');
//   } catch (error) {
//     console.error('Error syncing database:', error);
//   }
// };

// syncDatabase();

return dashboard;
};
