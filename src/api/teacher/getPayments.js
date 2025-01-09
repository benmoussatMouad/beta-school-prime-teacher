import { useQuery } from "react-query";
import { apiClient } from "../apiClient";

const buildQueryParams = ({
    page = 0,
    limit = 10,
    sortBy,
    sortType
}) => {
    const params = {};

    if (page) params.page = page + 1;
    if (limit) params.limit = limit;
    if (sortBy) params.sortBy = sortBy;
    if (sortType) params.sortType = sortType;

    return params;
};

const fetchPayments = async (token, queryOptions) => {
    const params = buildQueryParams(queryOptions);

    const response = await apiClient.get("/teacher/payments", {
        headers: { Authorization: `Bearer ${token}` },
        params
    });
    return response.data;
};

export function useGetPayments({
    token,
    page = 1,
    limit = 10,
    sortBy,
    sortType,
    role
}) {
    const queryOptions = { page, limit, sortBy, sortType };

    return useQuery(
        ["payments", token, queryOptions],
        () => fetchPayments(token, queryOptions),
        {
            enabled: !!token && role !== "ROOT",
            refetchOnWindowFocus: true,
        }
    );
}