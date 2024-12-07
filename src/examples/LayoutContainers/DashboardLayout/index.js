import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import VuiBox from "components/VuiBox";
import VuiButton from "components/VuiButton";
import { setLayout, useVisionUIController } from "context";
import CloseIcon from '@mui/icons-material/Close';
import { Box, CircularProgress, Typography } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useSendVerifyEmail } from "api/auth/sendVerifyEmail";
import { useVerifyEmail } from "api/auth/VerifyEmail";
import VuiAlert from "../../../components/VuiAlert";

function DashboardLayout({ children, user }) {
  const [controller, dispatch] = useVisionUIController();
  const { miniSidenav } = controller;
  const { pathname } = useLocation();
  const { t } = useTranslation();
  const { mutate, isLoading } = useSendVerifyEmail(); // Accessing isLoading state from mutation hook

  const search = useLocation()

  const [showBanner, setShowBanner] = useState(false);
  const [isCooldown, setIsCooldown] = useState(false); // Track cooldown state
  const [cooldownTime, setCooldownTime] = useState(0); // Track remaining cooldown time
  const [isVerifyToken, setIsVerifyToken] = useState('');

  const { isLoading: isVerifyLoading, data } = useVerifyEmail({ token: isVerifyToken })


  const isEmailVerified = user.user.isEmailVerified;

  useEffect(() => {
    setLayout(dispatch, "dashboard");
    if (!isEmailVerified && !data) {
      setShowBanner(true);
    } else {
      setShowBanner(false);
    }
  }, [pathname, isEmailVerified, data]);

  useEffect(() => {
    if (isCooldown) {
      const interval = setInterval(() => {
        setCooldownTime((prevTime) => {
          if (prevTime <= 1) {
            clearInterval(interval);
            setIsCooldown(false);
            return 0;
          }
          return prevTime - 1;
        });
      }, 1000);

      return () => clearInterval(interval); // Cleanup interval on component unmount
    }
  }, [isCooldown]);

  const handleVerifyClick = () => {
    if (isCooldown || isLoading) {
      return; // Don't allow email to be sent during cooldown or if already loading
    }

    mutate('', {
      onSuccess: () => {
        setIsCooldown(true); // Start cooldown after sending the email
        setCooldownTime(60); // Set cooldown to 60 seconds (adjust as needed)
      },
    });
  };

  const handleCloseBanner = () => {
    setShowBanner(false);
  };



  useEffect(() => {
    const queryParams = new URLSearchParams(search.search);
    const tokenFromUrl = queryParams.get("verificationToken");

    if (tokenFromUrl) {
      setIsVerifyToken(tokenFromUrl);
    }
  }, [search]);



  return (
    <VuiBox
      sx={({ breakpoints, transitions, functions: { pxToRem } }) => ({
        p: 3,
        position: "relative",
        minHeight: "100vh",
        [breakpoints.up("xl")]: {
          marginLeft: miniSidenav ? pxToRem(120) : pxToRem(274),
          transition: transitions.create(["margin-left", "margin-right"], {
            easing: transitions.easing.easeInOut,
            duration: transitions.duration.standard,
          }),
        },
      })}
    >
      {/* Banner for unverified email */}
      {showBanner && !isVerifyLoading && (
        <VuiAlert
          color="primary"
          variant="contained"
          sx={({  }) => ({
            // background: "#0A0E32",
            color: "#39003f",
            padding: "2px 20px ",
            minHeight: "0px",
            position: "fixed",
            bottom: 0,
            left: 0,
            right: 0,
            zIndex: 10000,
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderRadius: "0px",
            border: "none",
            margin: "auto",
            boxShadow: "0 4px 8px rgba(0,0,0,0.1)",
            width: "100%"
          })}
        >
          <Typography fontSize="1rem" color="white" variant="caption" sx={{ maxWidth: "80%" }}>
            {t('banner.title')}
          </Typography>
          <Box style={{ display: "flex", alignItems: "center" }}>
            <VuiButton
              onClick={handleVerifyClick}
              color="warning"
              variant="text"
              sx={{ marginRight: "10px", fontSize: "12px", marginLeft: "10px" }}
              disabled={isCooldown || isLoading} // Disable button during cooldown or while loading
            >
              {isLoading ? (
                <CircularProgress size={20} color="info" /> // Show loading spinner while loading
              ) : isCooldown ? (
                `${t('button.buttonCooldown')} (${cooldownTime}s)`
              ) : (
                t('banner.button')
              )}
            </VuiButton>
            <CloseIcon
              onClick={handleCloseBanner}
              sx={{ cursor: "pointer", color: "#fff", fontSize: "20px" }}
            />
          </Box>
        </VuiAlert>
      )}

      {/* The rest of the dashboard content */}
      {children}
    </VuiBox>
  );
}

export default DashboardLayout;
