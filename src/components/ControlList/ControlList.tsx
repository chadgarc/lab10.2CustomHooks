
import ShowItems from '../ShowItems/ShowItems'
import type { ControlListProps } from '../../types'
import { usePagination } from '../../hooks/usePagination'

export function ControlList({ items, itemsPerPage }: ControlListProps) {
  const pagination = usePagination(items, itemsPerPage)

  return (
    <div>
      <ShowItems itemList={pagination.currentItems} />
      {pagination.totalPages > 1 && (
        <section>
          <section className='flex justify-between mx-auto mt-10'>
            <button className='btn rounded-lg bg-gray-900' onClick={() => pagination.goToPreviousPage()}>
              Previous
            </button>
            <p>Page {pagination.currentPage} of {pagination.totalPages}</p>
            <button className='btn rounded-lg bg-gray-900' onClick={() => pagination.goToNextPage()}>
              Next
            </button>
          </section>

          <div className="join flex justify-center mt-4 flex-wrap">
            {Array.from({ length: pagination.totalPages }, (_, i) => (
              <button
                key={i + 1}
                className={`join-item btn rounded-lg ${pagination.currentPage === i + 1 ? 'bg-blue-900' : 'bg-gray-900'}`}
                onClick={() => pagination.goToPage(i + 1)}
              >
                {i + 1}
              </button>
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
