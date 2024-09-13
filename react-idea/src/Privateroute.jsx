import React from 'react';
import { Navigate } from 'react-router-dom';
import { getStoredUser } from './components/utils';

const PrivateRoute = ({ children, isAuthenticated }) => {
  isAuthenticated = getStoredUser()
  return isAuthenticated ? children : <Navigate to="/" />;
};

export default PrivateRoute;