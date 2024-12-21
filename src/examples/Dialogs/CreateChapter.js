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
import { apiClient } from "../../api";
import VuiLoading from "../../components/VuiLoading";
import VuiSnackBar from "../../components/VuiSnackBar";
import { showSnackBar, useVisionUIController } from "../../context";

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


  // const onSubmit = (data) => {
  //   if (!data.video) {
  //     return; // Ensure there's a video file
  //   }
  //
  //   setIsLoading(true); // Show loading spinner or progress bar
  //
  //   // Payload creation
  //   const formData = new FormData();
  //   formData.append("title", data.title);
  //   formData.append("description", data.description);
  //   if (data.video) formData.append("video", data.video);
  //   if (data.attachments.length) {
  //     data.attachments.forEach((file) => formData.append("attachments", file));
  //   }
  //
  //   const xhr = new XMLHttpRequest(); // Create a new XHR instance
  //
  //   // Set up progress tracking
  //   xhr.upload.onprogress = (event) => {
  //     if (event.lengthComputable) {
  //       const percentCompleted = Math.round((event.loaded / event.total) * 100);
  //       console.log(`Upload progress: ${percentCompleted}%`);
  //       // Example: Update the state for progress or use it for a visual indicator
  //       // You can replace this `console.log` with a setState call to update a progress bar
  //     }
  //   };
  //
  //   // Handle server response
  //   xhr.onload = () => {
  //     if (xhr.status === 200) {
  //       console.log('Upload successful:', xhr.responseText);
  //       setIsLoading(false);
  //       closeDialog(); // Close the dialog
  //       reset(); // Reset the form
  //       setVideoPreview(null); // Clear the video preview
  //     } else {
  //       console.error('Upload failed:', xhr.status, xhr.statusText);
  //       setIsLoading(false); // Hide the loader
  //     }
  //   };
  //
  //   // Handle errors
  //   xhr.onerror = () => {
  //     console.error('An error occurred during the request.');
  //     setIsLoading(false); // Hide the loader
  //   };
  //
  //   // Configure the XHR request
  //   xhr.open("POST", `https://prime-beta-school-back-end.onrender.com/v1/api/course/${courseId}/chapter`, true); // Replace with your endpoint
  //   xhr.setRequestHeader("Authorization", `Bearer <your_token>`); // Add authorization header if required
  //
  //   // Send the form data
  //   xhr.send(formData);
  // };
  const handleProgress = (progress) => {
    setUploadProgress(progress); // Update progress in real-time
  };
  const onSubmit = async (data) => {
    if (!data.video) {
      return; // Ensure there's a video file
    }

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
    setUploadProgress(0)

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
                                                           variant={"h5"}>{t('dialog.loading.end')}</VuiTypography> :<VuiTypography color={"white"} fontWeight={"bold"} mt={2}
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
