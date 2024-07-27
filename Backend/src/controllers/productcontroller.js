const { Product } = require('../models'); // Adjust the path if necessary

// Create a new product
exports.createProduct = async (req, res) => {
  const { productname, description, price } = req.body;

  try {
    const newProduct = await Product.create({
      productname,
      description,
      price,
    });

    res.status(201).json({
      success: true,
      message: 'Product created successfully',
      product: newProduct,
    });
  } catch (error) {
    console.error('Error creating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error creating product',
    });
  }
};

// Get all products
exports.getProducts = async (req, res) => {
  try {
    const products = await Product.findAll();

    res.status(200).json({
      success: true,
      products,
    });
  } catch (error) {
    console.error('Error fetching products:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching products',
    });
  }
};

// Get a product by ID
exports.getProductById = async (req, res) => {
  const { id } = req.params;

  try {
    const product = await Product.findByPk(id);

    if (product) {
      res.status(200).json({
        success: true,
        product,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    console.error('Error fetching product:', error);
    res.status(500).json({
      success: false,
      message: 'Error fetching product',
    });
  }
};

// Update a product
exports.updateProduct = async (req, res) => {
  const { id } = req.params;
  const { productname, description, price } = req.body;

  try {
    const [updated] = await Product.update(
      { productname, description, price },
      { where: { id } }
    );

    if (updated) {
      const updatedProduct = await Product.findByPk(id);
      res.status(200).json({
        success: true,
        message: 'Product updated successfully',
        product: updatedProduct,
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    console.error('Error updating product:', error);
    res.status(500).json({
      success: false,
      message: 'Error updating product',
    });
  }
};

// Delete a product
exports.deleteProduct = async (req, res) => {
  const { id } = req.params;

  try {
    const deleted = await Product.destroy({
      where: { id },
    });

    if (deleted) {
      res.status(200).json({
        success: true,
        message: 'Product deleted successfully',
      });
    } else {
      res.status(404).json({
        success: false,
        message: 'Product not found',
      });
    }
  } catch (error) {
    console.error('Error deleting product:', error);
    res.status(500).json({
      success: false,
      message: 'Error deleting product',
    });
  }
};
