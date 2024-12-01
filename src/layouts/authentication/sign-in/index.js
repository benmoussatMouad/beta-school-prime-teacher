import { useState } from "react";
import { Link } from "react-router-dom";
import { useForm } from "react-hook-form";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import VuiSwitch from "components/VuiSwitch";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgSignIn from "assets/images/signInImage.png";
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import { useLogin } from "../../../api";
import CircularProgress from "@mui/material/CircularProgress";
import { useTranslation } from "react-i18next";
import Translator from "../components/Translate";


function SignIn() {
  const [rememberMe, setRememberMe] = useState(true);
  const [showPassword, setShowPassword] = useState(false); // Toggle for password visibility

  const { mutate, isLoading } = useLogin();

  // react-hook-form setup
  const { register, handleSubmit, formState: { errors } } = useForm({
    defaultValues: {
      email: "",
      password: "",
    },
  });

  // Handle remember me switch
  const handleSetRememberMe = () => setRememberMe(!rememberMe);

  const { t } = useTranslation();


  // Handle form submission
  const onSubmit = async (data) => {
    await mutate(data);
  };


  return (
    <CoverLayout
      title={t("login.welcome")}
      color="white"
      description={t("login.description")}
      premotto="PRIME BETA SCHOOL"
      motto={t("signup.motto")}
      image={bgSignIn}
    >
      {isLoading ?
        <VuiBox sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress color={"info"} />
        </VuiBox> :
        <VuiBox component="form" onSubmit={handleSubmit(onSubmit)} role="form">
          {/* Email Field */}
          <Translator />
          <VuiBox mb={2}>
            <VuiBox>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                {t("login.forms.email")}
              </VuiTypography>
            </VuiBox>
            <VuiInput
              {...register("email", {
                required: t("forms.required.email"),
                pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
              })}
              type="email"
              placeholder={t("signup.placeholder.email")}
              fontWeight="500"
            />
            {errors.email && (
              <VuiTypography variant="caption" color="error">{errors.email.message}</VuiTypography>
            )}
          </VuiBox>

          {/* Password Field */}
          <VuiBox mb={2}>
            <VuiBox>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                {t("signup.forms.password")}
              </VuiTypography>
            </VuiBox>
            <VuiInput
              {...register("password", {
                required: t("forms.required.password"),
                minLength: { value: 6, message: "Password must be at least 6 characters." },
              })}
              placeholder={t("signup.placeholder.email")}
              type={showPassword ? "text" : "password"}
              error={!!errors.password}
              endAdornment={
                <IconButton sx={{ position: "absolute", right: 20 }} onClick={() => setShowPassword(!showPassword)}>
                  {showPassword ? <VisibilityOff color="white" /> : <Visibility color="white" />}
                </IconButton>
              }
            />
            {errors.password && (
              <VuiTypography variant="caption" color="error">{errors.password.message}</VuiTypography>
            )}
          </VuiBox>

          <VuiBox display="flex" justifyContent="flex-end" mb={2}>
            <VuiTypography
              component={Link}
              to="/authentication/forget-password"
              variant="caption"
              color="white"
              fontWeight="medium"
              sx={{ textDecoration: "underline", cursor: "pointer" }}
            >
              {t("forms.forgetPassword")}
            </VuiTypography>
          </VuiBox>

          {/* Remember Me */}
          <VuiBox display="flex" alignItems="center">
            <VuiSwitch color="info" checked={rememberMe} onChange={handleSetRememberMe} />
            <VuiTypography
              variant="caption"
              color="white"
              fontWeight="medium"
              onClick={handleSetRememberMe}
              sx={{ cursor: "pointer", userSelect: "none" }}
            >
              &nbsp;&nbsp;&nbsp;&nbsp;{t("login.remember")}
            </VuiTypography>
          </VuiBox>


          {/* Submit Button */}
          <VuiBox mt={4} mb={1}>
            <VuiButton type="submit" color="info" fullWidth>
              {t("button.signin")}
            </VuiButton>
          </VuiBox>

          {/* Sign Up Link */}
          <VuiBox mt={3} textAlign="center">
            <VuiTypography variant="button" color="text" fontWeight="regular">
              {t("login.already")}
              <VuiTypography
                component={Link}
                to="/authentication/sign-up"
                variant="button"
                color="white"
                fontWeight="medium"
              >
                {t("login.signin")}
              </VuiTypography>
            </VuiTypography>
          </VuiBox>
        </VuiBox>
      }
    </CoverLayout>
  );
}

export default SignIn;
