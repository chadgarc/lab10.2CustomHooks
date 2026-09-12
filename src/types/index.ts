
export interface ShowItemsProps {
    itemList: string[];
}

export interface ShowItemsProps {
    itemList: string[];
}

export interface ControlListProps {
    items: string[];
    itemsPerPage: number;
}

export interface PagesSetterProps {
    onChange: (value: string) => void;
}

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