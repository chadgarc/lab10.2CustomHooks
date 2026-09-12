import { useDataContext } from "../../context/DataContext";

/**
 * PagesSetter Component
 * 
 * @description
 * Renders a dropdown selector allowing the user to change how many items
 * are shown per page across the pagination view.
 * 
 * Context Connection:
 * - Reads `itemsPerPage` and `pagesSet` from `DataContext`.
 * - Calls `setItemsPerPage` to update global context state when selection changes.
 * 
 * Affected Components:
 * - Updates `itemsPerPage` inside `DataContext`.
 * - Consequently re-renders `PaginationDemo` and `ControlList`, which re-calculates
 *   pagination bounds and slice ranges in `usePagination`.
 */
export function PagesSetter() {
    const { itemsPerPage, setItemsPerPage, pagesSet } = useDataContext();

    return (
        <section className="flex gap-5 items-center">
        <p>Items per page:</p>
        <select
            value={itemsPerPage}
            className="select w-20"
            onChange={(e) => setItemsPerPage(Number(e.target.value))}
        >
            {pagesSet.map((page) => (
            <option key={page} value={page}>
                {page}
            </option>
            ))}
        </select>
        </section>
    );
}