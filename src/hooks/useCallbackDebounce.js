import { useRef } from 'react';

const useCallbackDebounce = (callback, debounceTime) => {
  const timer = useRef(null);

  const debounce = (...args) => {
    if (timer.current) {
      clearTimeout(timer.current);
    }
    timer.current = setTimeout(() => callback(...args), debounceTime || 500);
  };

  return debounce;
};

export default useCallbackDebounce;
