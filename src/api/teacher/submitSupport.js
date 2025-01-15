import { useMutation } from "react-query";
import { apiClient } from "../index";
import { showSnackBar, useVisionUIController } from "../../context";
import { useTranslation } from "react-i18next";

const submitSupportFn = async (formData) => {
    const response = await apiClient.post("/users/support", formData);
    return response.data;
};

export function useSubmitSupport() {
    const [, dispatch] = useVisionUIController();
    const { t } = useTranslation();

    return useMutation({
        mutationFn: submitSupportFn,
        onSuccess: () => {
            showSnackBar(dispatch, t("snackbar.supportSubmitted"), "success");
        },
        onError: (err) => {
            const errorMessage =
                err.response?.data?.message || "An unexpected error occurred.";
            showSnackBar(dispatch, errorMessage, "error");
            return err.response?.data;
        },
    });
}