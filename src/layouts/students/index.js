import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import { useAuth } from "context/auth/authContext";
import { useTranslation } from "react-i18next";
import { studentsTableData } from "./data/studentsTableData";
import { useGetAllEnrolledStudents } from "../../api/students/getStudentsEnrolled";
import { useGetAllStudents } from "../../api/students/getStudents";
import { useState } from "react";
import { getAccessToken } from "../../utils";
import AcceptStudent from "../../examples/Dialogs/AcceptStudent";
import StudentActionsDialog from "../../examples/Dialogs/ActionsStudent";

function Students() {
  // States for filters, pagination, and page size
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [openDialog, setOpen] = useState(false);
  const [openActionsDialog, setActionsOpen] = useState(false);
  const [filters, setFilters] = useState({
    firstName: "",
    lastName: "",
    email: "",
    status: "",
    studentsLevel: "",
    wilaya: "",
    sortBy: "",
  });

  const [page, setPage] = useState(0);
  const [limit, setLimit] = useState(5);

  const { t } = useTranslation();
  const { user } = useAuth();

  const token = getAccessToken();
  const role = user.user.role || "";

  // Fetch the student data
  const { data, isLoading } = useGetAllEnrolledStudents({
    token, // Use user token for authentication
    ...filters, // Pass filters dynamically
    page,
    limit,
  });

  const { data: allStudent, isLoading: isLoadingAllStudent } = useGetAllStudents({
    token, // Use user token for authentication
    ...filters, // Pass filters dynamically
    page,
    limit,
  });


  // Function to handle filter changes
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFilters((prevFilters) => ({
      ...prevFilters,
      [name]: value === "NONE" ? "" : value, // Handle "NONE" to reset the filter
    }));
  };

  // Function to handle page change for pagination
  const handlePageChange = (event, newPage) => {
    setPage(newPage); // New page number
  };

  // Function to handle limit (rows per page) change
  const handleRowsPerPage = (e) => {
    setLimit(parseInt(e.target.value, 10)); // Update rows per page
    setPage(0); // Reset to the first page
  };

  const handleOpen = (student) => {
    setOpen(true);
    setSelectedStudentId(student);
  };

  const handleOpenActions = (student) => {
    setActionsOpen(true);
    setSelectedStudentId(student);
  };

  const handleClose = () => {
    setOpen(false);
    setSelectedStudentId(null);
  };

  const handleActionsClose = () => {
    setActionsOpen(false);
    setSelectedStudentId(null);
  };

  const { columns, rows } = studentsTableData(t, role === "ROOT" ? allStudent?.results : data?.results, role, handleOpen, handleOpenActions);


  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={"Les étudiants"} />
      {selectedStudentId && <AcceptStudent onClose={handleClose} open={openDialog} studentId={selectedStudentId} />}
      {role === "ROOT" && selectedStudentId ? <StudentActionsDialog onClose={handleActionsClose} open={openActionsDialog} studentId={selectedStudentId} /> : ""}
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            {/* Header Section */}
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="h3" color="white">
                {t("students.title")}
              </VuiTypography>
            </VuiBox>


            {/* Table Section */}
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
                rowsPerPage={limit}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPage}
                isLoading={isLoading || isLoadingAllStudent}
                tableId={"students"}
                status={filters.status}
                teacherClass={filters.studentsLevel}
                wilaya={filters.wilaya}
              />
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Students;
