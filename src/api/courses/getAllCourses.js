import { useQuery } from "react-query";
import { apiClient } from "../apiClient";

// Helper function to build query params
const buildQueryParams = (
  {
    title,
    teacherClass,
    subject,
    courseStatus,
    page,
    limit,
    sortBy, // Add sort key
    sortType, // Add sort direction
  }) => {
  let params = {};


  if (title) params.title = title;
  if (teacherClass) params.teacherClass = teacherClass;
  if (subject) params.subject = subject;
  if (courseStatus) params.status = courseStatus;
  if (page !== undefined) params.page = page + 1;
  if (limit !== undefined) params.limit = limit;
  if (sortBy) params.sortBy = sortBy; // Add sortBy
  if (sortType) params.sortType = sortType; // Add sortType

  return params;
};

// API call function
const fetchCourses = async (token, queryOptions) => {
  const params = buildQueryParams(queryOptions);

  const response = await apiClient.get("/course", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return response.data; // Ensure response has the expected structure
};

// Custom hook
export function useGetAllCourses(
  {
    token,
    title,
    teacherClass,
    subject,
    role,
    courseStatus,
    page = 0,
    limit = 5,
    sortBy, // New Parameter
    sortType, // New Parameter
  }) {
  // Consolidate options for clarity and extendibility
  const queryOptions = { role, title, teacherClass, subject, courseStatus, page, limit, sortBy, sortType };

  return useQuery(
    ["getAllCourses", token, queryOptions],
    () => fetchCourses(token, queryOptions),
    {
      enabled: !!token, // Only run if token exists
      refetchOnWindowFocus: true,
    },
  );
}
