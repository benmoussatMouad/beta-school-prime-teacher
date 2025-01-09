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

const fetchPaidTeachers = async (token, queryOptions) => {
    const params = buildQueryParams(queryOptions);

    const response = await apiClient.get("/teacher/paid", {
        headers: { Authorization: `Bearer ${token}` },
        params,
    });

    return response.data;
};

export function useGetPaidTeachers({
    token,
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
    userRole
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
        sortType,
        userRole
    };

    return useQuery(
        ["teachersDebts", token, queryOptions],
        () => fetchPaidTeachers(token, queryOptions),
        {
            enabled: !!token && userRole === "ROOT",
            refetchOnWindowFocus: true,
        }
    );
}