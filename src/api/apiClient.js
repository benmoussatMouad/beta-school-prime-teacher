import axios from "axios";
import { setTokens } from "utils";
import { clearTokens } from "utils";
import { getRefreshToken } from "utils";
import { getAccessToken } from "utils";
import { getEnvSafely } from "utils";


// Create Axios instance
export const apiClient = axios.create({
  baseURL: getEnvSafely("REACT_APP_API_URL"),
  headers: {
    Accept: "application/json",
  },
});

// Request Interceptor: Attach Access Token
apiClient.interceptors.request.use((config) => {
  const token = getAccessToken();
  if (token) {
    config.headers["Authorization"] = `Bearer ${token}`;
  }
  return config;
});

// Response Interceptor: Handle 401 and Refresh Tokens
apiClient.interceptors.response.use(
  (response) => response,
  async (error) => {
    const originalRequest = error.config;

    if (error.response?.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // Avoid infinite retries

      const refreshToken = getRefreshToken();

      if (refreshToken) {
        try {
          // Call refresh token endpoint
          const { data } = await axios.post(`${getEnvSafely("REACT_APP_API_URL")}/auth/refresh-tokens`, {
            refreshToken,
          });

          // Save new tokens
          setTokens(data?.access?.token, data?.refresh?.token);

          // Retry the original request with new access token
          originalRequest.headers["Authorization"] = `Bearer ${data?.access?.token}`;
          return apiClient(originalRequest);
        } catch (refreshError) {
          // Clear tokens if refresh fails and redirect to login
          clearTokens();
        }
      } else {
        // No refresh token, redirect to login
        clearTokens();
      }
    }

    return Promise.reject(error);
  }
);

// API Methods for Convenience
export const API_METHODS = {
  GET: "GET",
  POST: "POST",
  PUT: "PUT",
  PATCH: "PATCH",
  DELETE: "DELETE",
  OPTIONS: "OPTIONS",
};
