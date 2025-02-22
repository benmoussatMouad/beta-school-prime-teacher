import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import linearGradient from "../../assets/theme/functions/linearGradient";
import rgba from "../../assets/theme/functions/rgba";
import VuiBox from "../../components/VuiBox";
import Grid from "@mui/material/Grid";
import VuiTypography from "../../components/VuiTypography";
import Avatar from "@mui/material/Avatar";
import { GiOpenBook } from "react-icons/gi";
import VuiInput from "../../components/VuiInput";
import VuiSelect from "../../components/VuiSelect";
import { CourseLevel, EducationalBranches, StudentsLevel } from "../../utils";
import VuiButton from "../../components/VuiButton";
import colors from "../../assets/theme/base/colors";
import borders from "../../assets/theme/base/borders";
import boxShadows from "../../assets/theme/base/boxShadows";
import { useState } from "react";
import { useCreateCourse, useGetCourseIcons } from "../../api/courses";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import PopperIcon from "../Popper/IconsPopper";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function CreateCoursDialog({ closeDialog, openDialog }) {

  const [iconPreview, setIconPreview] = useState(null);
  const [popperAnchor, setPopperAnchor] = useState(null); // To manage Popper visibility

  const { mutate, isLoading } = useCreateCourse();
  const { data } = useGetCourseIcons();

  const { t } = useTranslation();

  const icons = data?.icons || [];

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    reset,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      teacherClasses: [StudentsLevel[0]], // Mandatory array of valid values
      educationalBranches: [EducationalBranches[0]], // Mandatory array of valid values
      level: CourseLevel[0], // Mandatory dropdown
      price: 0, // Mandatory positive integer
      discount: 0, // Optional, 0-100
      duration: null, // Optional, positive integer
      language: "", // Optional string
      maxParticipants: null, // Optional positive integer
      enrollmentDeadline: null, // Optional date
      icon: null, // Optional file
    },
  });

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("icon", file, { shouldValidate: true });
      setIconPreview(URL.createObjectURL(file)); // Preview for user
    }
  };


  // Handle predefined icon selection
  const handlePredefinedIconClick = (iconUrl, iconId) => {
    setValue("icon", { url: iconUrl, id: iconId });
    setIconPreview(iconUrl);
  };


  const onSubmit = (data) => {
    const formData = new FormData();

    formData.append("title", data.title);
    formData.append("description", data.description);

    // Append each teacherClass individually
    if (data.teacherClasses.length > 1) {
      data.teacherClasses.forEach((item) =>
        formData.append("teacherClasses", item),
      );
    } else {
      formData.append("teacherClasses[0]", data.teacherClasses[0]);
    }

    if (data.educationalBranches.length > 1) {
      data.educationalBranches.forEach((item) =>
        formData.append("educationalBranches", item),
      );
    } else {
      formData.append("educationalBranches[0]", data.educationalBranches[0]);
    }
    // Append each educationalBranch individually

    formData.append("level", data.level);
    formData.append("price", data.price);

    if (data.discount) formData.append("discount", data.discount);
    if (data.duration) formData.append("duration", data.duration);
    if (data.language) formData.append("language", data.language);
    if (data.maxParticipants) formData.append("maxParticipants", data.maxParticipants);
    if (data.enrollmentDeadline) formData.append("enrollmentDeadline", data.enrollmentDeadline);
    // Ensure the icon is a file
    if (data.icon instanceof File) {
      formData.append("icon", data.icon);
    } else if (data.icon?.url && data.icon?.id) {
      formData.append("iconId", data.icon.id);
    }


    mutate(formData, {
      onSuccess: () => {
        closeDialog();
        reset();
      },
    });
  };

  // Open Popover when hovering over the trigger
  const handlePopperOpen = (event) => {
    setPopperAnchor(event.currentTarget);
  };


  // Close Popover with a slight delay to account for hover transitions
  const handlePopperClose = () => {
    setPopperAnchor(null);
  };

  const togglePopper = (event) => {
    if (isPopperOpen) {
      handlePopperClose();
    } else {
      handlePopperOpen(event);
    }
  }

  const isPopperOpen = Boolean(popperAnchor);


  return (
    <Dialog
      sx={({ breakpoints }) => ({
        "& .MuiDialog-paper": {
          display: "flex",
          flexDirection: "column",
          background: linearGradient(card.main, card.state, card.deg),
          backdropFilter: "blur(120px)",
          position: "relative",
          padding: "22px",
          wordWrap: "break-word",
          backgroundClip: "border-box",
          border: `${borderWidth[0]} solid ${rgba(black.main, 0.125)}`,
          borderRadius: borderRadius.xl,
          boxShadow: xxl,
          [breakpoints.up("md")]: {
            minWidth: 700, // Apply for screens medium and larger
          },
        },
      })}
      open={openDialog}
      onClose={closeDialog}
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
            {t("dialog.course.title")}
          </VuiTypography>
        </DialogTitle>
      )}
      <DialogContent sx={{
        "&::-webkit-scrollbar": {
          width: "8px",
        },
        "&::-webkit-scrollbar-track": {
          background: "#4f5179", // Track color
          borderRadius: "4px",
        },
        "&::-webkit-scrollbar-thumb": {
          backgroundColor: "#f0f0f0", // Thumb color
          borderRadius: "4px",
          border: "2px solid #0F1643",
        },
        "&::-webkit-scrollbar-thumb:hover": {
          backgroundColor: "rgba(31,44,132,0.95)",
        },
      }}>
        {isLoading ? <Box sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "300px",
          minWidth: "250px",
        }}>
          <CircularProgress color={"info"} />
        </Box> :
          <VuiBox as="form" onSubmit={handleSubmit(onSubmit)} sx={{ px: 2 }}>
            <Grid container spacing={3}>
              {/* Icon Upload */}
              <Grid item xs={12}>
                <VuiBox
                  display="flex"
                  flexDirection="column"
                  justifyContent="center"
                  alignItems="center"
                  sx={{
                    border: `1px dashed ${rgba(black.main, 0.2)}`,
                    borderRadius: borderRadius.md,
                    p: 2,
                    background: rgba(black.main, 0.1),
                  }}
                  onMouseClick={handlePopperOpen}  // Open on mouse enter
                  onMouseLeave={handlePopperClose} // Close on mouse leave
                >
                  <VuiTypography component="label" variant="button" fontWeight="bold" color="white" sx={{ mb: 2 }}>
                    {t("dialog.course.icon")}
                  </VuiTypography>
                  <VuiTypography component="caption" variant="caption" fontWeight="regular" color="white"
                    sx={{ mb: 2 }}>
                    {t("dialog.course.iconClickToSelectFile")}
                  </VuiTypography>

                  <input
                    type="file"
                    style={{ display: "none" }}
                    accept="image/*"
                    onChange={handleAvatarChange}
                  />
                  {iconPreview ? (
                    <Avatar
                      src={iconPreview}
                      sx={{
                        width: 100,
                        height: 100,
                        cursor: "pointer",
                        border: `2px solid ${black.main}`,
                        boxShadow: "0 4px 8px rgba(0,0,0,0.2)",
                        backgroundColor: "rgba(255, 255, 255, 1)",
                      }}
                      onClick={() => document.querySelector("input[type='file']").click()}
                    />
                  ) : (
                    <VuiBox
                      onClick={() => document.querySelector("input[type='file']").click()}
                      sx={{
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        width: 100,
                        height: 100,
                        borderRadius: "50%",
                        background: rgba(black.main, 0.2),
                        cursor: "pointer",
                      }}
                    >
                      <GiOpenBook color="white" size={50} />
                    </VuiBox>
                  )}
                  <VuiButton mt={2} variant={'outlined'} color={"info"} onClick={togglePopper}>{isPopperOpen ? t("button.close") : t("choose-a-predefined-icon")}</VuiButton>
                  {errors.icon && (
                    <VuiTypography
                      sx={{ color: "red", fontSize: "0.8rem", mt: 1 }}>{errors.icon.message}</VuiTypography>
                  )}
                  {/* Popover for Icon Selection */}
                  <PopperIcon
                    watch={watch}
                    handlePredefinedIconClick={handlePredefinedIconClick}
                    popperAnchor={popperAnchor}
                    isPopperOpen={isPopperOpen}
                    handlePopperClose={handlePopperClose}
                    icons={icons}
                  />
                </VuiBox>

              </Grid>

              {/* Title Field */}
              <Grid item xs={12}>
                <VuiBox>
                  <VuiTypography component="label" variant="button" fontWeight="medium" color="white"
                    sx={{ mb: 1, display: "block" }}>
                    {t("dialog.forms.title")} <span style={{ color: "red" }}>*</span>
                  </VuiTypography>
                  <VuiInput
                    placeholder={t("dialog.forms.title")}
                    sx={{ borderColor: rgba(black.main, 0.1), borderRadius: borderRadius.md }}
                    {...register("title", { required: t("dialog.required.title") })}
                  />
                  {errors.title && (
                    <VuiTypography
                      sx={{ color: "red", fontSize: "0.8rem", mt: 0.5 }}>{errors.title.message}</VuiTypography>
                  )}
                </VuiBox>
              </Grid>

              {/* Description Field */}
              <Grid item xs={12}>
                <VuiBox>
                  <VuiTypography component="label" variant="button" fontWeight="medium" color="white"
                    sx={{ mb: 1, display: "block" }}>
                    {t("dialog.forms.description")} <span style={{ color: "red" }}>*</span>
                  </VuiTypography>
                  <VuiInput
                    placeholder={t("dialog.forms.description")}
                    multiline
                    rows={4}
                    sx={{
                      padding: 1,
                      borderColor: rgba(black.main, 0.1),
                      borderRadius: borderRadius.md,
                    }}
                    {...register("description", { required: t("dialog.required.description") })}
                  />
                  {errors.description && (
                    <VuiTypography
                      sx={{ color: "red", fontSize: "0.8rem", mt: 0.5 }}>{errors.description.message}</VuiTypography>
                  )}
                </VuiBox>
              </Grid>

              {/* Price Field */}
              <Grid item xs={12} sm={6}>
                <VuiBox>
                  <VuiTypography component="label" variant="button" fontWeight="medium" color="white"
                    sx={{ mb: 1, display: "block" }}>
                    {t("dialog.forms.price")} <span style={{ color: "red" }}>*</span>
                  </VuiTypography>
                  <VuiInput
                    type="number"
                    sx={{
                      borderColor: rgba(black.main, 0.1),
                      borderRadius: borderRadius.md,
                    }}
                    placeholder={t("dialog.forms.price")}
                    {...register("price", {
                      required: t("dialog.required.price"),
                      valueAsNumber: true,
                      min: {
                        value: 0,
                        message: t("dialog.errors.price_min"),
                      },
                    })}
                    onInput={(e) => {
                      if (e.target.value < 0) e.target.value = 0;
                    }}
                  />
                  {errors.price && (
                    <VuiTypography
                      sx={{ color: "red", fontSize: "0.8rem", mt: 0.5 }}>{errors.price.message}</VuiTypography>
                  )}
                </VuiBox>
              </Grid>

              {/* Language Field */}
              <Grid item xs={12} sm={6}>
                <VuiBox>
                  <VuiTypography component="label" variant="button" fontWeight="medium" color="white"
                    sx={{ mb: 1, display: "block" }}>
                    {t("dialog.forms.language")}
                  </VuiTypography>
                  <VuiInput
                    sx={{ borderColor: rgba(black.main, 0.1), borderRadius: borderRadius.md }}
                    placeholder={t("dialog.forms.language")}
                    {...register("language")}
                  />
                  {errors.language && (
                    <VuiTypography sx={{ color: "red", fontSize: "0.8rem" }}>
                      {errors.language.message}
                    </VuiTypography>
                  )}
                </VuiBox>
              </Grid>

              {/* Educational Branches Field */}
              <Grid item xs={12} sm={6}>
                <VuiBox>
                  <VuiTypography component="label" variant="button" fontWeight="medium" color="white"
                    sx={{ mb: 1, display: "block" }}>
                    {t("dialog.forms.educationalBranches")} <span style={{ color: "red" }}>*</span>
                  </VuiTypography>
                  <VuiTypography component="label" variant="caption" fontWeight="medium" color="white"
                    sx={{ mb: 1, display: "block", fontSize: "0.8rem" }}>
                    {t("youCanHaveMultipleChoices")}
                  </VuiTypography>
                  <VuiSelect
                    multiple
                    {...register("educationalBranches", {
                      required: t("dialog.required.educationalBranches"),
                      validate: value => value.length > 0 || t("dialog.errors.required"),
                    })}
                    value={watch("educationalBranches") || [EducationalBranches[0]]} // Default to the first option if no value is selected
                    onChange={(e) => {
                      const selected = e.target.value;
                      // Prevent empty selection
                      if (selected.length > 0) {
                        setValue("educationalBranches", selected);
                      }
                    }}
                    options={EducationalBranches}
                    placeholder={t("dialog.forms.selectEducationalBranches")}
                    sx={{ borderColor: rgba(black.main, 0.1), borderRadius: borderRadius.md }}
                    typeSelect={"educationalBranches"}
                  />
                  {errors.educationalBranches && (
                    <VuiTypography sx={{ color: "red", fontSize: "0.8rem" }}>
                      {errors.educationalBranches.message}
                    </VuiTypography>
                  )}
                </VuiBox>
              </Grid>

              {/* Student Level Field */}
              <Grid item xs={12} sm={6}>
                <VuiBox>
                  <VuiTypography component="label" variant="button" fontWeight="medium" color="white"
                    sx={{ mb: 1, display: "block" }}>
                    {t("dialog.forms.teacherClasses")} <span style={{ color: "red" }}>*</span>
                  </VuiTypography>
                  <VuiTypography component="label" variant="caption" fontWeight="medium" color="white"
                    sx={{ mb: 1, display: "block", fontSize: "0.8rem" }}>
                    {t("youCanHaveMultipleChoices")}
                  </VuiTypography>
                  <VuiSelect
                    sx={{
                      borderColor: rgba(black.main, 0.1),
                      borderRadius: borderRadius.md,
                      "& .MuiChip-root": {
                        backgroundColor: "white", // Set selected elements' text color to white
                      },
                    }}
                    multiple
                    {...register("teacherClasses", {
                      required: t("dialog.required.teacherClasses"),
                      validate: value => value.length > 0 || t("dialog.errors.required"),
                    })}
                    value={watch("teacherClasses") || [StudentsLevel[0]]} // Default to the first option if no value is selected
                    onChange={(e) => {
                      const selected = e.target.value;
                      // Prevent empty selection
                      if (selected.length > 0) {
                        setValue("teacherClasses", selected);
                      }
                    }}
                    options={StudentsLevel}
                    placeholder={t("dialog.forms.selectteacherClasses")}
                    sx={{ borderColor: rgba(black.main, 0.1), borderRadius: borderRadius.md }}
                    typeSelect={"teacherClasses"}
                  />
                  {errors.level && (
                    <VuiTypography sx={{ color: "red", fontSize: "0.8rem" }}>
                      {errors.level.message}
                    </VuiTypography>
                  )}
                </VuiBox>
              </Grid>

              {/* Discount Input with Checkbox */}
              <Grid item xs={12}>
                <Grid container spacing={2}>
                  <Grid item xs={12}>
                    <VuiBox>
                      <VuiTypography component="label" variant="button" fontWeight="medium" color="white"
                        sx={{ mb: 1 }}>
                        {t("dialog.forms.discount")}
                      </VuiTypography>
                      <VuiTypography component="label" variant="caption" fontWeight="medium" color="white"
                        sx={{ mb: 1, display: "block", fontSize: "0.8rem" }}>
                        {t("percentageTheReducesThePriceSchoolComissionWillBeTakenFromFinalPrice")}
                      </VuiTypography>
                      <VuiBox display="flex" alignItems="center" sx={{ mb: 1 }}>
                        <input
                          type="checkbox"
                          id="enableDiscount"
                          checked={Boolean(watch("enableDiscount"))}
                          {...register("enableDiscount", {
                            onChange: (e) => {
                              if (!e.target.checked) {
                                setValue("discount", 0);
                              }
                            }
                          })}
                        />
                        <VuiTypography
                          component="label"
                          variant="caption"
                          color="white"
                          htmlFor="enableDiscount"
                          sx={{ ml: 1 }}
                        >
                          {t("dialog.forms.enableDiscount")}
                        </VuiTypography>
                      </VuiBox>
                      <VuiInput
                        type="number"
                        disabled={!watch("enableDiscount")}
                        placeholder={t("dialog.forms.discount")}
                        {...register("discount", {
                          valueAsNumber: true,
                        })}
                        min={0}
                        max={100}
                        onInput={(e) => {
                          const value = parseFloat(e.target.value);
                          if (value < 0) e.target.value = 0;
                          if (value > 100) e.target.value = 100;
                        }}
                      />
                      {errors.discount && (
                        <VuiTypography
                          sx={{ color: "red", fontSize: "0.8rem", mt: 0.5 }}>{errors.discount.message}</VuiTypography>
                      )}
                    </VuiBox>
                  </Grid>
                </Grid>
              </Grid>
            </Grid>
          </VuiBox>
        }
      </DialogContent>
      <DialogActions>
        <VuiButton disabled={isLoading} onClick={closeDialog} color="secondary">
          {t("button.cancel")}
        </VuiButton>
        <VuiButton disabled={isLoading} onClick={handleSubmit(onSubmit)} color="info">
          {t("button.confirm")}
        </VuiButton>
      </DialogActions>
    </Dialog>
  );
}

export default CreateCoursDialog;
