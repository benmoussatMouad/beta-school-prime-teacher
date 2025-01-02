import React from "react";
import { Avatar, Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import VuiButton from "../../components/VuiButton";
import linearGradient from "../../assets/theme/functions/linearGradient";
import rgba from "../../assets/theme/functions/rgba";
import VuiTypography from "../../components/VuiTypography";
import { useGetStudentById } from "../../api/students/getStudent";
import { getAccessToken } from "../../utils";
import { useTranslation } from "react-i18next";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";
import boxShadows from "../../assets/theme/base/boxShadows";
import { useAcceptStudent } from "../../api/students/acceptStudent";
import { useRejectStudent } from "../../api/students/rejectStudent";
import moment from "moment/moment";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function StudentDialog({ open, onClose, studentId }) {
  const token = getAccessToken();
  const { t } = useTranslation();
  const { data: student, isLoading } = useGetStudentById(studentId, token);

  const { mutate: acceptStudent } = useAcceptStudent();
  const { mutate: rejectStudent } = useRejectStudent();


  const onApprove = () => {
    acceptStudent(studentId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  const onUnapprove = () => {
    rejectStudent(studentId, {
      onSuccess: () => {
        onClose();
      },
    });
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      sx={({ breakpoints }) => ({
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
          [breakpoints.up("md")]: { minWidth: 700 },
        },
      })}
    >
      <DialogTitle color="#ffffff" sx={{ fontSize: "1.5rem", fontWeight: "bold" }}>
        {isLoading
          ? t("dialog.loading.title")
          : t("popup.title", { name: student?.user?.firstName || t("popup.defaultName") })}
      </DialogTitle>

      <DialogContent>
        <Box display="flex" alignItems="center" mb={3}>
          <Avatar
            src={student?.user?.profilePic?.url || ""}
            alt={student?.user?.firstName || "User"}
            sx={{
              width: 150,
              height: 150,
              marginRight: 2,
              backgroundColor: "rgba(255, 255, 255, 0.1)",
            }}
          />
          <Box>
            <VuiTypography variant="subtitle2" color="white">
              <b>{t("popup.fullName")}</b>: {student?.user?.firstName}{" "}
              {student?.user?.lastName}
            </VuiTypography>
            <VuiTypography mt={"10px"} variant="subtitle2" color="white">
              <b>{t("popup.class")}</b>: {t(`teacherClass.${student?.class}`)}
            </VuiTypography>
            <VuiTypography mt={"10px"} variant="subtitle2" color="white">
              <b>{t("popup.wilaya")}</b>: {t(`wilaya.${student?.wilaya}`)}
            </VuiTypography>
            <VuiTypography mt={"10px"} variant="subtitle2" color="white">
              <b>{t("popup.email")}</b>: {student?.user?.email || t("popup.noEmail")}
            </VuiTypography>
            <VuiTypography mt={"10px"} variant="subtitle2" color="white">
              <b>{t("popup.phone")}</b>: {student?.user?.phone || t("popup.noPhone")}
            </VuiTypography>
            <VuiTypography mt={"10px"} variant="subtitle2" color="white">
              <b>{t("forms.dateOfJoining")}</b>: {moment(student?.user?.createdAt).format("DD/MM/YYYY")}
            </VuiTypography>
          </Box>
        </Box>

        <VuiTypography variant="body1" color="white">
          {t("popup.demand.student")}
        </VuiTypography>
      </DialogContent>

      <DialogActions sx={{ justifyContent: "space-between", padding: "16px" }}>
        <VuiButton
          onClick={onUnapprove}
          color="error"
          sx={{ fontSize: "0.875rem", padding: "8px 16px" }}
          disabled={isLoading}
        >
          {t("button.reject")}
        </VuiButton>
        <VuiButton
          onClick={onApprove}
          color="info"
          sx={{ fontSize: "0.875rem", padding: "8px 16px" }}
          disabled={isLoading}
        >
          {t("button.approve")}
        </VuiButton>
      </DialogActions>
    </Dialog>
  );
}

export default StudentDialog;
