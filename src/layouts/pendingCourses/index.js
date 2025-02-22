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
import Table from "examples/Tables/Table";
import { useState } from "react";
import { getAccessToken } from "../../utils";
import { useGetPendingCourses } from "../../api/courses/getPendingCourses";

function PendingCourses() {

  const [subject, setSubjects] = useState("");
  const [title, setTitle] = useState("");
  const [courseStatus, setStatus] = useState("");
  const [teacherClass, setTeacherClass] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState(""); // Sort key
  const [sortType, setSortType] = useState("desc");

  const token = getAccessToken();

  const { user } = useAuth();
  const role = user?.user?.role;
  const {
    data,
    isLoading,
  } = useGetPendingCourses({
      token, title, teacherClass, subject, role, courseStatus, page, limit: rowsPerPage,
      sortBy,
      sortType,
    },
  );

  const { t } = useTranslation();

  const { columns, rows } = coursesTableData(t, data?.courses);

  const handleChange = (e) => {
    const { name, value } = e.target;

    switch (name) {
      case "title":
        setTitle(value);
        break;
      case "subject":
        if (value === "NONE") {
          setSubjects("");
        } else {
          setSubjects(value);
        }
        break;
      case "teacherClass":
        if (value === "NONE") {
          setTeacherClass("");
        } else {
          setTeacherClass(value);
        }
        break;
      case "status":
        if (value === "NONE") {
          setStatus("");
        } else {
          setStatus(value);
        }
        break;
      default:
        break;
    }
  };

  const handlePageChange = (event, newPage) => {
    setPage(newPage);
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPage(parseInt(e.target.value, 10));
    setPage(0); // Reset page to 0 whenever rows per page is changed
  };

  const handleSortChange = (key) => {
    if (sortBy === key) {
      // Toggle sort direction if the same column is clicked
      setSortType((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Set a new column to sort by
      setSortBy(key);
      setSortType("asc");
    }
  };

  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={"Mes Cours"} />
      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="h3" color="white">
              {t("routes.pendingCourses")}
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
            <Table
              columns={columns}
              rows={rows}
              onSearchChange={handleChange}
              page={page}
              totalCount={data?.totalCount || 0}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPage}
              isLoading={isLoading}
              subject={subject}
              teacherClass={teacherClass}
              status={courseStatus}
              tableId={"teachersCourses"}
              onSortChange={handleSortChange} // Pass sorting handler
              sortConfig={{ key: sortBy, direction: sortType }}
            />
          </VuiBox>
        </Card>
      </VuiBox>
    </DashboardLayout>
  );
}

export default PendingCourses;
