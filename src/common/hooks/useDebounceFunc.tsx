import { useEffect, useState } from "react";

export function useDebounceFunc<T extends (...args: any[]) => void>(
  func: T,
  wait: number
) {
  const [args, setArgs] = useState<Parameters<T> | null>(null);

  useEffect(() => {
    if (args) {
      const timeout = setTimeout(() => {
        func(...args);
      }, wait);

      return () => {
        clearTimeout(timeout);
      };
    }
  }, [args]);

  return (...newArgs: Parameters<T>) => {
    setArgs(newArgs);
  };
}
