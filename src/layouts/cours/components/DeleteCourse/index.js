import React, { useState } from "react";
import Card from "@mui/material/Card";
import VuiBox from "../../../../components/VuiBox";
import VuiTypography from "../../../../components/VuiTypography";
import VuiButton from "../../../../components/VuiButton";
import { useTranslation } from "react-i18next";
import { Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import linearGradient from "../../../../assets/theme/functions/linearGradient";
import rgba from "../../../../assets/theme/functions/rgba";
import colors from "../../../../assets/theme/base/colors";
import borders from "../../../../assets/theme/base/borders";
import boxShadows from "../../../../assets/theme/base/boxShadows";
import { useDeleteCourse } from "../../../../api/courses/deleteCourse";


const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function DeleteCourse({ coursId }) {

  const [openDialog, setOpenDialog] = useState(false);
  const { mutate } = useDeleteCourse();
  const { t } = useTranslation();

  const handleConfirmDialogClose = (confirmed) => {
    if (confirmed) {
      mutate(coursId);
    }
    setOpenDialog(false);
  };


  return (
    <>
      <Dialog
        sx={({}) => ({
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
        })}
        open={openDialog}
        onClose={() => setOpenDialog(false)}
      >
        <DialogTitle color={"#ffffff"}>{t("dialog.deleteCourse.title")}</DialogTitle>
        <DialogContent>
          <Typography color={"#ffffff"}>{t("dialog.deleteCourse.description")}</Typography>
        </DialogContent>
        <DialogActions>
          <VuiButton onClick={() => handleConfirmDialogClose(false)} color="secondary">
            {t("button.cancel")}
          </VuiButton>
          <VuiButton onClick={() => handleConfirmDialogClose(true)} color="info">
            {t("button.confirm")}
          </VuiButton>
        </DialogActions>
      </Dialog>
      <Card>
        <VuiBox display="flex" sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}
                flexDirection="row" height="100%">
          <VuiBox display="flex" flexDirection="column" mb="24px">
            <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
              {t("course.accountDeletion.title")}
            </VuiTypography>
            <VuiTypography color="text" variant="button" fontWeight="regular">
              {t("course.accountDeletion.description")}
            </VuiTypography>
          </VuiBox>
          <VuiBox xs={{ justifyContent: "center", alignSelf: "end" }}>
            <VuiButton onClick={() => setOpenDialog(true)} color={"error"} size={"large"}
                       variant={"gradient"}>{t("profile.accountDeletion.deleteButton")}
            </VuiButton>
          </VuiBox>
        </VuiBox>
      </Card>
    </>
  );
}

export default DeleteCourse;