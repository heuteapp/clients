export const withAccessToken = async (accessToken: string, fn: () => Promise<void> | void) => {
    if (typeof window === "undefined" || !accessToken) return;
    localStorage.setItem("temp_accessToken", accessToken);

    try {
        await fn();
    } finally {
        localStorage.removeItem("temp_accessToken");
    }
};