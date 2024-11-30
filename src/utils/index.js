export function getEnvSafely(envKey, defaultValue) {
    const value = process.env[envKey];

    if (value === undefined) {
        if (defaultValue !== undefined) {
            return defaultValue; // Use the provided default value
        }

        throw new Error(`Missing required environment variable: ${envKey}`);
    }

    return value;
}

export const Subjects = [
    "MATHEMATICS",
    "SCIENCE",
    "PHYSICS",
    "HISTORY_GEOGRAPHY",
    "ISLAMIC_STUDIES",
    "ARABIC",
    "FRENCH",
    "ENGLISH"
]

export const getToken = () => {
    try {
        // Retrieve the token from localStorage
        const token = localStorage.getItem("refresh_Token");

        // Optionally, add validation logic if needed
        if (token) {
            return token;
        }

        return null;
    } catch (error) {
        return null; // Return null in case of an error
    }
};


// Utility functions for token management
export const getAccessToken = () => localStorage.getItem("access_token");
export const getRefreshToken = () => localStorage.getItem("refresh_token");
export const setTokens = (accessToken, refreshToken) => {
    localStorage.setItem("access_token", accessToken);
    localStorage.setItem("refresh_token", refreshToken);
};
export const clearTokens = () => {
    localStorage.removeItem("access_token");
    localStorage.removeItem("refresh_token");
};
