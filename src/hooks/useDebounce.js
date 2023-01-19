import { useEffect, useState } from 'react';

export const useDebounce = (initial = '', delay = 800) => {
  const [debounceValue, setDebounceValue] = useState(initial);
  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounceValue(initial);
    }, delay);
    return () => {
      clearTimeout(timer);
    };
  }, [delay, initial]);

  return debounceValue;
};
