import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const rejectCourseFn = async ({ coursId, statusNote }) => {
  const response = await apiClient.patch(`/course/${coursId}/reject`, { statusNote });
  return response.data;
};

export function useRejectCourse() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { t } = useTranslation();

  return useMutation({
    mutationFn: rejectCourseFn,
    onSuccess: (data) => {
      console.log(data);
      // Trigger success Snackbar
      showSnackBar(dispatch, t("course.rejectCourse.success"), "success");
      // Invalidate courses to refresh the cache
      queryClient.invalidateQueries(["course", data.id]);
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
    },
  });
}