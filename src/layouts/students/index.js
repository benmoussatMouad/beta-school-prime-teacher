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
  });

  const [page, setPage] = useState(0); // Start with page 1
  const [limit, setLimit] = useState(5);
  const [sortBy, setSortBy] = useState(""); // Sort key
  const [sortType, setSortType] = useState("desc");

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
    sortBy,    // Pass sorting column
    sortType,  // Pass sorting direction
  });

  const { data: allStudent, isLoading: isLoadingAllStudent } = useGetAllStudents({
    token, // Use user token for authentication
    ...filters, // Pass filters dynamically
    page,
    limit,
    sortBy,    // Pass sorting column
    sortType,  // Pass sorting direction
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
    setPage(newPage); // Add 1 to convert from 0-based to 1-based
  };

  // Function to handle limit (rows per page) change
  const handleRowsPerPage = (event) => {
    setLimit(parseInt(event.target.value, 10));
    setPage(0); // Reset to first page when changing limit
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
  

  const {
    columns,
    rows,
  } = studentsTableData(t, role === "ROOT" ? allStudent?.results : data?.results, role, handleOpen, handleOpenActions);

  const handleSortChange = (key) => {
    // Toggle sort direction if the column is already being sorted
    if (sortBy === key) {
      setSortType((prev) => (prev === "asc" ? "desc" : "asc"));
    } else {
      // Sort by a new column and reset direction to ascending
      setSortBy(key);
      setSortType("asc");
    }
  };

  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={"Les étudiants"} />
      {selectedStudentId && <AcceptStudent onClose={handleClose} open={openDialog} studentId={selectedStudentId} />}
      {role === "ROOT" && selectedStudentId ?
        <StudentActionsDialog onClose={handleActionsClose} open={openActionsDialog}
          studentId={selectedStudentId} /> : ""}
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
                page={page} // Convert back to 0-based for MUI Table
                totalCount={role === "ROOT" ? allStudent?.totalCount : data?.totalCount} // Use correct total count based on role
                rowsPerPage={limit}
                onPageChange={handlePageChange}
                onRowsPerPageChange={handleRowsPerPage}
                isLoading={isLoading || isLoadingAllStudent}
                tableId={"students"}
                status={filters.status}
                teacherClass={filters.studentsLevel}
                wilaya={filters.wilaya}
                onSortChange={handleSortChange}
                sortConfig={{ key: sortBy, direction: sortType }}
              />
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Students;
