import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";

const createCourseFn = async (newCourse) => {
  const response = await apiClient.post("/course", newCourse);
  return response.data;
};

export function useCreateCourse() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createCourseFn,
    onSuccess: (data) => {
      // Trigger success Snackbar
      showSnackBar(dispatch, t("course.create.success"), "success");
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
      return err.response.data;
    },
  });
}
