const { Sequelize, DataTypes } = require('sequelize');
const sequelize = new Sequelize('ecom', 'postgres', 'qwert@123', {
  host: 'localhost',
  dialect: 'postgres'
});

module.exports = (sequelize, DataTypes) => {
  const User = sequelize.define('User', {
    userid: {
      type: DataTypes.INTEGER,
      autoIncrement: true,
      primaryKey: true, // This sets userid as the primary key
      field: 'id',   // Ensure field name matches the model
    },
    username: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      // unique: true, // Ensure email is unique
    },
    password: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    isadmin: {
      type: DataTypes.BOOLEAN,
      allowNull: false,
      defaultValue: false,
    },
  }, {
    tableName: 'users', // Ensure table name matches the actual table name in PostgreSQL
    timestamps: false,
    freezeTableName: true, // Disable automatic pluralization of table names
  });

  

  return User;
};
