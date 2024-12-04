import { useQuery } from "react-query";
import { apiClient } from "../apiClient";


const createGetTeachersFn = async (
  token,
  firstName = "",
  lastName = "",
  email = "",
  subject = "",
  page = 0,
  limit = 10,
) => {
  const params = {};

  // Conditionally add query params if they have values
  if (firstName) params.firstName = firstName;
  if (lastName) params.lastName = lastName;
  if (email) params.email = email;
  if (subject) params.subject = subject;
  if (page) params.page = page;
  if (limit) params.limit = limit;


  const response = await apiClient.get("/teacher", {
    headers: { Authorization: `Bearer ${token}` },
    params: params, // Send only the parameters that exist
  });

  return response.data;  // Ensure response has the expected structure
};

export function useGetTeachers(token, firstName, lastName, email, subject, page = 1, limit = 10) {
  return useQuery(
    ["teachers", token, firstName, lastName, email, subject, page, limit], // Include sortConfig in the query key
    () => createGetTeachersFn(token, firstName, lastName, email, subject, page, limit), // Pass sortConfig to the function
    {
      enabled: !!token, // Only run if token exists
      refetchOnWindowFocus: true,
    },
  );
}
