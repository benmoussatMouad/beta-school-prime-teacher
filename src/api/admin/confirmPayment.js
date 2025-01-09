import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const confirmTeacherPaymentFn = async (teacherId) => {
    const response = await apiClient.post(`/teacher/pay`, {
        teacherId: teacherId
    });
    return response.data;
};

export function useConfirmPayment() {
    const [, dispatch] = useVisionUIController();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: confirmTeacherPaymentFn,
        onSuccess: ({ message }) => {
            showSnackBar(dispatch, message, "success");
            queryClient.invalidateQueries("teachersDebts");
        },
        onError: (err) => {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
            showSnackBar(dispatch, errorMessage, "error");
            return err.response?.data;
        },
    });
}