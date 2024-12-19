import React from "react";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import linearGradient from "../../assets/theme/functions/linearGradient";
import rgba from "../../assets/theme/functions/rgba";
import VuiBox from "../../components/VuiBox";
import VuiTypography from "../../components/VuiTypography";
import VuiButton from "../../components/VuiButton";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";
import boxShadows from "../../assets/theme/base/boxShadows";
import { useTranslation } from "react-i18next";
import { useGetChapter } from "../../api/chapters/getChapter";
import { useViewChapter } from "../../api/chapters/viewChapter";
import { getAccessToken } from "../../utils";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function ViewChapter({ closeDialog, openDialog, chapterId }) {
  const { t } = useTranslation();

  const token = getAccessToken();

  const { data: chapterData, isLoading: isFetchingChapter } = useGetChapter(token, chapterId);
  const { data: viewChapter, isLoading: isFetchingVideo } = useViewChapter(token, chapterId);

  // Fallbacks for light conditional rendering
  const isLoading = isFetchingChapter || isFetchingVideo;

  // Destructure chapter data
  const { title, description } = chapterData || {};
  const videoUrl = viewChapter?.url; // Use viewChapter.url for video playback

  return (
    <Dialog
      open={openDialog}
      onClose={closeDialog}
      sx={{
        "& .MuiDialog-paper": {
          background: linearGradient(card.main, card.state, card.deg),
          backdropFilter: "blur(120px)",
          padding: "22px",
          border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
          borderRadius: borderRadius.xl,
          boxShadow: xxl,
          maxWidth: "600px",
          margin: "auto",
        },
      }}
    >
      {isLoading ? (
        <DialogTitle>
          <VuiTypography color="white" fontWeight="bold">
            {t("dialog.loading.title")}
          </VuiTypography>
        </DialogTitle>
      ) : (
        <DialogTitle>
          <VuiTypography color="white" fontWeight="bold">
            {t("dialog.view.chapter")}
          </VuiTypography>
        </DialogTitle>
      )}

      <DialogContent>
        {isLoading ? (
          <VuiBox
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              alignItems: "center",
              justifyContent: "center",
              height: "200px",
              width: "300px",
            }}
          >
            <CircularProgress color="info" />
          </VuiBox>
        ) : (
          <Grid container spacing={1}>

            {/* Video Display */}
            <Grid item xs={12} display={"flex"} flexDirection={"column"} textAlign="center">
              <VuiTypography variant="button" color="white" fontWeight="medium">
                {t("dialog.forms.video")}
              </VuiTypography>
              {videoUrl ? (
                <VuiBox mt={2}>
                  <VideoPlayer videoSrc={videoUrl} />
                </VuiBox>
              ) : (
                <VuiTypography color="error" variant="caption">
                  {t("dialog.no.video")}
                </VuiTypography>
              )}
            </Grid>
            {/* Title Display */}
            <Grid item xs={12}>
              <VuiTypography variant="button" color="white" fontWeight="medium">
                {t("dialog.forms.chapter.title")}
              </VuiTypography>
              <VuiTypography color="info" variant="body2">
                {title || t("dialog.no.data")}
              </VuiTypography>
            </Grid>

            {/* Description Display */}
            <Grid item xs={12}>
              <VuiTypography variant="button" color="white" fontWeight="medium">
                {t("dialog.forms.chapter.description")}
              </VuiTypography>
              <VuiTypography color="info" variant="body2">
                {description || t("dialog.no.data")}
              </VuiTypography>
            </Grid>
          </Grid>
        )}
      </DialogContent>

      <DialogActions>
        <VuiBox display="flex" mt={1} justifyContent="flex-end" width="100%">
          <VuiButton onClick={closeDialog} color="info">
            {t("button.close")}
          </VuiButton>
        </VuiBox>
      </DialogActions>
    </Dialog>
  );
}

export default ViewChapter;
