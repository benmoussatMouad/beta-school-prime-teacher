import { useAuth } from "context/auth/authContext";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import VuiLoading from "../components/VuiLoading";


const ProtectedRoute = ({ component: Component, ...rest }) => {

  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <VuiLoading />
    );
  }

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? (
          <Component {...props} />
        ) : (
          <Redirect to="/authentication/sign-in" />
        )
      }
    />
  );
};

export default ProtectedRoute;
