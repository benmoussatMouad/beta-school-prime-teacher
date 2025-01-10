import { useQuery } from "react-query";
import { apiClient } from "../apiClient";

const buildQueryParams = ({
    page = 0,
    limit = 5,
    sortBy,
    sortType,
    startDate,
    endDate,
    status
}) => {
    const params = {};

    if (page) params.page = page + 1;
    if (limit) params.limit = limit;
    if (sortBy) params.sortBy = sortBy;
    if (sortType) params.sortType = sortType;
    if (startDate) params.startDate = startDate;
    if (endDate) params.endDate = endDate;
    if (status) params.status = status;

    return params;
};

const fetchSales = async (token, queryOptions) => {
    const params = buildQueryParams(queryOptions);

    const response = await apiClient.get("/teacher/sales", {
        headers: { Authorization: `Bearer ${token}` },
        params
    });
    return response.data;
};

export function useGetSales({
    token,
    page = 1,
    limit = 5,
    sortBy,
    sortType,
    startDate,
    endDate,
    status,
    role
}) {
    const queryOptions = { page, limit, sortBy, sortType, startDate, endDate, status };

    return useQuery(
        ["sales", token, queryOptions],
        () => fetchSales(token, queryOptions),
        {
            enabled: !!token,
            refetchOnWindowFocus: true,
        }
    );
}