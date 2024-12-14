import React, { useRef, useState } from "react";
import { CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle, Grid } from "@mui/material";
import linearGradient from "../../assets/theme/functions/linearGradient";
import rgba from "../../assets/theme/functions/rgba";
import VuiBox from "../../components/VuiBox";
import VuiTypography from "../../components/VuiTypography";
import VuiInput from "../../components/VuiInput";
import VuiButton from "../../components/VuiButton";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";
import boxShadows from "../../assets/theme/base/boxShadows";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import AttachFileIcon from "@mui/icons-material/AttachFile";
import VideoPlayer from "../VideoPlayer/VideoPlayer";
import { useCreateChapter } from "../../api/chapters/createChapter";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function CreateChapter({ closeDialog, openDialog, courseId }) {
  const { t } = useTranslation();

  const { mutate } = useCreateChapter();

  const [isLoading, setIsLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);

  const abortControllerRef = useRef(null); // Ref for AbortController

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      video: null,
      attachments: [],
    },
  });

  const watchVideo = watch("video");
  const watchAttachments = watch("attachments");

  const handleFileChange = (e, fieldName) => {
    const files = fieldName === "attachments" ? Array.from(e.target.files) : e.target.files[0];
    if (files) {
      setValue(fieldName, files, { shouldValidate: true });

      if (fieldName === "video") {
        setVideoPreview(URL.createObjectURL(files));
      }
    } else {
      setValue(fieldName, null); // Handle case when no file is selected
    }
  };


  const onSubmit = (data) => {

    if (!data.video) {
      return;
    }

    setIsLoading(true);
    const payload = {
      title: data.title,
      description: data.description,
    };

    const formData = new FormData();
    formData.append("title", payload.title);
    formData.append("description", payload.description);
    if (data.video) formData.append("video", data.video);
    if (data.attachments.length) {
      data.attachments.forEach((file) => {
        formData.append(`attachments`, file);
      });
    }

    // Create an AbortController for this mutation
    abortControllerRef.current = new AbortController();

    mutate(
      { courseId, formData, signal: abortControllerRef.current.signal }, {
        onSuccess: () => {
          setIsLoading(false);
          closeDialog(); // Close dialog
          reset(); // Reset the form
          setVideoPreview(null); // Clear the video preview
        },
        onError: () => {
          setIsLoading(false);
        },
      },
    );
  };

  // Close dialog and cancel mutation
  const handleCloseDialog = () => {
    if (abortControllerRef.current) {
      // Abort the ongoing request
      abortControllerRef.current.abort();
      abortControllerRef.current = null; // Reset the controller
    }
    setIsLoading(false); // Reset the loading state
    closeDialog(); // Call the parent prop to close the dialog
  };

  return (
    <Dialog
      open={openDialog}
      onClose={handleCloseDialog}
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
            {t("dialog.loading")}
          </VuiTypography>
        </DialogTitle>
      ) : (
        <DialogTitle>
          <VuiTypography color="white" fontWeight="bold">
            {t("dialog.chapter.title")}
          </VuiTypography>
        </DialogTitle>
      )}
      <DialogContent>
        <VuiBox as="form">
          {
            (isLoading) ? (
                <VuiBox sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                  width: "300px",
                }}>
                  <CircularProgress color="info" />
                </VuiBox>
              ) :
              <Grid container spacing={3}>
                {/* Title Input */}
                <Grid item xs={12}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    {t("dialog.forms.title")}
                  </VuiTypography>
                  <VuiInput
                    sx={{ borderColor: rgba(black.main, 0.1), borderRadius: borderRadius.md }}
                    placeholder={t("dialog.forms.title")}
                    {...register("title", { required: t("dialog.required.title") })}
                    error={!!errors.title}
                  />
                  {errors.title &&
                    <VuiTypography color="error" variant="caption">{errors.title.message}</VuiTypography>}
                </Grid>

                {/* Description Input */}
                <Grid item xs={12}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    {t("dialog.forms.description")}
                  </VuiTypography>
                  <VuiInput
                    sx={{ borderColor: rgba(black.main, 0.1), borderRadius: borderRadius.md }}
                    placeholder={t("dialog.forms.description")}
                    multiline
                    rows={4}
                    {...register("description", { required: t("dialog.required.description") })}
                    error={!!errors.description}
                  />
                  {errors.description &&
                    <VuiTypography color="error" variant="caption">{errors.description.message}</VuiTypography>}
                </Grid>

                {/* Video Upload */}
                <Grid sx={{ display: "flex", flexDirection: "column", gap: 1 }} item xs={12} textAlign="center">
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    {t("dialog.forms.video")}
                  </VuiTypography>
                  <input
                    type="file"
                    accept="video/*"
                    style={{ display: "none" }}
                    id="video-upload"
                    name="video"
                    onChange={(e) => handleFileChange(e, "video")}
                  />
                  <VuiButton color="info" variant="outlined" startIcon={<CloudUploadIcon />}
                             onClick={() => document.getElementById("video-upload").click()}>
                    {t("dialog.upload.video")}
                  </VuiButton>
                  {watchVideo && <VuiTypography variant="caption" color="info">{watchVideo.name}</VuiTypography>}
                  {!watchVideo &&
                    <VuiTypography color="error" variant="caption">{t("dialog.required.video")}</VuiTypography>}
                  {videoPreview && <VuiBox mt={2}><VideoPlayer videoSrc={videoPreview} /></VuiBox>}
                </Grid>

                {/* Attachments Upload */}
                <Grid sx={{ display: "flex", flexDirection: "column", gap: 1 }} item xs={12} textAlign="center">
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    {t("dialog.forms.attachments")}
                  </VuiTypography>
                  <input
                    type="file"
                    accept="image/*,application/pdf"
                    multiple
                    style={{ display: "none" }}
                    id="attachment-upload"
                    onChange={(e) => handleFileChange(e, "attachments")}
                  />
                  <VuiButton color="info" variant="outlined" startIcon={<AttachFileIcon />}
                             onClick={() => document.getElementById("attachment-upload").click()}>
                    {t("dialog.upload.attachments")}
                  </VuiButton>
                  {watchAttachments && (
                    <VuiBox sx={{ display: "flex", flexDirection: "column", alignItems: "center" }} mt={1}
                            textAlign="left">
                      {watchAttachments.map((file, idx) => (
                        <VuiTypography key={idx} variant="caption" color="info">{file.name}</VuiTypography>
                      ))}
                    </VuiBox>
                  )}
                </Grid>
              </Grid>
          }
        </VuiBox>
      </DialogContent>
      <DialogActions>
        <VuiBox display="flex" justifyContent="right" width="100%" gap={2}>
          <VuiButton onClick={handleCloseDialog} color="secondary">{t("button.cancel")}</VuiButton>
          <VuiButton disabled={isLoading} onClick={handleSubmit(onSubmit)}
                     color="info">{t("button.confirm")}</VuiButton>
        </VuiBox>
      </DialogActions>
    </Dialog>
  );
}

export default CreateChapter;
