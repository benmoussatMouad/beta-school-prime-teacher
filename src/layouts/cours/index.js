import React, { useRef, useState } from "react";
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


import { Box, Skeleton } from "@mui/material";
import VuiButton from "../../components/VuiButton";
import { FaChevronLeft, FaChevronRight } from "react-icons/fa";
import { convertSecondsToMinutes } from "../../utils";
import { useVisionUIController } from "../../context";
import { useLocation } from "react-router-dom";
import { useGetCourse } from "../../api/courses/getCourse";
import VuiLoading from "../../components/VuiLoading";
import DeleteCourse from "./components/DeleteCourse";
import { useUpdateToReview } from "../../api/courses/sendToReview";
import ActionsCourse from "./components/Actions/Actions";
import NotFound from "../../examples/NotFound/NotFound";
import CreateChapter from "../../examples/Dialogs/CreateChapter";
import UpdateChapter from "../../examples/Dialogs/UpdateChapter";
import ViewChapter from "../../examples/Dialogs/ViewChapter";


function CoursDetails() {

  const pathname = useLocation().pathname;
  const coursId = pathname.split("/")[2];

  const { t } = useTranslation();
  const context = useAuth();
  const [openCreateDialog, setOpenCreateDialog] = useState(false);
  const [openUpdateDialog, setOpenUpdateDialog] = useState({ open: false, chapterId: "" });
  const [openViewDialog, setOpenViewDialog] = useState({ open: false, chapterId: "" });
  const [controller] = useVisionUIController();
  const { direction } = controller;

  const swiperRef = useRef(null); // Create a ref for Swiper

  const { data, isLoading } = useGetCourse(coursId);
  const { mutate: updateToReview } = useUpdateToReview();


  const changeStatusToReview = async () => {
    await updateToReview(data.id);
  };

  if (isLoading) {
    return <VuiLoading />;
  }

  if (!data) {
    return <NotFound user={context.user} />;
  }

  const user = context.user.user;
  const teacher = context.user.teacher;

  const myOwnCourse = data?.teacherId === teacher?.id;

  const closeDialog = () => {
    setOpenCreateDialog(false);
    setOpenUpdateDialog({
      open: false,
      coursId: "",
    });
    setOpenViewDialog({
      open: false,
      coursId: "",
    });
  };

  const openToEdit = (id) => {
    setOpenUpdateDialog({
      open: true,
      coursId: id,
    });
  };

  const openToView = (id) => {
    setOpenViewDialog({
      open: true,
      chapterId: id,
    });
  };


  return (
    <DashboardLayout user={context.user}>
      <Header data={data} isLoading={isLoading} pageName={data?.title} />
      <CreateChapter closeDialog={closeDialog} openDialog={openCreateDialog} courseId={data.id} />
      <UpdateChapter closeDialog={closeDialog} openDialog={openUpdateDialog.open} chapterId={openUpdateDialog.coursId} />
      <ViewChapter
        openDialog={openViewDialog.open}
        closeDialog={closeDialog}
        chapterId={openViewDialog.chapterId}
      />
      <Grid container spacing={3} my="20px">
        <Grid item xs={12} xl={myOwnCourse ? 8 : 12}>
          {
            user.role === "ROOT" || user.role === "ADMIN" ? data.status === "TO_REVIEW" &&
              <ActionsCourse coursId={data.id} /> : ""
          }
          <Card>
            <VuiBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
              <VuiTypography variant="lg" sx={{ mb: 2 }} fontWeight="bold" color="white" textTransform="capitalize">
                {t("cours.description")}
              </VuiTypography>
            </VuiBox>
            <VuiTypography color={"white"} variant="h4" component="h2" gutterBottom fontWeight="bold">
              {data.title}
            </VuiTypography>
            <VuiTypography color={"white"} variant="subtitle1" gutterBottom>
              {`${t("Instructor")}: ${user.lastName} ${user.firstName}`} {/* Assuming data has an instructor property */}
            </VuiTypography>
            <VuiTypography color={"white"} variant="body1" sx={{ textAlign: "justify", mt: 1 }}>
              {data.description}
            </VuiTypography>
            <VuiTypography color={"white"} variant="subtitle2" sx={{ textAlign: "justify", mt: 1 }}>
              {`${t("currentEnrollment")}: ${data.currentEnrollment || "0"}`} {/* Assuming data has an instructor property */}
            </VuiTypography>
          </Card>
          <Card sx={{ marginTop: 1 }}>
            <VuiBox display="flex" flexDirection="column" height="100%">
              <VuiBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <VuiTypography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
                  {t("chapters.title")}
                </VuiTypography>
                {myOwnCourse &&
                  <VuiButton onClick={() => setOpenCreateDialog(true)} color="primary" variant="gradient" size="medium">
                    + {t("chapter.create.title")}
                  </VuiButton>
                }
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
                  loop={data?.chapters?.length > 4} // Enable looping
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
                  {!data?.chapters.length ?
                    <VuiBox display="flex" justifyContent="center" sx={{ height: "300px" }} alignItems="flex-start"
                            py={3}>
                      <VuiTypography color={"white"}>
                        {t("demands.table.nodata")}
                      </VuiTypography>
                    </VuiBox> : isLoading ? (
                      Array.from(new Array(3)).map((_, index) => (
                        <SwiperSlide style={{ maxWidth: "350px" }} key={index}>
                          <Skeleton
                            variant="rounded"
                            width={300}
                            height={200}
                          />
                          <Skeleton
                            variant="text"
                            width={150}
                            height={30}
                          />
                          <Skeleton
                            variant="rounded"
                            width={200}
                            height={80}
                          />
                          <Skeleton
                            variant="text"
                            width={90}
                            height={40}
                          />
                        </SwiperSlide>
                      ))
                    ) : (
                      data?.chapters.map((chapter) => (
                        <SwiperSlide style={{ maxWidth: "350px" }} key={chapter.id}>
                          <ChapterCard
                            id={chapter.id}
                            image={chapter.thumbnail.url}
                            label={chapter.title}
                            title={chapter.title}
                            description={chapter.description}
                            action={{
                              color: "white",
                              label: t("chapters.ressources"),
                            }}
                            duration={convertSecondsToMinutes(chapter.duration)}
                            ressources={chapter.attachments}
                            openToEdit={openToEdit}
                            myOwnCourse={myOwnCourse}
                            openToView={openToView}
                          />
                        </SwiperSlide>
                      ))
                    )}
                </Swiper>

                {/* Custom Navigation Buttons */}
                {!data?.chapters.length ? "" : <VuiButton
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
                }
                {!data?.chapters.length ? "" : <VuiButton
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
                </VuiButton>}
              </Box>
            </VuiBox>
          </Card>
          {(data.status === "UNDER_CREATION" || data.status === "REJECT") && myOwnCourse ?
            <Card sx={{
              display: "flex",
              flexDirection: { xs: "column", sm: "row" },  // Column direction on small devices
              alignItems: "center",
              justifyContent: "space-between",
              padding: 3,
              marginTop: 1,
              gap: 2,  // Add space between elements
              color: "white",
            }}
            >
              <VuiTypography
                variant="body2"
                color="white"
                sx={{ textAlign: { xs: "center", sm: "left" } }} // Center align on small screens
              >
                {t("course.pending.send")}
              </VuiTypography>
              <VuiButton
                variant="contained"
                color="info"
                sx={{ width: { xs: "100%", sm: "auto" } }}  // Full width on small screens
                onClick={changeStatusToReview}
              >
                {t("course.pending.button")}
              </VuiButton>
            </Card> : ""}
        </Grid>
        {
          myOwnCourse && <Grid item xs={12} xl={4}>
            <UpdateCourse data={data} isLoading={isLoading} />
          </Grid>
        }
      </Grid>
      {
        user.role === "ROOT" || myOwnCourse ? <DeleteCourse coursId={coursId} /> : ""
      }
    </DashboardLayout>
  );
}

export default CoursDetails;
