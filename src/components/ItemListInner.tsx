import React, { useMemo } from "react";
import ItemCard from "components/ItemCard";

type props = {
  items: {
    id: string;
    text: string;
    checked: boolean;
  }[];
  columnId: string;
  handleDeleteItem: (columnId: string, itemId: string) => void;
  handleEditItem: (e: any, columnId: string, itemId: string) => void;
};

const ItemListInner = ({
  items,
  columnId,
  handleDeleteItem,
  handleEditItem,
}: props) => {
  return (
    <>
      {items.map((item, index) => {
        return (
          <ItemCard
            key={item.id}
            item={item}
            index={index}
            columnId={columnId}
            handleDeleteItem={handleDeleteItem}
            handleEditItem={handleEditItem}
          ></ItemCard>
        );
      })}
    </>
  );
};

const areEqual = (prevProps: any, nextProps: any) => {
  if (prevProps.items === nextProps.items) {
    return true;
  }
  return false;
};

// export default React.memo(ItemListInner, areEqual);
export default ItemListInner;
