import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ItemListInner from "components/ItemListInner";
import AddItemButton from "components/AddItemButton";

type props = {
  items: {
    id: string;
    text: string;
    checked: boolean;
  }[];
  column: {
    id: string;
    items: string[];
  };
  index: number;
  handleAddItem: (columnId: string) => void;
  handleDeleteItem: (columnId: string, itemId: string) => void;
  handleEditItem: (e: any, columnId: string, itemId: string) => void;
};

const Container = styled.div`
  margin: 1rem;
  padding: 1rem;
  // border-radius: 5px;
  // border: 1px solid black;
  background-color: white;
  flex: 1;
`;

const Title = styled.h3`
padding: 1rem:;
`;

const ItemList = styled.div`
  padding: 1rem;
`;

export default function Column({
  items,
  column,
  index,
  handleAddItem,
  handleDeleteItem,
  handleEditItem,
}: props) {
  return (
    <Draggable draggableId={column.id} index={index}>
      {(provided: any, snapshot: any) => {
        return (
          <Container
            {...provided.draggableProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
          >
            <Title {...provided.dragHandleProps}>List {column.id}</Title>
            <Droppable droppableId={column.id} type="item">
              {(provided: any) => (
                <ItemList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  <ItemListInner
                    columnId={column.id}
                    items={items}
                    handleDeleteItem={handleDeleteItem}
                    handleEditItem={handleEditItem}
                  />
                  {provided.placeholder}
                </ItemList>
              )}
            </Droppable>
            <AddItemButton columnId={column.id} handleAddItem={handleAddItem} />
          </Container>
        );
      }}
    </Draggable>
  );
}
