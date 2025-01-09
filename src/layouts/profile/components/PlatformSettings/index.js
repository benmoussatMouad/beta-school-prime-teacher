import { useState, useEffect } from "react";
import Card from "@mui/material/Card";
import VuiBox from "components/VuiBox";
import VuiTypography from "components/VuiTypography";
import VuiInput from "components/VuiInput";
import VuiButton from "components/VuiButton";
import { useTranslation } from "react-i18next";
import { useGetCommission } from "api/admin/getCommission";
import { getAccessToken } from "utils";
import { useUpdateCommission } from "api/admin/updateCommission";

function PlatformSettings() {
  const [inputCommission, setInputCommission] = useState("");
  const { t } = useTranslation();
  const token = getAccessToken();

  const { data: commissionData, isLoading } = useGetCommission(token);
  const { mutate: updateCommission } = useUpdateCommission();

  useEffect(() => {
    if (commissionData?.commission) {
      setInputCommission((commissionData.commission * 100).toString());
    }
  }, [commissionData]);

  const handleCommissionChange = (e) => {
    const value = e.target.value;
    if (value === "" || (parseFloat(value) >= 0 && parseFloat(value) <= 100)) {
      setInputCommission(value);
    }
  };

  const handleUpdateCommission = () => {
    const numValue = parseFloat(inputCommission);
    if (!isNaN(numValue) && numValue >= 0 && numValue <= 100) {
      // Convert percentage to decimal (e.g. 15% -> 0.15) before sending to API
      const decimalValue = numValue / 100;
      updateCommission(decimalValue);
    }
  };

  return (
    <Card sx={{ minHeight: "490px", height: "100%" }}>
      <VuiBox mb="26px">
        <VuiTypography variant="lg" fontWeight="bold" color="white" textTransform="capitalize">
          {t('profile.setting.title')}
        </VuiTypography>
      </VuiBox>

      <VuiBox lineHeight={1.25}>
        <VuiBox display="flex" mb="20px" flexDirection="column">
          <VuiTypography variant="button" fontWeight="medium" color="text" mb={1}>
            {t('commission.label')}
          </VuiTypography>

          <VuiBox display="flex" gap={2}>
            <VuiInput
              type="number"
              value={inputCommission}
              onChange={handleCommissionChange}
              disabled={isLoading}
              sx={{
                background: "#1B1F3D",
                color: "#fff",
                border: "1px solid #56577A",
                borderRadius: "8px"
              }}
              inputProps={{
                min: 0,
                max: 100,
                step: "0.01"
              }}
              placeholder={t('commission.placeholder')}
            />

            <VuiButton
              variant="contained"
              color="info"
              onClick={handleUpdateCommission}
              disabled={isLoading || inputCommission === "" || inputCommission === (commissionData?.commission * 100).toString()}
            >
              {t('commission.update')}
            </VuiButton>
          </VuiBox>

          <VuiTypography variant="caption" color="text" mt={1}>
            {t('commission.current')}: {isLoading ? '...' : (commissionData?.commission * 100)}%
          </VuiTypography>
        </VuiBox>
      </VuiBox>
    </Card>
  );
}

export default PlatformSettings;