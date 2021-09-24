import { useState } from "react";
import "./App.css";
import { DragDropContext } from "react-beautiful-dnd";
import mockData from "data/mockData";
import ColumnWrapper from "components/ColumnWrapper";

function App() {
  const [data, setData] = useState(mockData);
  return (
    <ColumnWrapper>
      <DragDropContext>
        {data.columnsOrdered.map((columnId) => {
          const column = data.colums[columnId];
          const items = column.items.map((itemId) => {
            return data.items[itemId];
          });
          return <Column key={columnId} items={items} column={column}></Column>;
        })}
      </DragDropContext>
    </ColumnWrapper>
  );
}

export default App;
