import { useQuery } from "react-query";
import { apiClient } from "../apiClient";

const buildQueryParams = ({
    firstName,
    lastName,
    email,
    wilaya,
    subject,
    status,
    role,
    page = 0,
    limit = 10,
    sortBy,
    sortType,
}) => {
    const params = {};

    if (firstName) params.firstName = firstName;
    if (lastName) params.lastName = lastName;
    if (email) params.email = email;
    if (wilaya) params.wilaya = wilaya;
    if (subject) params.subject = subject;
    if (status) params.status = status;
    if (role) params.role = role;
    if (page !== undefined) params.page = page + 1;
    if (limit !== undefined) params.limit = limit;
    if (sortBy) params.sortBy = sortBy;
    if (sortType) params.sortType = sortType;

    return params;
};

const fetchTeachersDebts = async (token, queryOptions) => {
    const params = buildQueryParams(queryOptions);

    const response = await apiClient.get("/teacher/debts", {
        headers: { Authorization: `Bearer ${token}` },
        params,
    });

    return response.data;
};

export function useGetTeachersDebts({
    token,
    firstName,
    lastName,
    email,
    wilaya,
    subject,
    status,
    role,
    page = 1,
    limit = 10,
    sortBy,
    sortType,
}) {
    const queryOptions = {
        firstName,
        lastName,
        email,
        wilaya,
        subject,
        role,
        status,
        page,
        limit,
        sortBy,
        sortType
    };

    return useQuery(
        ["teachersDebts", token, queryOptions],
        () => fetchTeachersDebts(token, queryOptions),
        {
            enabled: !!token,
            refetchOnWindowFocus: true,
        }
    );
}