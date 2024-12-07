import { Box, CircularProgress } from "@mui/material";
import React from "react";
import colors from "../../assets/theme/base/colors";

const { dark } = colors;

const VuiLoading = () => {
  return (
    <Box
      sx={{
        display: "flex",
        background: dark.body,
        alignItems: "center",
        justifyContent: "center",
        position: "fixed",
        zIndex: 10000,
        top: 0,
        left: 0,
        width: "100%",
        height: "100%",
      }}
    >
      <CircularProgress color="info" />
    </Box>
  );
};

export default VuiLoading;
