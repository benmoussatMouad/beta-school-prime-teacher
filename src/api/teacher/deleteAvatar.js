import { useMutation } from "react-query";
import { apiClient } from "../index"; // Adjust your import paths
import { showSnackBar, useVisionUIController } from "../../context";
import { useAuth } from "../../context/auth/authContext";
import { queryClient } from "providers/queryProvider";
import { teacherQueryKeys } from ".";

// Function to handle the API call for updating the teacher profile
const createDeleteAvatarFn = async () => {
    const response = await apiClient.delete("/teacher/avatar");
    return response.data;
};

export function useDeleteAvatar() {
    const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar
    const { user } = useAuth(); // Access the authenticated user's context

    return useMutation({
        mutationFn: createDeleteAvatarFn,
        onSuccess: (data) => {
            console.log(data);

            // Update successful
            showSnackBar(dispatch, "Avatar deleted successfully!", "success");

            // Invalidate queries to ensure the UI reflects the updated data
            queryClient.invalidateQueries(teacherQueryKeys.all);

            // Optionally, you can update the local context for user
            if (user) {
                queryClient.setQueryData(teacherQueryKeys.all, (oldData) => ({
                    ...oldData,
                    ...data,
                }));
            }
        },
        onError: (err) => {
            // Handle errors gracefully and show a Snackbar message
            const errorMessage =
                err.response?.data?.message || "An unexpected error occurred.";
            showSnackBar(dispatch, errorMessage, "error");

            // Optionally log the error for debugging purposes
            console.error("Delete Avatar Error:", err);
            return err.response?.data;
        },
    });
}
