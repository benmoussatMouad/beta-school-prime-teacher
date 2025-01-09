import { useQuery } from "react-query";
import { apiClient } from "../index";

const getCommissionFn = async () => {
    const response = await apiClient.get(`/settings/commission`);
    return response.data;
};

export function useGetCommission(token) {
    return useQuery(
        ["commission"],
        () => getCommissionFn(),
        {
            enabled: !!token,
        },
    );
}