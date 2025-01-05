import { useMutation } from "react-query";
import { apiClient } from "../index"; // Adjust your import paths
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

// Function to handle the API call for accepting a student
const createRecoverStudentFn = async (studentId) => {
  const response = await apiClient.patch(`/student/recover/${studentId}`);
  return response.data;
};

export function useRecoverStudent() {
  const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar
  const { t } = useTranslation();

  return useMutation({
    mutationFn: createRecoverStudentFn,
    onSuccess: ({ message }) => {
      // Update successful
      showSnackBar(dispatch, message || t("students.recover.success"), "success");
      queryClient.invalidateQueries("getAllStudents"); // Adjust query key if needed
      queryClient.invalidateQueries("getAllEnrolledStudents"); // Adjust query key if needed
    },
    onError: (err) => {
      // Handle errors gracefully and show a Snackbar message
      const errorMessage =
        err.response?.data?.message || t("students.recover.error");
      showSnackBar(dispatch, errorMessage, "error");

      return err.response?.data;
    },
  });
}