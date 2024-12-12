import { useQuery } from "react-query";
import { apiClient } from "../apiClient";

// Helper function to build query parameters
const buildQueryParams = (
  {
    title,
    teacherClass,
    subject,
    page,
    limit,
  }) => {
  const params = {};

  if (title) params.title = title;
  if (teacherClass) params.teacherClass = teacherClass;
  if (subject) params.subject = subject;
  if (page !== undefined) params.page = page + 1; // API generally expects 1-based pages
  if (limit !== undefined) params.limit = limit;

  return params;
};

// API call function
const fetchCourses = async (token, queryOptions) => {
  const params = buildQueryParams(queryOptions);

  const response = await apiClient.get("/course/me", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return response.data; // Ensure response has the expected structure
};

// Custom hook
export function useGetCourses(
  {
    token,
    title = "",
    teacherClass = "",
    subject = "",
    page = 0,
    limit = 100,
  }) {
  const queryOptions = { title, teacherClass, subject, page, limit };

  return useQuery(
    ["courses", token, queryOptions], // Use queryOptions for dynamic query key
    () => fetchCourses(token, queryOptions), // Pass queryOptions to fetchCourses
    {
      enabled: !!token, // Only fetch if token exists
      refetchOnWindowFocus: true,
    },
  );
}