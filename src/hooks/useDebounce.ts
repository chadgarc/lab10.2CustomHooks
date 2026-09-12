import { useState, useEffect } from 'react';

/**
 * Custom Hook: useDebounce
 * 
 * @description
 * Delays updating a value until a specified duration (delay) has elapsed since the last time
 * the value was modified. Prevents rapid, continuous re-calculations, DOM thrashing, or redundant API calls.
 * 
 * Dependencies & Internal State:
 * - `useState(debouncedValue)`: Holds the settled value emitted after the timer completes.
 * - `useEffect([value, delay])`:
 *    - Starts a `setTimeout` timer whenever `value` or `delay` changes.
 *    - Cleanup function: Calls `clearTimeout(timer)`. If the user types another character before
 *      `delay` milliseconds pass, React executes this cleanup first, cancelling the previous timer.
 * 
 * Affected Components:
 * - Direct consumer: `DebounceDemo` (uses this debounced value to trigger the simulated API
 *   search and filter the list of phones).
 * 
 * @template T - The generic type of the value being debounced (e.g., string, number, object).
 * @param {T} value - The rapidly changing value (e.g. text from an input).
 * @param {number} [delay=500] - Delay in milliseconds to wait before updating debouncedValue.
 * @returns {T} The debounced value.
 */
export function useDebounce<T>(value: T, delay: number = 500): T {
  const [debouncedValue, setDebouncedValue] = useState<T>(value);

  useEffect(() => {
    // Schedule state update after the delay
    const timer = setTimeout(() => {
      setDebouncedValue(value);
    }, delay);

    // Cleanup phase: clears previous timer if value or delay changes before timeout expires
    return () => clearTimeout(timer);
  }, [value, delay]);

  return debouncedValue;
}
