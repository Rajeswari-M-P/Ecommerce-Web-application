// import React from 'react';
// import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

// import RegistrationForm from './components/RegistrationForm';
// import Cart from './components/cart';
// import ProductCarousel from './components/carousel';
// import { UserProvider } from './components/UserContext';
// import Products from './components/Products';
// import { CartProvider } from './components/CartContext';
// import AdminDashboard from './components/admindashboard';
// import RegisterLayout from './components/RegisterLayout'; 
// import AppFooter from './components/footer';

// import './index.css'; // Import the CSS file

// function App() {
//   return (
//     <div className="App">
//       <CartProvider>
//         <BrowserRouter>
//           <header>
//             <div className="title">SHOPPY</div>
//             <nav>
//               <ul className="nav-links">
//                 <li><Link to="/">Home</Link></li>
//                 <li><Link to="/register">Register</Link></li>
//                 <li><Link to="/cart">Cart</Link></li>
//                 <li><Link to="/dashboard">Admin</Link></li>
//               </ul>
//             </nav>
//           </header>
//           <div className="content">
//             <Routes>
//               <Route path="/" element={
//                 <>
//                   <ProductCarousel />
//                   <div style={{ marginTop: '27px' }}>
//                   <Products />
                  
//                   </div>
//                 </>
//               } />
//               <Route path="/" element={<RegisterLayout />}/>
//               <Route path="register" element={<RegistrationForm />} />
//               <Route path="/cart" element={<Cart />} />
//               <Route path="/dashboard" element={<AdminDashboard/>}/>
//             </Routes>
//           </div>
//           <footer>
//             <AppFooter />
//           </footer>
//         </BrowserRouter>
//       </CartProvider>
//     </div>
//   );
// }

// export default App;



import React from 'react';
import { BrowserRouter, Link, Routes, Route } from 'react-router-dom';

import RegistrationForm from './components/RegistrationForm';
import Cart from './components/cart';
import ProductCarousel from './components/carousel';
import { UserProvider } from './components/UserContext';
import Products from './components/Products';
import { CartProvider } from './components/CartContext';
import AdminDashboard from './components/admindashboard';
import RegisterLayout from './components/RegisterLayout'; 
import AppFooter from './components/footer';

import './index.css'; // Import the CSS file

function App() {
  return (
    <div className="App">
      <UserProvider>
        <CartProvider>
          <BrowserRouter>
            <header>
              <div className="title">SHOPPY</div>
              <nav>
                <ul className="nav-links">
                  <li><Link to="/">Home</Link></li>
                  <li><Link to="/register">Register</Link></li>
                  <li><Link to="/cart">Cart</Link></li>
                  <li><Link to="/dashboard">Admin</Link></li>
                </ul>
              </nav>
            </header>
            <div className="content">
              <Routes>
                <Route path="/" element={
                  <>
                    <ProductCarousel />
                    <div style={{ marginTop: '27px' }}>
                      <Products />
                    </div>
                  </>
                } />
                <Route path="/" element={<RegisterLayout />}/>
                <Route path="/register" element={<RegistrationForm />} />
                <Route path="/cart" element={<Cart />} />
                <Route path="/dashboard" element={<AdminDashboard />} />
              </Routes>
            </div>
            <footer>
              <AppFooter />
            </footer>
          </BrowserRouter>
        </CartProvider>
      </UserProvider>
    </div>
  );
}

export default App;
