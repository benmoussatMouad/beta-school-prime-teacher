/*!

=========================================================
* Vision UI Free React - v1.0.0
=========================================================

* Product Page: https://www.creative-tim.com/product/vision-ui-free-react
* Copyright 2021 Creative Tim (https://www.creative-tim.com/)
* Licensed under MIT (https://github.com/creativetimofficial/vision-ui-free-react/blob/master LICENSE.md)

* Design and Coded by Simmmple & Creative Tim

=========================================================

* The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

*/

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Images
// Vision UI Dashboard React base styles
import VuiAvatar from "components/VuiAvatar";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
// Vision UI Dashboard React icons
// Vision UI Dashboard React example components
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import VuiTypography from "../../../../components/VuiTypography";
import { GiOpenBook } from "react-icons/gi";
import { useTranslation } from "react-i18next";
import VuiBadge from "../../../../components/VuiBadge";
import { useAuth } from "../../../../context/auth/authContext";
import { useState } from "react";
import Popper from "@mui/material/Popper/BasePopper";
import i18n from "../../../../i18n";
import { useGetCourse } from "../../../../api/courses/getCourse";
import { useGetTeacher } from "../../../../api/admin";

function Header({ pageName, data, courseOwner }) {
  const { user } = useAuth();
  const { t } = useTranslation();

  // Separate states for handling each Popover
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handlePopoverOpen1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handlePopoverClose1 = () => {
    setAnchorEl1(null);
  };

  const handlePopoverOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverClose2 = () => {
    setAnchorEl2(null);
  };

  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);


  const renderNote = () => {
    switch (data.status) {
      case "UNDER_CREATION":
        return t("UNDER_CREATION");
      case "PENDING":
        return t("PENDING");
      case "ACCEPTED":
        return t("ACCEPTED");
      case "TO_REVIEW":
        return t("TO_REVIEW");
      case "REJECT":
        return <VuiBox>
          <VuiTypography variant="subtitle2" color="white" fontWeight="medium">
            {t("REJECT")}
          </VuiTypography>
          <VuiTypography variant="caption" color="white" fontWeight="medium">
            {t('note')}: {data.statusNote}
          </VuiTypography>
        </VuiBox>;
      default:
        return t("UNKNOWN_STATUS"); // If an unknown status is encountered
    }
  };

  return (
    <VuiBox position="relative">
      <DashboardNavbar pageName={pageName} light />
      {/*<Card sx={{ px: 1, mt: 1 }}>*/}
      {/*  <Grid container alignItems="center" justifyContent="space-between"*/}
      {/*        sx={{ gap: { xs: "16px", sm: "12px", md: "8px" }, color: "white", textAlign: "center" }}>*/}
      {/*    <VuiTypography variant="h6" sx={{ fontWeight: "bold", width: "100%" }} color="white">*/}
      {/*      {renderNote()}*/}
      {/*    </VuiTypography>*/}
      {/*  </Grid>*/}
      {/*</Card>*/}

      <Card sx={{ px: 3, mt: 2 }}>
        <Grid container alignItems="center" justifyContent="space-between"
              sx={{ padding: { xs: 2, sm: 3 }, gap: { xs: "16px", sm: "12px", md: "8px" } }}>
          {/* Avatar and Name Section */}
          <Grid item xs={12} md={4}
                sx={{ display: "flex", alignItems: "center", justifyContent: { xs: "center", md: "flex-start" } }}>
            {data.icon ? (
              <VuiAvatar src={data?.icon?.url || GiOpenBook} alt="profile-image" variant="rounded" size="xl" shadow="sm"
                         sx={{ mr: { xs: 0, md: 2 } }} />
            ) : (
              <VuiBox>
                <GiOpenBook size={50} color={"white"} />
              </VuiBox>
            )}
            <VuiBox sx={{ textAlign: { xs: "center", md: "left" }, ml: 2 }}>
              <VuiTypography variant="h2" color="white" fontWeight="bold"
                             sx={{
                               textOverflow: "ellipsis",
                               overflow: "hidden",
                               whiteSpace: "nowrap",
                             }}>
                {data.title}
              </VuiTypography>
            </VuiBox>
          </Grid>

          {/* Tabs Section */}
          <Grid item xs={12} md={6} sx={{
            mt: { xs: 2, md: 0 },
            display: "flex",
            justifyContent: { xs: "center", md: "flex-end" },
            alignItems: "center",
          }}>
            <VuiBox sx={{
              display: "flex",
              alignItems: "center",
              gap: { xs: "0.5em", md: "1em" },
              justifyContent: { xs: "center", md: "flex-end" },
              flexDirection: { xs: "column", md: "row" },
            }}>

              <VuiAvatar src={courseOwner.profilePic.url} alt="profile-image" variant="rounded" size="lg" shadow="sm" />
              <VuiTypography color={"white"} sx={{
                ml: { xs: 0, md: 0 },
                fontSize: { xs: "0.8rem", md: "1rem" },
                textAlign: { xs: "center", md: "left" },
              }} variant="caption">
                {i18n.language === "fr" ? `${courseOwner.lastName} ${courseOwner.firstName}` : `${courseOwner.firstNameAr || courseOwner.lastName} ${courseOwner.lastNameAr || courseOwner.firstName}`}
              </VuiTypography>
              <VuiBadge color="primary" variant="gradient" container badgeContent={`${data.price}DA`} size="lg"
                        sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }} />
            </VuiBox>
          </Grid>
        </Grid>
      </Card>
    </VuiBox>
  );
}

export default Header;
