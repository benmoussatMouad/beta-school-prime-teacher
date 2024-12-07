import React, { useState } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import DashboardNavbar from "examples/Navbars/DashboardNavbar";
import Table from "examples/Tables/Table";
import { useAuth } from "context/auth/authContext";
import { useTranslation } from "react-i18next";
import { demandsTableData } from "./data/demandsTableData";
import { useGetDemands } from "../../api/admin";
import { getAccessToken } from "../../utils";
import linearGradient from "../../assets/theme/functions/linearGradient";
import rgba from "../../assets/theme/functions/rgba";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";
import boxShadows from "../../assets/theme/base/boxShadows";
import { Avatar, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import VuiButton from "../../components/VuiButton";
import VuiBadge from "../../components/VuiBadge";
import { useRejectTeacher } from "../../api/admin/rejectTeacher";
import { useApproveTeacher } from "../../api/admin/approveTeacher";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function Demands() {
  const { user } = useAuth();
  const token = getAccessToken();
  const { t } = useTranslation();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [subject, setSubjects] = useState("");
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(5);


  const { data, isLoading } = useGetDemands(token, firstName, lastName, email, subject, page, rowsPerPage);
  const [open, setOpen] = useState(false);
  const [selectedTeacher, setSelectedTeacher] = useState(null);

  const { mutate: rejectTeacher } = useRejectTeacher();
  const { mutate: approveTeacher } = useApproveTeacher();

  const handleOpen = (teacher) => {
    setOpen(true);
    setSelectedTeacher(teacher);
  };


  const handleClose = () => {
    setOpen(false);
    setSelectedTeacher(null);
  };

  const { columns, rows } = demandsTableData(t, data?.users, handleOpen);

  const submitApproval = (approve) => {
    if (approve) {
      approveTeacher(selectedTeacher?.Teacher?.id);
      setOpen(false);
      setSelectedTeacher(null);
    } else {
      rejectTeacher(selectedTeacher?.Teacher?.id);
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
      default:
        break;
    }
  };

  const handlePageChange = (e) => {
    setPage(e.target.value);  // Update the page state
  };

  const handleRowsPerPage = (e) => {
    setRowsPerPage(e.target.value);  // Update the rows state
  };


  return (
    <DashboardLayout user={user}>
      <DashboardNavbar pageName={t("demands.page.title")} />
      <VuiBox py={3}>
        <Card>
          <VuiBox display="flex" justifyContent="space-between" alignItems="center">
            <VuiTypography variant="lg" color="white">
              {t("demands.table.title")}
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
            />

          </VuiBox>
        </Card>
      </VuiBox>
      {selectedTeacher && <Dialog
        sx={() => ({
          "& .MuiDialog-paper": {
            display: "flex",
            flexDirection: "column",
            background: linearGradient(card.main, card.state, card.deg),
            backdropFilter: "blur(120px)",
            position: "relative",
            minWidth: 600,
            padding: "22px",
            wordWrap: "break-word",
            backgroundClip: "border-box",
            border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
            borderRadius: borderRadius.xl,
            boxShadow: xxl,
          },
        })}
        open={open}
        onClose={handleClose}
      >
        <DialogTitle color="#ffffff" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
          {t("popup.title", { name: selectedTeacher?.firstName || t("popup.defaultName") })}
        </DialogTitle>
        <DialogContent>
          <Box display="flex" alignItems="center" mb={3}>
            <Avatar
              src={selectedTeacher?.profilePic?.url || ""}
              alt={selectedTeacher?.firstName || "User"}
              sx={{
                width: 150,
                height: 150,
                marginRight: 2,
                backgroundColor: "rgba(255, 255, 255, 0.1)",
              }}
            />
            <Box>
              <VuiTypography variant="subtitle1" color="white">
                {t("popup.fullName")}: {selectedTeacher?.firstName} {selectedTeacher?.lastName}
              </VuiTypography>
              <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                {t("popup.role")}: {t(`subjects.${selectedTeacher?.Teacher?.subject}`)}
              </VuiTypography>
              <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                {t("popup.email")}: {selectedTeacher?.email || t("popup.noEmail")}
              </VuiTypography>
              <VuiTypography mt={"10px"} variant="subtitle2" color="white">
                {t("forms.institution")}: {selectedTeacher?.Teacher?.institution}
              </VuiTypography>
              <VuiBadge
                variant="standard"
                badgeContent={t(`profile.card.${selectedTeacher.isEmailVerified ? "Verified" : "unVerified"}`)}
                color="success"
                size="xs"
                container
                sx={({ palette: { white, success, warning }, borders: { borderRadius, borderWidth } }) => ({
                  background: selectedTeacher.isEmailVerified ? success.main : warning.main,
                  border: `${borderWidth[1]} solid ${selectedTeacher.isEmailVerified ? success.main : warning.main}`,
                  borderRadius: borderRadius.md,
                  color: white.main,
                })}
              />
            </Box>
          </Box>
          <VuiTypography variant="body1" color="white">
            {t("popup.demand.description")}
          </VuiTypography>
        </DialogContent>
        <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }}>
          <VuiButton
            onClick={() => submitApproval(false)}
            color="error"
            sx={{ fontSize: "0.875rem", padding: "8px 16px" }}
          >
            {t("button.reject")}
          </VuiButton>
          <VuiButton
            onClick={() => submitApproval(true)}
            color="info"
            sx={{ fontSize: "0.875rem", padding: "8px 16px" }}
          >
            {t("button.approve")}
          </VuiButton>
        </DialogActions>
      </Dialog>}

    </DashboardLayout>
  );
}

export default Demands;
