/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the software.

*/

import { useEffect, useMemo, useState } from "react";

// react-router components
import { Redirect, Route, Switch, useLocation } from "react-router-dom";

// @mui material components
import { ThemeProvider } from "@mui/material/styles";
import CssBaseline from "@mui/material/CssBaseline";


// Vision UI Dashboard React example components
import Sidenav from "examples/Sidenav";

// Vision UI Dashboard React themes
import theme from "assets/theme";
import themeRTL from "assets/theme/theme-rtl";

// RTL plugins
import rtlPlugin from "stylis-plugin-rtl";
import { CacheProvider } from "@emotion/react";
import createCache from "@emotion/cache";

// Vision UI Dashboard React routes
import routes from "routes";

// Vision UI Dashboard React contexts
import { setMiniSidenav, useVisionUIController } from "context";
import ProtectedRoute from "providers/protectedRoute";
import GuestRoute from "providers/guestRoute";
import { useTranslation } from "react-i18next";
import { useAuth } from "context/auth/authContext";
import { Box, CircularProgress } from "@mui/material";
import colors from "assets/theme/base/colors";
import { setDirection } from "context";

const { dark } = colors

export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const { user, isLoading } = useAuth();  // Get the current authenticated user

  // Cache for the rtl
  useMemo(() => {
    const cacheRtl = createCache({
      key: "rtl",
      stylisPlugins: [rtlPlugin],
    });

    setRtlCache(cacheRtl);
  }, []);

  // Open sidenav when mouse enter on mini sidenav
  const handleOnMouseEnter = () => {
    if (miniSidenav && !onMouseEnter) {
      setMiniSidenav(dispatch, false);
      setOnMouseEnter(true);
    }
  };

  // Close sidenav when mouse leave mini sidenav
  const handleOnMouseLeave = () => {
    if (onMouseEnter) {
      setMiniSidenav(dispatch, true);
      setOnMouseEnter(false);
    }
  };

  // Setting the dir attribute for the body element
  useEffect(() => {
    document.body.setAttribute("dir", direction);
  }, [direction]);

  // Setting page scroll to 0 when changing the route
  useEffect(() => {
    document.documentElement.scrollTop = 0;
    document.scrollingElement.scrollTop = 0;
  }, [pathname]);

  useEffect(() => {
    const language = localStorage.getItem("language");
    if (language === "ar" || language === "fr") {
      i18n.changeLanguage(language);
    }

    if (language === "fr") {
      setDirection(dispatch, "ltr");
    } else {
      setDirection(dispatch, "rtl");
    }
  }, [])

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse); // Recursively process nested routes if any
      }

      if (route.route) {
        if (route.isProtected) {
          // Use ProtectedRoute for protected routes
          return (
            <ProtectedRoute
              exact
              path={route.route}
              component={route.component}
              key={route.key}
            />
          );
        }

        if (route.isGuestOnly) {
          // Use GuestRoute for login or sign-up pages for unauthenticated users only
          return (
            <GuestRoute
              exact
              path={route.route}
              component={route.component}
              key={route.key}
            />
          );
        }

        // Use normal Route for non-protected routes
        return (
          <Route
            exact
            path={route.route}
            component={route.component}
            key={route.key}
          />
        );
      }

      return null;
    });
  if (isLoading) {
    return <Box sx={{ display: "flex", background: dark.body, alignItems: "center", justifyContent: "center", position: "fixed", zIndex: 30, top: 0, left: 0, width: "100%", height: "100%" }} >
      <CircularProgress color={"info"} />
    </Box>
  }
  return direction === "rtl" ? (
    <CacheProvider value={rtlCache}>
      <ThemeProvider theme={themeRTL}>
        <CssBaseline />
        {layout === "dashboard" && user && !isLoading && (
          <>
            <Sidenav
              color={sidenavColor}
              brand="BETA PRIME SCHOOL"
              brandName="BETA PRIME SCHOOL"
              routes={routes}
              onMouseEnter={handleOnMouseEnter}
              onMouseLeave={handleOnMouseLeave}
            />
          </>
        )}
        <Switch>
          {getRoutes(routes)}
          <Redirect from="*" to="/dashboard" />
        </Switch>
      </ThemeProvider>
    </CacheProvider>
  ) : (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      {layout === "dashboard" && user && !isLoading && (
        <>
          <Sidenav
            color={sidenavColor}
            brand="BETA PRIME SCHOOL"
            brandName="BETA PRIME SCHOOL"
            routes={routes}
            onMouseEnter={handleOnMouseEnter}
            onMouseLeave={handleOnMouseLeave}
          />
        </>
      )}
      <Switch>
        {getRoutes(routes)}
        <Redirect from="*" to="/dashboard" />
      </Switch>
    </ThemeProvider>
  );
}

