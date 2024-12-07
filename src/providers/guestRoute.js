import { useAuth } from "context/auth/authContext";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import VuiLoading from "../components/VuiLoading";


const GuestRoute = ({ component: Component, ...rest }) => {
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
          <Redirect to="/dashboard" />
        ) : (
          <Component {...props} />
        )
      }
    />
  );
};

export default GuestRoute;
