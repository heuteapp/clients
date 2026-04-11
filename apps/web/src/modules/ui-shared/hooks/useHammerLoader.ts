import { useState, useEffect } from "react";

export function useHammerLoader() {
  const [Hammer, setHammer] = useState<HammerStatic | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    import("hammerjs")
      .then((module) => {
        setHammer(() => module.default);
        setLoading(false);
      })
      .catch((err) => {
        setError(err);
        setLoading(false);
      });
  }, []);

  return { Hammer, loading, error };
}