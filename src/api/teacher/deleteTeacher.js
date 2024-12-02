import { useMutation } from "react-query";
import { apiClient } from "../index"; // Adjust your import paths
import { showSnackBar, useVisionUIController } from "../../context";
import { useAuth } from "../../context/auth/authContext";
import { useTranslation } from "react-i18next";
import { useHistory } from "react-router-dom";

// Function to handle the API call for updating the teacher profile
const createDeleteTeacherFn = async () => {
  const response = await apiClient.delete("/teacher/me");
  return response.data;
};

export function useDeleteTeacher() {
  const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar
  const { logout } = useAuth();
  const history = useHistory();

  const { t } = useTranslation();

  return useMutation({
    mutationFn: createDeleteTeacherFn,
    onSuccess: (message) => {
      // Update successful
      logout()
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
