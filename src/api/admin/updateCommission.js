import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";
import { queryClient } from "../../providers/queryProvider";

const updateCommissionFn = async (commission) => {
    const response = await apiClient.put('/settings/commission', {
        commission: commission
    });
    return response.data;
};

export function useUpdateCommission() {
    const [, dispatch] = useVisionUIController();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: updateCommissionFn,
        onSuccess: (data) => {
            showSnackBar(dispatch, t('commission.updated'), "success");
            queryClient.invalidateQueries("commission");
        },
        onError: (err) => {
            const errorMessage = err.response?.data?.message || "An unexpected error occurred.";
            showSnackBar(dispatch, errorMessage, "error");
            return err.response?.data;
        },
    });
}