import React from "react";
import styled from "styled-components";
import { Droppable, Draggable } from "react-beautiful-dnd";
import ItemCard from "components/ItemCard";

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
};

const Container = styled.div`
  margin: 1rem;
  padding: 1rem;
  border-radius: 5px;
  background-color: lightgrey;
  flex: 1;
`;

const Title = styled.h3`
padding: 1rem:;
`;

const ItemList = styled.div`
  padding: 1rem;
`;

export default function Column({ items, column, index }: props) {
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
            <Droppable droppableId={column.id}>
              {(provided: any) => (
                <ItemList
                  ref={provided.innerRef}
                  {...provided.droppableProps}
                  isDraggingOver={snapshot.isDraggingOver}
                >
                  {items.map((item, index) => {
                    return (
                      <ItemCard
                        key={item.id}
                        item={item}
                        index={index}
                      ></ItemCard>
                    );
                  })}
                  {provided.placeholder}
                </ItemList>
              )}
            </Droppable>
          </Container>
        );
      }}
    </Draggable>
  );
}
