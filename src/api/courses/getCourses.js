import { useQuery } from "react-query";
import { apiClient } from "../apiClient";
import { getAccessToken } from "../../utils";


const token = getAccessToken();

const createGetCoursesFn = async () => {
  const response = await apiClient.get("/course/me", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;  // Ensure response has the expected structure
};

export function useGetCourses() {

  return useQuery(
    ["courses"],
    createGetCoursesFn,
    {
      enabled: !!token, // Only run if token exists
    },
  );
}


