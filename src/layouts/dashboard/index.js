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
import Grid from "@mui/material/Grid";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import MiniStatisticsCard from "examples/Cards/StatisticsCards/MiniStatisticsCard";


// Dashboard layout components
import WelcomeMark from "layouts/dashboard/components/WelcomeMark";
import Courses from "layouts/dashboard/components/Courses";
import Annonces from "layouts/dashboard/components/Annonces";


// Data
import { useAuth } from "context/auth/authContext";
import { useTranslation } from "react-i18next";
import { PiStudent } from "react-icons/pi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { IoMdEye } from "react-icons/io";
import { getAccessToken } from "utils";
import { useStats } from "api/teacher/getStats";


function Dashboard() {

  const { user } = useAuth();
  const { t } = useTranslation();


  const token = getAccessToken()
  const { data, isLoading } = useStats(token);


  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={"Tableau de bord"} />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} md={6} xl={6}>
              <WelcomeMark user={user} />
            </Grid>
            <Grid item xs={12} md={6} xl={6}>
              <VuiBox mb={0}>
                <Grid direction={"column"}>
                  <Grid item xs={12} md={6} xl={3}>
                    <VuiBox my={2}><MiniStatisticsCard
                      isLoading={isLoading}
                      title={{ text: t("dashboard.todayUsers") }}
                      count={data?.totalViewsToday}
                      // percentage={{ color: "success", text: "+3%" }}
                      icon={{ color: "info", component: <PiStudent size="22px" color="white" /> }}
                    /></VuiBox>
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <VuiBox my={2}><MiniStatisticsCard
                      isLoading={isLoading}
                      title={{ text: t("dashboard.newViewers") }}
                      count={data?.totalViewsMonth}
                      // percentage={{ color: "error", text: "-2%" }}
                      icon={{ color: "info", component: <IoMdEye size="22px" color="white" /> }}
                    /></VuiBox>
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <VuiBox my={2}><MiniStatisticsCard
                      isLoading={isLoading}
                      title={{ text: t("dashboard.numberOfCourses") }}
                      count={data?.totalCourses || 0}
                      // percentage={{ color: "success", text: "+5%" }}
                      icon={{ color: "info", component: <MdOutlineOndemandVideo size="20px" color="white" /> }}
                    /></VuiBox>
                  </Grid>
                </Grid>
              </VuiBox>
            </Grid>
            {/*<Grid item xs={12} lg={3} xl={3}>*/}
            {/*  <SubscribersRate />*/}
            {/*</Grid>*/}
          </Grid>
        </VuiBox>
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Courses />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            {user?.teacher && <Annonces teacherId={user?.teacher.id} />}
          </Grid>
        </Grid>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
