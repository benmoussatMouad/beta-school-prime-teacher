/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Visionware.

*/

/**
 This file is used for controlling the global states of the components,
 you can customize the states for the different components here.
 */

import { createContext, useContext, useReducer } from "react";

// prop-types is a library for typechecking of props

// The Vision UI Dashboard  Material main context
const VisionUI = createContext();

// Setting custom name for the context which is visible on react dev tools
VisionUI.displayName = "VisionUIContext";

// Vision UI Dashboard React reducer
function reducer(state, action) {
  switch (action.type) {
    case "MINI_SIDENAV": {
      return { ...state, miniSidenav: action.value };
    }
    case "TRANSPARENT_SIDENAV": {
      return { ...state, transparentSidenav: action.value };
    }
    case "SIDENAV_COLOR": {
      return { ...state, sidenavColor: action.value };
    }
    case "TRANSPARENT_NAVBAR": {
      return { ...state, transparentNavbar: action.value };
    }
    case "FIXED_NAVBAR": {
      return { ...state, fixedNavbar: action.value };
    }
    case "OPEN_CONFIGURATOR": {
      return { ...state, openConfigurator: action.value };
    }
    case "DIRECTION": {
      return { ...state, direction: action.value };
    }
    case "LAYOUT": {
      return { ...state, layout: action.value };
    }
    case "SHOW_SNACKBAR": {
      return {
        ...state,
        snackBarOpen: true,
        snackBarMessage: action.payload.message,
        snackBarSeverity: action.payload.severity || "info", // Optional severity level (e.g., success, error)
      };
    }
    case "HIDE_SNACKBAR": {
      return { ...state, snackBarOpen: false, snackBarMessage: "", snackBarSeverity: "info" };
    }
    case "SHOW_BANNER": {
      return { ...state, bannerVisible: true }; // Only toggle visibility
    }
    case "HIDE_BANNER": {
      return { ...state, bannerVisible: false }; // Only toggle visibility
    }
    default: {
      throw new Error(`Unhandled action type: ${action.type}`);
    }
  }
}


// Vision UI Dashboard React context provider
function VisionUIControllerProvider({ children }) {
  const initialState = {
    miniSidenav: false,
    transparentSidenav: false,
    sidenavColor: "info",
    transparentNavbar: false,
    fixedNavbar: true,
    openConfigurator: false,
    direction: "ltr",
    layout: "dashboard",
    snackBarOpen: false,
    snackBarMessage: "",
    snackBarSeverity: "info",
    bannerVisible: false, // Banner visibility flag
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  return <VisionUI.Provider value={[controller, dispatch]}>{children}</VisionUI.Provider>;
}

// Vision UI Dashboard React custom hook for using context
function useVisionUIController() {
  const context = useContext(VisionUI);

  if (!context) {
    throw new Error("useVisionUIController should be used inside the VisionUIControllerProvider.");
  }

  return context;
}


// Context module functions
const setMiniSidenav = (dispatch, value) => dispatch({ type: "MINI_SIDENAV", value });
const setTransparentSidenav = (dispatch, value) => dispatch({ type: "TRANSPARENT_SIDENAV", value });
const setSidenavColor = (dispatch, value) => dispatch({ type: "SIDENAV_COLOR", value });
const setTransparentNavbar = (dispatch, value) => dispatch({ type: "TRANSPARENT_NAVBAR", value });
const setFixedNavbar = (dispatch, value) => dispatch({ type: "FIXED_NAVBAR", value });
const setOpenConfigurator = (dispatch, value) => dispatch({ type: "OPEN_CONFIGURATOR", value });
const setDirection = (dispatch, value) => dispatch({ type: "DIRECTION", value });
const setLayout = (dispatch, value) => dispatch({ type: "LAYOUT", value });
const showSnackBar = (dispatch, message, severity = "info") =>
  dispatch({
    type: "SHOW_SNACKBAR",
    payload: { message, severity },
  });

const hideSnackBar = (dispatch) => dispatch({ type: "HIDE_SNACKBAR" });
// Context module functions for banners
const showBanner = (dispatch) => dispatch({ type: "SHOW_BANNER" });

const hideBanner = (dispatch) => dispatch({ type: "HIDE_BANNER" });


export {
  VisionUIControllerProvider,
  useVisionUIController,
  setMiniSidenav,
  setTransparentSidenav,
  setSidenavColor,
  setTransparentNavbar,
  setFixedNavbar,
  setOpenConfigurator,
  setDirection,
  setLayout,
  showSnackBar,
  hideSnackBar,
  showBanner,
  hideBanner,
};
