import { useState } from "react";
import { useForm } from "react-hook-form"; // Import React Hook Form
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signUpImage.png";
import VuiBox from "../../../components/VuiBox";
import VuiInput from "../../../components/VuiInput";
import VuiButton from "../../../components/VuiButton";
import VuiStepper from "../../../components/VuiStepper";
import VuiTypography from "../../../components/VuiTypography";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton"; // For the toggle icon
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import { Link } from "react-router-dom";
import { useSignUp } from "../../../api";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import Translator from "../components/Translate";
import VuiSelect from "components/VuiSelect";
import { Subjects } from "utils";

function SignUp() {

  const { t } = useTranslation();
  const steps = [t("signup.stepper.personal"), t("signup.stepper.personalPro"), t("signup.stepper.upload")];

  const [activeStep, setActiveStep] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState(null); // State to store the avatar preview
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const { mutate, isLoading } = useSignUp();

  const { register, handleSubmit, getValues, formState: { errors }, setValue, trigger } = useForm({
    defaultValues: {
      firstName: "",
      lastName: "",
      email: "",
      phone: "",
      subject: "MATHEMATICS",
      institution: "",
      yearsOfExperience: 0,
      profilePic: null,
      password: "",
    },
  });

  const validateStep = async () => {
    let fieldsToValidate = [];
    switch (activeStep) {
      case 0:
        fieldsToValidate = ["firstName", "lastName", "email", "password"];
        break;
      case 1:
        fieldsToValidate = ["subject", "institution", "yearsOfExperience"];
        break;
      case 2:
        fieldsToValidate = ["profilePic"];
        break;
      default:
        break;
    }
    return await trigger(fieldsToValidate);
  };

  const handleNext = async () => {
    const isStepValid = await validateStep();
    if (isStepValid) {
      setActiveStep((prev) => prev + 1);
    }
  };

  const handleBack = () => {
    if (activeStep > 0) setActiveStep((prev) => prev - 1);
  };

  const onSubmit = async (data) => {
    const formData = new FormData();

    // Append text fields
    formData.append("email", data.email);
    formData.append("firstName", data.firstName);
    formData.append("institution", data.institution);
    formData.append("lastName", data.lastName);
    formData.append("password", data.password);
    formData.append("subject", data.subject);
    formData.append("yearsOfExperience", data.yearsOfExperience);

    // Append file (if any)
    if (data.profilePic && data.profilePic instanceof File) {
      formData.append("profilePic", data.profilePic); // Make sure `profilePic` is a File
    }

    await mutate(formData);

  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      if (file.size > 5 * 1024 * 1024) {
        alert("File size exceeds 5MB!");
        return;
      }
      if (!file.type.startsWith("image/")) {
        alert("Only image files are allowed!");
        return;
      }
      setValue("profilePic", file);
      setAvatarPreview(URL.createObjectURL(file));
    }
  };


  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              {t("signup.forms.firstName")}
            </VuiTypography>
            <VuiInput
              {...register("firstName", { required: t("forms.required.firstName") })}
              placeholder={t("signup.placeholder.firstName")}
              error={!!errors.firstName}
            />
            {errors.firstName &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.firstName.message}</VuiTypography>}
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              {t("signup.forms.lastName")}
            </VuiTypography>
            <VuiInput
              {...register("lastName", { required: t("forms.required.lastName") })}
              placeholder={t("signup.placeholder.lastName")}
              error={!!errors.lastName}
            />
            {errors.lastName &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.lastName.message}</VuiTypography>}
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              {t("signup.forms.email")}
            </VuiTypography>
            <VuiInput
              {...register("email", {
                required: t("forms.required.email"),
                pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("forms.required.email") },
              })}
              placeholder={t("signup.placeholder.email")}
              type="email"
              error={!!errors.email}
            />
            {errors.email &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.email.message}</VuiTypography>
            }
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              {t("signup.forms.password")}
            </VuiTypography>
            <VuiInput
              {...register("password", {
                required: t("forms.required.password"),
                minLength: { value: 6, message: t("") },
              })}
              placeholder={t("signup.placeholder.password")}
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              endAdornment={
                <IconButton sx={{ position: "absolute", right: 25 }} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff color="white" /> : <Visibility color="white" />}
                </IconButton>
              }
            />
            {errors.password &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.password.message}</VuiTypography>
            }
          </VuiBox>
        );
      case 1:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              {t("signup.forms.subject")}
            </VuiTypography>
            <VuiSelect
              {...register("subject", { required: t("forms.required.subject") })}
              value={getValues("subject")} // Dynamically bind the current form state
              onChange={(event) => {
                setValue("subject", event.target.value, { shouldValidate: true }); // Update the state
              }}
              label={t("signup.forms.subject")}
              options={Subjects}
            />
            {errors.subject &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.subject.message}</VuiTypography>}

            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              {t("signup.forms.school")}
            </VuiTypography>
            <VuiInput
              {...register("institution", { required: t("forms.required.school") })}
              placeholder={t("signup.placeholder.school")}
              error={!!errors.institution}
            />
            {errors.institution &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.institution.message}</VuiTypography>}
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              {t("signup.forms.years")}
            </VuiTypography>
            <VuiInput
              type={"number"}
              {...register("yearsOfExperience", {
                required: t("forms.required.experince"), min: {
                  value: 0,
                  message: "Years of experience cannot be less than 0.",
                },
              })}
              placeholder={t("signup.placeholder.years")}
              error={!!errors.yearsOfExperience}
              onInput={(e) => {
                if (e.target.value < 0) e.target.value = 0; // Prevent negative numbers
                if (e.target.value > 50) e.target.value = 50; // Prevent numbers greater than 50
              }}
            />
            {errors.yearsOfExperience &&
              <VuiTypography
                sx={{ color: "red", fontSize: "0.7rem" }}>{errors.yearsOfExperience.message}</VuiTypography>}
          </VuiBox>
        );
      case 2:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center", alignItems: "center" }}>
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              {t("signup.forms.upload")}
            </VuiTypography>

            {avatarPreview ? (
              <Avatar sx={{ width: 100, height: 100, marginBottom: "1em" }} src={avatarPreview} />
            ) : (
              <Avatar sx={{ width: 100, height: 100, marginBottom: "1em" }} />
            )}

            <input type="file" accept="image/*" onChange={handleAvatarChange} style={{ marginBottom: "1em" }} />
            {errors.profilePic &&
              <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.profilePic.message}</VuiTypography>}
          </VuiBox>
        );
      default:
        return "Unknown step";
    }
  };


  return (
    <CoverLayout
      title={t("signup.welcome")}
      color="white"
      description={t("signup.description")}
      premotto="PRIME BETA SCHOOL"
      motto={t("signup.motto")}
      image={bgSignIn}
    >
      {isLoading ?
        <VuiBox sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress color={"info"} />
        </VuiBox> :
        <VuiBox sx={{ width: "100%" }}>
          <Translator />
          <VuiStepper activeStep={activeStep} steps={steps} />
          <VuiBox>{renderStepContent()}</VuiBox>
          <VuiBox display="flex" justifyContent="space-between" sx={{ marginTop: "2rem" }}>
            <VuiButton variant="contained" color="secondary" disabled={activeStep === 0} onClick={handleBack}>
              {t("button.back")}
            </VuiButton>
            {activeStep === steps.length - 1 ? (
              <VuiButton variant="gradient" gradient color="info" onClick={handleSubmit(onSubmit)} type="submit">
                {t("button.submit")}
              </VuiButton>
            ) : (
              <VuiButton variant="contained" color="info" onClick={handleNext}>
                {t("button.next")}
              </VuiButton>
            )}
          </VuiBox>
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              {t("signup.already")}
              <VuiTypography
                component={Link}
                to="/authentication/sign-in"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                {t("signup.signin")}
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>}
    </CoverLayout>
  );
}

export default SignUp;
