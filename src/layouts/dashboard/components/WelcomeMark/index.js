import React from "react";

import { Card, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

import gif from "assets/images/zinou-la-colombe.png";
import colors from "../../../../assets/theme/base/colors";
import Box from "@mui/material/Box";

const WelcomeMark = ({user}) => {
  const { black, gradients } = colors;
  const { card } = gradients;

  return (
    <Card sx={() => ({
      height: "340px",
      py: "32px",
      position: "relative",
      background: `rgba(6, 11, 40, 1.0) !important`,
    })}>
      <VuiBox height="100%" display="flex" flexDirection="column" justifyContent="space-between">
        <VuiBox sx={{ zIndex: "1" }}>
          <VuiTypography color="text" variant="button" fontWeight="regular" mb="12px">
            Bienvenue
          </VuiTypography>
          <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
            {user ? `${user.firstName} ${user.lastName}` : "Zinou La Colombe"}
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
            Glad to see you again!
            <br /> Ask me anything.
          </VuiTypography>
        </VuiBox>
        <VuiTypography
          component="a"
          href="#"
          variant="button"
          color="white"
          fontWeight="regular"
          sx={{
            mr: "5px",
            display: "inline-flex",
            alignItems: "center",
            cursor: "pointer",

            "& .material-icons-round": {
              fontSize: "1.125rem",
              transform: `translate(2px, -0.5px)`,
              transition: "transform 0.2s cubic-bezier(0.34,1.61,0.7,1.3)",
            },

            "&:hover .material-icons-round, &:focus  .material-icons-round": {
              transform: `translate(6px, -0.5px)`,
            },
          }}
        >
          Voir mon profile
          <Icon sx={{ fontWeight: "bold", ml: "5px" }}>arrow_forward</Icon>
        </VuiTypography>
      </VuiBox>
      <VuiBox
        sx={{
          position: "absolute",
          right: 0,
          top: 0,
          maxWidth: "300px",
          // width: "51%",
          height: "100%",
          overflow: "hidden",
        }}
      >
        <img
          src={gif}
          alt="animated gif"
          style={{
            backgroundSize: "cover",
            // width: "100%",
            height: "100%",
            position: "relative",
            backgroundPositionX: "center",
            backgroundRepeat: "no-repeat"
          }}
        />
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(to right, rgba(6, 11, 40, 1.0) , rgba(14, 16, 55, 0) 100%)`,
            pointerEvents: "none",
          }}
        >
        </Box>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
