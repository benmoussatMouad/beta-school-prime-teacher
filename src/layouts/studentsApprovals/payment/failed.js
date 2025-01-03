import React, { useEffect } from "react";
import { useHistory, useLocation } from "react-router-dom";
import { useTranslation } from "react-i18next"; // Assuming you're using React Router for navigation

// link https://prime-beta-school-teacher.vercel.app/payment/failed?checkout_id=01jg9mea6pqsjm10771zyk1y98

const PaymentFailed = () => {
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
            window.location.href = `betaprime://payment-failed?checkout_id=${checkout_id}`;
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

export default PaymentFailed;
