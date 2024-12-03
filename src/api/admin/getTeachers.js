import { useQuery } from "react-query";
import { apiClient } from "../apiClient";


const createGetTeachersFn = async (token) => {
  const response = await apiClient.get("/teacher", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;  // Ensure response has the expected structure
};

export function useGetTeachers(token) {

  return useQuery(
    ["Teachers", token],
    () => createGetTeachersFn(token),
    {
      enabled: !!token, // Only run if token exists
      refetchOnWindowFocus: true,
    },
  );
}
