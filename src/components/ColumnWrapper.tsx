import React from "react";
import styled from "styled-components";

interface props {
  children: React.ReactNode;
}

const Container = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: stretch;
  background: lightblue;
`;

export default function ColumnWrapper({ children }: props) {
  return <Container>{children}</Container>;
}
