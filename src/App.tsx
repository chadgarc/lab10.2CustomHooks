import { useState } from 'react'
import ControlList from './components/ControlList/ControlList'
import { data } from './data/data'
import { PagesSetter } from './components/PagesSetter/PagesSetter';

function App() {
  const pagesSet: number[] = [5,10,15,20];
  const [items, setItems] = useState<string[]>([]);
  setItems(data)
  const [itemsPerPage, setItemsPerPage] = useState<number>(pagesSet[3])


  const handlePagesChange = (value: string) => {
    setItemsPerPage(Number(value))
  }

  return (
    <div className='w-130 mx-auto mt-5'>
      <h2>Pagination Demo</h2>
      <section className='flex justify-between items-center my-5'>
        <PagesSetter onChange={handlePagesChange}/>
        <p>Total Items: {items.length}</p>
      </section>
      <ControlList items={items} itemsPerPage={itemsPerPage} />
    </div>
  )
}

export default App
