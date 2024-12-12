import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const acceptCourseFn = async (courseId) => {
  const response = await apiClient.patch(`/course/${courseId}/accept`);
  return response.data;
};

export function useAcceptCourse() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { t } = useTranslation();

  return useMutation({
    mutationFn: acceptCourseFn,
    onSuccess: (data) => {
      // Trigger success Snackbar
      showSnackBar(dispatch, t("course.acceptCourse.success"), "success");
      // Invalidate courses to refresh the cache
      queryClient.invalidateQueries(["course", data.id]);
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
    },
  });
}