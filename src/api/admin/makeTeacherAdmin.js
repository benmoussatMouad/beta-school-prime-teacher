import { useMutation } from "react-query";
import { apiClient } from "../index"; // Adjust your import paths
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

// Function to handle the API call for updating the teacher profile
const createTeacherAdminFn = async (teacherId) => {
  const response = await apiClient.put(`/teacher/admin/${teacherId}`);
  return response.data;
};

export function useMakeTeacherAdmin() {
  const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createTeacherAdminFn,
    onSuccess: ({ message }) => {
      // Update successful
      showSnackBar(dispatch, message, "success");
      queryClient.invalidateQueries("teachers");
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
