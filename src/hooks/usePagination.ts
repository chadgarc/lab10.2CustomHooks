import { useState, useCallback, useEffect } from 'react';
import type { UsePaginationReturn } from '../types';

/**
 * Custom Hook: usePagination
 * 
 * @description
 * Encapsulates client-side pagination logic. Calculates page counts, navigation limits,
 * and slice indices for rendering chunks of a dataset.
 * 
 * Dependencies & Internal State:
 * - `useState(currentPage)`: Tracks the active page index.
 * - `useEffect([totalPages, currentPage])`: Bounds checking side-effect. If the data set shrinks
 *   or itemsPerPage increases, it automatically clamps `currentPage` to the new `totalPages`.
 * - `useCallback([totalPages])`: Memoizes `setPage`, `nextPage`, and `prevPage` handlers
 *   to avoid creating new function references on every render.
 * 
 * Affected Components:
 * - Direct consumer: `ControlList` (uses `startIndex`, `endIndex`, and control flags to slice data
 *   and enable/disable pagination buttons).
 * 
 * @param {number} totalItems - Total count of items to be paginated (e.g. 144).
 * @param {number} [itemsPerPage=10] - Number of items displayed per page.
 * @param {number} [initialPage=1] - Starting page on first mount.
 * @returns {UsePaginationReturn} Object with pagination state, computed indices, and navigation functions.
 */
export function usePagination(
  totalItems: number,
  itemsPerPage: number = 10,
  initialPage: number = 1
): UsePaginationReturn {
  // Calculate total pages (at least 1 page or 0 if 0 items)
  const totalPages = Math.max(0, Math.ceil(totalItems / itemsPerPage));

  // Initialize and clamp initial page
  const [currentPage, setCurrentPage] = useState<number>(() => {
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

  // Calculate 0-based indices for array slicing
  const startIndex = totalItems === 0 ? 0 : (safeCurrentPage - 1) * itemsPerPage;
  const endIndex = totalItems === 0 ? 0 : Math.min(startIndex + itemsPerPage - 1, totalItems - 1);

  // Actual number of items on current page (useful for the last page)
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

  // Navigate to the next page
  const nextPage = useCallback(() => {
    setCurrentPage(prev => Math.min(totalPages, prev + 1));
  }, [totalPages]);

  // Navigate to the previous page
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