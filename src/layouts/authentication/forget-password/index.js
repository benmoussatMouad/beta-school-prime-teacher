import { useForm } from "react-hook-form";
import { useEffect, useState } from "react";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgForgetPassword from "assets/images/signInImage.png"; // Replace with appropriate image
import CircularProgress from "@mui/material/CircularProgress";
import { useForgetPassword } from "api/auth/forgetPassword";
import { useTranslation } from "react-i18next";
import Translator from "../components/Translate";

function ForgetPassword() {
  const [cooldown, setCooldown] = useState(0); // Cooldown timer state

  // Hook to handle the forgot-password request
  const { mutate, isLoading } = useForgetPassword();

  // react-hook-form setup
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    defaultValues: {
      email: "",
    },
  });

  // Handle form submission
  const onSubmit = async (data) => {
    mutate(data.email, {
      onSuccess: () => {
        setCooldown(60); // Start cooldown on success
      },
    });
  };

  // Decrement cooldown every second
  useEffect(() => {
    let timer;
    if (cooldown > 0) {
      timer = setTimeout(() => setCooldown((prev) => prev - 1), 1000);
    }
    return () => clearTimeout(timer);
  }, [cooldown]);


  const { t } = useTranslation();


  return (
    <CoverLayout
      title={t("forgetPassword.forget")}
      color="white"
      description={t("forgetPassword.description")}
      premotto="PRIME BETA SCHOOL"
      motto={t("signup.motto")}
      image={bgForgetPassword} // Background image for forget password page
    >
      {isLoading ? (
        <VuiBox sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
          <CircularProgress color="info" />
        </VuiBox>
      ) : (
        <VuiBox component="form" onSubmit={handleSubmit(onSubmit)} role="form">
          {/* Email Field */}
          <Translator />
          <VuiBox mb={2}>
            <VuiBox>
              <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                {t("signup.forms.email")}
              </VuiTypography>
            </VuiBox>
            <VuiInput
              {...register("email", {
                required: t("forms.required.email"),
                pattern: { value: /^\S+@\S+$/, message: "Invalid email format" },
              })}
              type="email"
              placeholder={t("placeholder.email")}
            />
            {errors.email && (
              <VuiTypography variant="caption" color="error">
                {errors.email.message}
              </VuiTypography>
            )}
          </VuiBox>

          {/* Submit Button */}
          <VuiBox mt={4} mb={1}>
            <VuiButton type="submit" color="info" fullWidth disabled={cooldown > 0}>
              {cooldown > 0 ? `${t("button.forgetButton01")} ${cooldown}s` : t("button.forgetButton02")}
            </VuiButton>
          </VuiBox>
        </VuiBox>
      )}
    </CoverLayout>
  );
}

export default ForgetPassword;
