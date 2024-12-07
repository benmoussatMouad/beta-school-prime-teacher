import { useAuth } from "context/auth/authContext";
import React from "react";
import { Redirect, Route } from "react-router-dom";
import VuiLoading from "../components/VuiLoading";


const AdminRoute = ({ component: Component, ...rest }) => {

  const { isAuthenticated, user, isLoading } = useAuth();

  if (isLoading) {
    return (
      <VuiLoading />
    );
  }

  const role = user?.user?.role || null;

  return (
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && (role === "ADMIN" || role === "ROOT") ? (
          <Component {...props} />
        ) : (
          <Redirect to="/authentication/sign-in" />
        )
      }
    />
  );
};

export default AdminRoute;
