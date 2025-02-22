import { useQuery } from "react-query";
import { apiClient } from "../apiClient";

// Helper function to build query parameters
const buildQueryParams = (
  {
    firstName,
    lastName,
    email,
    subject,
    role,
    page,
    limit,
    sortBy, // Add sort key
    sortType, // Add sort direction
  }) => {
  const params = { status: "IN_PROGRESS" }; // Default status

  // Conditionally add params only if they have values
  if (firstName) params.firstName = firstName;
  if (lastName) params.lastName = lastName;
  if (email) params.email = email;
  if (subject) params.subject = subject;
  if (role) params.role = role;
  if (page !== undefined) params.page = page + 1;
  if (limit !== undefined) params.limit = limit;
  if (sortBy) params.sortBy = sortBy; // Add sortBy
  if (sortType) params.sortType = sortType; // Add sortType

  return params;
};

// API call function
const fetchDemands = async (token, queryOptions) => {
  const params = buildQueryParams(queryOptions);

  const response = await apiClient.get("/teacher", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return response.data; // Ensure response has the expected structure
};

// Custom hook
export function useGetDemands(
  {
    token,
    firstName = "",
    lastName = "",
    email = "",
    subject = "",
    role = "",
    page = 0,
    limit = 5,
    sortBy, // New Parameter
    sortType, // New Parameter
  }) {
  const queryOptions = { firstName, lastName, email, subject, role, page, limit, sortBy, sortType };

  return useQuery(
    ["demands", token, queryOptions], // Use queryOptions for a dynamic key
    () => fetchDemands(token, queryOptions),
    {
      enabled: !!token, // Only run if token exists
      refetchOnWindowFocus: true,
    },
  );
}