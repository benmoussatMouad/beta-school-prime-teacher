import { useQuery } from "react-query";
import { apiClient } from "../apiClient";

// Helper function to build query parameters
const buildQueryParams = (
  {
    firstName = "",
    lastName = "",
    email = "",
    subject = "",
    role = "",
    page = 0,
    limit = 10,
  }) => {
  const params = {};

  if (firstName) params.firstName = firstName;
  if (lastName) params.lastName = lastName;
  if (email) params.email = email;
  if (subject) params.subject = subject;
  if (role) params.role = role;
  if (page !== undefined) params.page = page + 1;
  if (limit !== undefined) params.limit = limit;

  return params;
};

// API call function
const fetchTeachers = async (token, queryOptions) => {
  const params = buildQueryParams(queryOptions);

  const response = await apiClient.get("/teacher", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return response.data; // Ensure response has the expected structure
};

// Custom hook
export function useGetTeachers(
  {
    token,
    firstName = "",
    lastName = "",
    email = "",
    subject = "",
    role = "",
    page = 1,
    limit = 10,
  }) {
  const queryOptions = { firstName, lastName, email, subject, role, page, limit };

  return useQuery(
    ["teachers", token, queryOptions], // Use queryOptions to generate a dynamic query key
    () => fetchTeachers(token, queryOptions), // Pass queryOptions to the fetch function
    {
      enabled: !!token, // Only run query if token exists
      refetchOnWindowFocus: true,
    },
  );
}