import { useQuery } from "react-query";
import { showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";

const createVerifyEmailFn = async (token) => {
    const response = await apiClient.get(`/auth/verify-email?token=${token}`);
    return response.data;
};

export function useVerifyEmail({ token }) {
    const [, dispatch] = useVisionUIController(); // Get dispatch from context    

    return useQuery(
        ["verifyEmail", token],
        () => createVerifyEmailFn(token),
        {
            enabled: !!token, // Only run if token exists
            onSuccess: (response) => {
                showSnackBar(dispatch, "Your email was successfully verified!", "success");
            },
        }
    );
}

