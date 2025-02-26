// src/PrivateRoute.jsx
import React from 'react';
import { Navigate } from 'react-router-dom';
import { UseAuth } from './AuthContext';

const PrivateRoute = ({ element: Element, ...rest }) => {
  const { isAuthenticated } = UseAuth();
  return isAuthenticated ? <Element {...rest} /> : <Navigate to="/admin" />;
};

export default PrivateRoute;
