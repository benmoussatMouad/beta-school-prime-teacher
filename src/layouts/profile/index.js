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
import team1 from "assets/images/avatar1.png";
import team2 from "assets/images/avatar2.png";
import team3 from "assets/images/avatar3.png";
import team4 from "assets/images/avatar4.png";
// Images
import profile1 from "assets/images/profile-1.png";
import profile2 from "assets/images/profile-2.png";
import profile3 from "assets/images/profile-3.png";
// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import ProfileInfoCard from "examples/Cards/InfoCards/ProfileInfoCard";
import DefaultProjectCard from "examples/Cards/ProjectCards/DefaultProjectCard";
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
import VuiBadge from "../../components/VuiBadge";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import linearGradient from "../../assets/theme/functions/linearGradient";
import rgba from "../../assets/theme/functions/rgba";
import React, { useState } from "react";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";
import boxShadows from "../../assets/theme/base/boxShadows";
import { useDeleteTeacher } from "../../api/teacher/deleteTeacher";


const { black, gradients, dark } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;


function Overview() {

  const { t } = useTranslation();
  const context = useAuth();
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for confirmation
  const { mutate } = useDeleteTeacher();

  const handleConfirmDialogClose = (confirmed) => {

    if (confirmed) {
      mutate();
    }
    setOpenDialog(false);
  };


  return (
    <DashboardLayout user={context.user}>
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
              description={t("profile.myDescirption")}
              info={{
                [t("forms.fullName")]: `${context.user.user?.firstName}  ${context.user.user?.lastName}`,
                [t("forms.email")]: context.user.user?.email,
                [t("forms.institution")]: context.user.teacher?.institution,
                [t("forms.subject")]: t(`subjects.${context.user.teacher?.subject}`),
                [t("forms.yearsOfExperience")]: context.user.teacher?.yearsOfExperience,
                [t("forms.isEmailVerified")]: context.user.user?.isEmailVerified ? t("profile.card.Verified") : t("profile.card.unVerified"),
              }}
            />
          </Grid>
          <Grid
            item
            xs={12}
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
        <Grid item xs={12} xl={3} height="100%">
          <PlatformSettings />
        </Grid>
        <Grid item xs={12} xl={9}>
          <Card>
            <VuiBox display="flex" flexDirection="column" height="100%">
              <VuiBox display="flex" flexDirection="column" mb="24px">
                <VuiBox>
                  <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
                    {t("profile.project.title")}
                  </VuiTypography>
                  <VuiBadge badgeContent="A concevoir" color="warning" variant="gradient" size="lg" />
                </VuiBox>
                <VuiTypography color="text" variant="button" fontWeight="regular">
                  {t("profile.project.descirption")}
                </VuiTypography>
              </VuiBox>
              <Grid container spacing={3}>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={profile1}
                    label="Cours #2"
                    title="Cours #2"
                    description=""
                    description="Lorem ipsum dolor sit amet, consectetur adipiscing elit. Ut enim ad minim veniam, quis nostrud exercitation."
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "white",
                      label: "VIEW ALL",
                    }}
                    authors={[
                      { image: team1, name: "Elena Morison" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team4, name: "Peterson" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={profile2}
                    label="project #1"
                    title="scandinavian"
                    description="Music is something that every person has his or her own specific opinion about."
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "white",
                      label: "VIEW ALL",
                    }}
                    authors={[
                      { image: team3, name: "Nick Daniel" },
                      { image: team4, name: "Peterson" },
                      { image: team1, name: "Elena Morison" },
                      { image: team2, name: "Ryan Milly" },
                    ]}
                  />
                </Grid>
                <Grid item xs={12} md={6} xl={4}>
                  <DefaultProjectCard
                    image={profile3}
                    label="project #3"
                    title="minimalist"
                    description="Different people have different taste, and various types of music."
                    action={{
                      type: "internal",
                      route: "/pages/profile/profile-overview",
                      color: "white",
                      label: "VIEW ALL",
                    }}
                    authors={[
                      { image: team4, name: "Peterson" },
                      { image: team3, name: "Nick Daniel" },
                      { image: team2, name: "Ryan Milly" },
                      { image: team1, name: "Elena Morison" },
                    ]}
                  />
                </Grid>
              </Grid>
            </VuiBox>
          </Card>

        </Grid>
      </Grid>

      {/* Update Picture Confirmation Dialog */}
      <Dialog
        sx={({ breakpoints, theme }) => ({
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
