import { useState, useCallback } from 'react';

export function usePagination(items: string[], itemsPerPage: number) {
  const [currentPage, setCurrentPage] = useState(1);

  // Calculate total of pages
  const totalPages = Math.max(0, Math.ceil(items.length / itemsPerPage));
  
  // Fixign currentPage is not greater tha totalPages when changing elements per page
  const safeCurrentPage = Math.min(currentPage, totalPages);
  
  // Adjust currentPage if necessary (e.g., when itemsPerPage changes)
  if (currentPage > totalPages && totalPages > 0) {
    setCurrentPage(totalPages);
  }

  // Calculate the indices for the current items being displayed
  const startIndex = Math.max(0, (safeCurrentPage - 1) * itemsPerPage);
  const endIndex = startIndex + itemsPerPage;
  const currentItems = items.slice(startIndex, endIndex);

  // set previous page
  const goToPreviousPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  // Set next page
  const goToNextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  // set any page
  const goToPage = useCallback((page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    } else if (totalPages === 0) {
      setCurrentPage(1); // Si no hay items, ir a la página 1
    }
  }, [totalPages]);

  return {
    currentPage: safeCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    currentItems,
    goToPreviousPage,
    goToNextPage,
    goToPage,
  };
}