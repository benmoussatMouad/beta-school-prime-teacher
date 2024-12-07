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
import { StudentsLevel, Subjects } from "../../../../utils";
import VuiButton from "../../../../components/VuiButton";
import VuiAvatar from "../../../../components/VuiAvatar";
import { GiOpenBook } from "react-icons/gi";
import { useUpdateCourse } from "../../../../api/courses/updateCourse";

function UpdateCourse({ isLoading, data: courseData }) {

  const { mutate, isLoading: updateLoading } = useUpdateCourse();

  const { t } = useTranslation();
  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue,
    watch,
  } = useForm({
    defaultValues: {
      title: "",
      description: "",
      subject: Subjects[0],
      level: StudentsLevel[0],
      icon: null,
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
      setValue("subject", courseData.subject || Subjects[0]);
      setValue("level", courseData.level || StudentsLevel[0]);

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

  const onSubmit = async (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("subject", data.subject);
    formData.append("teacherClass", data.level);
    if (watchIcon) {
      formData.append("icon", watchIcon);
    }

    mutate({
      formData: formData,
      coursId: courseData.id,
    });
  };

  return (
    <Card sx={{ minHeight: "490px", height: "100%" }}>
      <VuiBox mb="26px">
        <VuiTypography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
          {t("course.update.title")}
        </VuiTypography>
      </VuiBox>
      <VuiBox as={"form"} onSubmit={handleSubmit(onSubmit)}>
        {/* Icon Upload */}
        <VuiBox display="flex" flexDirection="column" alignItems="center">
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium" sx={{ mb: 2 }}>
            {t("dialog.course.icon")}
          </VuiTypography>
          {iconPreview ? <VuiAvatar
            src={iconPreview}
            sx={{ width: 100, height: 100, cursor: "pointer" }}
            onClick={() => document.getElementById("avatar-file-input").click()} // Trigger file input click
          /> : <GiOpenBook
            color={"white"}
            size={60}
            style={{ cursor: "pointer" }}
            onClick={() => document.getElementById("avatar-file-input").click()} />
          }
          <input
            type="file"
            id="avatar-file-input"
            style={{ display: "none" }}
            accept="image/*"
            onChange={handleAvatarChange}
          />
          {errors.icon && (
            <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.icon.message}</VuiTypography>
          )}
        </VuiBox>

        {/* Title Field */}
        <VuiBox mb="14px">
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium" sx={{ mb: 0 }}>
            {t("dialog.forms.title")}
          </VuiTypography>
          <VuiInput
            placeholder={t("dialog.forms.title")}
            {...register("title", { required: t("dialog.required.title") })}
          />
          {errors.title && (
            <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.title.message}</VuiTypography>
          )}
        </VuiBox>

        {/* Description Field */}
        <VuiBox mb="14px">
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium" sx={{ mb: 1 }}>
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
        </VuiBox>

        {/* Subject Field */}
        <VuiBox mb="14px">
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium" sx={{ mb: 1 }}>
            {t("dialog.forms.subjects")}
          </VuiTypography>
          <VuiSelect
            {...register("subject", { required: t("dialog.required.subject") })}
            value={watch("subject")}
            onChange={(e) => setValue("subject", e.target.value)}
            label={t("dialog.forms.subjects")}
            options={Subjects}
          />
          {errors.subject && (
            <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.subject.message}</VuiTypography>
          )}
        </VuiBox>

        {/* Student Level Field */}
        <VuiBox mb="14px">
          <VuiTypography component="label" variant="button" color="white" fontWeight="medium" sx={{ mb: 1 }}>
            {t("dialog.forms.level")}
          </VuiTypography>
          <VuiSelect
            t={false}
            {...register("level", { required: t("dialog.required.level") })}
            value={watch("level")}
            onChange={(e) => setValue("level", e.target.value)}
            label={t("dialog.forms.level")}
            options={StudentsLevel}
          />
          {errors.level && (
            <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.level.message}</VuiTypography>
          )}
        </VuiBox>

        {/* Submit Button */}
        <VuiBox mt="20px" display="flex" justifyContent="flex-end">
          <VuiButton
            color={"info"}
            type="submit"
            variant="contained"
            disabled={loading || isLoading || updateLoading}
          >
            {t("button.confirm")}
          </VuiButton>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default UpdateCourse;
