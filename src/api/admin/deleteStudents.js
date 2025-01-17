import { useMutation } from "react-query";
import { apiClient } from "../index"; // Adjust your import paths
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const createDeleteStudents = async (studentId) => {
    const response = await apiClient.delete(`/student/${studentId}`);
    return response.data;
};

export function useDeleteStudent() {
    const [, dispatch] = useVisionUIController(); // Get dispatch for Snackbar
    const { t } = useTranslation();

    return useMutation({
        mutationFn: createDeleteStudents,
        onSuccess: ({ message }) => {
            showSnackBar(dispatch, message || t("students.delete.success"), "success");
            queryClient.invalidateQueries("getAllStudents");
            queryClient.invalidateQueries("getAllEnrolledStudents");
        },
        onError: (err) => {
            const errorMessage =
                err.response?.data?.message || t("students.delete.error");
            showSnackBar(dispatch, errorMessage, "error");

            return err.response?.data;
        },
    });
}