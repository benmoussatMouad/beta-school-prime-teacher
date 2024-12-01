import { useMutation } from "react-query";
import { showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";
import { useTranslation } from "react-i18next";

const createRefreshTokenFn = async (refreshToken) => {
  const response = await apiClient.post("/auth/refresh-tokens", { refreshToken });
  return response.data;
};

export function useRefreshToken() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createRefreshTokenFn,
    onSuccess: (data) => {
      // Trigger success Snackbar
      localStorage.setItem("access_token", data.token);
      localStorage.setItem("refresh_token", data.refresh);
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
    },
  });
}

