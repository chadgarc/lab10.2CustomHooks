import { createContext, useContext, useState, type ReactNode } from 'react';
import { data as initialData } from '../data/data';

interface DataContextType {
  data: string[];
  itemsPerPage: number;
  setItemsPerPage: (count: number) => void;
  pagesSet: number[];
}

const DataContext = createContext<DataContextType | undefined>(undefined);

export function DataProvider({ children }: { children: ReactNode }) {
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

export function useDataContext() {
  const context = useContext(DataContext);
  if (!context) {
    throw new Error('useDataContext must be used within a DataProvider');
  }
  return context;
}
