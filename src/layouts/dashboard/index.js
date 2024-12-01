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
import Projects from "layouts/dashboard/components/Projects";
import OrderOverview from "layouts/dashboard/components/OrderOverview";
import SatisfactionRate from "layouts/dashboard/components/SatisfactionRate";

// React icons
import { IoDocumentText, IoGlobe } from "react-icons/io5";
import { FaShoppingCart } from "react-icons/fa";

// Data
import { useAuth } from "context/auth/authContext";
import { useTransition } from "react";
import { useTranslation } from "react-i18next";
import { PiStudent } from "react-icons/pi";
import { MdOutlineOndemandVideo } from "react-icons/md";
import { IoMdEye } from "react-icons/io";


function Dashboard() {

  const { user } = useAuth()
  const { t } = useTranslation();

  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={"Tableau de bord"} />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Grid container spacing="18px">
            <Grid item xs={12} md={6} lg={6} xl={6}>
              <WelcomeMark user={user} />
            </Grid>
            <Grid item xs={12} md={6} lg={3} xl={3}>
              <VuiBox mb={0}>
                <Grid direction={"column"}>
                  <Grid item xs={12} md={6} xl={3}>
                    <VuiBox my={2}><MiniStatisticsCard
                      title={{ text: t("dashboard.todayUsers")} }
                      count="15"
                      // percentage={{ color: "success", text: "+3%" }}
                      icon={{ color: "info", component: <PiStudent size="22px" color="white" /> }}
                    /></VuiBox>
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <VuiBox my={2}><MiniStatisticsCard
                      title={{ text: t('dashboard.newViewers') }}
                      count="+5"
                      // percentage={{ color: "error", text: "-2%" }}
                      icon={{ color: "info", component: <IoMdEye size="22px" color="white" /> }}
                    /></VuiBox>
                  </Grid>
                  <Grid item xs={12} md={6} xl={3}>
                    <VuiBox my={2}><MiniStatisticsCard
                      title={{ text: t('dashboard.numberOfCourses') }}
                      count="5"
                      // percentage={{ color: "success", text: "+5%" }}
                      icon={{ color: "info", component: <MdOutlineOndemandVideo size="20px" color="white" /> }}
                    /></VuiBox>
                  </Grid>
                </Grid>
              </VuiBox>
            </Grid>
            <Grid item xs={12} lg={3} xl={3}>
              <SatisfactionRate />
            </Grid>
          </Grid>
        </VuiBox>
        {/*<VuiBox mb={3}>*/}
        {/*  <Grid item xs={12} lg={6} xl={7}>*/}
        {/*    <Card>*/}
        {/*      <VuiBox sx={{ height: "100%" }}>*/}
        {/*        <VuiTypography variant="lg" color="white" fontWeight="bold" mb="5px">*/}
        {/*          Sales Overview*/}
        {/*        </VuiTypography>*/}
        {/*        <VuiBox display="flex" alignItems="center" mb="40px">*/}
        {/*          <VuiTypography variant="button" color="success" fontWeight="bold">*/}
        {/*            +5% more{" "}*/}
        {/*            <VuiTypography variant="button" color="text" fontWeight="regular">*/}
        {/*              in 2021*/}
        {/*            </VuiTypography>*/}
        {/*          </VuiTypography>*/}
        {/*        </VuiBox>*/}
        {/*        <VuiBox sx={{ height: "310px" }}>*/}
        {/*          <LineChart*/}
        {/*            lineChartData={lineChartDataDashboard}*/}
        {/*            lineChartOptions={lineChartOptionsDashboard}*/}
        {/*          />*/}
        {/*        </VuiBox>*/}
        {/*      </VuiBox>*/}
        {/*    </Card>*/}
        {/*  </Grid>*/}
        {/*</VuiBox>*/}
        <Grid container spacing={3} direction="row" justifyContent="center" alignItems="stretch">
          <Grid item xs={12} md={6} lg={8}>
            <Projects />
          </Grid>
          <Grid item xs={12} md={6} lg={4}>
            <OrderOverview />
          </Grid>
        </Grid>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Dashboard;
