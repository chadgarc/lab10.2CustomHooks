import { ControlList } from "../ControlList/ControlList";
import { PagesSetter } from "../PagesSetter/PagesSetter";
import { useDataContext } from "../../context/DataContext";

export function PaginationDemo() {
  const { data, itemsPerPage } = useDataContext();

  return (
    <div className="w-130 mx-auto mt-5">
      <h2>Pagination Demo</h2>
      <section className="flex justify-between items-center my-5">
        <PagesSetter />
        <p>Total Items: {data.length}</p>
      </section>
      <ControlList items={data} itemsPerPage={itemsPerPage} />
    </div>
  );
}