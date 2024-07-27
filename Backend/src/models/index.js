// const dbConfig=require("./config/database.js");

// const Sequelize=require("sequelize");

// const sequelize=new Sequelize(dbConfig.DB,dbConfig.USER, dbConfig.PASSWORD,{

// host:dbConfig.HOST,

// dialect:dbConfig.dialect,

// operatorsAliases:false,

// pool:{

// max:dbConfig.pool.max,

// min:dbConfig.pool.min,

// acquire:dbConfig.pool.acquire,

// idle:dbConfig.pool.idle

// }});

// const db={};



// db.Sequelize=Sequelize;

// db.sequelize=sequelize;

// db.User=require("./users.js") (sequelize, Sequelize);
// db.Product=require("./product.js") (sequelize, Sequelize);
// db.CartItem=require("./cart.js") (sequelize, Sequelize);
// db.Orders=require("./orders.js") (sequelize, Sequelize);

// module.exports=db;