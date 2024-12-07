import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const updateCourseFn = async (updateCourse) => {
  const response = await apiClient.put(`/course/${updateCourse.coursId}`, updateCourse.formData);
  return response.data;
};

export function useUpdateCourse() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context

  const { t } = useTranslation();

  return useMutation({
    mutationFn: updateCourseFn,
    onSuccess: (data) => {
      console.log(data);
      // Trigger success Snackbar
      showSnackBar(dispatch, t("course.update.success"), "success");
      queryClient.invalidateQueries("course");
      queryClient.invalidateQueries("courses");
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
      return err.response.data;
    },
  });
}
