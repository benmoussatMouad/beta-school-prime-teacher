import { useMutation } from "react-query";
import { showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";
import { useAuth } from "../../context/auth/authContext";
import { clearTokens } from "utils";
import { useTranslation } from "react-i18next";

const createLogoutFn = async (refreshToken) => {
  const response = await apiClient.post("/auth/logout", { refreshToken });
  return response.data;
};

export function useLogout() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { logout } = useAuth();
  const { t } = useTranslation();

  return useMutation({
    mutationFn: createLogoutFn,
    onSuccess: () => {
      logout();
      // Trigger success Snackbar
      showSnackBar(dispatch, t("snackbar.logout"), "success");
      clearTokens();
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
      return err.response.data;
    },
  });
}

