import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";

// @mui material components
import Card from "@mui/material/Card";

// Vision UI Dashboard React components
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import { useTranslation } from "react-i18next";
import VuiSelect from "../../../../components/VuiSelect";
import { CourseLevel, EducationalBranches, StudentsLevel } from "../../../../utils";
import VuiButton from "../../../../components/VuiButton";
import VuiAvatar from "../../../../components/VuiAvatar";
import { GiOpenBook } from "react-icons/gi";
import { useUpdateCourse } from "../../../../api/courses/updateCourse";
import Grid from "@mui/material/Grid";
import PopperIcon from "../../../../examples/Popper/IconsPopper";

function UpdateCourse({ isLoading, data: courseData }) {
  const { mutate, isLoading: updateLoading } = useUpdateCourse();
  const [popperAnchor, setPopperAnchor] = useState(null); // To manage Popper visibility

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
    // getValues,
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
      //enrollmentDeadline: null,
      icon: null, // Optional file
    },
  });

  const [loading] = useState(false);
  const [iconPreview, setIconPreview] = useState(null);
  const [watchIcon, setWatchIcon] = useState(null);

  // Set form data when `data` is available
  useEffect(() => {
    if (!isLoading && courseData) {
      setValue("title", courseData.title);
      setValue("description", courseData.description);
      setValue("teacherClasses", courseData.class || [StudentsLevel[0]]);
      setValue("educationalBranches", courseData.EducationalBranch || [EducationalBranches[0]]);
      setValue("level", courseData.level || CourseLevel[0]);
      setValue("price", courseData.price || 0);
      setValue("discount", courseData.discount || 0);
      setValue("duration", courseData.duration || 0);
      setValue("language", courseData.language || "");
      setValue("maxParticipants", courseData.maxParticipants || 0);
      //setValue("enrollmentDeadline", moment(courseData.enrollmentDeadline).format("YYYY-MM-DD") || 0);
      if (courseData.icon) {
        setIconPreview(courseData.icon.url);
      }
    }
  }, [isLoading, courseData, setValue]);

  const handleAvatarChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setWatchIcon(file);
      setIconPreview(URL.createObjectURL(file));
    }
  };

  // Converts a predefined icon URL into a File
  const urlToFile = async (url, filename) => {
    const response = await fetch(url);
    const blob = await response.blob();
    return new File([blob], filename, { type: blob.type });
  };

  // Handle predefined icon selection
  const handlePredefinedIconClick = (iconUrl, index) => {
    urlToFile(iconUrl, `icon${index + 1}.png`).then((file) => {
      setValue("icon", file, { shouldValidate: true }); // Set the selected file in the form
      setIconPreview(URL.createObjectURL(file)); // Update preview
    });
  };

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);

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

    formData.append("level", data.level);
    formData.append("price", data.price);
    formData.append("discount", data.discount);
    formData.append("duration", data.duration);
    if (data.language) formData.append("language", data.language);
    formData.append("maxParticipants", data.maxParticipants);

    if (watchIcon) {
      formData.append("icon", watchIcon);
    }

    if (data.icon instanceof File) {
      formData.append("icon", data.icon);
    }

    mutate({
      formData: formData,
      coursId: courseData.id,
    }, {
      onSuccess: () => {
        setWatchIcon(null);
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

  const isPopperOpen = Boolean(popperAnchor);

  return (
    <Card sx={{ minHeight: "490px" }}>
      <VuiBox mb="26px">
        <VuiTypography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
          {t("course.update.title")}
        </VuiTypography>
      </VuiBox>
      <VuiBox as={"form"} onSubmit={handleSubmit(onSubmit)}>
        {/* Icon Upload */}
        <VuiBox
          onMouseEnter={handlePopperOpen}
          display="flex"
          flexDirection="column"
          alignItems="center"
        >
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium" sx={{ mb: 2 }}>
            {t("dialog.course.icon")}
          </VuiTypography>
          {iconPreview ? (
            <VuiAvatar
              src={iconPreview}
              sx={{ width: 100, height: 100, cursor: "pointer" }}
              onClick={() => document.getElementById("avatar-file-input").click()}
            />
          ) : (
            <GiOpenBook
              color={"white"}
              size={60}
              style={{ cursor: "pointer" }}
              onClick={() => document.getElementById("avatar-file-input").click()}
            />
          )}
          <input
            type="file"
            id="avatar-file-input"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleAvatarChange}
          />
          {errors.icon && (
            <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>
              {errors.icon.message}
            </VuiTypography>
          )}
          <PopperIcon
            watch={watch}
            handlePredefinedIconClick={handlePredefinedIconClick}
            popperAnchor={popperAnchor}
            isPopperOpen={isPopperOpen}
            handlePopperClose={handlePopperClose}
          />
        </VuiBox>

        <Grid container spacing={2}>
          {/* Title Field */}
          <Grid item xs={12}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              {t("dialog.forms.title")}
            </VuiTypography>
            <VuiInput
              placeholder={t("dialog.forms.title")}
              {...register("title", { required: t("dialog.required.title") })}
            />
            {errors.title && (
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>
                {errors.title.message}
              </VuiTypography>
            )}
          </Grid>

          {/* Description Field */}
          <Grid item xs={12}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              {t("dialog.forms.description")}
            </VuiTypography>
            <VuiInput
              placeholder={t("dialog.forms.description")}
              multiline
              rows={4}
              {...register("description", { required: t("dialog.required.description") })}
            />
            {errors.description && (
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>
                {errors.description.message}
              </VuiTypography>
            )}
          </Grid>

          {/* Price Field */}
          <Grid item xs={12}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              {t("dialog.forms.price")}
            </VuiTypography>
            <VuiInput
              type="number"
              min="0" // Ensures the input does not allow values below 0
              placeholder={t("dialog.forms.price")}
              {...register("price", {
                required: t("dialog.required.price"),
                valueAsNumber: true,
                min: { value: 0, message: t("dialog.errors.price_min") }, // Ensures validation in JavaScript
              })}
              onChange={(e) => {
                const value = Math.max(0, parseInt(e.target.value || 0)); // Prevent going below 0
                setValue("price", value); // Update react-hook-form state
              }}
            />
            {errors.price && (
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>
                {errors.price.message}
              </VuiTypography>
            )}
          </Grid>

          {/* Language */}
          <Grid item xs={12} sm={6}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              {t("dialog.forms.language")}
            </VuiTypography>
            <VuiInput placeholder={t("dialog.forms.language")} {...register("language")} />
          </Grid>

          {/* Teacher Classes */}
          <Grid item xs={12} sm={6}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              {t("dialog.forms.teacherClasses")}
            </VuiTypography>
            <VuiSelect
              {...register("teacherClasses")}
              value={watch("teacherClasses")}
              onChange={(e) => {
                const selected = e.target.value;
                if (selected.length > 0) {
                  setValue("teacherClasses", selected);
                }
              }}
              multiple
              typeSelect={"teacherClasses"}
              options={StudentsLevel}
            />
          </Grid>

          {/* Educational Branches */}
          <Grid item xs={12} sm={6}>
            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
              {t("dialog.forms.educationalBranches")}
            </VuiTypography>
            <VuiSelect
              {...register("educationalBranches")}
              value={watch("educationalBranches")}
              onChange={(e) => {
                const selected = e.target.value;
                if (selected.length > 0) {
                  setValue("educationalBranches", selected);
                }
              }}
              multiple
              options={EducationalBranches}
              typeSelect={"educationalBranches"}
            />
          </Grid>

          {/* Discount Field */}
          <Grid item xs={12} sm={6}>
            <VuiBox>
              <VuiTypography
                component="label"
                variant="button"
                fontWeight="medium"
                color="white"
                sx={{ mb: 1 }}
              >
                {t("dialog.forms.discount")}
              </VuiTypography>
              <VuiInput
                type="number"
                placeholder={t("dialog.forms.discount")}
                {...register("discount", {
                  valueAsNumber: true,
                })}
                onChange={(e) => {
                  const value = Math.max(0, parseInt(e.target.value || 0)); // Prevent going below 0
                  setValue("discount", value); // Update react-hook-form state
                }}
              />
              {errors.discount && (
                <VuiTypography sx={{ color: "red", fontSize: "0.8rem", mt: 0.5 }}>
                  {errors.discount.message}
                </VuiTypography>
              )}
            </VuiBox>

          </Grid>
        </Grid>

        {/* Submit Button */}
        <VuiBox mt="20px" display="flex" justifyContent="flex-end">
          <VuiButton
            color={"info"}
            type="submit"
            variant="contained"
            disabled={loading || isLoading || updateLoading}
          >
            {t("button.submit")}
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default UpdateCourse;
