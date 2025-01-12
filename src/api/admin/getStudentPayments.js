import { useQuery } from "react-query";
import { apiClient } from "../apiClient";

const buildQueryParams = ({
  page,
  limit,
  sortBy,
  sortType,
  firstName,
  lastName,
  email,
  subject,
  wilaya
}) => {
  const params = {};

  if (page !== undefined) params.page = page + 1;
  if (limit !== undefined) params.limit = limit;
  if (sortBy) params.sortBy = sortBy;
  if (sortType) params.sortType = sortType;
  if (firstName) params.firstName = firstName;
  if (lastName) params.lastName = lastName;
  if (email) params.email = email;
  if (subject) params.subject = subject;
  if (wilaya) params.wilaya = wilaya;

  return params;
};

const fetchPendingCashTransactions = async (token, queryOptions) => {
  const params = buildQueryParams(queryOptions);

  const response = await apiClient.get("/transactions/pending", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return response.data;
};

export function useGetPendingCashTransactions({
  token,
  page = 0,
  limit = 5,
  sortBy,
  sortType,
  firstName,
  lastName,
  email,
  subject,
  wilaya
}) {
  const queryOptions = { 
    page, 
    limit, 
    sortBy, 
    sortType,
    firstName,
    lastName,
    email,
    subject,
    wilaya
  };

  return useQuery(
    ["pending-cash-transactions", token, queryOptions],
    () => fetchPendingCashTransactions(token, queryOptions),
    {
      enabled: !!token,
      refetchOnWindowFocus: true,
    }
  );
}