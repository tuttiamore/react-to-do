import React, { useState, useRef, useEffect } from "react";
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
  columnId: string;
  handleDeleteItem: any;
  handleEditItem: any;
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
  display: flex;
  flex-direction: row;
  wrap: no-wrap;
  justify-content: flex-end;
`;

const TextfieldContainer = styled.div`
  background-color: transparent;
  border: 0;
  flex: 3;
`;

const TextfieldEditable = styled.textarea`
  background-color: transparent;
  border: 0;
  padding: 0;
  margin: 0;
  font-size: inherit;
  line-height: inherit;
  font-family: inherit;
  width: 100%;
  resize: none;
  display: ${(props: any) => (props.isEditable ? "block" : "none")};
`;

const TextfieldNonEditable = styled.div`
  background-color: transparent;
  display: ${(props: any) => (!props.isEditable ? "block" : "none")};
`;

export default function ItemCard({
  item,
  index,
  columnId,
  handleDeleteItem,
  handleEditItem,
}: props) {
  const [isEditable, setIsEditable] = useState(false);
  const textfieldRef: null | any = useRef(null);

  useEffect(() => {
    if (textfieldRef.current && isEditable) {
      textfieldRef.current.focus();
    }
  }, [isEditable]);

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
            <TextfieldContainer
            // onBlur={(e) => {
            //   e.target.contentEditable = "false";
            //   console.log(e);
            // }}
            >
              <TextfieldNonEditable isEditable={isEditable}>
                {item.text}
              </TextfieldNonEditable>
              <TextfieldEditable
                isEditable={isEditable}
                ref={textfieldRef}
                onBlur={() => setIsEditable(false)}
                value={item.text}
                onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                  const newTextInput = e.target.value;
                  handleEditItem(item.id, newTextInput);
                }}
              />
            </TextfieldContainer>
            <IconContainer>
              <EditIcon
                className="self-end justify-self-end"
                onClick={() => {
                  setIsEditable(!isEditable);
                }}
              ></EditIcon>
              <DeleteIcon
                className="self-end"
                onClick={() => {
                  handleDeleteItem(columnId, item.id);
                }}
              ></DeleteIcon>
            </IconContainer>
          </Card>
        );
      }}
    </Draggable>
  );
}
