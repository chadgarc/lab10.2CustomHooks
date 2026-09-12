import ShowItems from '../ShowItems/ShowItems'
import type { ControlListProps } from '../../types'
import { usePagination } from '../../hooks/usePagination'

/**
 * ControlList Component
 * 
 * @description
 * Serves as the interactive controller for pagination. Consumes `usePagination`
 * to manage active page, slice navigation, and page buttons.
 * 
 * Dependencies & Hooks:
 * - Hook: `usePagination(items.length, itemsPerPage)`
 *   - Receives total items count and batch size.
 *   - Calculates `startIndex` and `endIndex` to slice the `items` array.
 *   - Provides `canPrevPage` / `canNextPage` to disable buttons at boundaries.
 * 
 * Affected Components:
 * - Child component: `ShowItems` (receives sliced `currentItems`).
 * 
 * @param {ControlListProps} props - Items array and itemsPerPage configuration.
 */
export function ControlList({ items, itemsPerPage }: ControlListProps) {
  const {
    currentPage,
    totalPages,
    startIndex,
    endIndex,
    itemsOnCurrentPage,
    setPage,
    nextPage,
    prevPage,
    canNextPage,
    canPrevPage,
  } = usePagination(items.length, itemsPerPage)

  // Extract current slice using the 0-based indices from usePagination
  const currentItems = items.slice(startIndex, endIndex + 1)

  return (
    <div>
      <ShowItems itemList={currentItems} />

      <section className="mt-6">
        <section className="flex justify-between items-center mx-auto">
          <button
            className="btn rounded-lg bg-gray-900 disabled:opacity-40"
            onClick={prevPage}
            disabled={!canPrevPage}
          >
            Previous
          </button>
          <p>
            Page {currentPage} of {totalPages}
          </p>
          <button
            className="btn rounded-lg bg-gray-900 disabled:opacity-40"
            onClick={nextPage}
            disabled={!canNextPage}
          >
            Next
          </button>
        </section>

        {totalPages > 0 && (
          <p className="text-center my-3 text-sm text-gray-400">
            Showing items {startIndex + 1} - {endIndex + 1} (Total on this page: {itemsOnCurrentPage})
          </p>
        )}

        {totalPages > 1 && (
          <div className="join flex justify-center mt-4 flex-wrap gap-1">
            {Array.from({ length: totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`join-item btn rounded-lg ${currentPage === i + 1 ? 'bg-blue-900' : 'bg-gray-900'}`}
                onClick={() => setPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        )}
      </section>
    </div>
  )
}
