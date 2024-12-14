import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const createChapterFn = async ({ courseId, formData, signal }) => {
  const response = await apiClient.post(
    `/chapter/${courseId}`,
    formData,
    {
      signal, // Pass the signal here
    }
  );
  return response.data;
};

export function useCreateChapter() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { t } = useTranslation();

  return useMutation({
    mutationFn: createChapterFn,
    onSuccess: (data) => {
      // Trigger success Snackbar
      showSnackBar(dispatch, t("chapter.create.successfully"), "success");
      // Invalidate courses to refresh the cache
      queryClient.invalidateQueries(["course", data.courseId]);
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
    },
  });
}