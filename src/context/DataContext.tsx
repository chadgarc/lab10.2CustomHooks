import { createContext, useContext, useState } from 'react';
import { data as initialData } from '../data/data';
import type { DataContextType, DataProviderProps } from '../types';

/**
 * React Context created to share smartphone dataset and pagination settings globally.
 * Avoids prop-drilling across PaginationDemo, PagesSetter, and DebounceDemo.
 */
const DataContext = createContext<DataContextType | undefined>(undefined);

/**
 * DataProvider Component
 * 
 * @description
 * Wraps the application root (`App.tsx`) to provide global access to:
 * - `data`: The list of 144 smartphones.
 * - `itemsPerPage` / `setItemsPerPage`: Shared pagination sizing.
 * - `pagesSet`: Preset options for items-per-page dropdowns.
 * 
 * Dependencies & Effects:
 * - State: `data` (initialized from initialData) and `itemsPerPage` (default: 20).
 * - Affected Components: Any child component calling `useDataContext()` (e.g. `PagesSetter`, `PaginationDemo`, `DebounceDemo`).
 * 
 * @param {DataProviderProps} props - Children elements wrapped by this provider.
 */
export function DataProvider({ children }: DataProviderProps) {
  const pagesSet: number[] = [5, 10, 15, 20];
  const [data] = useState<string[]>(initialData);
  const [itemsPerPage, setItemsPerPage] = useState<number>(pagesSet[3]); // default 20

  return (
    <DataContext.Provider
      value={{
        data,
        itemsPerPage,
        setItemsPerPage,
        pagesSet,
      }}
    >
      {children}
    </DataContext.Provider>
  );
}

/**
 * Custom hook to consume DataContext safely.
 * 
 * @throws {Error} If called outside of a `<DataProvider>` tree.
 * @returns {DataContextType} The shared context values and updater functions.
 */
export function useDataContext(): DataContextType {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
}
