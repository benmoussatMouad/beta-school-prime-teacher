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

function Header({ pageName, data }) {

  const { user } = useAuth();
  const { t } = useTranslation();

  return (
    <VuiBox position="relative">
      <DashboardNavbar pageName={pageName} light />
      <Card
        sx={{
          px: 1,
          mt: 1,
        }}
      >
        <Grid
          container
          alignItems="center"
          justifyContent="space-between"
          sx={{
            gap: { xs: "16px", sm: "12px", md: "8px" },
            color: "white", // Text color
            textAlign: "center", // Center text alignment
          }}
        >
          <VuiTypography
            variant="h6"
            sx={{
              fontWeight: "bold", // Bold text for emphasis
              width: "100%", // Ensures text spans the banner
            }}
            color="white"
          >
            {t("course.pending.title")}
          </VuiTypography>
        </Grid>
      </Card>
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
            md={4}
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
            md={6}
            sx={{
              mt: { xs: 2, md: 0 },
              display: "flex",
              justifyContent: { xs: "center", md: "flex-end" },
              alignItems: "center", // Ensures vertical centering
            }}
          >
            <VuiBox
              sx={{
                display: "flex",
                alignItems: "center",
                gap: { xs: "0.5em", md: "1em" }, // Adjust gap for smaller screens
                justifyContent: { xs: "center", md: "flex-end" },
                flexDirection: { xs: "column", md: "row" }, // Stack elements on smaller screens
              }}
            >
              <VuiBadge
                color="secondry"
                variant="gradient"
                container
                badgeContent={"15000DA"}
                size="lg"
                sx={{ fontSize: { xs: "1rem", md: "1.2rem" } }} // Responsive font size
              />
              <VuiTypography
                color={"white"}
                sx={{
                  ml: { xs: 0, md: 2 },
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  textAlign: { xs: "center", md: "left" },
                }}
                variant="caption"
              >
                {`${user.user.lastName} ${user.user.firstName}`}
              </VuiTypography>
              <VuiTypography
                color={"white"}
                sx={{
                  ml: { xs: 0, md: 2 },
                  fontSize: { xs: "0.8rem", md: "1rem" },
                  textAlign: { xs: "center", md: "left" },
                }}
                variant="caption"
              >
                {t(`subjects.${data.subject}`)}
              </VuiTypography>
              <VuiTypography
                color={"white"}
                sx={{ cursor: "auto", fontSize: { xs: "0.8rem", md: "1rem" }, textAlign: { xs: "center", md: "left" } }}
                variant="caption"
              >
                {data.class}
              </VuiTypography>
            </VuiBox>
          </Grid>
        </Grid>
      </Card>
    </VuiBox>
  );
}

export default Header;
