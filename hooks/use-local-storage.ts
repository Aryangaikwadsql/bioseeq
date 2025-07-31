"use client"

import { useState, useEffect } from "react"

type SetValue<T> = (value: T | ((val: T) => T)) => void

export function useLocalStorage<T>(key: string, initialValue: T): [T, SetValue<T>] {
  // State to store our value
  // Pass initial state function to useState so logic is only executed once
  const [storedValue, setStoredValue] = useState<T>(() => {
    if (typeof window === "undefined") {
      return initialValue
    }
    try {
      // Get from local storage by key
      const item = window.localStorage.getItem(key)
      // Parse stored json or if none return initialValue
      return item ? JSON.parse(item) : initialValue
    } catch (error) {
      // If error also return initialValue
      console.error(error)
      return initialValue
    }
  })

  // useEffect to update local storage when the state changes
  useEffect(() => {
    if (typeof window !== "undefined") {
      try {
        // Clear localStorage key on load to prevent quota exceeded errors
        window.localStorage.removeItem(key);

        // Limit localStorage size by keeping only the last 5 entries if storedValue is an array
        let valueToStore = storedValue;
        if (Array.isArray(storedValue) && storedValue.length > 5) {
          valueToStore = storedValue.slice(storedValue.length - 5);
        }
        window.localStorage.setItem(key, JSON.stringify(valueToStore))
      } catch (error) {
        console.error(error)
      }
    }
  }, [key, storedValue])

  return [storedValue, setStoredValue]
}
