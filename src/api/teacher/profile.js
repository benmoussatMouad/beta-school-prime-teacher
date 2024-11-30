import { useQuery } from "react-query";
import { apiClient } from "../apiClient";
import { teacherQueryKeys } from ".";


const createProfileFn = async (token) => {
    const response = await apiClient.get("/teacher/me", {
        headers: { Authorization: `Bearer ${token}` },
    });
    return response.data;  // Ensure response has the expected structure
};

export function useProfile(token) {

    return useQuery(
        [teacherQueryKeys.all, token],
        () => createProfileFn(token),
        {
            enabled: !!token, // Only run if token exists
        }
    );
}


