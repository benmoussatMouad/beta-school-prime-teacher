import { useMutation } from "react-query";
import { showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";
import { useAuth } from "../../context/auth/authContext";
import { useTranslation } from "react-i18next";

const createLoginFn = async (credentials) => {
  const response = await apiClient.post("/auth/teacher/login", credentials);
  return response.data;
};

export function useLogin() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { login } = useAuth();

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createLoginFn,
    onSuccess: (data) => {
      // Store access and refresh tokens in localStorage (or secure storage)
      localStorage.setItem("access_token", data.tokens.access.token);
      localStorage.setItem("refresh_token", data.tokens.refresh.token);

      login(data);
      // Trigger success Snackbar
      showSnackBar(dispatch, t("snackbar.logged"), "success");
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
      return err.response.data;
    },
  });
}

