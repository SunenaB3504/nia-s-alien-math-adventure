import { useState, useEffect, Dispatch, SetStateAction } from 'react';

function getStorageValue<T>(key: string, defaultValue: T): T {
  try {
    if (typeof window === 'undefined' || !window.localStorage) {
      return defaultValue;
    }
    const saved = window.localStorage.getItem(key);
    if (saved) {
      return JSON.parse(saved) as T;
    }
  } catch (error) {
    console.error(`Error parsing localStorage key "${key}":`, error);
    return defaultValue;
  }
  return defaultValue;
}

// FIX: The `React` namespace was not available for type annotations. Imported `Dispatch` and `SetStateAction` directly and updated the function signature to use them, resolving the type error.
export function useLocalStorage<T>(key: string, defaultValue: T): [T, Dispatch<SetStateAction<T>>] {
  const [value, setValue] = useState<T>(() => {
    return getStorageValue(key, defaultValue);
  });

  useEffect(() => {
    try {
      if (typeof window === 'undefined' || !window.localStorage) return;
      window.localStorage.setItem(key, JSON.stringify(value));
    } catch (error) {
      console.error(`Error setting localStorage key "${key}":`, error);
    }
  }, [key, value]);

  return [value, setValue];
}