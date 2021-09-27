import React, { useMemo } from "react";
import ItemCard from "components/ItemCard";

type props = {
  items: {
    id: string;
    text: string;
    checked: boolean;
  }[];
};

const ItemListInner = ({ items }: props) => {
  const itemsMemo = useMemo(() => items, [items]);

  return (
    <>
      {itemsMemo.map((item, index) => {
        return <ItemCard key={item.id} item={item} index={index}></ItemCard>;
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

export default React.memo(ItemListInner, areEqual);
