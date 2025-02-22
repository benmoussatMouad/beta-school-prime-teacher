import React, { useRef, useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControl, FormControlLabel,
  Grid, Radio,
  RadioGroup,
} from "@mui/material";
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
import { showSnackBar, useVisionUIController } from "../../context";
import { Switch } from "react-router-dom";
import VuiSwitch from "../../components/VuiSwitch";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function CreateChapter({ closeDialog, openDialog, courseId }) {
  const { t } = useTranslation();

  const { mutate } = useCreateChapter();
  const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar

  const [isLoading, setIsLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [openAbortMessage, setOpenAbortMessage] = useState(false);

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
      hasPreview: false,
      video: null,
      attachments: [],
    },
  });

  const watchVideo = watch("video");
  const watchAttachments = watch("attachments");

  const handleFileChange = (e, fieldName) => {
    const maxSizeInBytes = 1024 * 1024 * 1024; // 5MB file size limit
    let files = fieldName === "attachments" ? Array.from(e.target.files) : e.target.files[0];

    if (files) {
      if (fieldName === "video" && files.size > maxSizeInBytes) {
        // If file size exceeds the limit, show an error
        return showSnackBar(dispatch, t("dialog.error.fileTooLarge", { size: "1GB" }), "error");
      }

      setValue(fieldName, files, { shouldValidate: true });

      if (fieldName === "video") {
        setVideoPreview(URL.createObjectURL(files)); // Set video preview URL
      }
    } else {
      setValue(fieldName, null); // Handle case when no file is selected
    }
  };
  const handleProgress = (progress) => {
    setUploadProgress(progress); // Update progress in real-time
  };
  const onSubmit = async (data) => {
    if (!data.video) {
      return; // Ensure there's a video file
    }
    console.log("has preview", data.hasPreview);
    setIsLoading(true); // Show loading spinner or progress bar
    setUploadProgress(0);

    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort any previous request
    }
    abortControllerRef.current = new AbortController();
    const { signal } = abortControllerRef.current;

    // Payload creation
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    if (data.hasPreview) formData.append("hasPreview", data.hasPreview);
    if (data.video) formData.append("video", data.video);
    if (data.attachments.length) {
      data.attachments.forEach((file) => formData.append("attachments", file));
    }

    mutate(
      { courseId, formData, signal: abortControllerRef.current.signal, onProgress: handleProgress },
      {
        onSuccess: () => {
          setIsLoading(false);
          closeDialog(); // Close dialog on success
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
    setUploadProgress(0);

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
            {t("dialog.loading.title")}
          </VuiTypography>
          <VuiBox>
            <VuiTypography paragraph color="white" variant="caption" sx={{ textWrap: "break-word" }}>
              {t("dialog.loading.details")}
            </VuiTypography>
          </VuiBox>
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
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                  width: "300px",
                  margin: "auto",
                }}>
                  <CircularProgress thickness={5} variant="determinate" size={80} color="info" value={uploadProgress} />
                  <br />
                  {uploadProgress === 100 ? <VuiTypography color={"white"} fontWeight={"bold"} mt={2}
                                                           variant={"h5"}>{t("dialog.loading.end")}</VuiTypography> :
                    <VuiTypography color={"white"} fontWeight={"bold"} mt={2}
                                   variant={"h5"}>{uploadProgress}%</VuiTypography>}

                </VuiBox>
              ) :
              <Grid container spacing={3}>
                {/* Title Input */}
                <Grid item xs={12}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    {t("dialog.forms.chapter.title")}
                  </VuiTypography>
                  <VuiInput
                    sx={{ borderColor: rgba(black.main, 0.1), borderRadius: borderRadius.md }}
                    placeholder={t("dialog.forms.chapter.title")}
                    {...register("title", { required: t("dialog.required.title") })}
                    error={!!errors.title}
                  />
                  {errors.title &&
                    <VuiTypography color="error" variant="caption">{errors.title.message}</VuiTypography>}
                </Grid>

                {/* Description Input */}
                <Grid item xs={12}>
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    {t("dialog.forms.chapter.description")}
                  </VuiTypography>
                  <VuiInput
                    sx={{ borderColor: rgba(black.main, 0.1), borderRadius: borderRadius.md }}
                    placeholder={t("dialog.forms.chapter.description")}
                    multiline
                    rows={4}
                    {...register("description", { required: t("dialog.required.description") })}
                    error={!!errors.description}
                  />
                  {errors.description &&
                    <VuiTypography color="error" variant="caption">{errors.description.message}</VuiTypography>}
                </Grid>


                {/* Has Preview Toggle */}
                <Grid item xs={12} textAlign="start" >
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    {t("dialog.forms.preview.toggle")}
                  </VuiTypography>
                  <VuiBox sx={{
                    display: "flex",
                    flexDirection: "row",
                    justifyContent: "start",
                    alignItems: "center",
                    gap: 2,
                    mx: 2
                  }}>
                    <FormControlLabel
                      control={
                        <VuiSwitch
                          color="info" // Set to default theme color
                          checked={Boolean(watch("hasPreview"))} // Bind it to 'hasPreview'
                          onChange={(e) => setValue("hasPreview", e.target.checked)} // Update state when toggled
                        />
                      }
                      label={
                        <VuiTypography variant="caption" color="white">
                          {t(watch("hasPreview") ? "dialog.preview.yes" : "dialog.preview.no")}
                        </VuiTypography>
                      } // Dynamic label
                    />
                  </VuiBox>
                  {errors.hasPreview && (
                    <VuiTypography color="error" variant="caption">
                      {errors.hasPreview.message}
                    </VuiTypography>
                  )}
                  <VuiTypography paragraph variant={"caption"} color="white" fontWeight="regular">
                    {t("thisMeansThatTheVideoWillHaveAFreeSampleTheSampleWillBeThrityPercentOfTheoriginal")}
                  </VuiTypography>
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
