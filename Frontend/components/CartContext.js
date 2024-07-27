import React, { createContext, useState } from 'react';

export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  const addToCart = (item) => {
    setCartItems([...cartItems, item]);
  };

  const updateCartItem = (itemId, updates) => {
    setCartItems(cartItems.map(item => item.id === itemId ? { ...item, ...updates } : item));//if its id matches itemId, create a new object 
  };
  
  const removeFromCart = (itemId) => {
    setCartItems(cartItems.filter(item => item.id !== itemId));//Filters out items from cartItems where item.id !== itemId, removing the item with the matching itemId from the cart.
  };

  return (
    <CartContext.Provider value={{ cartItems, addToCart,updateCartItem, removeFromCart }}>
      {children}
    </CartContext.Provider>
  );
};


  

  