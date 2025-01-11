import { useQuery } from "react-query";
import { apiClient } from "../apiClient";


const fetchStats = async (token) => {
    const response = await apiClient.get("/teacher/stats", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;
};

export function useStats(token) {
    return useQuery(
        ["stats", token], // Add a stats key to teacherQueryKeys
        () => fetchStats(token),
        {
            enabled: !!token,
        }
    );
}
