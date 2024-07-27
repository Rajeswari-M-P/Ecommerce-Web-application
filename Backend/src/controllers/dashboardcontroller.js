const { dashboard } = require('../models/dashboard'); // Import the Dashboard model

// Get all products
const getAllProducts = async (req, res) => {
  try {
    const products = await dashboard.findAll();
    res.status(200).json(products);
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({ success: false, message: 'Error fetching products' });
  }
};

// Add a new product
const addProduct = async (req, res) => {
  const { productname, category, price, stock, sold, revenue, image } = req.body;

  try {
    const newProduct = await dashboard.create({
      productname,
      category,
      price,
      stock,
      sold,
      revenue,
      image
    });
    res.status(201).json({ success: true, message: 'Product added successfully', product: newProduct });
  } catch (error) {
    console.error('Error adding product:', error);
    res.status(500).json({ success: false, message: 'Error adding product' });
  }
};

// Update a product
const updateProduct = async (req, res) => {
  const { productid} = req.params;
  const { image, productname, category, price, stock, sold, revenue } = req.body;

  try {
    const [updated] = await dashboard.update(
      { image, productname, category, price, stock, sold, revenue },
      { where: { productid } }
    );

    if (updated) {
      const updatedProduct = await dashboard.findOne({ where: { productid } });
      res.status(200).json({ success: true, message: 'Product updated successfully', product: updatedProduct });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({ success: false, message: 'Error updating product' });
  }
};

// Delete a product
const deleteProduct = async (req, res) => {
  const { productid } = req.params;

  try {
    const deleted = await dashboard.destroy({ where: { productid } });

    if (deleted) {
      res.status(200).json({ success: true, message: 'Product deleted successfully' });
    } else {
      res.status(404).json({ success: false, message: 'Product not found' });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({ success: false, message: 'Error deleting product' });
  }
};

module.exports = {
  getAllProducts,
  addProduct,
  updateProduct,
  deleteProduct
};
