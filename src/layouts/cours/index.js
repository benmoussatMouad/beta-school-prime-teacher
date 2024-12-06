import { useRef, useState } from "react";
import { useTranslation } from "react-i18next";
import { useAuth } from "context/auth/authContext";

// @mui material components
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";

// Swiper components
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import ChapterCard from "examples/Cards/ChapterCards/DefaultChapterCard";
import DashboardLayout from "examples/LayoutContainers/DashboardLayout";
import Header from "./components/Header";
import UpdateCourse from "./components/CourseDetails";


import { Box, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import VuiButton from "../../components/VuiButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { courseData, StudentsLevel, Subjects } from "../../utils";
import { useVisionUIController } from "../../context";
import linearGradient from "../../assets/theme/functions/linearGradient";
import rgba from "../../assets/theme/functions/rgba";
import VuiInput from "../../components/VuiInput";
import { useForm } from "react-hook-form";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";
import boxShadows from "../../assets/theme/base/boxShadows";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function CoursDetails() {
  const { t } = useTranslation();
  const context = useAuth();
  const [openDialog, setOpenDialog] = useState(false); // Dialog state for confirmation

  const [controller] = useVisionUIController();
  const { direction } = controller;

  const swiperRef = useRef(null); // Create a ref for Swiper


  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
    setValue,
    //watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      subject: Subjects[0],
      level: StudentsLevel[0],
      icon: null,
      video: null,
      attachments: [],
    },
  });

  //const watchVideo = watch("video");
  //const watchAttachments = watch("attachments");

  const handleFileChange = (e, fieldName) => {
    const files = fieldName === "attachments" ? Array.from(e.target.files) : e.target.files[0];
    setValue(fieldName, files, { shouldValidate: true });
  };

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("subject", data.subject);
    formData.append("level", data.level);

    if (data.icon) formData.append("icon", data.icon);
    if (data.video) formData.append("video", data.video);
    if (data.attachments.length) {
      data.attachments.forEach((file, index) => {
        formData.append(`attachments[${index}]`, file);
      });
    }

    // Handle form submission logic here
    setOpenDialog(false);
    reset();
  };

  return (
    <DashboardLayout user={context.user}>
      <Header pageName={"Course Details"} />

      <Dialog
        sx={({  }) => ({
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
        <DialogTitle color={"#ffffff"}>{t("dialog.chapter.title")}</DialogTitle>
        <DialogContent>
          <VuiBox as={"form"} onSubmit={handleSubmit(onSubmit)}>
            <Grid container spacing={2}>
              {/* Title Input */}
              <Grid item xs={12}>
                <VuiBox display="flex" flexDirection="column" alignItems="flex-start" gap={"10px"} >
                  <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                    {t("dialog.forms.title")}
                  </VuiTypography>
                  <VuiInput
                    placeholder={t("dialog.forms.title")}
                    {...register("title", { required: t("dialog.required.title") })}
                  />
                  {errors.icon && (
                    <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.icon.message}</VuiTypography>
                  )}
                </VuiBox>
              </Grid>

              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    {/* Description Input */}
                    <VuiBox display="flex" flexDirection="column" alignItems="flex-start" gap={"10px"} >
                      <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                        {t("dialog.forms.description")}
                      </VuiTypography>
                      <VuiInput
                        placeholder={t("dialog.forms.description")}
                        multiline
                        rows={4}
                        {...register("description", { required: t("dialog.required.description") })}
                      />
                      {errors.title && (
                        <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.title.message}</VuiTypography>
                      )}
                    </VuiBox>
                  </Grid>

                  <Grid item xs={12}>
                    {/* Chapter Video Upload */}
                    <VuiBox display="flex" flexDirection="column" alignItems="center" gap={"10px"} >
                      <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                        {t("dialog.forms.video")}
                      </VuiTypography>
                      <input
                        type="file"
                        accept="video/*"
                        {...register("video", { required: t("dialog.required.video") })}
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e, "video")}
                      />
                      <VuiButton
                        color="info"
                        onClick={() => document.querySelector("input[type='file'][accept='video/*']").click()}
                      >
                        {t("dialog.upload.video")}
                      </VuiButton>
                      {errors.video && (
                        <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>
                          {errors.video.message}
                        </VuiTypography>
                      )}
                    </VuiBox>
                  </Grid>

                  <Grid item xs={12} >
                    {/* Attachments Upload */}
                    <VuiBox display="flex" flexDirection="column" alignItems="center" gap={"10px"} >
                      <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                        {t("dialog.forms.attachments")}
                      </VuiTypography>
                      <input
                        type="file"
                        accept="image/*,application/pdf"
                        multiple
                        {...register("attachments")}
                        style={{ display: "none" }}
                        onChange={(e) => handleFileChange(e, "attachments")}
                      />
                      <VuiButton
                        color="info"
                        onClick={() => document.querySelector("input[type='file'][multiple]").click()}
                      >
                        {t("dialog.upload.attachments")}
                      </VuiButton>
                      {errors.subject && (
                        <VuiTypography
                          sx={{ color: "red", fontSize: "0.7rem" }}>{errors.subject.message}</VuiTypography>
                      )}
                    </VuiBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </VuiBox>
        </DialogContent>
        <DialogActions>
          <VuiButton onClick={() => setOpenDialog(false)} color="secondary">
            {t("button.cancel")}
          </VuiButton>
          <VuiButton onClick={handleSubmit(onSubmit)} color="info">
            {t("button.confirm")}
          </VuiButton>
        </DialogActions>
      </Dialog>
      <Grid container spacing={3} my="20px">
        <Grid item xs={12} xl={8}>
          <Card>
            <VuiBox display="flex" flexDirection="column" height="100%">
              <VuiBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                <VuiTypography variant="lg" sx={{ mb: 2 }} fontWeight="bold" color="white" textTransform="capitalize">
                  {t("chapters.title")}
                </VuiTypography>
                <VuiButton onClick={() => setOpenDialog(true)} color="info" variant="gradient" size="sm">
                  + {t("chapter.create")}
                </VuiButton>
              </VuiBox>
              {/* Overflow controlled Box container */}
              <Box
                sx={{
                  width: "100%",
                  position: "relative",
                  direction: direction === "rtl" ? "rtl" : "ltr", // Apply CSS direction for RTL
                }}
              >
                <Swiper
                  ref={swiperRef} // Pass the ref to Swiper
                  modules={[Navigation, Pagination]}
                  spaceBetween={20}
                  slidesPerView={1}
                  navigation={false} // Disable default navigation buttons
                  loop={true} // Enable looping
                  breakpoints={{
                    600: {
                      slidesPerView: 1, // One slide per view on small screens
                    },
                    1024: {
                      slidesPerView: 2, // Two slides per view on medium screens
                    },
                    1440: {
                      slidesPerView: 3, // Three slides per view on larger screens
                    },
                  }}
                >
                  {courseData.map((course) => (
                    <SwiperSlide style={{ maxWidth: "350px" }} key={course.id}>
                      <ChapterCard
                        id={course.id}
                        image={course.image}
                        label={course.label}
                        title={course.title}
                        description={course.description}
                        action={{
                          color: "white",
                          label: t("chapters.ressources"),
                        }}
                        duration={course.duration}
                        ressources={course.ressources}
                      />
                    </SwiperSlide>
                  ))}
                </Swiper>

                {/* Custom Navigation Buttons */}
                <VuiButton
                  color={"info"}
                  onClick={() =>
                    swiperRef.current.swiper.slidePrev() // Keep functionality the same
                  }
                  sx={{
                    position: "absolute",
                    left: direction === "rtl" ? "unset" : "20px", // Adjust button for RTL
                    right: direction === "rtl" ? "20px" : "unset",
                    top: "45%",
                    zIndex: 10,
                  }}
                >
                  <FaChevronLeft />
                </VuiButton>
                <VuiButton
                  color={"info"}
                  onClick={() =>
                    swiperRef.current.swiper.slideNext() // Keep functionality the same
                  }
                  sx={{
                    position: "absolute",
                    right: direction === "rtl" ? "unset" : "20px", // Adjust button for RTL
                    left: direction === "rtl" ? "20px" : "unset",
                    top: "45%",
                    zIndex: 10,
                  }}
                >
                  <FaChevronRight />
                </VuiButton>
              </Box>
            </VuiBox>
          </Card>
        </Grid>
        <Grid item xs={12} xl={4}>
          <UpdateCourse />
        </Grid>
      </Grid>
    </DashboardLayout>
  );
}

export default CoursDetails;
