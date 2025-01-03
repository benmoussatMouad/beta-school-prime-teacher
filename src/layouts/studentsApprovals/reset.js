import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Assuming you're using React Router for navigation

const ResetPasswordStudent = () => {
  const location = useLocation();
  const history = useHistory();
  const { t } = useTranslation();

  useEffect(() => {
    // Extract the token from the query string
    const urlParams = new URLSearchParams(location.search);
    const token = urlParams.get("token");

    // Redirect to mobile app with token
    if (token) {
      // Redirect to mobile app with token
      window.location.href = `betaprime://reset-password?token=${token}`;
    } else {
      // Redirect to home page if no token is found
      history.push('/');
    }
  }, [location]);

  return (
    <div
      style={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        height: "100vh",
        backgroundColor: "#f5f5f5",
        color: "#333",
        fontFamily: "Arial, sans-serif",
        textAlign: "center",
        padding: "20px",
        boxSizing: "border-box",
      }}
    >
      <h1
        style={{
          fontSize: "1.5rem",
        }}
      >
        {t("redirect_mobile")}
      </h1>
    </div>
  );
};

export default ResetPasswordStudent;
