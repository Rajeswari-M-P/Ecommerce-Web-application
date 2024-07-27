// src/components/RegisterLayout.js

import React from 'react';
import { Outlet } from 'react-router-dom';

const RegisterLayout = () => {
  return (
    <div>
      <h2>Registration Page</h2>
      {<Outlet />}
    </div>
  );
};

export default RegisterLayout;
