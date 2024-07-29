import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from './AuthContext';

const Navbar = () => {
  const { authUser } = useContext(AuthContext);

  return (
    <nav>
      <ul className="nav-links">
        <li><Link to="/">Home</Link></li>
        {!authUser && (
          <>
            <li><Link to="/register">Register</Link></li>
          </>
        )}
        {authUser && (
          <>
            <li><Link to="/register">Register</Link></li>
            {authUser.role === 'user' && <li><Link to="/cart">Cart</Link></li>}
            {authUser.role === 'admin' && <li><Link to="/dashboard">Dashboard</Link></li>}
          </>
        )}
      </ul>
    </nav>
  );
};

export default Navbar;
