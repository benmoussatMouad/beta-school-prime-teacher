import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const cancelStudentTransactionFn = async ({ transactionId }) => {
    const response = await apiClient.delete(`/transactions/cancel/${transactionId}`, );
    return response.data;
};

export function useCancelStudentTransaction(transactionId) {
    const [, dispatch] = useVisionUIController();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: cancelStudentTransactionFn,
        onSuccess: ({ message }) => {
            showSnackBar(dispatch, message, "success");
            queryClient.invalidateQueries("pending-cash-transactions");
            queryClient.invalidateQueries(['transactionDetail', transactionId])
        },
        onError: (err) => {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
            showSnackBar(dispatch, errorMessage, "error");
            return err.response?.data;
        },
    });
}
