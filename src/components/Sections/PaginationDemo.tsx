import { ControlList } from "../ControlList/ControlList";
import { PagesSetter } from "../PagesSetter/PagesSetter";
import { useDataContext } from "../../context/DataContext";

/**
 * PaginationDemo Section Component
 * 
 * @description
 * Main view for the pagination laboratory showcase.
 * Integrates `PagesSetter` for page size configuration and `ControlList`
 * for item listing and page navigation.
 * 
 * Context Connection:
 * - Reads `data` (all 144 phones) and `itemsPerPage` from `DataContext`.
 * 
 * Affected Components:
 * - Passes `data` and `itemsPerPage` down to `ControlList`.
 */
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