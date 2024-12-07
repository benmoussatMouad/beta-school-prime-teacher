import { useQuery } from "react-query";
import { apiClient } from "../apiClient";
import { getAccessToken } from "../../utils";


const token = getAccessToken();

const createGetCourseFn = async (courseId) => {
  const response = await apiClient.get(`/course/${courseId}`, {
    headers: { Authorization: `Bearer ${courseId}` },
  });
  return response.data;  // Ensure response has the expected structure
};

export function useGetCourse(courseId) {
  return useQuery(
    ["course", courseId],
    () => createGetCourseFn(courseId),
    {
      enabled: !!token || !!courseId, // Only run if token exists
    },
  );
}


