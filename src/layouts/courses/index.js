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

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";

// Vision UI Dashboard React example components
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";

// Data
import { useAuth } from "context/auth/authContext";
import { useTranslation } from "react-i18next";
import { coursesTableData } from "./data/coursesTableData";
import VuiBadge from "../../components/VuiBadge";
import Table from "examples/Tables/Example";

function Courses() {

  const { user } = useAuth();

  const { t } = useTranslation();

  const { columns, rows } = coursesTableData(t);

  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={"Mes Cours"} />
      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="lg" color="white">
              {t("cours.title")}
              <VuiBadge color="warning" variant="gradient" badgeContent="En cours de development" size="lg" />
            </VuiTypography>
          </VuiBox>
          <VuiBox
            sx={{
              "& th": {
                borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                  `${borderWidth[1]} solid ${grey[700]}`,
              },
              "& .MuiTableRow-root:not(:last-child)": {
                "& td": {
                  borderBottom: ({ borders: { borderWidth }, palette: { grey } }) =>
                    `${borderWidth[1]} solid ${grey[700]}`,
                },
              },
            }}
          >
            <Table columns={columns} rows={rows} />
          </VuiBox>
        </Card>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Courses;
