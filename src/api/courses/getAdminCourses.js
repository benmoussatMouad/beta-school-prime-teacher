import { useQuery } from "react-query";
import { apiClient } from "../apiClient";

// Helper function to build query params
const buildQueryParams = (
  {
    role,
    title,
    teacherClass,
    subject,
    courseStatus,
    page,
    limit,
  }) => {
  let params = {};

  if (role === "ADMIN") {
    params.status = "TO_REVIEW";
  }

  // Add params only if they have values
  if (title) params.title = title;
  if (teacherClass) params.teacherClass = teacherClass;
  if (subject) params.subject = subject;
  if (courseStatus) params.status = courseStatus;
  if (page !== undefined) params.page = page + 1;
  if (limit !== undefined) params.limit = limit;

  return params;
};

// API call function
const fetchCourses = async (token, queryOptions) => {
  const params = buildQueryParams(queryOptions);

  const response = await apiClient.get("/course/admin", {
    headers: { Authorization: `Bearer ${token}` },
    params,
  });

  return response.data; // Ensure response has the expected structure
};

// Custom hook
export function useGetAdminCourses(
  {
    token,
    title,
    teacherClass,
    subject,
    role,
    courseStatus,
    page = 0,
    limit = 100,
  }) {
  // Consolidate options for clarity and extendibility
  const queryOptions = { role, title, teacherClass, subject, courseStatus, page, limit };

  return useQuery(
    ["courses", token, queryOptions],
    () => fetchCourses(token, queryOptions),
    {
      enabled: !!token, // Only run if token exists
      refetchOnWindowFocus: true,
    },
  );
}