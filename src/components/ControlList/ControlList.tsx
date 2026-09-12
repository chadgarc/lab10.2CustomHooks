import ShowItems from '../ShowItems/ShowItems'
import type { ControlListProps } from '../../types'
import { usePagination } from '../../hooks/usePagination'

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

  // Obtener los elementos de la página actual utilizando los índices del hook
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
