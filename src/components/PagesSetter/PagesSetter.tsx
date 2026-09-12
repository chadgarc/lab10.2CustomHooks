import { useDataContext } from "../../context/DataContext";

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