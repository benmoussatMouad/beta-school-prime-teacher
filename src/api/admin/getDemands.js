import { useQuery } from "react-query";
import { apiClient } from "../apiClient";


const createGetDemandsFn = async (token) => {
  const response = await apiClient.get("/teacher?status=IN_PROGRESS", {
    headers: { Authorization: `Bearer ${token}` },
  });
  return response.data;  // Ensure response has the expected structure
};

export function useGetDemands(token) {

  return useQuery(
    ["demands", token],
    () => createGetDemandsFn(token),
    {
      enabled: !!token, // Only run if token exists
      refetchOnWindowFocus: true,
    },
  );
}
