import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

// Function to create an announcement
const createAnnouncementFn = async ({ message }) => {
  const response = await apiClient.post(
    "/announcement", // Route for creating an announcement
    { message } // Payload containing the 'message'
  );
  return response.data;
};

// useCreateAnnouncement Hook
export function useCreateAnnouncement() {
  const [, dispatch] = useVisionUIController(); // Get dispatch from context
  const { t } = useTranslation();

  return useMutation({
    mutationFn: createAnnouncementFn, // Mutation function
    onSuccess: (data) => {
      // Trigger success Snackbar
      showSnackBar(dispatch, t("announcement.create.successfully"), "success");

      // Invalidate announcements cache to refresh data
      queryClient.invalidateQueries("announcements");
    },
    onError: (err) => {
      // Trigger error Snackbar
      showSnackBar(dispatch, err.response?.data?.message || t("snackbar.error"), "error");
    },
  });
}
