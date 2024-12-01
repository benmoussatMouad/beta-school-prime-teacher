import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";

const createSignUpFn = async (newUser) => {
  const response = await apiClient.post("/auth/teacher/register", newUser);
  return response.data;
};

export function useSignUp() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createSignUpFn,
    onSuccess: (data) => {
      // Store access and refresh tokens in localStorage (or secure storage)
      localStorage.setItem("access_token", data.tokens.access.token);
      localStorage.setItem("refresh_token", data.tokens.refresh.token);

      // Trigger success Snackbar
      showSnackBar(dispatch, t("snackbar.signup"), "success");
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
      return err.response.data;
    },
  });
}
