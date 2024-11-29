import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import CoverLayout from "layouts/authentication/components/CoverLayout";
import bgResetPassword from "assets/images/signInImage.png"; // Replace with appropriate image
import IconButton from "@mui/material/IconButton";
import VisibilityOff from "@mui/icons-material/VisibilityOff";
import Visibility from "@mui/icons-material/Visibility";
import CircularProgress from "@mui/material/CircularProgress";
import { useResetPassword } from "api/auth/resetPassword";
import { useLocation, useHistory } from "react-router-dom";
import { useVisionUIController } from "context";
import { showSnackBar } from "context";
import Translator from "../components/Translate";
import { useTranslation } from "react-i18next";

function ResetPassword() {
    const { search } = useLocation(); // Use location to get query parameters
    const history = useHistory();
    const [token, setToken] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);

    const [, dispatch] = useVisionUIController(); // Get dispatch from context

    const { mutate, isLoading } = useResetPassword(); // Hook to handle the reset-password request

    // react-hook-form setup
    const { register, handleSubmit, formState: { errors } } = useForm({
        defaultValues: {
            password: "",
            confirmPassword: "",
        },
    });

    // Handle form submission
    const onSubmit = async (data) => {
        if (data.password !== data.confirmPassword) {
            showSnackBar(dispatch, "Password don't match", "error");
            return;
        }
        await mutate({ token, ...data }); // Call the API with the new password
    };

    useEffect(() => {
        const queryParams = new URLSearchParams(search);
        const tokenFromUrl = queryParams.get("token");
        if (tokenFromUrl) {
            setToken(tokenFromUrl);
        } else {
            // Redirect to login or error page if no token is found
            history.push("/authentication/sign-in");
        }
    }, [search, history]);

    const { t } = useTranslation();

    return (
        <CoverLayout
            title={t('resetPassword.reset')}
            color="white"
            description={t('resetPassword.description')}
            premotto="PRIME BETA SCHOOL"
            motto={t('signup.motto')}
            image={bgResetPassword} // Background image for reset password page
        >
            {isLoading ? (
                <VuiBox sx={{ display: "flex", alignItems: "center", justifyContent: "center" }}>
                    <CircularProgress color="info" />
                </VuiBox>
            ) : (
                <VuiBox component="form" onSubmit={handleSubmit(onSubmit)} role="form">
                    <Translator />
                    {/* Password Field */}
                    <VuiBox mb={2}>
                        <VuiBox>
                            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                                {t('forms.newPassword')}
                            </VuiTypography>
                        </VuiBox>
                        <VuiInput
                            {...register("password", {
                                required: "Password is required",
                                minLength: { value: 6, message: "Le mot de passe doit comporter au moins 6 caractères" },
                            })}
                            type={showPassword ? "text" : "password"}
                            placeholder={t('placeholder.password')}
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

                    {/* Confirm Password Field */}
                    <VuiBox mb={2}>
                        <VuiBox>
                            <VuiTypography component="label" variant="button" color="white" fontWeight="medium">
                                {t('forms.confirmPassword')}
                            </VuiTypography>
                        </VuiBox>
                        <VuiInput
                            {...register("confirmPassword", {
                                required: "Confirm password is required",
                                minLength: { value: 6, message: "Le mot de passe doit comporter au moins 6 caractères" },
                            })}
                            type={showConfirmPassword ? "text" : "password"}
                            placeholder={t('placeholder.password')}
                            endAdornment={
                                <IconButton sx={{ position: "absolute", right: 20 }} onClick={() => setShowConfirmPassword(!showConfirmPassword)}>
                                    {showConfirmPassword ? <VisibilityOff color="white" /> : <Visibility color="white" />}
                                </IconButton>
                            }
                        />
                        {errors.confirmPassword && (
                            <VuiTypography variant="caption" color="error">{errors.confirmPassword.message}</VuiTypography>
                        )}
                    </VuiBox>

                    {/* Submit Button */}
                    <VuiBox mt={4} mb={1}>
                        <VuiButton type="submit" color="info" fullWidth>
                            {t('button.reset')}
                        </VuiButton>
                    </VuiBox>
                </VuiBox>
            )}
        </CoverLayout>
    );
}

export default ResetPassword;
