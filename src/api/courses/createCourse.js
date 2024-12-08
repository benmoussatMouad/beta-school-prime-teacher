import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const createCourseFn = async (newCourse) => {
  const response = await apiClient.post("/course", newCourse);
  return response.data;
};

export function useCreateCourse() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createCourseFn,
    onSuccess: () => {
      // Trigger success Snackbar
      showSnackBar(dispatch, t("course.create.success"), "success");
      queryClient.invalidateQueries("courses");
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
      return err.response.data;
    },
  });
}