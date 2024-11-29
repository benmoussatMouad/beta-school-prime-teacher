import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, IconButton, Grid, Switch } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import colors from "assets/theme/base/colors";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import VuiButton from "components/VuiButton";

const UpdateProfile = () => {
	const { gradients } = colors;
	const { cardContent } = gradients;
	const { t } = useTranslation();

	const [showPassword, setShowPassword] = useState(false);
	const [rememberMe, setRememberMe] = useState(false);

	const {
		handleSubmit,
		control,
		register,
		formState: { errors },
	} = useForm({
		defaultValues: {
			email: "",
			password: "",
			firstName: "",
			lastName: "",
			phone: "",
			institution: "",
		},
	});

	const onSubmit = (data) => {
		console.log("Updated Profile Data:", data);
		// Add your API call or logic here
	};

	const handleSetRememberMe = () => {
		setRememberMe(!rememberMe);
	};


	return (
		<Card
			sx={({ breakpoints }) => ({
				padding: "2rem",
				background: cardContent,
				[breakpoints.up("xxl")]: {
					maxHeight: "auto",
				},
			})}
		>
			<VuiBox display="flex" flexDirection="column" p={2} gap={2}>
				<VuiTypography variant="lg" color="white" fontWeight="bold" mb={2}>
					{t("profile.title")}
				</VuiTypography>
				<VuiTypography variant="button" color="text" fontWeight="regular" mb={3}>
					{t("profile.subtitle")}
				</VuiTypography>
				<VuiBox component="form" onSubmit={handleSubmit(onSubmit)} role="form">
					<Grid container spacing={2}>
						{/* Email Field */}
						<Grid item xs={4}>
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
										required: t("validation.required_email"),
										pattern: { value: /^\S+@\S+$/, message: t("validation.invalid_email") },
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



						{/* First Name Field */}
						<Grid item xs={4}>
							<VuiBox>
								<VuiTypography
									component="label"
									variant="button"
									color="white"
									fontWeight="medium"
								>
									{t("forms.firstName")}
								</VuiTypography>
								<VuiInput
									{...register("firstName", {
										required: t("validation.required_firstName"),
									})}
									placeholder={t("placeholder.firstName")}
									type="text"
									error={!!errors.firstName}
								/>
								{errors.firstName && (
									<VuiTypography variant="caption" color="error">
										{errors.firstName.message}
									</VuiTypography>
								)}
							</VuiBox>
						</Grid>

						{/* Last Name Field */}
						<Grid item xs={4}>
							<VuiBox>
								<VuiTypography
									component="label"
									variant="button"
									color="white"
									fontWeight="medium"
								>
									{t("signup.forms.lastName")}
								</VuiTypography>
								<VuiInput
									{...register("lastName", {
										required: t("validation.required_lastName"),
									})}
									placeholder={t("placeholder.lastName")}
									type="text"
									error={!!errors.lastName}
								/>
								{errors.lastName && (
									<VuiTypography variant="caption" color="error">
										{errors.lastName.message}
									</VuiTypography>
								)}
							</VuiBox>
						</Grid>

						{/* Password Field */}
						<Grid item xs={4}>
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
										required: t("validation.required_password"),
										minLength: { value: 6, message: t("validation.min_length_password") },
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

						{/* Phone Field */}
						<Grid item xs={4}>
							<VuiBox>
								<VuiTypography
									component="label"
									variant="button"
									color="white"
									fontWeight="medium"
								>
									{t("forms.phone")}
								</VuiTypography>
								<VuiInput
									{...register("phone")}
									placeholder={t("placeholder.phone")}
									type="text"
								/>
							</VuiBox>
						</Grid>

						{/* Institution Field */}
						<Grid item xs={4}>
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
									{...register("institution")}
									placeholder={t("placeholder.school")}
									type="text"
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
					</Grid>
				</VuiBox>
			</VuiBox>
		</Card>
	);
};

export default UpdateProfile;
