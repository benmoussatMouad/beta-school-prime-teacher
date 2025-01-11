import React from 'react';

import { Card, Slider } from "@mui/material";
import VuiBox from 'components/VuiBox';
import VuiTypography from 'components/VuiTypography';
import { useTranslation } from "react-i18next";

const SubscribersRate = () => {
	const { t } = useTranslation();
	const [value, setValue] = React.useState(30);

	const handleSliderChange = (event, newValue) => {
		setValue(newValue);
	};


	return (
		<Card sx={{ height: "340px" }}>
			<VuiBox display="flex" flexDirection="column" sx={{ justifyContent: "space-between", height: "100%" }}>
				<VuiBox display="flex" flexDirection="column">
					<VuiTypography variant="lg" color="white" fontWeight="bold" mb="4px">
						{t("subscriptionCard.title")}
					</VuiTypography>
					<VuiTypography variant="button" color="text" fontWeight="regular" mb="20px">
						{t("subscriptionCard.toAllCourses")}
					</VuiTypography>
				</VuiBox>
				<VuiBox display="flex" justifyContent="center" alignItems="center" sx={{ height: "100%" }}>
					<VuiBox
						color="white"
						bgColor="info"
						variant="gradient"
						borderRadius="lg"
						shadow="lg"
						opacity={1}
						p={2}
					>
						<VuiTypography variant="h2" color="white" fontWeight="bold" mb="4px">
							{value} DA
						</VuiTypography>
					</VuiBox>
				</VuiBox>
				<VuiBox sx={{ justifyContent: "center" }}>
					<Slider
						defaultValue={15000}
						min={10000}
						max={30000}
						step={1000}
						valueLabelDisplay="auto"
						value={typeof value === 'number' ? value : 0}
						onChange={handleSliderChange}
						aria-labelledby="input-slider"
					/>
				</VuiBox>

			</VuiBox>
		</Card>
	);
};

export default SubscribersRate;
