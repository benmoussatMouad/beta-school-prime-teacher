import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import { useAuth } from "context/auth/authContext";
import { useTranslation } from "react-i18next";
import { studentsTableData } from "./data/studentsTableData";
import VuiBadge from "../../components/VuiBadge";
import { useGetAllStudents } from "../../api/students/getStudents";
import { useState } from "react";
import { getAccessToken } from "../../utils";
import AcceptStudent from "../../examples/Dialogs/AcceptStudent";

function Students() {
  // States for filters, pagination, and page size
  const [selectedStudentId, setSelectedStudentId] = useState("");
  const [openDialog, setOpen] = useState(false);
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
  const { data, isLoading } = useGetAllStudents({
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
    setPage(1); // Reset to the first page
  };

  const handleOpen = (student) => {
    setOpen(true);
    setSelectedStudentId(student);
  };


  const handleClose = () => {
    setOpen(false);
    setSelectedStudentId(null);
  };


  const { columns, rows } = studentsTableData(t, data?.results, role, handleOpen);



  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={"Les étudiants"} />
      <AcceptStudent onClose={handleClose} open={openDialog} studentId={selectedStudentId} />
      <VuiBox py={3}>
        <VuiBox mb={3}>
          <Card>
            {/* Header Section */}
            <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="22px">
              <VuiTypography variant="h3" color="white">
                {t("students.title")}
                <VuiBadge color="warning" variant="gradient" badgeContent="En cours de development" size="lg" />
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
                isLoading={isLoading}
                tableId={"students"}
                status={filters.status}
                teacherClass={filters.studentsLevel}
              />
            </VuiBox>
          </Card>
        </VuiBox>
      </VuiBox>
    </DashboardLayout>
  );
}

export default Students;