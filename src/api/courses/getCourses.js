import { useQuery } from "react-query";
import { apiClient } from "../apiClient";


const createGetCoursesFn = async (token) => {
  const response = await apiClient.get("/course/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;  // Ensure response has the expected structure
};

export function useGetCourses(token) {

  return useQuery(
    ["courses"],
    () => createGetCoursesFn(token),
    {
      enabled: !!token, // Only run if token exists
      refetchOnWindowFocus: true,
    },
  );
}


