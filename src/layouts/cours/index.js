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
import VuiProgress from "../../components/VuiProgress";
import List from "@mui/material/List";
import VuiBadge from "../../components/VuiBadge";
import VuiAvatar from "../../components/VuiAvatar";
import i18n from "../../i18n";
import ProfilesList from "../../examples/Lists/ProfilesList";
import avatar from "../../assets/theme/components/avatar";
import NotificationItem from "../../examples/Items/NotificationItem";
import Popper from "@mui/material/Popper/BasePopper";
import MiniStatisticsCard from "../../examples/Cards/StatisticsCards/MiniStatisticsCard";
import { IoCard, IoNotifications } from "react-icons/io5";


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
  // Separate states for handling each Popover
  const [anchorEl1, setAnchorEl1] = useState(null);
  const [anchorEl2, setAnchorEl2] = useState(null);

  const handlePopoverOpen1 = (event) => {
    setAnchorEl1(event.currentTarget);
  };

  const handlePopoverClose1 = () => {
    setAnchorEl1(null);
  };

  const handlePopoverOpen2 = (event) => {
    setAnchorEl2(event.currentTarget);
  };

  const handlePopoverClose2 = () => {
    setAnchorEl2(null);
  };
  const open1 = Boolean(anchorEl1);
  const open2 = Boolean(anchorEl2);

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
  const renderNote = () => {
    switch (data.status) {
      case "UNDER_CREATION":
        return t("UNDER_CREATION");
      case "PENDING":
        return t("PENDING");
      case "ACCEPTED":
        return t("ACCEPTED");
      case "TO_REVIEW":
        return t("TO_REVIEW");
      case "REJECT":
        return <VuiBox>
          <VuiTypography variant="subtitle2" color="white" fontWeight="medium">
            {t("REJECT")}
          </VuiTypography>
          <VuiTypography variant="caption" color="white" fontWeight="medium">
            {t("adminNote")}: {data.statusNote}
          </VuiTypography>
        </VuiBox>;
      default:
        return t("UNKNOWN_STATUS"); // If an unknown status is encountered
    }
  };

  return (
    <DashboardLayout user={context.user}>
      <Header data={data} isLoading={isLoading} pageName={data?.title} />
      <CreateChapter closeDialog={closeDialog} openDialog={openCreateDialog} courseId={data.id} />
      <UpdateChapter closeDialog={closeDialog} openDialog={openUpdateDialog.open}
                     chapterId={openUpdateDialog.coursId} />
      <ViewChapter
        openDialog={openViewDialog.open}
        closeDialog={closeDialog}
        chapterId={openViewDialog.chapterId}
      />
      <Grid container spacing={3} my="20px">
        <Grid item xs={12} xl={myOwnCourse ? 8 : 12}>
          {(data.status === "UNDER_CREATION" || data.status === "REJECT") && myOwnCourse ?
            <VuiBox
              sx={{
                display: "flex",
                flexDirection: { xs: "column", sm: "row" },  // Column direction on small devices
                alignItems: "center",
                justifyContent: "space-between",
                padding: 3,
                marginBottom: 1,
                gap: 2,  // Add space between elements
                // color: "white",
              }}
              bgColor="warning"
              variant="gradient"
              borderRadius="lg"
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
            </VuiBox> : ""}
          {
            user.role === "ROOT" || user.role === "ADMIN" ? data.status === "TO_REVIEW" &&
              <ActionsCourse coursId={data.id} /> : ""
          }
          <Card>
            <Grid container>
              <Grid item xs={12} lg={8} sx={{ p: 1, pr: 5 }}>
                <VuiBox
                  sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 2 }}>
                  <VuiTypography variant="h3" sx={{ mb: 0 }} fontWeight="bold" color="white" textTransform="capitalize">
                    {t("cours.description")}
                  </VuiTypography>
                </VuiBox>
                <VuiTypography color={"white"} variant="h4" component="h2" mb={2}>
                  {t('courses.table.title')}: {data.title}
                </VuiTypography>
                <VuiTypography color={"white"} variant="h4" component="h2" mb={2}>
                  {t('courses.table.description')}:
                </VuiTypography>
                <VuiBox borderRadius={"lg"} sx={{ p: 3, mb: 1, border: "1px solid #234576" }}>
                  <VuiTypography color={"white"} variant="body2"
                                 sx={{ textAlign: "justify", mt: 1, lineHeight: 1.1 }}>
                    {data.description}
                  </VuiTypography>
                </VuiBox>
                <VuiBadge badgeContent={`${t("currentEnrollment")}: ${data.currentEnrollment || "0"}`}
                          color={"primary"} container variant="contained" size={'lg'} sx={{ textAlign: "justify", mt: 1 }}/>
              </Grid>
              <Grid item xs={12} lg={4} sx={{ py: 1 }}>
                <VuiTypography color={"white"}>
                  {t("course.details.priceDetails")}
                </VuiTypography>
                <VuiBox bgColor={"dark"} opacity={1} borderRadius="lg" sx={{ p: 3, mb: 1 }} variant={"contained"}>
                  <VuiBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <VuiTypography color={"white"} variant="body2" component="h2">
                      {t("course.details.totalPrice")}
                    </VuiTypography>
                    <VuiTypography color={"white"} variant="caption" component="h2">
                      {data.price} DZD
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <VuiTypography color={"white"} variant="body2" component="h2">
                      {t("course.details.schoolGains")}
                    </VuiTypography>
                    <VuiTypography color={"white"} variant="caption" component="h2">
                      {data.price * 0.4} DZD
                    </VuiTypography>
                  </VuiBox>
                  <VuiBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <VuiTypography color={"white"} variant="body2" component="h2">
                      {t("course.details.teacherGains")}
                    </VuiTypography>
                    <VuiTypography color={"white"} variant="caption" component="h2">
                      {data.price * 0.6} DZD
                    </VuiTypography>
                  </VuiBox>
                </VuiBox>
                <VuiTypography color={"white"}>
                  {t("dialog.forms.educationalBranches")}
                </VuiTypography>
                {data.EducationalBranch.map((el, index) => (
                  <VuiBadge container sx={{
                    ml: { xs: 0, md: 2 },
                    fontSize: { xs: "0.8rem", md: "1rem" },
                    textAlign: { xs: "center", md: "left" },
                  }} size={"xs"} variant={"contained"} style={{ color: "white", fontSize: "0.9rem" }}
                            key={index} badgeContent={t(`educationalBranches.${el}`)} />
                ))}
                <VuiTypography color={"white"}>
                  {t("dialog.forms.teacherClasses")}
                </VuiTypography>
                {data.class.map((el, index) => (
                  <VuiBadge container sx={{
                    ml: { xs: 0, md: 2 },
                    fontSize: { xs: "0.8rem", md: "1rem" },
                    textAlign: { xs: "center", md: "left" },
                  }} size={"xs"} style={{ color: "white", fontSize: "0.9rem" }}
                            key={index} variant={"contained"} badgeContent={t(`teacherClass.${el}`)} />
                ))}
              </Grid>
            </Grid>
          </Card>
          <Card sx={{ marginTop: 1 }}>
            <VuiBox display="flex" flexDirection="column" height="100%">
              <VuiBox sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 3 }}>
                <VuiTypography variant="h3" fontWeight="bold" color="white" textTransform="capitalize">
                  {t("chapters.title")}
                </VuiTypography>
                {myOwnCourse &&
                  <VuiButton onClick={() => setOpenCreateDialog(true)} color="primary" variant="gradient" size="medium">
                    + {t("chapter.create.button")}
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
                      <VuiProgress value="50" />
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
                      data?.chapters.map((chapter, index) => (
                        <SwiperSlide style={{ maxWidth: "350px" }} key={chapter.id}>
                          <ChapterCard
                            id={chapter.id}
                            image={chapter.thumbnail.url}
                            label={'#'+index}
                            title={chapter.title}
                            description={chapter.description}
                            action={{
                              color: "dark",
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
        </Grid>
        {
          myOwnCourse &&
          <Grid item xs={12} xl={4}>
            <VuiBox bgColor={
              data.status === "UNDER_CREATION" ? "info" :
                data.status === "TO_REVIEW" ? "warning" :
                  data.status === "REJECT" ? "error" :
                    data.status === "ACCEPTED" ? "success" :
                      "primary"} borderRadius="lg" sx={{ p: 3, mb: 1 }}>
              <Grid container alignItems="center" justifyContent="space-between"
                    sx={{ gap: { xs: "16px", sm: "12px", md: "8px" }, color: "white", textAlign: "center" }}>
                <VuiTypography variant="h6" sx={{ fontWeight: "bold", width: "100%" }} color="white">
                  {renderNote()}
                </VuiTypography>
              </Grid>
            </VuiBox>
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
