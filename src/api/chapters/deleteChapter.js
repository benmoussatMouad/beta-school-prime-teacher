import { useMutation } from "react-query";
import { apiClient } from "../apiClient";
import { showSnackBar, useVisionUIController } from "../../context";
import { queryClient } from "../../providers/queryProvider";


const createDeleteChapterFn = async (chapterId) => {
  const response = await apiClient.delete(`/chapter/${chapterId}`, {
    headers: { Authorization: `Bearer ${chapterId}` },
  });
  return response.data;  // Ensure response has the expected structure
};


export function useDeleteChapter(chapterId) {
  const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar


  return useMutation({
    mutationFn: () => createDeleteChapterFn(chapterId),
    onSuccess: ({ message }) => {
      // Update successful
      showSnackBar(dispatch, message, "success");
      queryClient.invalidateQueries("course");
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


