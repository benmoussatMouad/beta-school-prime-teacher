import { useQuery } from "react-query";
import { apiClient } from "../apiClient";


const createGetCourseIconsFn = async () => {
    const response = await apiClient.get(`/assets/default/icons`);
    return response.data;  // Ensure response has the expected structure
};

export function useGetCourseIcons() {
    return useQuery(
        "courseIcons",
        () => createGetCourseIconsFn(),
        {
            refetchOnWindowFocus: true,
        },
    );
}


