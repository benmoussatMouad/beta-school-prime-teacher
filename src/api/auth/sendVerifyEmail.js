import { useMutation } from "react-query";
import { showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";
import { useTranslation } from "react-i18next";

const createSendVerifyEmailFn = async () => {
  const response = await apiClient.post("/auth/send-verification-email");
  return response.data;
};

export function useSendVerifyEmail() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createSendVerifyEmailFn,
    onSuccess: (data) => {
      showSnackBar(dispatch, data.message || t("snackbar.sendVerifyEmail"), "success");
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
    },
  });
}

