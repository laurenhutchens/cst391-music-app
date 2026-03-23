import React from 'react';
import { Navigate, useLocation } from 'react-router-dom';

const PrivateRoute = (props) => {
  const authorized = props.authorized;
  const location = useLocation();
  console.log('in PrivateRoute', props);
  console.log('in PrivateRoute', location);
  console.log('in PrivateRoute auth ', authorized);
  return authorized ? (
    props.children
  ) : (
    <Navigate to='/login' state={{ from: location }} />
  );
};

export default PrivateRoute;
