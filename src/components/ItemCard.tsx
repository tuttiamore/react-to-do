import React, { useState, useRef, useEffect } from "react";
import styled, { css, keyframes } from "styled-components";
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

type state = {
  isEditable?: boolean;
  isDeleted?: boolean;
};

const animationDuration = 700;
const deleteAnimation = keyframes`
0% {
  transform: rotateX(0deg);
}
75% {
  transform: rotateX(180deg) ;
}
76% {
  transform: rotateX(180deg)  scale(1) ;
}
100% {
  transform: rotateX(180deg)  scale(0);
}
`;

const Card = styled.article`
  padding: 1rem;
  margin-bottom: 1rem;
  background-color: white;
  border: 1px solid lightgrey;
  box-shadow: 5px 5px 0px #ffc8dd;
  transform-style: preserve-3d;

  ${(props: any) =>
    props.isDeleted &&
    css`
      animation: ${deleteAnimation} ${animationDuration}ms
        cubic-bezier(0.73, 0.02, 0.57, 0.92);
    `}
`;

const ContentContainerFront = styled.div`
  background-color: white;
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  backface-visibility: hidden;
  transform-style: preserve-3d;
  width: 100%;
  height: 100%;
`;

const ContentContainerBack = styled(ContentContainerFront)`
  transform: rotateX(180deg);
`;

const IconContainer = styled.div`
  display: flex;
  flex-direction: row;
  wrap: no-wrap;
  justify-content: flex-end;
`;

const TextfieldContainer = styled.div`
  border: 0;
  flex: 3;
  transform: ${(props: state) =>
    props.isEditable ? "scale(1.05)" : "scale(1)"};
  transition: transform 0.3s;
`;

const TextfieldEditable = styled.textarea`
  border: 0;
  padding: 0;
  margin: 0;
  font: inherit;
  width: 90%;
  resize: none;
  display: ${(props: state) => (props.isEditable ? "block" : "none")};

  &:focus {
    outline: none;
  }

  &::selection {
    color: #black;
    background: #ffc8ddff;
  }
`;

const TextfieldNonEditable = styled.div`
  display: ${(props: state) => (!props.isEditable ? "block" : "none")};
`;

export default function ItemCard({
  item,
  index,
  columnId,
  handleDeleteItem,
  handleEditItem,
}: props) {
  const [isEditable, setIsEditable] = useState(false);
  const [isDeleted, setIsDeleted] = useState(false);

  const textfieldRef: null | any = useRef(null);

  useEffect(() => {
    if (textfieldRef.current && isEditable) {
      textfieldRef.current.focus();
      textfieldRef.current.select();
    }
  }, [isEditable]);

  useEffect(() => {
    if (isDeleted) {
      const deleteDelayed = setTimeout(
        () => handleDeleteItem(columnId, item.id),
        animationDuration
      );
      return () => clearTimeout(deleteDelayed);
    }
  }, [isDeleted]);

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
            isDeleted={isDeleted}
          >
            <ContentContainerFront isEditable={isEditable}>
              <TextfieldContainer isEditable={isEditable}>
                <TextfieldNonEditable
                  isEditable={isEditable}
                  onDoubleClick={() => {
                    console.log("double click jo");
                    setIsEditable(true);
                  }}
                >
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
                  rows={1}
                />
              </TextfieldContainer>
              <IconContainer>
                <DeleteIcon
                  className="self-end"
                  onClick={() => {
                    setIsDeleted(!isDeleted);
                  }}
                ></DeleteIcon>
              </IconContainer>
            </ContentContainerFront>
            <ContentContainerBack></ContentContainerBack>
          </Card>
        );
      }}
    </Draggable>
  );
}
