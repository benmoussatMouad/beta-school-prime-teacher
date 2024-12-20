import React, { useState } from "react";
import Card from "@mui/material/Card";
import VuiBox from "../../../../components/VuiBox";
import VuiButton from "../../../../components/VuiButton";
import { useTranslation } from "react-i18next";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import linearGradient from "../../../../assets/theme/functions/linearGradient";
import rgba from "../../../../assets/theme/functions/rgba";
import colors from "../../../../assets/theme/base/colors";
import borders from "../../../../assets/theme/base/borders";
import boxShadows from "../../../../assets/theme/base/boxShadows";
import { useAcceptCourse } from "../../../../api/courses/accepterCourse";
import { useRejectCourse } from "../../../../api/courses/rejectCourse";
import VuiInput from "../../../../components/VuiInput";
import VuiTypography from "../../../../components/VuiTypography";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function ActionsCourse({ coursId }) {
  const [openDialog, setOpenDialog] = useState(false);
  const [action, setAction] = useState(null); // Tracks the current action (approve/reject)
  const [statusNote, setStatusNote] = useState(""); // Tracks the rejection note
  const { t } = useTranslation();

  const { mutate: acceptCourse } = useAcceptCourse();
  const { mutate: rejectCourse } = useRejectCourse();

  const handleConfirmDialogClose = (confirmed) => {
    if (confirmed) {
      if (action === "approve" && coursId) {
        acceptCourse(coursId);
      }
      if (action === "reject" && coursId) {
        rejectCourse({ coursId, statusNote });
      }
    }
    setOpenDialog(false);
    setStatusNote(""); // Clear the note after submission
  };

  const handleOpenDialog = (actionType) => {
    setAction(actionType);
    setOpenDialog(true);
  };

  return (
    <>
      <Dialog
        sx={{
          "& .MuiDialog-paper": {
            display: "flex",
            flexDirection: "column",
            background: linearGradient(card.main, card.state, card.deg),
            backdropFilter: "blur(120px)",
            position: "relative",
            minWidth: 0,
            padding: "22px",
            wordWrap: "break-word",
            backgroundClip: "border-box",
            border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
            borderRadius: borderRadius.xl,
            boxShadow: xxl,
          },
        }}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle color={"#ffffff"}>
          {action === "approve"
            ? t("dialog.approveCourse.title")
            : t("dialog.rejectCourse.title")}
        </DialogTitle>
        <DialogContent>
          <Typography color={"#ffffff"} mb={2}>
            {action === "approve"
              ? t("dialog.approveCourse.description")
              : t("dialog.rejectCourse.description")}
          </Typography>
          {action === "reject" && (
            <VuiInput
              fullWidth
              multiline
              rows={3}
              variant="outlined"
              color="info"
              value={statusNote}
              onChange={(e) => setStatusNote(e.target.value)}
              placeholder={t("dialog.rejectCourse.notePlaceholder")}
            />
          )}
        </DialogContent>
        <DialogActions>
          <VuiButton onClick={() => handleConfirmDialogClose(false)} color="secondary">
            {t("button.cancel")}
          </VuiButton>
          <VuiButton
            onClick={() => handleConfirmDialogClose(true)}
            color="info"
            disabled={action === "reject" && !statusNote.trim()} // Disable confirm if note is empty
          >
            {t("button.confirm")}
          </VuiButton>
        </DialogActions>
      </Dialog>
      <Card sx={{ my: 1 }}>
        <VuiBox
          display="flex"
          sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}
          flexDirection="row"
          height="100%"
        >
          <VuiTypography variant='h5' color="white">
            {t('course.adminAction.message')}
          </VuiTypography>
          <VuiBox>
            <VuiButton
              sx={{marginRight: "10px"}}
              onClick={() => handleOpenDialog("approve")}
              color={"info"}
              size={"large"}
              variant={"gradient"}
            >
              {t("button.approve")}
            </VuiButton>
            <VuiButton
              onClick={() => handleOpenDialog("reject")}
              color={"error"}
              size={"large"}
              variant={"gradient"}
            >
              {t("button.reject")}
            </VuiButton>
          </VuiBox>
        </VuiBox>
      </Card>
    </>
  );
}

export default ActionsCourse;
