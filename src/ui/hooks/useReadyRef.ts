import { useRef, useState, useLayoutEffect } from "react";

export function useReadyRef<T extends HTMLElement>() {
  const ref = useRef<T>(null);
  const [ready, setReady] = useState(false);

  useLayoutEffect(() => {
    if (ref.current) setReady(true);
  }, []);

  return [ref, ready] as const;
}