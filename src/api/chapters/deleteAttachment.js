import { useMutation } from "react-query";
import { apiClient } from "../apiClient";
import { showSnackBar, useVisionUIController } from "../../context";
import { queryClient } from "../../providers/queryProvider";


const createDeleteAttachmentFn = async ({ chapterId, attachmentId }) => {
  const response = await apiClient.delete(`/chapter/${chapterId}/attachments`, {
    data: {
      ids: [attachmentId],
    },
    headers: { Authorization: `Bearer ${chapterId}` },
  });
  return response.data;  // Ensure response has the expected structure
};


export function useDeleteAttachment(chapterId) {
  const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar


  return useMutation({
    mutationFn: createDeleteAttachmentFn,
    onSuccess: ({ message }) => {
      // Update successful
      showSnackBar(dispatch, message, "success");
      queryClient.invalidateQueries(["chapter", chapterId]);
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


