import React from "react";
import PropTypes from "prop-types";
import Modal from "@mui/material/Modal";
import VuiBox from "components/VuiBox";

const VuiPopup = ({ open, onClose, children, bgColor, borderRadius, shadow, width, height, sx }) => {
  return (
    <Modal
      open={open}
      onClose={onClose}
      aria-labelledby="popup-title"
      aria-describedby="popup-description"
      sx={sx}
    >
      <VuiBox
        bgColor={bgColor}
        borderRadius={borderRadius}
        shadow={shadow}
        sx={{
          position: "absolute",
          top: "50%",
          left: "50%",
          transform: "translate(-50%, -50%)",
          width: width || "400px",
          height: height || "300px",
          padding: "16px",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          justifyContent: "center",
        }}
      >
        {children}
      </VuiBox>
    </Modal>
  );
};

VuiPopup.propTypes = {
  open: PropTypes.bool.isRequired,
  onClose: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  bgColor: PropTypes.string,
  borderRadius: PropTypes.string,
  shadow: PropTypes.string,
  width: PropTypes.string,
  height: PropTypes.string,
};

export default VuiPopup;
