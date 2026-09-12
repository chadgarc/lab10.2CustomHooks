import { useState } from 'react'
import { PaginationDemo } from './components/Sections/PaginationDemo'
import { DebounceDemo } from './components/Sections/DebouceDemo'
import { DataProvider } from './context/DataContext'

function App() {
  const [activeTab, setActiveTab] = useState<'pagination' | 'debounce'>('pagination')

  return (
    <DataProvider>
      <main className="max-w-xl mx-auto my-8 px-4">
        {/* Tab selector */}
        <div className="join grid grid-cols-2 mb-6">
          <button
            className={`join-item btn ${activeTab === 'pagination' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('pagination')}
          >
            Pagination Demo
          </button>
          <button
            className={`join-item btn ${activeTab === 'debounce' ? 'btn-primary' : 'btn-outline'}`}
            onClick={() => setActiveTab('debounce')}
          >
            Debounce Demo
          </button>
        </div>

        {/* Both sections are rendered in the DOM to preserve their state */}
        <div className={activeTab === 'pagination' ? 'block' : 'hidden'}>
          <PaginationDemo />
        </div>

        <div className={activeTab === 'debounce' ? 'block' : 'hidden'}>
          <DebounceDemo />
        </div>
      </main>
    </DataProvider>
  )
}

export default App
