import { useQuery } from "react-query";
import { apiClient } from "../index";

export const useGetDebtDetail = ({ token, debtId }) => {
    return useQuery(
        ['debtDetail', debtId],
        async () => {
            const response = await apiClient.get(`/teacher/debts/${debtId}`, {
                headers: { Authorization: `Bearer ${token}` }
            });
            return response.data;
        },
        {
            enabled: !!token && !!debtId,
            refetchOnWindowFocus: true,
        }
    );
};