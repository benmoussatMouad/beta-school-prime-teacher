import React from "react";
import { IconButton, Snackbar, SnackbarContent } from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { hideSnackBar, useVisionUIController } from "../../context";

const VisionUISnackBar = ({ autoHideDuration }) => {
  const [controller, dispatch] = useVisionUIController();
  const { snackBarOpen, snackBarMessage, snackBarSeverity, direction } = controller;

  const handleClose = () => {
    hideSnackBar(dispatch);
  };

  const anchorOrigin =
    direction === "rtl"
      ? { vertical: "bottom", horizontal: "left" }
      : { vertical: "bottom", horizontal: "right" };

  return (
    <Snackbar
      open={snackBarOpen}
      autoHideDuration={autoHideDuration || 6000}
      onClose={handleClose}
      anchorOrigin={anchorOrigin}
    >
      <SnackbarContent
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          backgroundColor: snackBarSeverity === "error" ? "#f44336" : "#0075FF",
          color: "#ffffff",
          borderRadius: "8px",
        }}
        message={
          <span style={{ display: "flex", alignItems: "center" }}>
            {/* You can adjust the margin here as needed */}
            <span style={{ marginRight: direction === "rtl" ? 0 : "8px", marginLeft: direction === "rtl" ? "8px" : 0 }}>
              {snackBarMessage}
            </span>
          </span>
        }
        action={
          <IconButton size="small" color="inherit" onClick={handleClose} style={{
            marginLeft: direction === "rtl" ? "8px" : 0,
            marginRight: direction === "rtl" ? 0 : "8px",
          }}>
            <CloseIcon />
          </IconButton>
        }
      />
    </Snackbar>
  );
};

export default VisionUISnackBar;
