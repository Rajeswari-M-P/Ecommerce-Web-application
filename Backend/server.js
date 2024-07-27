const express = require('express');
const path = require('path');
const { Pool } = require('pg');
const cors = require('cors');
const jwt = require('jsonwebtoken');
const JWT_SECRET= 'randomsecret';
const bcrypt = require('bcrypt'); // Add bcrypt for hashing passwords
const { Sequelize, DataTypes } = require('sequelize'); // Add Sequelize and DataTypes

const app = express();
const port = process.env.PORT || 5000;

require('dotenv').config();


// PostgreSQL connection using Pool
const pool = new Pool({
  user: 'postgres',
  host: 'localhost',
  database: 'ecom',
  password: 'qwert@123',
  port: 5432,
 
});

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));
app.use(cors());

// Sequelize setup
const sequelize = new Sequelize({
  dialect: 'postgres',
  username: 'postgres',
  password: 'qwert@123',
  database: 'ecom',
  host: 'localhost',
  port: 5432,
});

// Define your models here
const User = sequelize.define('User', {

  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  isAdmin: { type: DataTypes.BOOLEAN, defaultValue: false },
}, {
  tableName: 'users',
  timestamps: false, // Disable timestamps if not needed
});

const Admin = sequelize.define('Admin', {
 
  username: { type: DataTypes.STRING, allowNull: false },
  email: { type: DataTypes.STRING, allowNull: false, unique: true },
  password: { type: DataTypes.STRING, allowNull: false },
  
}, {
  tableName: 'admin',
  timestamps: false, // If you don’t have createdAt and updatedAt
});

const DashboardItem = sequelize.define('DashboardItem', {
  productname: { type: DataTypes.STRING, allowNull: false },
  category: { type: DataTypes.STRING, allowNull: false },
  price: { type: DataTypes.FLOAT, allowNull: false },
  stock: { type: DataTypes.INTEGER, allowNull: false },
  sold: { type: DataTypes.INTEGER, defaultValue: 0 },
  revenue: { type: DataTypes.FLOAT, defaultValue: 0 },
  image: { type: DataTypes.STRING },
}, {
  tableName: 'dashboard',
  timestamps: false, // If you don’t have createdAt and updatedAt
});


// const CartItem = sequelize.define('CartItem', {
//   userid: { type: DataTypes.INTEGER, allowNull: false },
//   productid: { type: DataTypes.INTEGER, allowNull: false },
//   quantity: { type: DataTypes.INTEGER, allowNull: false },
//   totalprice: { type: DataTypes.FLOAT, allowNull: false },
// }, {
//   tableName: 'cart',
//   timestamps: false,
// });

// Middleware to authenticate JWT tokens
const authenticateToken = (req, res, next) => {
  const authHeader = req.headers['authorization'];
  const token = authHeader && authHeader.split(' ')[1];

  if (token == null) return res.sendStatus(401);

  jwt.verify(token,JWT_SECRET, (err, user) => {
    if (err) return res.sendStatus(403);
    req.user = user;
    next();
  });
};

// Register route
// app.post('/:role/register', async (req, res) => {
//   const { role } = req.params;
//   const { username, email, password } = req.body;

//   try {
//     // Check if the user/admin already exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(409).json({ message: 'You are already registered' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Determine if the role is admin
//     const isAdmin = role === 'admin';

//     // Create a new user/admin
//     await User.create({ username, email, password: hashedPassword, isAdmin });
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Login Route

// app.post('/:role/login', async (req, res) => {
//   const { role } = req.params;
//   const { email, password } = req.body;

//   try {
//     // Fetch user/admin from the database
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Compare the provided password with the hashed password in the database
//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     // Debugging: Check the value of JWT_SECRET
//     console.log('JWT_SECRET:', process.env.JWT_SECRET);

//     // Generate JWT token
//     const token = jwt.sign(
//       { id: user.userid, email: user.email, isAdmin: user.isAdmin },
//       process.env.JWT_SECRET,
//       {
//         expiresIn: process.env.JWT_EXPIRATION,
//       }
//     );

//     // Send response based on user role
//     res.status(200).json({ message: 'Login successful', user, token, redirect: role === 'admin' ? '/admin' : '/' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.post('/user/register', async (req, res) => {
  const { role } = req.params;
  const { username, email, password } = req.body;

  try {
    // Check if the user/admin already exists
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      return res.status(409).json({ message: 'You are already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Determine if the role is admin
    const isAdmin = role === 'admin';

    // Create a new user/admin
    await User.create({ username, email, password: hashedPassword, isAdmin });
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


app.post('/user/login', async (req, res) => {
  const { role } = req.params;
  const { email, password } = req.body;

  try {
    // Fetch user/admin from the database
    const user = await User.findOne({ where: { email } });

    if (!user) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: user.userid, email: user.email, isAdmin: user.isAdmin },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    // Send response based on user role
    res.status(200).json({ message: 'Login successful', user, token, redirect: role === 'admin' ? '/admin' : '/' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



//admin register and login seperately

// const Admin=require('./src/models/admin')
// Admin Register Route
app.post('/admin/register', async (req, res) => {
  const { username, email, password } = req.body;

  try {
    // Check if the admin already exists
    const existingAdmin = await Admin.findOne({ where: { email } });
    if (existingAdmin) {
      return res.status(409).json({ message: 'Admin already registered' });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create a new admin
    await Admin.create({ username, email, password: hashedPassword });
    res.status(201).json({ message: 'Admin registered successfully' });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



// Admin Login Route
app.post('/admin/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    // Fetch admin from the database
    const admin = await Admin.findOne({ where: { email } });

    if (!admin) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Compare the provided password with the hashed password in the database
    const isMatch = await bcrypt.compare(password, admin.password);
    if (!isMatch) {
      return res.status(401).json({ error: 'Invalid email or password' });
    }

    // Generate JWT token
    const token = jwt.sign(
      { id: admin.id, email: admin.email },
      process.env.JWT_SECRET,
      {
        expiresIn: process.env.JWT_EXPIRATION,
      }
    );

    res.status(200).json({ message: 'Login successful', admin, token });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});





// PUT update product
app.put('/dashboard/:key', async (req, res) => {
  const key = req.params.key;
  const { image, productname, category, price, stock, sold, revenue } = req.body;

  try {
    await DashboardItem.update(
      { image, productname, category, price, stock, sold, revenue },
      { where: { productid: key } }
    );
    res.send('Product updated successfully');
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).send('Error updating product');
  }
});

// DELETE product
app.delete('/dashboard/:key', async (req, res) => {
  const key = req.params.key;

  try {
    await DashboardItem.destroy({ where: { productid: key } });
    res.send('Product deleted successfully');
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).send('Error deleting product');
  }
});

// POST add new product
app.post('/dashboard', async (req, res) => {
  const { productname, category, price, stock, sold, revenue, image } = req.body;

  try {
    await DashboardItem.create({
      productname, category, price, stock, sold, revenue, image
    });
    res.send('Product added successfully');
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).send('Error adding product');
  }
});



const Product = require('./src/models/product');
const CartItem = require('./src/models/cart');

// app.post('/cart', async (req, res) => {
//   try {
//     const { cartItems } = req.body; // Expecting cartItems to be an array from the frontend

//     console.log("Received cartItems:", cartItems); // Debugging output

//     // Check if cartItems is an array
//     if (!Array.isArray(cartItems)) {
//       return res.status(400).json({ error: 'Cart items must be an array.' });
//     }

//     if (cartItems.length === 0) {
//       return res.status(400).json({ error: 'Cart items must be provided and cannot be empty.' });
//     }

//     // Insert each item into the cart table
//     const createdItems = await Promise.all(cartItems.map(item => {
//       return CartItem.create({
//         userid: item.userid,
//         productid: item.productid,
//         quantity: item.quantity,
//         totalprice: item.price, // Ensure this matches your model definition
//       });
//     }));

//     res.status(201).json({ message: 'Items added to cart successfully', createdItems });
//   } catch (error) {
//     console.error('Error during checkout:', error);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });


app.post('/cart', async (req, res) => {
  try {
    const { cartItems } = req.body;

    // Check if cartItems is an array
    if (!Array.isArray(cartItems)) {
      return res.status(400).json({ error: 'Cart items must be an array.' });
    }

    // Check if the array is empty
    if (cartItems.length === 0) {
      return res.status(400).json({ error: 'Cart items must be provided and cannot be empty.' });
    }

    // Log the cart items for debugging
    console.log("Received cart items:", cartItems);

    // Insert each item into the cart table
    const createdItems = await Promise.all(cartItems.map(async (item) => {
      // Log each item being created
      console.log("Creating CartItem with data:", {
        userid: item.userid,
        productid: item.productid,
        quantity: item.quantity,
        totalprice: item.totalprice,
      });

      // Create a new CartItem
      const createdItem = await CartItem.create({
        userid: item.userid,
        productid: item.productid,
        quantity: item.quantity,
        totalprice: item.totalprice,
      });

      return createdItem; // Return the created item for the response
    }));

    res.status(201).json({ message: 'Items added to cart successfully', createdItems });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ error: 'Internal Server Error' });
  }
});


// Define associations (ensure these are outside the route handler)
User.hasMany(CartItem, { foreignKey: 'userid' });
CartItem.belongsTo(User, { foreignKey: 'userid' });

Product.hasMany(CartItem, { foreignKey: 'productid' });
CartItem.belongsTo(Product, { foreignKey: 'productid' });



// Sync models and start server
sequelize.sync().then(() => {
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
});





// const express = require('express');
// const { Sequelize, DataTypes } = require('sequelize');
// const cors = require('cors');
// const jwt = require('jsonwebtoken');
// const bcrypt = require('bcrypt');
// require('dotenv').config();
// // const { pool } = require('pg');


// // Initialize Express
// const app = express();
// app.use(cors());
// app.use(express.json());

// // Initialize Sequelize
// const sequelize = new Sequelize(process.env.DB_NAME, process.env.DB_USER, process.env.DB_PASSWORD, {
//   host: process.env.DB_HOST,
//   dialect: 'postgres',

//   pool: {
//     max: 5, // maximum number of connection in pool
//     min: 0, // minimum number of connection in pool
//     acquire: 30000, // maximum time, in milliseconds, that pool will try to get connection before throwing error
//     idle: 10000 // maximum time, in milliseconds, that a connection can be idle before being released
//   }
// });

// const syncDatabase = async () => {
//   try {
//     await sequelize.sync({ alter: true }); // Sync the database
//     console.log('Database synced!');
//   } catch (error) {
//     console.error('Error syncing database:', error);
//   }
// };


// const port = 5000;





// // // Sync the database
// // const syncDatabase = async () => {
// //   try {
// //     await sequelize.sync({ alter: true });
// //     console.log('Database synced!');
// //   } catch (error) {
// //     console.error('Error syncing database:', error);
// //   }
// // };

// // // Call the sync function
// // syncDatabase();

// // Middleware to authenticate JWT tokens
// const authenticateToken = (req, res, next) => {
//   const authHeader = req.headers['authorization'];
//   const token = authHeader && authHeader.split(' ')[1];

//   if (token == null) return res.sendStatus(401);

//   jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
//     if (err) return res.sendStatus(403);
//     req.user = user;
//     next();
//   });
// };



// // Import the User model
// const UserModel = require('./src/models/users'); // Adjust the path as necessary
// const User = UserModel(sequelize, DataTypes);

// // Define routes
// app.post('/register', async (req, res) => {
//   const { username, email, password, role } = req.body;

//   try {
//     // Check if the user/admin already exists
//     const existingUser = await User.findOne({ where: { email } });
//     if (existingUser) {
//       return res.status(409).json({ message: 'You are already registered' });
//     }

//     // Hash the password
//     const hashedPassword = await bcrypt.hash(password, 10);

//     // Create a new user/admin
//     await User.create({ username, email, password: hashedPassword, isAdmin: role === 'admin' });
//     res.status(201).json({ message: 'User registered successfully' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });

// // Login Route
// app.post('/:role/login', async (req, res) => {
//   const { role } = req.params;
//   const { email, password } = req.body;

//   try {
//     const user = await User.findOne({ where: { email } });

//     if (!user) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const isMatch = await bcrypt.compare(password, user.password);
//     if (!isMatch) {
//       return res.status(401).json({ error: 'Invalid email or password' });
//     }

//     const token = jwt.sign({ id: user.id, email: user.email, isAdmin: user.isAdmin }, process.env.JWT_SECRET, {
//       expiresIn: process.env.JWT_EXPIRATION,
//     });

//     res.status(200).json({ message: 'Login successful', user, token, redirect: role === 'admin' ? '/admin' : '/' });
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ error: 'Internal Server Error' });
//   }
// });



// // Import the DashboardItem model
// const DashboardItemModel = require('./src/models/dashboard'); // Adjust the path as necessary
// const DashboardItem = DashboardItemModel(sequelize, DataTypes);

// // PUT update product
// app.put('/dashboard/:productid', async (req, res) => {
//   const productid = req.params.productid;
//   const { image, productname, category, price, stock, sold, revenue } = req.body;

//   try {
//     await DashboardItem.update(
//       { image, productname, category, price, stock, sold, revenue },
//       { where: { id: productid } }
//     );
//     res.send('Product updated successfully');
//   } catch (error) {
//     console.error('Error updating product:', error);
//     res.status(500).send('Error updating product');
//   }
// });

// // DELETE product
// app.delete('/dashboard/:productid', async (req, res) => {
//   const productid = req.params.productid;

//   try {
//     await DashboardItem.destroy({ where: { id: productid } });
//     res.send('Product deleted successfully');
//   } catch (error) {
//     console.error('Error deleting product:', error);
//     res.status(500).send('Error deleting product');
//   }
// });

// // POST add new product
// app.post('/dashboard', async (req, res) => {
//   const { productname, category, price, stock, sold, revenue, image } = req.body;

//   try {
//     await DashboardItem.create({
//       productname, category, price, stock, sold, revenue, image
//     });
//     res.send('Product added successfully');
//   } catch (error) {
//     console.error('Error adding product:', error);
//     res.status(500).send('Error adding product');
//   }
// });



// // Start the server
// const startServer = async () => {
//   try {
//     await syncDatabase();
//     app.listen(port, () => {
//       console.log(`Server is running on http://localhost:${port}`);
//     });
//   } catch (error) {
//     console.error('Failed to start the server:', error);
//   }
// };

// // Call the function to start the server
// startServer();




  
//   // Ensure the database is synced before starting the server
 
// // Call the function to start the server

