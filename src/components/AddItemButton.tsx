import { type } from "os";
import React from "react";
import styled from "styled-components";
import AddIcon from "@material-ui/icons/Delete";

type props = {
  handleAddItem: (columnId: string) => void;
  columnId: string;
};

const ButtonContainer = styled.div`
  display: flex;
  flex-direction: row;
  cursor: pointer;
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
