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

/* eslint-disable react/prop-types */
// @mui material components
import Icon from "@mui/material/Icon";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiProgress from "components/VuiProgress";


function Completion({ value, color }) {
  return (
    <VuiBox display="flex" flexDirection="column" alignItems="flex-start">
      <VuiTypography variant="button" color="white" fontWeight="medium" mb="4px">
        {value}%&nbsp;
      </VuiTypography>
      <VuiBox width="8rem">
        <VuiProgress value={value} color={color} sx={{ background: "#2D2E5F" }} label={false} />
      </VuiBox>
    </VuiBox>
  );
}

const action = (
  <Icon sx={{ cursor: "pointer", fontWeight: "bold" }} fontSize="small">
    more_vert
  </Icon>
);

export const projectsTableData = (t) => {
  return {
    columns: [
      { name: t("cours.table.project"), align: "left" },
      { name: t("cours.table.budget"), align: "left" },
      { name: t("cours.table.status"), align: "left" },
      { name: t("cours.table.completion"), align: "center" },
      { name: t("cours.table.action"), align: "center" },
    ],

    rows: [
      {
        [t("cours.table.project")]: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Chakra Vision UI Version
            </VuiTypography>
          </VuiBox>
        ),
        [t("cours.table.budget")]: (
          <VuiTypography variant="button" color="white" fontWeight="medium">
            $14,000
          </VuiTypography>
        ),
        [t("cours.table.status")]: (
          <VuiTypography variant="button" color="white" fontWeight="medium">
            Working
          </VuiTypography>
        ),
        [t("cours.table.completion")]: <Completion value={60} color="info" />,
        action,
      },
      {
        [t("cours.table.project")]: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Add Progress Track
            </VuiTypography>
          </VuiBox>
        ),
        [t("cours.table.budget")]: (
          <VuiTypography variant="button" color="white" fontWeight="medium">
            $3,000
          </VuiTypography>
        ),
        [t("cours.table.status")]: (
          <VuiTypography variant="button" color="white" fontWeight="medium">
            Done
          </VuiTypography>
        ),
        [t("cours.table.completion")]: <Completion value={100} color="info" />,
        action,
      },
      {
        [t("cours.table.project")]: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Fix Platform Errors
            </VuiTypography>
          </VuiBox>
        ),
        [t("cours.table.budget")]: (
          <VuiTypography variant="button" color="white" fontWeight="medium">
            Not set
          </VuiTypography>
        ),
        [t("cours.table.status")]: (
          <VuiTypography variant="button" color="white" fontWeight="medium">
            Canceled
          </VuiTypography>
        ),
        [t("cours.table.completion")]: <Completion value={30} color="info" />,
        action,
      },
      {
        [t("cours.table.project")]: (
          <VuiBox display="flex" alignItems="center">
            <VuiTypography pl="16px" color="white" variant="button" fontWeight="medium">
              Add the New Pricing Page
            </VuiTypography>
          </VuiBox>
        ),
        [t("cours.table.budget")]: (
          <VuiTypography variant="button" color="white" fontWeight="medium">
            $2,300
          </VuiTypography>
        ),
        [t("cours.table.status")]: (
          <VuiTypography variant="button" color="white" fontWeight="medium">
            Done
          </VuiTypography>
        ),
        [t("cours.table.completion")]: <Completion value={100} color="info" />,
        action,
      },
    ],
  };
};
