const CartItem = require('../models/cart'); // Import the CartItem model

const checkoutCart = async (req, res) => {
  const items = req.body;

  try {
    if (!items || items.length === 0) {
      return res.status(400).json({ success: false, message: 'No items to checkout' });
    }

    // Save the cart items to the database
    const createdItems = await CartItem.bulkCreate(items);
    res.status(201).json({ success: true, message: 'Checkout successful', items: createdItems });
  } catch (error) {
    console.error('Error during checkout:', error);
    res.status(500).json({ success: false, message: 'Server error during checkout' });
  }
};

module.exports = { checkoutCart };