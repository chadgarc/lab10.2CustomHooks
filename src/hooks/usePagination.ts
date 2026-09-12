import { useState, useCallback, useEffect } from 'react';
import type { UsePaginationReturn } from '../types';

export function usePagination(
  totalItems: number,
  itemsPerPage: number = 10,
  initialPage: number = 1
): UsePaginationReturn {
  // Calculate total pages (at least 1 page or 0 if 0 items)
  const totalPages = Math.max(0, Math.ceil(totalItems / itemsPerPage));

  // Initialize and clamp initial page
  const [currentPage, setCurrentPage] = useState(() => {
    if (totalPages === 0) return 1;
    return Math.min(Math.max(1, initialPage), totalPages);
  });

  // Adjust currentPage if totalPages changes (e.g. itemsPerPage or totalItems change)
  useEffect(() => {
    if (totalPages > 0 && currentPage > totalPages) {
      setCurrentPage(totalPages);
    } else if (totalPages > 0 && currentPage < 1) {
      setCurrentPage(1);
    }
  }, [totalPages, currentPage]);

  const safeCurrentPage = totalPages === 0 ? 1 : Math.min(Math.max(1, currentPage), totalPages);

  // Calculate 0-based indices
  const startIndex = totalItems === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = totalItems === 0 ? 0 : Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  // Actual number of items on current page
  const itemsOnCurrentPage = totalItems === 0 ? 0 : endIndex - startIndex + 1;

  // Jump to specific page
  const setPage = useCallback((pageNumber: number) => {
    if (totalPages === 0) {
      setCurrentPage(1);
      return;
    }
    const clampedPage = Math.min(Math.max(1, pageNumber), totalPages);
    setCurrentPage(clampedPage);
  }, [totalPages]);

  // Next page
  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  // Previous page
  const prevPage = useCallback(() => {
    setCurrentPage(prev => Math.max(1, prev - 1));
  }, []);

  const canNextPage = safeCurrentPage < totalPages;
  const canPrevPage = safeCurrentPage > 1;

  return {
    currentPage: safeCurrentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  };
}