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
import { hideBanner, setDirection, setMiniSidenav, useVisionUIController } from "context";
import ProtectedRoute from "providers/protectedRoute";
import GuestRoute from "providers/guestRoute";
import { useTranslation } from "react-i18next";
import { useAuth } from "context/auth/authContext";
import AdminRoute from "./providers/adminRoute";
import { useVerifyEmail } from "./api/auth/VerifyEmail";
import VuiLoading from "./components/VuiLoading";
import RootRoute from "./providers/rootRoute";


export default function App() {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav, direction, layout, sidenavColor } = controller;
  const [onMouseEnter, setOnMouseEnter] = useState(false);
  const [rtlCache, setRtlCache] = useState(null);
  const { pathname } = useLocation();
  const { i18n } = useTranslation();
  const { user, isLoading } = useAuth();  // Get the current authenticated user
  const [isVerifyToken, setIsVerifyToken] = useState("");

  const search = useLocation();

  const { isLoading: isVerifyLoading, data: emailVerified } = useVerifyEmail({ token: isVerifyToken });

  useEffect(() => {
    const queryParams = new URLSearchParams(search.search);
    const tokenFromUrl = queryParams.get("verificationToken");

    if (tokenFromUrl) {
      setIsVerifyToken(tokenFromUrl);
    }
  }, [search]);

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

  const language = localStorage.getItem("language");

  useEffect(() => {

    if (!language) {
      localStorage.setItem("language", "ar");
    }

    if (language === "ar" || language === "fr") {
      i18n.changeLanguage(language);
    }

    if (language === "fr") {
      setDirection(dispatch, "ltr");
    } else {
      setDirection(dispatch, "rtl");
    }
  }, [language]);

  useEffect(() => {
    if (emailVerified) {
      hideBanner(dispatch);
    }
  }, [emailVerified]);

  if (isVerifyLoading) {
    return <VuiLoading />;
  }

  const getRoutes = (allRoutes) =>
    allRoutes.map((route) => {
      if (route.collapse) {
        return getRoutes(route.collapse); // Recursively process nested routes if any
      }

      if (route.route) {

        if (route.isRoot) {
          // Use RootRoute  for root-protected routes
          return (
            <RootRoute
              exact
              path={route.route}
              component={route.component}
              key={route.key}
            />
          );
        }

        if (route.isAdmin) {
          // Use AdminRoute for admin-protected routes
          return (
            <AdminRoute
              exact
              path={route.route}
              component={route.component}
              key={route.key}
            />
          );
        }

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
              user={user}
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
            user={user}
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

