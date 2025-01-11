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
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import colors from "assets/theme/base/colors";
import { CircularProgress } from "@mui/material";

function MiniStatisticsCard(
  {
    bgColor = "white",
    title = {
      fontWeight: "medium",
      text: "",
    },
    count,
    percentage = {
      color: "success",
      text: "",
    },
    icon,
    direction = "right",
    isLoading
  }) {

  const { info } = colors;

  return (
    <Card sx={{ padding: "17px" }}>
      <VuiBox>
        <VuiBox>
          <Grid container alignItems="center">
            {direction === "left" ? (
              <Grid item>
                <VuiBox
                  bgColor={info}
                  color="#fff"
                  width="3rem"
                  height="3rem"
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  {icon.component}
                </VuiBox>
              </Grid>
            ) : null}
            <Grid item xs={8}>
              <VuiBox ml={direction === "left" ? 2 : 0} lineHeight={1}>
                <VuiTypography
                  variant="caption"
                  color={bgColor === "white" ? "text" : "white"}
                  opacity={bgColor === "white" ? 1 : 0.7}
                  textTransform="capitalize"
                  fontWeight={title.fontWeight}
                >
                  {title.text}
                </VuiTypography>
                {isLoading ? <VuiBox sx={{ display: "flex", alignItems: "flex-start", justifyContent: "flex-start" }}>
                  <CircularProgress color="info" size={25} />
                </VuiBox> : <VuiTypography variant="subtitle1" fontWeight="bold" color="white">
                  {count}{" "}
                  <VuiTypography variant="button" color={percentage.color} fontWeight="bold">
                    {percentage.text}
                  </VuiTypography>
                </VuiTypography>}
              </VuiBox>
            </Grid>
            {direction === "right" ? (
              <Grid item xs={4}>
                <VuiBox
                  bgColor="#0075FF"
                  color="white"
                  width="3rem"
                  height="3rem"
                  marginLeft="auto"
                  borderRadius="lg"
                  display="flex"
                  justifyContent="center"
                  alignItems="center"
                  shadow="md"
                >
                  <Icon fontSize="small" color="inherit">
                    {icon.component}
                  </Icon>
                </VuiBox>
              </Grid>
            ) : null}
          </Grid>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default MiniStatisticsCard;
