import React from "react";
import styled from "styled-components";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import { Draggable } from "react-beautiful-dnd";

type props = {
  item: {
    id: string;
    text: string;
    checked: boolean;
  };
  index: number;
};

const Card = styled.article`
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  border-radius: 5px;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
`;

const IconContainer = styled.div`
  display: inline-block;
`;

export default function ItemCard({ item, index }: props) {
  return (
    <Draggable draggableId={item.id} index={index}>
      {(provided: any, snapshot: any) => {
        const style = {
          cursor: "pointer",
          ...provided.draggableProps.style,
        };
        return (
          <Card
            {...provided.draggableProps}
            {...provided.dragHandleProps}
            ref={provided.innerRef}
            isDragging={snapshot.isDragging}
            style={style}
          >
            <div>{item.text}</div>
            <IconContainer>
              <EditIcon className="self-end justify-self-end"></EditIcon>
              <DeleteIcon className="self-end"></DeleteIcon>
            </IconContainer>
          </Card>
        );
      }}
    </Draggable>
  );
}
