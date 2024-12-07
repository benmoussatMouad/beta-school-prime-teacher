import { useState } from "react";
import Card from "@mui/material/Card";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import { Box, CircularProgress, Dialog, DialogActions, DialogContent, DialogTitle } from "@mui/material";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";

import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiButton from "components/VuiButton";
import VuiInput from "../../../../components/VuiInput";
import VuiSelect from "../../../../components/VuiSelect";
import VuiBadge from "../../../../components/VuiBadge";
import linearGradient from "../../../../assets/theme/functions/linearGradient";
import rgba from "../../../../assets/theme/functions/rgba";
import colors from "../../../../assets/theme/base/colors";
import borders from "../../../../assets/theme/base/borders";
import boxShadows from "../../../../assets/theme/base/boxShadows";
import Icon from "../../../../assets/images/avatar-simmmple.png";

import Table from "examples/Tables/Example";
import data from "./data";
import { StudentsLevel, Subjects } from "../../../../utils";
import { useCreateCourse } from "../../../../api/courses";

const { black, gradients } = colors;
const { card } = gradients;
const { borderWidth, borderRadius } = borders;
const { xxl } = boxShadows;

function Courses() {
  const [openDialog, setOpenDialog] = useState(false);
  const [iconPreview, setIconPreview] = useState(Icon);


  const { t } = useTranslation();
  const { columns, rows } = data();

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
      subject: Subjects[0],
      level: StudentsLevel[0],
      icon: null,
    },
  });

  const { mutate, isLoading } = useCreateCourse();


  const watchIcon = watch("icon");

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setValue("icon", file, { shouldValidate: true }); // Update icon in form state and trigger validation
      setIconPreview(URL.createObjectURL(file)); // Update preview
    }
  };


  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("title", data.title);
    formData.append("description", data.description);
    formData.append("subject", data.subject);
    formData.append("teacherClass", data.level);

    if (data.icon instanceof File) {
      formData.append("icon", data.icon);
    }
    mutate(formData, {
      onSuccess: (data) => {
        setOpenDialog(false);
        reset();
      },
    });

  };

  return (
    <Card sx={{ height: "100% !important" }}>
      <Dialog
        sx={({}) => ({
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
        <DialogTitle color={"#ffffff"}>{t("dialog.course.title")}</DialogTitle>
        <DialogContent>
          {isLoading ? <Box sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              height: "300px",
              minWidth: "250px",
            }}>
              <CircularProgress color={"info"} />
            </Box> :
            <VuiBox as={"form"} onSubmit={handleSubmit(onSubmit)}>
              <Grid container spacing={2}>
                {/* Icon Upload */}
                <Grid item xs={12}>
                  <VuiBox display="flex" flexDirection="column" alignItems="center">
                    <VuiTypography component="label" variant="button" color="white" fontWeight="medium" sx={{ mb: 2 }}>
                      {t("dialog.course.icon")}
                    </VuiTypography>
                    <input
                      type="file"
                      style={{ display: "none" }}
                      accept="image/*"
                      onChange={handleAvatarChange}
                    />
                    <Avatar
                      src={watchIcon ? URL.createObjectURL(watchIcon) : iconPreview} // Dynamically show preview
                      sx={{ width: 100, height: 100, cursor: "pointer" }}
                      onClick={() => document.querySelector("input[type='file']").click()}
                    />
                    {errors.icon && (
                      <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.icon.message}</VuiTypography>
                    )}
                  </VuiBox>
                </Grid>

                <Grid item xs={12}>
                  <Grid container spacing={2}>
                    <Grid item xs={12}>
                      {/* Title */}
                      <VuiBox>
                        <VuiTypography component="label" variant="button" color="white" fontWeight="medium"
                                       sx={{ mb: 0 }}>
                          {t("dialog.forms.title")}
                        </VuiTypography>
                        <VuiInput
                          placeholder={t("dialog.forms.title")}
                          {...register("title", { required: t("dialog.required.title") })}
                        />
                        {errors.title && (
                          <VuiTypography
                            sx={{ color: "red", fontSize: "0.7rem" }}>{errors.title.message}</VuiTypography>
                        )}
                      </VuiBox>
                    </Grid>

                    <Grid item xs={12}>
                      {/* Description */}
                      <VuiBox>
                        <VuiTypography component="label" variant="button" color="white" fontWeight="medium"
                                       sx={{ mb: 1 }}>
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
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      {/* Subject */}
                      <VuiBox>
                        <VuiTypography component="label" variant="button" color="white" fontWeight="medium"
                                       sx={{ mb: 1 }}>
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
                          <VuiTypography
                            sx={{ color: "red", fontSize: "0.7rem" }}>{errors.subject.message}</VuiTypography>
                        )}
                      </VuiBox>
                    </Grid>

                    <Grid item xs={12} sm={6}>
                      {/* Level */}
                      <VuiBox>
                        <VuiTypography component="label" variant="button" color="white" fontWeight="medium"
                                       sx={{ mb: 1 }}>
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
                          <VuiTypography
                            sx={{ color: "red", fontSize: "0.7rem" }}>{errors.level.message}</VuiTypography>
                        )}
                      </VuiBox>
                    </Grid>
                  </Grid>
                </Grid>
              </Grid>
            </VuiBox>}
        </DialogContent>
        <DialogActions>
          <VuiButton disabled={isLoading} onClick={() => setOpenDialog(false)} color="secondary">
            {t("button.cancel")}
          </VuiButton>
          <VuiButton disabled={isLoading} onClick={handleSubmit(onSubmit)} color="info">
            {t("button.confirm")}
          </VuiButton>
        </DialogActions>
      </Dialog>

      {/* Courses Table */}
      <VuiBox display="flex" justifyContent="space-between" alignItems="center" mb="32px">
        <VuiBox>
          <VuiTypography color="white" variant="lg" mb="6px" gutterBottom fontWeight="bold">
            {t("dashboard.myCourses")}
          </VuiTypography>
          <VuiBadge color="warning" variant="gradient" badgeContent="En cours de development" size="lg" />
        </VuiBox>
        <VuiButton onClick={() => setOpenDialog(true)} color="info" variant="gradient" size="small">
          + {t("dashboard.coursesCard.addCourse")}
        </VuiButton>
      </VuiBox>
      <VuiBox>
        <Table columns={columns} rows={rows} />
      </VuiBox>
    </Card>
  );
}

export default Courses;
