import { useQuery } from "react-query";
import { apiClient } from "../apiClient";

// Helper function to build query params manually
const buildQueryParams = (
  {
    firstName,
    lastName,
    email,
    status,
    studentsLevel,
    wilaya,
    sortBy, // New Parameter
    sortType, // New Parameter
    page,
    limit,
  }) => {
  const params = new URLSearchParams();

  if (firstName) params.append("firstName", firstName);
  if (lastName) params.append("lastName", lastName);
  if (email) params.append("email", email);
  if (status) params.append("status", status);
  if (studentsLevel) params.append("class", studentsLevel);
  if (wilaya) params.append("wilaya", wilaya);
  if (page !== undefined) params.append("page", page + 1);
  if (limit !== undefined) params.append("limit", limit);
  if (sortBy) params.append("sortBy", sortBy); // Add sortBy
  if (sortType) params.append("sortType", sortType);// Add sortType

  return params.toString();
};

// Function to fetch students
const fetchStudents = async (token, queryOptions) => {
  const queryString = buildQueryParams(queryOptions);
  const response = await apiClient.get(
    `/student/enrolled${queryString ? `?${queryString}` : ""}`,
    {
      headers: { Authorization: `Bearer ${token}` },
    },
  );

  return response.data;
};

// Custom hook for fetching students
export function useGetAllEnrolledStudents(
  {
    token,
    firstName,
    lastName,
    email,
    status,
    studentsLevel,
    wilaya,
    page = 0,
    limit = 10,
    sortBy, // New Parameter
    sortType, // New Parameter
  }) {
  // Consolidate options for query
  const queryOptions = {
    firstName,
    lastName,
    email,
    status,
    studentsLevel,
    wilaya,
    page,
    limit,
    sortBy, // New Parameter
    sortType, // New Parameter
  };

  return useQuery(
    ["getAllEnrolledStudents", token, queryOptions], // Dependency array
    () => fetchStudents(token, queryOptions),
    {
      enabled: !!token, // Only fetch if the token exists
      refetchOnWindowFocus: true, // Refetch data when window regains focus
    },
  );
}