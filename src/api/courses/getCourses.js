import { useQuery } from "react-query";
import { apiClient } from "../apiClient";


const createGetCoursesFn = async (token, title, teacherClass, subject, page, limit) => {

  const params = {};

  // Conditionally add query params if they have values
  if (title) params.title = title;
  if (teacherClass) params.teacherClass = teacherClass;
  if (subject) params.subject = subject;
  if (page) params.page = page + 1;
  if (limit) params.limit = limit;


  const response = await apiClient.get("/course/me", {
    headers: { Authorization: `Bearer ${token}` },
    params: params,
  });

  return response.data;  // Ensure response has the expected structure
};

export function useGetCourses(token, title, teacherClass, subject, page = 0, limit = 100) {

  return useQuery(
    ["courses", token, title, teacherClass, subject, page, limit],
    () => createGetCoursesFn(token, title, teacherClass, subject, page, limit),
    {
      enabled: !!token, // Only run if token exists
      refetchOnWindowFocus: true,
    },
  );
}


