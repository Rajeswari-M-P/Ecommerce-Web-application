// import React, { useContext } from 'react';
// import { List, Button, Divider, Avatar, Select } from 'antd';
// import { CartContext } from './CartContext';

// import axios from 'axios'; // Import axios for HTTP requests

// const Cart = () => {
//   const { cartItems, updateCartItem, removeFromCart } = useContext(CartContext);

//   const handleQuantityChange = (itemId, value) => {
//     updateCartItem(itemId, { quantity: value });
//   };

//   const handleCheckout = async () => {
//     try {
//       // Ensure `userid` is defined and valid
//       const userid = 1; // Replace with actual user ID logic
      
//       // Prepare data to send to server
//       const checkoutData = {
//         cartItems: cartItems.map(item => ({
//           productid: item.productid,
//           userid: userid, // Ensure this is the correct user ID
//           productname: item.name,
//           quantity: item.quantity,
//           totalprice: item.price * item.quantity
//         })),
//         userid: userid // Send user ID separately
//       };
//       console.log("checkoutData", checkoutData);
      
//       // Send POST request to server
//       const response = await axios.post('http://localhost:5000/cart', checkoutData);
  
//       // Handle success response
//       console.log('Checkout successful:', response.data);
      
//       // Optionally, clear cartItems or handle navigation to success page
//     } catch (error) {
//       // Handle error
//       console.error('Error during checkout:', error);
//     }
//   };
  
//   const getTotalPrice = () => {
//     return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
//   };

//   return (
//     <div style={{ padding: '20px' }}>
//       <h2>Cart Summary</h2>
//       <Divider />
//       <h3>Selected Products</h3>
//       <List
//         itemLayout="horizontal"
//         dataSource={cartItems}
//         renderItem={item => (
//           <List.Item
//             actions={[
//               <Button type="link" onClick={() => removeFromCart(item.id)}>Remove</Button>
//             ]}
//           >
//             <List.Item.Meta
//               avatar={<Avatar src={item.image} shape="square" size={64} />}
//               title={item.name}
//               description={
//                 <>
//                   <div>Details: {item.details}</div>
//                   <div>Price: ${item.price.toFixed(2)}</div>
//                   <div>Quantity: {item.quantity}</div>
//                   <Select
//                     style={{ width: 160, marginBottom: 8 }}
//                     placeholder="Select Quantity"
//                     value={item.quantity}
//                     onChange={(value) => handleQuantityChange(item.id, value)}
//                   >
//                     {[...Array(10).keys()].map(i => (
//                       <Select.Option key={i + 1} value={i + 1}>{i + 1}</Select.Option>
//                     ))}
//                   </Select>
//                 </>
//               }
//             />
//             <div>${(item.price * item.quantity).toFixed(2)}</div>
//           </List.Item>
//         )}
//       />
//       <Divider />
//       <p>Total Amount: ${getTotalPrice().toFixed(2)}</p>
//       <Divider />
//       <Button type="primary" style={{ width: '20%' }} onClick={handleCheckout}>Proceed to Checkout</Button>
//     </div>
//   );
// };

// export default Cart;

import React, { useContext } from 'react';
import { List, Button, Divider, Avatar, Select } from 'antd';
import { CartContext } from './CartContext';
import { UserContext } from './UserContext'; // Import UserContext
import axios from 'axios'; // Import axios for HTTP requests

const Cart = () => {
  const { cartItems, updateCartItem, removeFromCart } = useContext(CartContext);
  const { user } = useContext(UserContext); // Get user from UserContext

  const handleQuantityChange = (itemId, value) => {
    updateCartItem(itemId, { quantity: value });
  };

  const handleCheckout = async () => {
    try {
      if (!user || !user.id) {
        console.error('User is not logged in');
        return;
      }

      const userId = user.id;

      const checkoutData = {
        cartItems: cartItems.map(item => ({
          productid: item.productid,
          userid: userId, // Use userId instead of userid
          productname: item.name,
          quantity: item.quantity,
          totalprice: item.price * item.quantity
        })),
        //userid: userId // Send user ID separately
      };

      console.log("checkoutData", checkoutData);
      
      const response = await axios.post('http://localhost:5000/cart', checkoutData);

      console.log('Checkout successful:', response.data);
      
    } catch (error) {
      console.error('Error during checkout:', error);
    }
  };

  const getTotalPrice = () => {
    return cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  };

  return (
    <div style={{ padding: '20px' }}>
      <h2>Cart Summary</h2>
      <Divider />
      <h3>Selected Products</h3>
      <List
        itemLayout="horizontal"
        dataSource={cartItems}
        renderItem={item => (
          <List.Item
            actions={[
              <Button type="link" onClick={() => removeFromCart(item.id)}>Remove</Button>
            ]}
          >
            <List.Item.Meta
              avatar={<Avatar src={item.image} shape="square" size={64} />}
              title={item.name}
              description={
                <>
                  <div>Details: {item.details}</div>
                  <div>Price: ${item.price.toFixed(2)}</div>
                  <div>Quantity: {item.quantity}</div>
                  <Select
                    style={{ width: 160, marginBottom: 8 }}
                    placeholder="Select Quantity"
                    value={item.quantity}
                    onChange={(value) => handleQuantityChange(item.id, value)}
                  >
                    {[...Array(10).keys()].map(i => (
                      <Select.Option key={i + 1} value={i + 1}>{i + 1}</Select.Option>
                    ))}
                  </Select>
                </>
              }
            />
            <div>${(item.price * item.quantity).toFixed(2)}</div>
          </List.Item>
        )}
      />
      <Divider />
      <p>Total Amount: ${getTotalPrice().toFixed(2)}</p>
      <Divider />
      <Button type="primary" style={{ width: '20%' }} onClick={handleCheckout}>Proceed to Checkout</Button>
    </div>
  );
};

export default Cart;
