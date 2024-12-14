import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const updateChapterFn = async ({ chapterId, formData, signal }) => {
  const response = await apiClient.put(`/chapter/${chapterId}`, formData, { signal });
  return response.data;
};

export function useUpdateChapter() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { t } = useTranslation();

  return useMutation({
    mutationFn: updateChapterFn,
    onSuccess: (data) => {
      // Trigger success Snackbar
      showSnackBar(dispatch, t("chapter.update.successfully"), "success");
      // Invalidate courses to refresh the cache
      queryClient.invalidateQueries(["course", data.courseId]);
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
    },
  });
}