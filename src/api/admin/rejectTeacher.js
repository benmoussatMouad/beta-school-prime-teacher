import { useMutation } from "react-query";
import { apiClient } from "../index"; // Adjust your import paths
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

// Function to handle the API call for updating the teacher profile
const createRejectTeacherFn = async (teacherId) => {
  const response = await apiClient.post(`/teacher/reject/${teacherId}`);
  return response.data;
};

export function useRejectTeacher() {
  const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createRejectTeacherFn,
    onSuccess: ({ message }) => {
      // Update successful
      showSnackBar(dispatch, message, "success");
      queryClient.invalidateQueries("demands");
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