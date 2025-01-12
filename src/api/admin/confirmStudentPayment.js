import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";
import { getAccessToken } from "utils";

const token = getAccessToken();

const confirmStudentPaymentFn = async ({ transactionId }) => {
    const response = await apiClient.post(`/course/${transactionId}/enroll/confirm`, {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export function useConfirmStudentPayment() {
    const [, dispatch] = useVisionUIController();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: confirmStudentPaymentFn,
        onSuccess: ({ message }) => {
            showSnackBar(dispatch, message, "success");
            queryClient.invalidateQueries("pending-cash-transactions");
        },
        onError: (err) => {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
            showSnackBar(dispatch, errorMessage, "error");
            return err.response?.data;
        },
    });
}