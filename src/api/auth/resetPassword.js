import { useMutation } from "react-query";
import { showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";

const createResetPasswordFn = async ({ token, password }) => {
  const response = await apiClient.post(`/auth/reset-password?token=${token}`, { password });
  return response.data;
};

export function useResetPassword() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const history = useHistory();

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createResetPasswordFn,
    onSuccess: () => {
      showSnackBar(dispatch, t("snackbar.resetPassword"), "success");
      history.push("/authentication/sign-in");
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
    },
  });
}

