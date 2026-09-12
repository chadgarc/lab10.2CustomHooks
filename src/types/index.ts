import type { ReactNode } from 'react';

/**
 * Props for ShowItems component
 */
export interface ShowItemsProps {
    itemList: string[];
}

/**
 * Props for ControlList component
 */
export interface ControlListProps {
    items: string[];
    itemsPerPage: number;
}

/**
 * Return type definition for the usePagination custom hook
 */
export interface UsePaginationReturn {
    currentPage: number;
    totalPages: number;
    startIndex: number;
    endIndex: number;
    itemsOnCurrentPage: number;
    setPage: (pageNumber: number) => void;
    nextPage: () => void;
    prevPage: () => void;
    canNextPage: boolean;
    canPrevPage: boolean;
}

/**
 * Data and actions provided by DataContext
 */
export interface DataContextType {
    data: string[];
    itemsPerPage: number;
    setItemsPerPage: (count: number) => void;
    pagesSet: number[];
}

/**
 * Props for DataProvider component
 */
export interface DataProviderProps {
    children: ReactNode;
}