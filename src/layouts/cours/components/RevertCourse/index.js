import React, { useState } from "react";
import Card from "@mui/material/Card";
import VuiBox from "../../../../components/VuiBox";
import VuiTypography from "../../../../components/VuiTypography";
import VuiButton from "../../../../components/VuiButton";
import { useTranslation } from "react-i18next";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Typography } from "@mui/material";
import linearGradient from "../../../../assets/theme/functions/linearGradient";
import rgba from "../../../../assets/theme/functions/rgba";
import colors from "../../../../assets/theme/base/colors";
import borders from "../../../../assets/theme/base/borders";
import boxShadows from "../../../../assets/theme/base/boxShadows";
import { useDeleteCourse } from "../../../../api/courses/deleteCourse";
import { useRevertCourse } from "../../../../api/courses/revertCourse";


const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function RevertCourse({ coursId }) {

  const [openDialog, setOpenDialog] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const { mutate } = useRevertCourse();
  const { t } = useTranslation();

  const handleConfirmDialogClose = (confirmed) => {
    if (confirmed) {
      setIsLoading(true);
      mutate({ coursId }, {
        onSuccess: () => {
          setOpenDialog(false); // Close the dialog on success
          setIsLoading(false)
        },
        onError: () => {
          setOpenDialog(false);
          setIsLoading(false)
        },
      });
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
        <DialogTitle color={"#ffffff"}>{t("dialog.revertCourse.areYouSureToRevert")}</DialogTitle>
        <DialogContent>
          <Typography color={"#ffffff"}>{t("dialog.action.canNotGoBack")}</Typography>
        </DialogContent>
        {isLoading ? (
          <VuiBox sx={{
            display: "flex",
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "center",
            height: "200px",
            width: "300px",
            margin: "auto",
          }}>
            <CircularProgress color="info" />
          </VuiBox>
        ) : (
          <>
            <DialogActions>
              <VuiButton onClick={() => handleConfirmDialogClose(false)} color="secondary">
                {t("button.cancel")}
              </VuiButton>
              <VuiButton onClick={() => handleConfirmDialogClose(true)} color="info">
                {t("button.confirm")}
              </VuiButton>
            </DialogActions>
          </>
        )}
      </Dialog>
      <Card sx={{margin: "15px 0"}}>
        <VuiBox display="flex" sx={{ width: "100%", justifyContent: "space-between", alignItems: "center" }}
                flexDirection="row" height="100%">
          <VuiBox display="flex" flexDirection="column" mb="24px">
            <VuiTypography color="white" variant="lg" fontWeight="bold" mb="6px">
              {t("course.revert.title")}
            </VuiTypography>
            <VuiTypography color="text" variant="button" fontWeight="regular">
              {t("course.revert.description.willLeadToCourseBeingUnderCreation")}
            </VuiTypography>
          </VuiBox>
          <VuiBox xs={{ justifyContent: "center", alignSelf: "end" }}>
            <VuiButton onClick={() => setOpenDialog(true)} color={"warning"} size={"large"}
                       variant={"gradient"}>{t("course.revert.button.revertCourse")}
            </VuiButton>
          </VuiBox>
        </VuiBox>
      </Card>
    </>
  );
}

export default RevertCourse;
