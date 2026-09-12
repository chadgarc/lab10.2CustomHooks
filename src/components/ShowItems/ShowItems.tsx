import type { ShowItemsProps } from "../../types";

/**
 * ShowItems Component
 * 
 * @description
 * Pure presentation component responsible for rendering the numbered list
 * of elements passed to it.
 * 
 * Dependencies & Props:
 * - `itemList`: Array of strings representing current page's slice of data.
 * - Affected by: `ControlList`, which provides the current page elements slice.
 * 
 * @param {ShowItemsProps} props - Component properties.
 */
function ShowItems({ itemList }: ShowItemsProps) {
  const items = itemList.map((item, index) => {
    return (
      <div key={index}>{`${index + 1}. ${item}`}</div>
    );
  });

  return (
    <div className="text-start min-h-115">{items}</div>
  );
}

export default ShowItems;