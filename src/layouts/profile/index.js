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
// @mui icons
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
// Images
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
// Overview page components
import Header from "layouts/profile/components/Header";
import PlatformSettings from "layouts/profile/components/PlatformSettings";
import Welcome from "../profile/components/Welcome/index";
import UpdateInformations from "./components/UpdateProfile";
import { useAuth } from "context/auth/authContext";
import { useTranslation } from "react-i18next";
import VuiButton from "../../components/VuiButton";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import linearGradient from "../../assets/theme/functions/linearGradient";
import rgba from "../../assets/theme/functions/rgba";
import React, { useRef, useState } from "react";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";
import boxShadows from "../../assets/theme/base/boxShadows";
import { useDeleteTeacher } from "../../api/teacher/deleteTeacher";
import CarInformations from "./components/CarInformations";


const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;


function Overview() {

  const swiperRef = useRef(null); // Create a ref for Swiper
  const { t } = useTranslation();
  const { user } = useAuth();
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for confirmation
  const { mutate } = useDeleteTeacher();

  const handleConfirmDialogClose = (confirmed) => {
    if (confirmed) {
      mutate();
    }
    setOpenDialog(false);
  };

  const role = user?.user?.role || '';


  return (
    <DashboardLayout user={user}>
      <Header pageName={"Profile"} />
      <VuiBox mt={5} mb={3}>
        <Grid
          container
          spacing={3}
          sx={({ breakpoints }) => ({
            [breakpoints.only("xl")]: {
              gridTemplateColumns: "repeat(2, 1fr)",
            },
          })}
        >
          <Grid
            item
            xs={12}
            xl={4}
            xxl={3}
            sx={({ breakpoints }) => ({
              minHeight: "400px",
              [breakpoints.only("xl")]: {
                gridArea: "1 / 1 / 2 / 2",
              },
            })}
          >
            <Welcome />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={3}
            xxl={3}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "1 / 2 / 2 / 3",
              },
            })}
          >
            <ProfileInfoCard
              title={t("profile.card.title")}
              description={user?.teacher?.description || t('profile.myDescirption')}
              info={{
                [t("forms.fullName")]: `${user.user?.firstName}  ${user.user?.lastName}`,
                [t("forms.email")]: user.user?.email,
                [t("forms.institution")]: user?.teacher?.institution,
                [t("forms.subject")]: t(`subjects.${user?.teacher?.subject}`),
                [t("forms.yearsOfExperience")]: user?.teacher?.yearsOfExperience,
                [t("forms.isEmailVerified")]: user.user?.isEmailVerified ? t("profile.card.Verified") : t("profile.card.unVerified"),
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
            md={6}
            xl={5}
            xxl={6}
            sx={({ breakpoints }) => ({
              [breakpoints.only("xl")]: {
                gridArea: "2 / 1 / 3 / 3",
              },
            })}
          >
            <UpdateInformations />
          </Grid>
        </Grid>
      </VuiBox>
      <Grid container spacing={3} mb="30px">
        {role === "ROOT" ? <Grid item xs={12} xl={3} md={3} >
          <PlatformSettings />
        </Grid> : ""}
        <Grid item xs={12} xl={role === "ROOT" ? 9 : 12} md={role === "ROOT" ? 9 : 12}  >
          <CarInformations />
        </Grid>
      </Grid>

      <Dialog
        sx={({ }) => ({
          "& .MuiDialog-paper": {
            display: "flex",
            flexDirection: "column",
            background: linearGradient(card.main, card.state, card.deg),
            backdropFilter: "blur(120px)",
            position: "relative",
            minWidth: 0,
            padding: "22px",
            wordWrap: "break-word",
            backgroundClip: "border-box",
            border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
            borderRadius: borderRadius.xl,
            boxShadow: xxl,
          },
        })}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle color={"#ffffff"}>{t("dialog.deleteAccount.title")}</DialogTitle>
        <DialogContent>
          <Typography color={"#ffffff"}>{t("dialog.deleteAccount.description")}</Typography>
        </DialogContent>
        <DialogActions>
          <VuiButton onClick={() => handleConfirmDialogClose(false)} color="secondary">
            {t("button.cancel")}
          </VuiButton>
          <VuiButton onClick={() => handleConfirmDialogClose(true)} color="info">
            {t("button.confirm")}
          </VuiButton>
        </DialogActions>
      </Dialog>

      <Card>
        <VuiBox display="flex" sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}
          flexDirection="row" height="100%">
          <VuiBox display="flex" flexDirection="column" mb="24px">
            <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
              {t("profile.accountDeletion.title")}
            </VuiTypography>
            <VuiTypography color="text" variant="button" fontWeight="regular">
              {t("profile.accountDeletion.description")}
            </VuiTypography>
          </VuiBox>
          <VuiBox xs={{ justifyContent: "center", alignSelf: "end" }}>
            <VuiButton onClick={() => setOpenDialog(true)} color={"error"} size={"large"}
              variant={"gradient"}>{t("profile.accountDeletion.deleteButton")}
            </VuiButton>
          </VuiBox>
        </VuiBox>

      </Card>
    </DashboardLayout>
  );
}

export default Overview;
