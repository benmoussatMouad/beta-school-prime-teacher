import { useMutation } from "react-query";
import { apiClient } from "../index"; // Adjust your import paths
import { showSnackBar, useVisionUIController } from "../../context";
import { useAuth } from "../../context/auth/authContext";
import { queryClient } from "providers/queryProvider";
import { teacherQueryKeys } from ".";

// Function to handle the API call for updating the teacher profile
const createUpdateProfileFn = async (data) => {
    const response = await apiClient.put("/teacher/me", data);
    return response.data;
};

export function useUpdateProfile() {
    const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar
    const { user } = useAuth(); // Access the authenticated user's context

    return useMutation({
        mutationFn: createUpdateProfileFn,
        onSuccess: (data) => {
            // Update successful
            showSnackBar(dispatch, "Profile updated successfully!", "success");

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
            return err.response?.data;
        },
    });
}
