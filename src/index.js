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

import React from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "App";

// Vision UI Dashboard React Context Provider
import { VisionUIControllerProvider } from "context";
import { ReactQueryProvider } from "./providers/queryProvider";
import VisionUISnackBar from "./components/VuiSnackBar";
import { AuthProvider } from "./context/auth/authContext";
import { I18nextProvider } from "react-i18next";
import i18n from "./i18n";

const rootElement = document.getElementById("root");
const root = createRoot(rootElement);


root.render(
  <BrowserRouter>
    <VisionUIControllerProvider>
      <ReactQueryProvider>
        <AuthProvider>
          <VisionUISnackBar/>
          <I18nextProvider i18n={i18n}>
            <App />
          </I18nextProvider>
        </AuthProvider>
      </ReactQueryProvider>
    </VisionUIControllerProvider>
  </BrowserRouter>,
);


