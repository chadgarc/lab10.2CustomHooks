import type { ShowItemsProps } from "../../types";

function ShowItems({
  itemList
}: ShowItemsProps) {
  const items = itemList.map((item, index) => {
    return (
      <div key={index}>{item}</div>
    );
  });

  return (
    <div className="text-start min-h-115">{items}</div>
  );
}

export default ShowItems;