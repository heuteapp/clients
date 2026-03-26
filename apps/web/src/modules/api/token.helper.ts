export const withAccessToken = async <T = any>(
    accessToken: string,
    fn: () => Promise<T> | T
): Promise<T | undefined> => {
    if (typeof window === "undefined" || !accessToken) return undefined;

    localStorage.setItem("temp_accessToken", accessToken);

    try {
        return await fn();
    } finally {
        localStorage.removeItem("temp_accessToken");
    }
};