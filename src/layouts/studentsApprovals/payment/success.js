import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Assuming you're using React Router for navigation

// link https://prime-beta-school-teacher.vercel.app/payment/success?checkout_id=01jg9j6v8ykmnwygk2be2w3cw2

const PaymentSuccess = () => {
    const location = useLocation();
    const history = useHistory();
    const { t } = useTranslation();

    useEffect(() => {
        // Extract the checkout_id from the query string
        const urlParams = new URLSearchParams(location.search);
        const checkout_id = urlParams.get("checkout_id");

        // Redirect to mobile app with token
        if (checkout_id) {
            // Redirect to mobile app with token
            window.location.href = `betaprime://payment-success?checkout_id=${checkout_id}`;
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

export default PaymentSuccess;
