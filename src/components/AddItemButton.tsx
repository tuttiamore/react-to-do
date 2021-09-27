import { type } from "os";
import React from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Add";

type props = {
  handleAddItem: (columnId: string) => void;
  columnId: string;
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
  background-color: white;
  justify-content: center;
  align-items: center;
`;

export default function AddItemButton({ handleAddItem, columnId }: props) {
  return (
    <ButtonContainer
      onClick={() => {
        handleAddItem(columnId);
      }}
    >
      <AddIcon></AddIcon> <p>Add new card</p>
    </ButtonContainer>
  );
}
