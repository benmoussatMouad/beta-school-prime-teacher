import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { Card, IconButton, Grid, CircularProgress, Box } from "@mui/material";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import colors from "assets/theme/base/colors";
import { useTranslation } from "react-i18next";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import VuiButton from "components/VuiButton";
import { useUpdateProfile } from "api";
import { useAuth } from "context/auth/authContext";
import { Subjects } from "utils";
import VuiSelect from "components/VuiSelect";


const UpdateProfile = () => {
	const { gradients } = colors;
	const { cardContent } = gradients;
	const { t } = useTranslation();
	const { user } = useAuth();

	const [isloading, setIsLoading] = useState(false)

	const [formState, setFormState] = useState({
		email: user?.user?.email || "",
		password: "",
		firstName: user?.user?.firstName || "",
		lastName: user?.user?.lastName || "",
		subject: user?.teacher?.subject || "",
		yearsOfExperience: Number(user?.teacher?.yearsOfExperience) || 0,
		institution: user?.teacher?.institution || "",
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
		setIsLoading(true)
		mutate(formState, {
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
				height: "100%"
			})}
		>
			<Box style={{ height: "100%" }} display="flex" flexDirection="column" p={2} >
				<VuiTypography variant="lg" color="white" fontWeight="bold" mb={1}>
					{t("profile.title")}
				</VuiTypography>
				<VuiTypography variant="button" color="text" fontWeight="regular" mb={2}>
					{t("profile.subtitle")}
				</VuiTypography>
				<VuiBox style={{ height: "100%" }} component="form" onSubmit={handleSubmit(onSubmit)} role="form">
					{isloading ? <Box style={{ height: "100%" }} sx={{ display: "flex", alignItems: "center", justifyContent: "center" }} >
						<CircularProgress color="info" />
					</Box> : <Grid container spacing={2}>
						{/* Email Field */}
						<Grid item xs={12} sm={6} md={4}>
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

						{/* First Name Field */}
						<Grid item xs={12} sm={6} md={4}>
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
										onChange: (e) => handleInputChange("firstName", e.target.value),
										value: formState.firstName,
									})}
									placeholder={t("placeholder.firstName")}
									type="text"
									error={!!errors.firstName}
								/>
							</VuiBox>
						</Grid>

						{/* Last Name Field */}
						<Grid item xs={12} sm={6} md={4}>
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
										onChange: (e) => handleInputChange("lastName", e.target.value),
										value: formState.lastName,
									})}
									placeholder={t("placeholder.lastName")}
									type="text"
									error={!!errors.lastName}
								/>
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
						<Grid item xs={12} sm={6} md={6}>
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
								/>
							</VuiBox>
						</Grid>

						{/* Years of Experience Field */}
						<Grid item xs={12} sm={6} md={6}>
							<VuiBox>
								<VuiTypography
									component="label"
									variant="button"
									color="white"
									fontWeight="medium"
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

						{/* Institution Field */}
						<Grid item xs={12} sm={6} md={6}>
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
