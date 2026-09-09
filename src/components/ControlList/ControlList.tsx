import { useState } from 'react'
import ShowItems from '../ShowItems/ShowItems'
import type { ControlListProps } from '../../types'

function ControlList({ items, itemsPerPage }: ControlListProps) {
  const [currentPage, setCurrentPage] = useState(1)

  const totalPages = Math.ceil(items.length / itemsPerPage)
  const startIndex = (currentPage - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  const currentItems = items.slice(startIndex, endIndex)

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page)
    }
  }

  return (
    <div>
      <ShowItems itemList={currentItems} />
      {totalPages > 1 && (
        <section>
              <section className='flex justify-between mx-auto mt-10'>
                <button className='btn rounded-lg bg-gray-900' onClick={() => handlePageChange(currentPage - 1)}>
                  Previous
                </button>
                <p>Page {currentPage} of {totalPages}</p>
                <button className='btn rounded-lg bg-gray-900' onClick={() => handlePageChange(currentPage + 1)}>
                  Next
                </button>
              </section>

            <div className="join flex justify-center mt-4 flex-wrap">
              {Array.from({ length: totalPages }, (_, i) => (
                <button
                  key={i + 1}
                  className={`join-item btn rounded-lg ${currentPage === i + 1 ? 'bg-blue-900' : 'bg-gray-900'}`}
                  onClick={() => handlePageChange(i + 1)}
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

export default ControlList
