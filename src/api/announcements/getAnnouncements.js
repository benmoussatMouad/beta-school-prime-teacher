import { useMutation, useQuery } from "react-query";
import { apiClient } from "../index"; // Adjust your import paths
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

// Function to handle the API call for updating the teacher profile
const getAnnouncementsFn = async (token, teacherId) => {
  const response = await apiClient.get(`/announcement/teacher/${teacherId}`, {
    headers: { Authorization: `Bearer ${token}` }
  });
  return response.data;
};

export function useGetAnnouncements({token, teacherId}) {
  const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar

  const { t } = useTranslation();

  return useQuery("announcements", () => getAnnouncementsFn(token,teacherId),{
    enabled: !!token && !!teacherId,
    onSuccess: ({ message }) => {
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
