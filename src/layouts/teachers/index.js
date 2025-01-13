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
import { useGetTeachers, useMakeTeacherAdmin } from "../../api/admin";
import { useUnMakeTeacherAdmin } from "../../api/admin/unMakeTeacherAdmin";
import MakeAdmin from "examples/Dialogs/MakeAdmin";




function Teachers() {
  const { user } = useAuth();
  const token = getAccessToken();
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubjects] = useState("");
  const [role, setRoles] = useState(FiltersRoles[0]);
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);
  const [sortBy, setSortBy] = useState(""); // Sort key
  const [sortType, setSortType] = useState("desc");

  const { data, isLoading } = useGetTeachers({
    token, firstName, lastName, email, subject, role, page, limit: rowsPerPage, sortBy,
    sortType,
  });
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const { mutate: makeTeacherAdmin } = useMakeTeacherAdmin();
  const { mutate: unMakeTeacherAdmin } = useUnMakeTeacherAdmin();

  const handleOpen = (teacher) => {
    setOpen(true);
    setSelectedTeacher(teacher);
  };


  const handleClose = () => {
    setOpen(false);
    setSelectedTeacher(null);
  };

  const { columns, rows } = teacherTableData(t, data?.users || [], handleOpen, user);

  const MakeTeacherAdmin = (approve) => {
    if (approve) {
      makeTeacherAdmin(selectedTeacher?.Teacher?.id);
      setOpen(false);
      setSelectedTeacher(null);
    } else {
      handleClose();
    }
  };

  const UnMakeTeacherAdmin = (approve) => {
    if (approve) {
      unMakeTeacherAdmin(selectedTeacher?.Teacher?.id);
      setOpen(false);
      setSelectedTeacher(null);
    } else {
      handleClose();
    }
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
        if (value === "NONE") {
          setSubjects("");
        } else {
          setSubjects(value);
        }
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
      <DashboardNavbar pageName={t("teachers.page.title")} />
      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="h3" color="white" mb={1}>
              {t("teachers.table.title")}
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
              tableId={"teachers"}
              selectedRole={role}
              onSortChange={handleSortChange} // Pass sorting handler
              sortConfig={{ key: sortBy, direction: sortType }}
            />

          </VuiBox>
        </Card>
      </VuiBox>
      {selectedTeacher && <MakeAdmin open={open} handleClose={handleClose} selectedTeacher={selectedTeacher} MakeTeacherAdmin={MakeTeacherAdmin} UnMakeTeacherAdmin={UnMakeTeacherAdmin} />}
    </DashboardLayout>
  );
}

export default Teachers;
