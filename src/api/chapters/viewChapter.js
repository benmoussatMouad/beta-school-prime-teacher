import { useQuery } from "react-query";
import { apiClient } from "../index";


const viewChapterFn = async (chapterId) => {
  const response = await apiClient.get(`/chapter/view/${chapterId}`);
  return response.data;
};

export function useViewChapter(token, chapterId) {
  return useQuery(
    ["viewChapter", chapterId],
    () => viewChapterFn(chapterId),
    {
      enabled: !!token && !!chapterId, // Only run if token exists
    },
  );
}