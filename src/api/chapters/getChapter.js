import { useQuery } from "react-query";
import { apiClient } from "../index";



const getChapterFn = async (chapterId) => {
  const response = await apiClient.get(`/chapter/${chapterId}`);
  return response.data;
};

export function useGetChapter(token, chapterId) {
  return useQuery(
    ["chapter", chapterId],
    () => getChapterFn(chapterId),
    {
      enabled: !!token && !!chapterId, // Only run if token exists
    },
  );
}