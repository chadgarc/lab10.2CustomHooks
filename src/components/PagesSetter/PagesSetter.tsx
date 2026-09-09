import type { PagesSetterProps } from "../../types";

export function PagesSetter({onChange}:PagesSetterProps){

    const pagesSet: number[] = [5,10,15,20];

    return(
        <>
            <section className="flex gap-5 items-center">
                <p>Items per page:</p>
                <select defaultValue={pagesSet[0]} className="select w-15"
                onChange={(e) => {
                    const selected = pagesSet.find(option => `${option}` === e.target.value);
                    if(selected) onChange(`${selected}`)
                }}>
                    {pagesSet.map(page => <option value={page}>{page}</option>)}
                </select>
            </section>
        </>
    )
}