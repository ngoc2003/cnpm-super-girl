import { useEffect, useState } from 'react';

// eslint-disable-next-line import/prefer-default-export
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
