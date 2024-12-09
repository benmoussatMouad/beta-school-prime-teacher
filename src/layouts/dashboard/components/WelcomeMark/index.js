import React from "react";

import { Card, Chip, Icon } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import Box from "@mui/material/Box";
import { useTranslation } from "react-i18next";
import { useVisionUIController } from "../../../../context";
import VuiBadge from "../../../../components/VuiBadge";

const WelcomeMark = ({ user: { user, teacher } }) => {
  const [{ direction }] = useVisionUIController();

  const subject = teacher?.subject;

  const { t, i18n } = useTranslation();

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
            {t("dashboard.welcomeCard.title")}
          </VuiTypography>
          <VuiTypography color="white" variant="h3" fontWeight="bold" mb="18px">
            {user ? (i18n.language === "fr" ? `${user.firstName} ${user.lastName}` : `${user.firstNameAr || user.firstName} ${user.lastNameAr || user.lastName}`) : "User Name"}
            {user && user.role === "ADMIN" && (
              <VuiBadge badgeContent={t("dashboard.welcomeCard.admin")} container color="primary" variant="contained"
                        size="md" sx={{ position: "relative", top: "-1rem", color: "black", ml: "10px" }} />
            )}
            {user && user.role === "ROOT" && (
              <VuiBadge badgeContent={t("dashboard.welcomeCard.superadmin")} container color="success" variant="contained"
                        size="md" sx={{ position: "relative", top: "-1rem", color: "black", ml: "10px" }} />
            )}
          </VuiTypography>
          <VuiTypography color="text" variant="h6" fontWeight="regular" mb="auto">
            {t("dashboard.welcomeCard.description")}
            <br /> {t("dashboard.welcomeCard.subject")} <br />
            {subject ? <Chip sx={{ marginTop: "5px" }} color={"info"} label={t(`subjects.${subject}`)} /> : ""}
          </VuiTypography>
        </VuiBox>

        <VuiTypography
          component="a"
          href="/profile"
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
          {t("dashboard.welcomeCard.link")}
          <Icon sx={{ fontWeight: "bold", ml: "5px" }}>
            {direction === "rtl" ? "arrow_back" : "arrow_forward"}
          </Icon>
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
        {user.profilePic ? <img
          src={user.profilePic.url}
          alt="profile pic"
          style={{
            backgroundSize: "cover",
            // width: "100%",
            height: "100%",
            position: "relative",
            backgroundPositionX: "center",
            backgroundRepeat: "no-repeat",
          }}
        /> : ""}
        <Box
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: `linear-gradient(to ${direction === "rtl" ? "left" : "right"} , rgba(6, 11, 40, 1.0) , rgba(14, 16, 55, 0) 100%)`,
            pointerEvents: "none",
          }}
        >
        </Box>
      </VuiBox>
    </Card>
  );
};

export default WelcomeMark;
