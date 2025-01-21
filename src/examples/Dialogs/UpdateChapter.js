import React, { useEffect, useRef, useState } from "react";
import {
  CircularProgress,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  Grid,
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
import { useUpdateChapter } from "../../api/chapters/updateChapter";
import { useGetChapter } from "../../api/chapters/getChapter";
import { getAccessToken } from "../../utils";
import { useViewChapter } from "../../api/chapters/viewChapter";
import { IoIosWarning } from "react-icons/io";
import { MdCancel } from "react-icons/md";
import VuiSwitch from "../../components/VuiSwitch";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function UpdateChapter({ closeDialog, openDialog, chapterId }) {
  const { t } = useTranslation();

  const token = getAccessToken();

  const { data: chapterData, isLoading: isFetching } = useGetChapter(token, chapterId);
  const { mutate } = useUpdateChapter();

  const abortControllerRef = useRef(null); // Create a ref for AbortController

  const { data: viewChapter } = useViewChapter(token, chapterId);

  const [isLoading, setIsLoading] = useState(false);
  const [videoPreview, setVideoPreview] = useState(null);
  const [uploadedVideo, setUploadedVideo] = useState(null);
  const [uploadProgress, setUploadProgress] = useState(0);

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

  let watchVideo = watch("video");
  const watchAttachments = watch("attachments");

  // Prefill form fields when chapterData changes
  // useEffect(() => {
  //   if (chapterData) {
  //     reset({
  //       title: chapterData.title || "",
  //       description: chapterData.description || "",
  //       video: null, // Maintain the uploaded video if it exists
  //       attachments: [],
  //     });
  //
  //     if (watchVideo) {
  //       // setVideoPreview(URL.createObjectURL(watchVideo));
  //     } else {
  //       // Otherwise, fall back to the video from viewChapter (backend)
  //       // setVideoPreview(viewChapter?.url || null);
  //     }
  //   }
  //
  //   return () => {
  //     if (abortControllerRef.current) {
  //       abortControllerRef.current.abort(); // Abort any pending requests
  //     }
  //   };
  // }, [chapterData, viewChapter?.url, reset]);

  const handleFileChange = (e, fieldName) => {
    const files = fieldName === "attachments" ? Array.from(e.target.files) : e.target.files[0];
    if (files) {
      setValue(fieldName, files, { shouldValidate: true });

      if (fieldName === "video") {
        if (videoPreview) {
          URL.revokeObjectURL(videoPreview); // Cleanup old preview URL
        }
        setVideoPreview(URL.createObjectURL(files));
        setUploadedVideo(files);
      }
    } else {
      setValue(fieldName, null);
    }
  };

  const handleProgress = (progress) => {
    setUploadProgress(progress); // Update progress in real-time
  };

  const onSubmit = (data) => {
    setIsLoading(true);

    const formData = new FormData();
    if (data.title) formData.append("title", data.title); // Include only updated fields
    if (data.description) formData.append("description", data.description);
    if (data.video) formData.append("video", data.video);
    if (data.hasPreview && data.video) formData.append("hasPreview", data.hasPreview);
    if (data.attachments.length) {
      data.attachments.forEach((file) => {
        formData.append(`attachments`, file); // Attach each selected file
      });
    }

    // Ensure any previous abort controller is cleared
    if (abortControllerRef.current) {
      abortControllerRef.current.abort();
    }

    // Create an AbortController instance
    abortControllerRef.current = new AbortController();

    mutate(
      { chapterId, formData, signal: abortControllerRef.current.signal, onProgress: handleProgress },
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

  const handleCloseDialog = () => {
    if (abortControllerRef.current) {
      abortControllerRef.current.abort(); // Abort the ongoing request
      abortControllerRef.current = null; // Reset the controller
    }
    setIsLoading(false); // Reset loading state
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
        </DialogTitle>
      ) : (
        <DialogTitle>
          <VuiTypography color="white" fontWeight="bold">
            {t("dialog.chapter.update")}
          </VuiTypography>
        </DialogTitle>
      )}
      <DialogContent>
        <VuiTypography paragraph variant='caption' sx={{lineHeight: "1.1em"}} color="white" fontWeight="regular">
          <IoIosWarning size={"18px"} color="warning"/>
          {t('chapter.update.caution')}
        </VuiTypography>
        <VuiBox as="form">
          {
            isLoading || isFetching ? (
              isFetching?
                (<VuiBox sx={{
                  display: "flex",
                  flexDirection: "column",
                  gap: 2,
                  alignItems: "center",
                  justifyContent: "center",
                  height: "200px",
                  width: "300px",
                  margin: "auto",
                }}>
                  <CircularProgress color="info" />
                </VuiBox>) :
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
                  <VuiTypography color={"white"} fontWeight={"bold"} mt={2} variant={"h5"}>{uploadProgress}%</VuiTypography>
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
                    placeholder={t("dialog.forms.title")}
                    {...register("title")}
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
                    placeholder={t("dialog.forms.description")}
                    multiline
                    rows={4}
                    {...register("description")}
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
                  {uploadedVideo && (
                    <>
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

                      <VuiTypography variant="caption" color="info">{uploadedVideo.name}</VuiTypography>
                      {/* Add Delete Button */}
                      <VuiButton
                        color="error"
                        variant="outlined"
                        startIcon={<MdCancel size={"18px"} color="warning"/>}
                        onClick={() => {
                          setValue("video", null); // Clear the video field
                          if (videoPreview) URL.revokeObjectURL(videoPreview); // Clean up preview URL
                          setVideoPreview(null); // Remove video preview
                          setUploadedVideo(null)
                        }}
                        sx={{
                          mt: 1, // Add spacing above the delete button
                        }}
                      >
                        {t("dialog.delete.video")}
                      </VuiButton>
                    </>
                    )}
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
          <VuiButton disabled={isLoading || isFetching} onClick={handleSubmit(onSubmit)}
                     color="info">{t("button.confirm")}</VuiButton>
        </VuiBox>
      </DialogActions>
    </Dialog>
  );
}

export default UpdateChapter;
