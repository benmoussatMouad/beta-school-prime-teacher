import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const revertCourseFn = async ({ coursId }) => {
  const response = await apiClient.patch(`/course/${coursId}/revert`);
  return response.data;
};

export function useRevertCourse() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { t } = useTranslation();

  return useMutation({
    mutationFn: revertCourseFn,
    onSuccess: (data) => {
      // Trigger success Snackbar
      showSnackBar(dispatch, t('course.reverted'), "success");
      // Invalidate courses to refresh the cache
      queryClient.invalidateQueries(["course", data.id]);
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
    },
  });
}
