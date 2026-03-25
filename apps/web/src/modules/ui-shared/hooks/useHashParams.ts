import { useState, useEffect } from "react";

export function useHashParams() : Record<string, string> {
  const [hashParams, setHashParams] = useState({});

  useEffect(() => {
    const parseHash = () => {
      const hash = window.location.hash;
      if (!hash || hash === "#") {
        setHashParams({});
        return;
      }

      const params = Object.fromEntries(
        hash
          .substring(1)
          .split("&")
          .map((part) => {
            const [key, value = ""] = part.split("=");
            return [key, decodeURIComponent(value)];
          })
      );

      setHashParams(params);
    };

    parseHash();
    window.addEventListener("hashchange", parseHash);

    return () => {
      window.removeEventListener("hashchange", parseHash);
    };
  }, []);

  return hashParams;
}