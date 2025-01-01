import { useMutation, useQuery } from "react-query";
import { apiClient } from "../index"; // Adjust your import paths
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

// Function to handle the API call for updating the teacher profile
const deleteAnnouncementsFn = async ({ token, id }) => {
  const response = await apiClient.delete(`/announcement/${id}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export function useDeleteAnnouncements() {
  const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar

  const { t } = useTranslation();

  return useMutation({
    mutationFn: deleteAnnouncementsFn,
    onSuccess: ({ message }) => {
      showSnackBar(dispatch, t('operationSuccesful'), "success");
      queryClient.invalidateQueries("announcements");
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
