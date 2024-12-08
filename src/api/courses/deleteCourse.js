import { useMutation } from "react-query";
import { apiClient } from "../apiClient";
import { getAccessToken } from "../../utils";
import { showSnackBar, useVisionUIController } from "../../context";
import { useHistory } from "react-router-dom";
import { useTranslation } from "react-i18next";


const token = getAccessToken();

const createDeleteCourseFn = async (courseId) => {
  const response = await apiClient.delete(`/course/${courseId}`, {
    headers: { Authorization: `Bearer ${courseId}` },
  });
  return response.data;  // Ensure response has the expected structure
};


export function useDeleteCourse() {
  const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar
  const history = useHistory();

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createDeleteCourseFn,
    onSuccess: ({ message }) => {
      // Update successful
      showSnackBar(dispatch, message, "success");
      history.push("/courses");
    },
    onError: (err) => {
      // Handle errors gracefully and show a Snackbar message
      const errorMessage =
        err.response?.data?.message || "An unexpected error occurred.";
      showSnackBar(dispatch, errorMessage, "error");

      return err.response?.data;
    },
  });
}


