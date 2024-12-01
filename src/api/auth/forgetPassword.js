import { useMutation } from "react-query";
import { showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";
import { useTranslation } from "react-i18next";

const createForgetPasswordFn = async (email) => {
  const response = await apiClient.post("/auth/forgot-password", { email });
  return response.data;
};

export function useForgetPassword() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createForgetPasswordFn,
    onSuccess: (data) => {
      showSnackBar(dispatch, data.message || t("snackbar.forgetPassword"), "success");
      return true;
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
    },
  });
}

