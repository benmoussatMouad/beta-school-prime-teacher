import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Box, Card, CircularProgress, Grid, IconButton } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import colors from "assets/theme/base/colors";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import VuiButton from "components/VuiButton";
import { useUpdateProfile } from "api";
import { useAuth } from "context/auth/authContext";
import { FiltersStudentWilaya, Subjects } from "utils";
import VuiSelect from "components/VuiSelect";


const UpdateProfile = () => {
  const { gradients } = colors;
  const { cardContent } = gradients;
  const { t } = useTranslation();
  const { user } = useAuth();

  console.log(user);

  const [isloading, setIsLoading] = useState(false);

  const [formState, setFormState] = useState({
    email: user?.user?.email || "",
    password: "",
    firstName: user?.user?.firstName || "",
    firstNameAr: user?.user?.firstNameAr || null,
    lastName: user?.user?.lastName || "",
    lastNameAr: user?.user?.lastNameAr || null,
    subject: user?.teacher?.subject || "",
    yearsOfExperience: Number(user?.teacher?.yearsOfExperience) || 0,
    institution: user?.teacher?.institution || "",
    description: user?.teacher?.description || "",
    wilaya: user?.teacher?.wilaya || "", // Add wilaya here
  });

  const [showPassword, setShowPassword] = useState(false);
  const { mutate } = useUpdateProfile();

  const handleInputChange = (field, value) => {
    setFormState((prevState) => ({
      ...prevState,
      [field]: value,
    }));
  };

  const {
    handleSubmit,
    register,
    formState: { errors },
  } = useForm();

  const onSubmit = () => {
    setIsLoading(true);
    // Create a shallow copy of formState
    const requestData = { ...formState };

    // Remove `firstNameAr` and `lastNameAr` if they are empty or null
    if (!requestData.firstNameAr) {
      delete requestData.firstNameAr;
    }
    if (!requestData.lastNameAr) {
      delete requestData.lastNameAr;
    }
    mutate(requestData, {
      onSuccess: () => setIsLoading(false),
      onError: () => setIsLoading(false),
    });
  };

  return (
    <Card
      sx={({ breakpoints }) => ({
        padding: ".5rem",
        background: cardContent,
        [breakpoints.up("xxl")]: {
          maxHeight: "auto",
        },
        height: "100%",
      })}
    >
      <Box style={{ height: "100%" }} display="flex" flexDirection="column" p={2}>
        <VuiTypography variant="lg" color="white" fontWeight="bold" mb={1}>
          {t("profile.title")}
        </VuiTypography>
        <VuiTypography variant="button" color="text" fontWeight="regular" mb={2}>
          {t("profile.subtitle")}
        </VuiTypography>
        <VuiBox style={{ height: "100%" }} component="form" onSubmit={handleSubmit(onSubmit)} role="form">
          {isloading ?
            <Box style={{ height: "100%" }} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
              <CircularProgress color="info" />
            </Box> : <Grid container spacing={2}>
              {/* First Name Field */}
              <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <VuiBox>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                    sx={{
                      display: "inline-block",
                      width: "100%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("forms.firstName")}
                  </VuiTypography>
                  <VuiInput
                    {...register("firstName", {
                      onChange: (e) => handleInputChange("firstName", e.target.value),
                      value: formState.firstName,
                    })}
                    placeholder={t("placeholder.firstName")}
                    type="text"
                    error={!!errors.firstName}
                  />
                </VuiBox>
              </Grid>

              {/* First Name Arabic Field */}
              <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <VuiBox>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                    sx={{
                      display: "inline-block",
                      width: "100%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("signup.forms.firstNameAr")}
                  </VuiTypography>
                  <VuiInput
                    {...register("firstNameAr", {
                      onChange: (e) => handleInputChange("firstNameAr", e.target.value),
                      value: formState.firstNameAr,
                    })}
                    placeholder={t("signup.placeholder.firstNameAr")}
                    type="text"
                    error={!!errors.firstNameAr}
                  />
                </VuiBox>
              </Grid>

              {/* Last Name Field */}
              <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <VuiBox>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                    sx={{
                      display: "inline-block",
                      width: "100%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("signup.forms.lastName")}
                  </VuiTypography>
                  <VuiInput
                    {...register("lastName", {
                      onChange: (e) => handleInputChange("lastName", e.target.value),
                      value: formState.lastName,
                    })}
                    placeholder={t("placeholder.lastName")}
                    type="text"
                    error={!!errors.lastName}
                  />
                </VuiBox>
              </Grid>

              {/* Last Name Ar Field */}
              <Grid item xs={12} sm={6} md={6} lg={6} xl={3}>
                <VuiBox>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                    sx={{
                      display: "inline-block",
                      width: "100%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("signup.forms.lastNameAr")}
                  </VuiTypography>
                  <VuiInput
                    {...register("lastNameAr", {
                      onChange: (e) => handleInputChange("lastNameAr", e.target.value),
                      value: formState.lastNameAr,
                    })}
                    placeholder={t("signup.placeholder.lastNameAr")}
                    type="text"
                    error={!!errors.lastNameAr}
                  />
                </VuiBox>
              </Grid>


              {/* Email Field */}
              <Grid item xs={12} sm={6} md={6}>
                <VuiBox>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {t("login.forms.email")}
                  </VuiTypography>
                  <VuiInput
                    {...register("email", {
                      onChange: (e) => handleInputChange("email", e.target.value),
                      value: formState.email,
                      pattern: {
                        value: /^\S+@\S+$/,
                        message: t("validation.invalid_email"),
                      },
                    })}
                    placeholder={t("placeholder.email")}
                    type="email"
                    error={!!errors.email}
                  />
                  {errors.email && (
                    <VuiTypography variant="caption" color="error">
                      {errors.email.message}
                    </VuiTypography>
                  )}
                </VuiBox>
              </Grid>

              {/* Password Field */}
              <Grid item xs={12} sm={6} md={6}>
                <VuiBox>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {t("signup.forms.password")}
                  </VuiTypography>
                  <VuiInput
                    {...register("password", {
                      onChange: (e) => handleInputChange("password", e.target.value),
                      value: formState.password,
                      minLength: {
                        value: 6,
                        message: t("validation.min_length_password"),
                      },
                    })}
                    placeholder={t("placeholder.password")}
                    type={showPassword ? "text" : "password"}
                    error={!!errors.password}
                    endAdornment={
                      <IconButton
                        sx={{ position: "absolute", right: 20 }}
                        onClick={() => setShowPassword(!showPassword)}
                      >
                        {showPassword ? (
                          <VisibilityOff color="white" />
                        ) : (
                          <Visibility color="white" />
                        )}
                      </IconButton>
                    }
                  />
                  {errors.password && (
                    <VuiTypography variant="caption" color="error">
                      {errors.password.message}
                    </VuiTypography>
                  )}
                </VuiBox>
              </Grid>

              {/* Subject Field */}
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <VuiBox>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {t("forms.subject")}
                  </VuiTypography>
                  <VuiSelect
                    {...register("subject", {
                      onChange: (e) => handleInputChange("subject", e.target.value),
                    })}
                    value={formState.subject} // Bind to formState
                    onChange={(e) => handleInputChange("subject", e.target.value)} // Sync changes
                    options={Subjects}
                    placeholder={t("placeholder.subject")}
                    typeSelect={"subjects"}
                  />
                </VuiBox>
              </Grid>

              {/* Years of Experience Field */}
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <VuiBox>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                    sx={{
                      display: "inline-block",
                      width: "100%",
                      textOverflow: "ellipsis",
                      overflow: "hidden",
                      whiteSpace: "nowrap",
                    }}
                  >
                    {t("forms.yearsOfExperience")}
                  </VuiTypography>
                  <VuiInput
                    {...register("yearsOfExperience", {
                      onChange: (e) =>
                        handleInputChange("yearsOfExperience", e.target.value),
                      value: formState.yearsOfExperience,
                    })}
                    placeholder={t("placeholder.yearsOfExperience")}
                    type="number"
                  />
                </VuiBox>
              </Grid>

              {/* Wilaya Field */}
              <Grid item xs={12} sm={6} md={6} lg={3}>
                <VuiBox>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {t("signup.forms.wilaya")}
                  </VuiTypography>
                  <VuiSelect
                    {...register("wilaya", {
                      onChange: (e) => handleInputChange("wilaya", e.target.value),
                    })}
                    value={formState.wilaya} // Bind to formState
                    onChange={(e) => handleInputChange("wilaya", e.target.value)} // Sync changes
                    options={FiltersStudentWilaya} // Use the Wilaya list
                    placeholder={t("placeholder.wilaya")}
                    typeSelect={"wilaya"} // Define the type
                  />
                </VuiBox>
              </Grid>

              {/* Institution Field */}
              <Grid item xs={12} sm={6} md={12} lg={3}>
                <VuiBox>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {t("forms.school")}
                  </VuiTypography>
                  <VuiInput
                    {...register("institution", {
                      onChange: (e) => handleInputChange("institution", e.target.value),
                      value: formState.institution,
                    })}
                    placeholder={t("placeholder.school")}
                    type="text"
                  />
                </VuiBox>
              </Grid>

              {/*Description*/}
              <Grid item xs={12} sm={12} md={12}>
                <VuiBox>
                  <VuiTypography
                    component="label"
                    variant="button"
                    color="white"
                    fontWeight="medium"
                  >
                    {t("forms.descriptions")}
                  </VuiTypography>
                  <VuiInput
                    {...register("description", {
                      onChange: (e) => handleInputChange("description", e.target.value),
                      value: formState.description,
                    })}
                    placeholder={t("profile.myDescirption")}
                    type="text"
                    multiline rows={3}
                  />
                </VuiBox>
              </Grid>

              {/* Submit Button */}
              <Grid item xs={12}>
                <VuiBox mt={2} textAlign="center">
                  <VuiButton type="submit" variant="contained" color="info">
                    {t("button.submit")}
                  </VuiButton>
                </VuiBox>
              </Grid>
            </Grid>}
        </VuiBox>
      </Box>
    </Card>
  );
};

export default UpdateProfile;
