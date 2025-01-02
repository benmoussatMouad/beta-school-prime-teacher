import { useQuery } from "react-query";
import { apiClient } from "../apiClient";

// Function to fetch a student by ID
const fetchStudentById = async (id, token) => {
  if (!id || !token) {
    throw new Error("Student ID and token are required");
  }

  const response = await apiClient.get(`/student/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};

// Custom hook to get a student by ID
export function useGetStudentById(id, token) {
  return useQuery(
    ["getStudentById", id], // Query key
    () => fetchStudentById(id, token), // Fetch function
    {
      enabled: !!id && !!token, // Fetch only when ID and token are available
      refetchOnWindowFocus: false, // Avoid refetching unnecessarily
    },
  );
}