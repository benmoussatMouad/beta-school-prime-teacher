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

function Header({ pageName, data }) {

  const { t } = useTranslation();

  return (
    <VuiBox position="relative">
      <DashboardNavbar pageName={pageName} light />
      <Card
        sx={{
          px: 3,
          mt: 2,
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between" // Use space-between for better distribution
          sx={({}) => ({
            padding: { xs: 2, sm: 3 }, // Adding padding for a better look
            gap: {
              xs: "16px",
              sm: "12px",
              md: "8px",
            },
          })}
        >
          {/* Avatar and Name Section */}
          {<Grid
            item
            xs={12}
            md={8}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: { xs: "center", md: "flex-start" },
            }}
          >
            {data.icon ? <VuiAvatar
              src={data?.icon?.url || GiOpenBook}
              alt="profile-image"
              variant="rounded"
              size="xl"
              shadow="sm"
              sx={{ mr: { xs: 0, md: 2 } }} // Margin to adjust spacing from text
            /> : <VuiBox>
              <GiOpenBook size={50} color={"white"} />
            </VuiBox>}
            <VuiBox
              sx={{
                textAlign: { xs: "center", md: "left" },
                ml: 2, // Adds margin on larger screens
              }}
            >
              <VuiTypography variant="h6" color="white" fontWeight="bold">
                {data.title}
              </VuiTypography>
            </VuiBox>
          </Grid>}

          {/* Tabs Section */}
          <Grid
            item
            xs={12}
            md={2}
            sx={{
              mt: { xs: 2, md: 0 },
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
            }}
          >
            <VuiBox sx={{ display: "flex", alignItems: "flex-end", justifyContent: "flex-end" }}>
              <VuiBox sx={{ display: "flex", alignItems: "center", gap: "1em" }}>
                <VuiTypography color={"white"} sx={{ ml: 2 }} variant="caption">
                  {t(`subjects.${data.subject}`)}
                </VuiTypography>
                <VuiTypography color={"white"} sx={{ cursor: "auto" }} variant="caption">
                  {data.class}
                </VuiTypography>
              </VuiBox>
            </VuiBox>
          </Grid>
        </Grid>
      </Card>
    </VuiBox>
  );
}

export default Header;
