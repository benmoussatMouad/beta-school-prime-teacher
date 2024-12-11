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
  const [formDataState, setFormData] = useState({
    firstName: "",
    lastName: "",
    firstNameAr: "",
    lastNameAr: "",
    email: "",
    phone: "",
    subject: Subjects[0],
    institution: "",
    yearsOfExperience: 0,
    profilePic: null,
    password: "",
  });

  const { mutate, isLoading } = useSignUp();

  const { register, handleSubmit, formState: { errors }, trigger } = useForm();

  const validateStep = async () => {
    let fieldsToValidate = [];
    switch (activeStep) {
      case 0:
        fieldsToValidate = ["firstName", "firstNameAr", "lastName", "email", "phone", "password"];
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

  const onSubmit = async () => {
    const formData = new FormData();

    // Append text fields
    formData.append("email", formDataState.email);
    formData.append("phone", formDataState.phone);
    formData.append("firstName", formDataState.firstName);
    if (formDataState.firstNameAr) {
      formData.append("firstNameAr", formDataState.firstNameAr);
    }
    formData.append("institution", formDataState.institution);
    formData.append("lastName", formDataState.lastName);
    if (formDataState.lastNameAr) {
      formData.append("lastNameAr", formDataState.lastNameAr);
    }
    formData.append("password", formDataState.password);
    formData.append("subject", formDataState.subject);
    formData.append("yearsOfExperience", formDataState.yearsOfExperience);

    // Append file (if any)
    if (formDataState.profilePic && formDataState.profilePic instanceof File) {
      formData.append("profilePic", formDataState.profilePic); // Make sure `profilePic` is a File
    }

    await mutate(formData);

  };

  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFormData((prevData) => ({
        ...prevData,
        profilePic: file,
      }));
      setAvatarPreview(URL.createObjectURL(file));
    }
  };


  const renderStepContent = () => {
    switch (activeStep) {
      case 0:
        return (
          <VuiBox sx={{ display: "flex", flexDirection: "column", justifyContent: "center" }}>
            <VuiBox sx={{
              display: "flex",
              flexDirection: { md: "row", sm: "column" },
              justifyContent: "space-between",
              width: "100%",
            }}>
              <VuiBox px={1}>
                <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                               fontWeight="medium">
                  {t("signup.forms.firstName")}
                </VuiTypography>
                <VuiInput
                  {...register("firstName", { required: t("forms.required.firstName") })}
                  placeholder={t("signup.placeholder.firstName")}
                  onChange={(e) => setFormData({ ...formDataState, firstName: e.target.value })}
                  value={formDataState.firstName} // Bind to state value
                  error={!!errors.firstName}
                />
                {errors.firstName &&
                  <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.firstName.message}</VuiTypography>}
              </VuiBox>
              <VuiBox px={1}>
                <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                               fontWeight="medium">
                  {t("signup.forms.firstNameAr")}
                </VuiTypography>
                <VuiInput
                  {...register("firstNameAr")}
                  placeholder={t("signup.placeholder.firstNameAr")}
                  onChange={(e) => setFormData({ ...formDataState, firstNameAr: e.target.value })}
                  value={formDataState.firstNameAr}
                />
              </VuiBox></VuiBox>
            <VuiBox sx={{
              display: "flex",
              flexDirection: { md: "row", sm: "column" },
              justifyContent: "space-between",
              width: "100%",
              margin: "10px 0",
            }}>
              <VuiBox px={1}>
                <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                               fontWeight="medium">
                  {t("signup.forms.lastName")}
                </VuiTypography>
                <VuiInput
                  {...register("lastName", { required: t("forms.required.lastName") })}
                  placeholder={t("signup.placeholder.lastName")}
                  value={formDataState.lastName}
                  onChange={(e) => setFormData({ ...formDataState, lastName: e.target.value })}
                  error={!!errors.lastName}
                />
                {errors.lastName &&
                  <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.lastName.message}
                  </VuiTypography>}
              </VuiBox>
              <VuiBox px={1}>
                <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                               fontWeight="medium">
                  {t("signup.forms.lastNameAr")}
                </VuiTypography>
                <VuiInput
                  {...register("lastNameAr")}
                  placeholder={t("signup.placeholder.lastNameAr")}
                  value={formDataState.lastNameAr}
                  onChange={(e) => setFormData({ ...formDataState, lastNameAr: e.target.value })}
                />
              </VuiBox>
            </VuiBox>
            <VuiBox
              sx={{ display: "flex", flexDirection: { md: "row", sm: "column" }, justifyContent: "space-between" }}>
              {/*Email field*/}
              <VuiBox px={1}>
                <VuiTypography px={1} sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                               fontWeight="medium">
                  {t("signup.forms.email")}
                </VuiTypography>
                <VuiInput
                  mx={1}
                  {...register("email", {
                    required: t("forms.required.email"),
                    pattern: { value: /^[^\s@]+@[^\s@]+\.[^\s@]+$/, message: t("forms.required.email") },
                  })}
                  placeholder={t("signup.placeholder.email")}
                  type="email"
                  error={!!errors.email}
                  value={formDataState.email}
                  onChange={(e) => setFormData({ ...formDataState, email: e.target.value })}
                />
                {errors.email &&
                  <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.email.message}</VuiTypography>
                }
              </VuiBox>

              {/*Phone field*/}
              <VuiBox px={1}>
                <VuiTypography px={1} sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                               fontWeight="medium">
                  {t("signup.forms.phone")}
                </VuiTypography>
                <VuiInput
                  mx={1}
                  {...register("phone", {
                    required: t("forms.required.phone"),
                    pattern: { value: /^(00213|\+213|0)(5|6|7)[0-9]{8}$/, message: t("forms.required.phone") },
                  })}
                  placeholder={t("signup.placeholder.phone")}
                  type="phone"
                  error={!!errors.phone}
                  value={formDataState.phone}
                  onChange={(e) => setFormData({ ...formDataState, phone: e.target.value })}
                />
                {errors.phone &&
                  <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.phone.message}</VuiTypography>
                }
              </VuiBox>
            </VuiBox>
            {/*Password field*/}
            <VuiBox px={1}>
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
                value={formDataState.password}
                onChange={(e) => setFormData({ ...formDataState, password: e.target.value })}
                endAdornment={
                  <IconButton sx={{ position: "absolute", right: 25 }} onClick={() => setShowPassword(!showPassword)}>
                    {showPassword ? <VisibilityOff color="white" /> : <Visibility color="white" />}
                  </IconButton>
                }
              />
              {errors.password &&
                <VuiTypography sx={{ color: "red", fontSize: "0.7rem" }}>{errors.password.message}</VuiTypography>
              }</VuiBox>
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
              value={formDataState.subject} // Bind to state value
              onChange={(e) => setFormData({ ...formDataState, subject: e.target.value })}
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
              value={formDataState.institution}
              onChange={(e) => setFormData({ ...formDataState, institution: e.target.value })}
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
              value={formDataState.yearsOfExperience}
              onChange={(e) => setFormData({ ...formDataState, yearsOfExperience: e.target.value })}
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
          <VuiBox sx={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
          }}>
            <VuiTypography sx={{ margin: "10px 0" }} component="label" variant="button" color="white"
                           fontWeight="medium">
              {t("signup.forms.upload")}
            </VuiTypography>
            <input
              type="file"
              onChange={handleAvatarChange}
              style={{ display: "none" }}
            />
            <Avatar src={avatarPreview} sx={{ width: 100, height: 100, cursor: "pointer" }} onClick={() => document.querySelector("input[type=\"file\"]").click()} />
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
      cardContent
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
