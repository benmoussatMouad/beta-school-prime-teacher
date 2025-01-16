import DashboardLayout from "../LayoutContainers/DashboardLayout";
import VuiBox from "../../components/VuiBox";
import VuiTypography from "../../components/VuiTypography";
import VuiButton from "../../components/VuiButton";
import React from "react";
import { useTranslation } from "react-i18next";

function NotFound({ user, isDebt }) {

  const { t } = useTranslation();

  return (
    <DashboardLayout user={user}>
      <VuiBox
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        height="80vh" // Center the content vertically
        p={3} // Add some padding
      >
        <VuiTypography
          variant="h5"
          color="white"
          fontWeight="bold"
          mb={2}
          sx={{ textAlign: "center" }}
        >
          {t(isDebt ? "debts.notfound.title" : "course.notfound.title")}
        </VuiTypography>
        <VuiButton
          variant="gradient"
          color="info"
          sx={{ mt: 3 }}
          href={"/dashboard"}
        >
          {t("course.notfound.button")}
        </VuiButton>
      </VuiBox>
    </DashboardLayout>
  );
}

export default NotFound;