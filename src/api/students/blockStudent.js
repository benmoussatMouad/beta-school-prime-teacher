import { useMutation } from "react-query";
import { apiClient } from "../index"; // Adjust your import paths
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

// Function to handle the API call for accepting a student
const createBlockStudentFn = async (studentId) => {
  const response = await apiClient.patch(`/student/block/${studentId}`);
  return response.data;
};

export function useBlockStudent() {
  const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar
  const { t } = useTranslation();

  return useMutation({
    mutationFn: createBlockStudentFn,
    onSuccess: ({ message }) => {
      // Update successful
      showSnackBar(dispatch, message || t("students.block.success"), "success");
      queryClient.invalidateQueries("getAllStudents"); // Adjust query key if needed
      queryClient.invalidateQueries("getAllEnrolledStudents"); // Adjust query key if needed
    },
    onError: (err) => {
      // Handle errors gracefully and show a Snackbar message
      const errorMessage =
        err.response?.data?.message || t("students.block.error");
      showSnackBar(dispatch, errorMessage, "error");

      return err.response?.data;
    },
  });
}