import { Box, CircularProgress } from '@mui/material';
import colors from 'assets/theme/base/colors';
import { useAuth } from 'context/auth/authContext';
import React from 'react';
import { Route, Redirect } from 'react-router-dom';

const { dark } = colors

const ProtectedRoute = ({ component: Component, ...rest }) => {

    const { isAuthenticated, isLoading } = useAuth();

    if (isLoading) {
        return (
            <Box
                sx={{
                    display: "flex",
                    background: dark.body,
                    alignItems: "center",
                    justifyContent: "center",
                    position: "fixed",
                    zIndex: 30,
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                }}
            >
                <CircularProgress color="info" />
            </Box>
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
