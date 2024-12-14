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
import Table from "examples/Tables/Table";
import { useGetCourses } from "../../api/courses";
import { useState } from "react";
import { getAccessToken } from "../../utils";
import CreateCoursDialog from "../../examples/Dialogs/CreateCours";
import VuiButton from "../../components/VuiButton";

function Courses() {

  const [subject, setSubjects] = useState("");
  const [title, setTitle] = useState("");
  const [teacherClass, setTeacherClass] = useState("");
  const [courseStatus, setStatus] = useState("");

  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [openDialog, setOpenDialog] = useState(false);

  const token = getAccessToken();

  const { user } = useAuth();
  const { data, isLoading } = useGetCourses({ token, title, teacherClass, subject, courseStatus, page, rowsPerPage });

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


  const closeDialog = () => {
    setOpenDialog(false);
  };

  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={"Mes Cours"} />
      <CreateCoursDialog closeDialog={closeDialog} openDialog={openDialog} />
      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb={1}>
            <VuiTypography variant="h3" color="white" mb={1}>
              {t("cours.title")}
            </VuiTypography>
            <VuiButton onClick={() => setOpenDialog(true)} color="primary" variant="gradient" size="medium" >
              + {t("dashboard.coursesCard.addCourse")}
            </VuiButton>
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
              tableId={"courses"}
              status={courseStatus}
            />
          </VuiBox>
        </Card>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Courses;
