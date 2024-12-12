import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const updateToReviewFn = async (courseId) => {
  const response = await apiClient.patch(`/course/${courseId}/to-review`);
  return response.data;
};

export function useUpdateToReview() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { t } = useTranslation();

  return useMutation({
    mutationFn: updateToReviewFn,
    onSuccess: (data) => {
      // Trigger success Snackbar
      showSnackBar(dispatch, t("course.updateToReview.success"), "success");
      // Optionally invalidate "courses" query to update local cache after mutation
      queryClient.invalidateQueries(["course", data.id]);
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
    },
  });
}