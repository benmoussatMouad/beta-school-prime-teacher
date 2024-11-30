import { useMutation } from "react-query";
import { showSnackBar, useVisionUIController } from "../../context";
import { apiClient } from "../apiClient";
import { useHistory } from "react-router-dom";

const createSendVerifyEmailFn = async () => {
    const response = await apiClient.post("/auth/send-verification-email");
    return response.data;
};

export function useSendVerifyEmail() {
    const [, dispatch] = useVisionUIController(); // Get dispatch from context
    const history = useHistory();

    return useMutation({
        mutationFn: createSendVerifyEmailFn,
        onSuccess: (data) => {
            showSnackBar(dispatch, data.message || "Check your email for verification instructions.", "success");
        },
        onError: (err, credentials, context) => {
            // Trigger error Snackbar
            showSnackBar(dispatch, err.response?.data?.message || "An error occurred!", "error");
        },
    });
}

