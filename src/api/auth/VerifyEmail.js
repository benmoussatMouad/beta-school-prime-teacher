import { useQuery } from "react-query";
import { hideBanner, showBanner, showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";
import { teacherQueryKeys } from "../teacher";
import { getAccessToken } from "../../utils";

const accessToken = getAccessToken();

const createVerifyEmailFn = async (token) => {
  const response = await apiClient.get(`/auth/verify-email?token=${token}`);
  return response.data;
};

export function useVerifyEmail({ token }) {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context

  const { t } = useTranslation();

  return useQuery(
    ["verifyEmail", token],
    () => createVerifyEmailFn(token),
    {
      enabled: !!token, // Only run if token exists
      onSuccess: () => {
        showSnackBar(dispatch, t("snackbar.verifyEmail"), "success");
        hideBanner(dispatch);
        queryClient.invalidateQueries([teacherQueryKeys.all, accessToken]);
      },
      onError: (error) => {
        const message = error?.response?.data?.message;
        showSnackBar(dispatch, message || t("snackbar.error"), "error");
      },
    },
  )
    ;
}

