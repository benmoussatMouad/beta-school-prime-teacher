import React, { useState } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import { useTranslation } from "react-i18next";
import { FiltersRoles, getAccessToken } from "../../utils";
import { useAuth } from "../../context/auth/authContext";
import { teacherTableData } from "./data/teachersTableData";
import { useGetPaidTeachers } from "api/admin/getPaidTeachers";
import { teacherPaidTableData } from "./data/teachersPaidTableData";
import { useGetPayments } from "api/teacher/getPayments";



function TeacherPayments() {
  const { user } = useAuth();
  const token = getAccessToken();
  const { t } = useTranslation();

  // Search filters state
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubjects] = useState("");
  const [role, setRoles] = useState(FiltersRoles[0]);

  // Pagination state
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);

  // Sorting state for ROOT users
  const [sortBy, setSortBy] = useState("");
  const [sortType, setSortType] = useState("desc");

  // Sorting state for teachers
  const [paymentSortBy, setPaymentSortBy] = useState("");
  const [paymentSortType, setPaymentSortType] = useState("desc");

  // Fetch data based on user role
  const { data: adminData, isLoading: isAdminLoading } = useGetPaidTeachers({
    token,
    firstName,
    lastName,
    email,
    subject,
    role,
    page,
    limit: rowsPerPage,
    sortBy,
    sortType,
    userRole: user.user.role
  });


  const { data: teacherData, isLoading: isTeacherLoading } = useGetPayments({
    token,
    page,
    limit: rowsPerPage,
    sortBy: paymentSortBy,
    sortType: paymentSortType
  });


  const handleSortChange = (key) => {
    if (user.user.role === "ROOT") {
      if (sortBy === key) {
        setSortType(sortType === "asc" ? "desc" : "asc");
      } else {
        setSortBy(key);
        setSortType("desc");
      }
    } else {
      if (paymentSortBy === key) {
        setPaymentSortType(paymentSortType === "asc" ? "desc" : "asc");
      } else {
        setPaymentSortBy(key);
        setPaymentSortType("desc");
      }
    }
    setPage(0);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    switch (name) {
      case "firstName":
        setFirstName(value);
        break;
      case "lastName":
        setLastName(value);
        break;
      case "email":
        setEmail(value);
        break;
      case "subject":
        setSubjects(value === "NONE" ? "" : value);
        break;
      case "roles":
        setRoles(value);
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
    setPage(0);
  };

  const { columns, rows } = user.user.role === "ROOT"
    ? teacherPaidTableData(t, adminData?.teachers || [])
    : teacherTableData(t, teacherData?.payments || []);

  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={t("teachers.payments")} />
      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="h3" color="white" mb={1}>
              {t("teachers.payments")}
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
              totalCount={user.user.role === "ROOT" ? adminData?.totalCount : teacherData?.totalCount || 0}
              rowsPerPage={rowsPerPage}
              onPageChange={handlePageChange}
              onRowsPerPageChange={handleRowsPerPage}
              isLoading={user.user.role === "ROOT" ? isAdminLoading : isTeacherLoading}
              subject={subject}
              tableId={user.user.role === "ROOT" ? "teachers" : ""}
              selectedRole={role}
              onSortChange={handleSortChange}
              sortConfig={{
                key: user.user.role === "ROOT" ? sortBy : paymentSortBy,
                direction: user.user.role === "ROOT" ? sortType : paymentSortType
              }}
            />

          </VuiBox>
        </Card>
      </VuiBox>
    </DashboardLayout>
  );
}

export default TeacherPayments;
