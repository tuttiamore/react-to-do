import { useState } from "react";
import "./App.css";
import { DragDropContext, Droppable } from "react-beautiful-dnd";
import styled from "styled-components";
import { nanoid } from "nanoid";

import mockData from "data/mockData";
// import ColumnWrapper from "components/ColumnWrapper";
import Column from "components/Column";

const ColumnContainer = styled.div`
  display: flex;
  flex-direction: row;
  flex-wrap: wrap;
  justify-content: stretch;
  background: lightblue;
`;

function App() {
  const [data, setData] = useState(mockData);

  const handleAddItem = (columnId) => {
    const newItem = { id: nanoid(), text: "new item", checked: false };

    // add item to full item list
    const newItemList = { ...data.items, [newItem.id]: newItem };

    // update column list
    const oldColumn = data.columns[columnId];
    const newColumn = { ...oldColumn, items: [...oldColumn.items, newItem.id] };

    setData({
      ...data,
      items: newItemList,
      columns: {
        ...data.columns,
        [oldColumn.id]: newColumn,
      },
    });
  };

  const handleDeleteItem = (columnId, itemId) => {
    // delete item from full item List
    const newItemList = Object.keys(data.items).reduce((acc, curr) => {
      if (curr !== itemId) {
        const item = data.items[curr];
        return { ...acc, [item.id]: item };
      }
      return acc;
    }, {});

    // delete from columm item list
    const oldColumn = data.columns[columnId];
    const newColumnItemList = oldColumn.items.filter(
      (itemIdInList) => itemIdInList !== itemId
    );

    const newColumn = {
      ...oldColumn,
      items: newColumnItemList,
    };

    setData({
      ...data,
      items: newItemList,
      columns: {
        ...data.columns,
        [oldColumn.id]: newColumn,
      },
    });
  };

  const handleEditItem = (itemId, newItemText) => {
    const newItem = { ...data.items[itemId] };
    newItem.text = newItemText;

    console.log(newItem);
    console.log("columns", data.columns["column1"]);

    setData({
      ...data,
      items: {
        ...data.items,
        [newItem.id]: newItem,
      },
    });
  };

  const onDragEnd = (result) => {
    const { destination, source, draggableId, type } = result;
    if (!destination) {
      return;
    }
    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return;
    }

    if (type === "column") {
      const newColumnsOrdered = Array.from(data.columnsOrdered);
      newColumnsOrdered.splice(source.index, 1);
      newColumnsOrdered.splice(destination.index, 0, draggableId);

      setData({
        ...data,
        columnsOrdered: newColumnsOrdered,
      });
    }

    if (type === "item") {
      const sourceColumn = data.columns[source.droppableId];
      const destinationColumn = data.columns[destination.droppableId];
      if (sourceColumn === destinationColumn) {
        const newItemIds = Array.from(sourceColumn.items);
        newItemIds.splice(source.index, 1);
        newItemIds.splice(destination.index, 0, draggableId);
        const newColumn = {
          ...sourceColumn,
          items: newItemIds,
        };
        setData({
          ...data,
          columns: {
            ...data.columns,
            [sourceColumn.id]: newColumn,
          },
        });
        return;
      }
      const newItemIdsSource = Array.from(sourceColumn.items);
      newItemIdsSource.splice(source.index, 1);
      const newSourceColumn = {
        ...sourceColumn,
        items: newItemIdsSource,
      };
      const newItemIdsDestination = Array.from(destinationColumn.items);
      newItemIdsDestination.splice(destination.index, 0, draggableId);
      const newDestinationColumn = {
        ...destinationColumn,
        items: newItemIdsDestination,
      };
      setData({
        ...data,
        columns: {
          ...data.columns,
          [sourceColumn.id]: newSourceColumn,
          [destinationColumn.id]: newDestinationColumn,
        },
      });
    }
  };

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Droppable
        droppableId={"listDropArea"}
        direction="horizontal"
        type="column"
      >
        {(provided) => (
          <ColumnContainer {...provided.droppableProps} ref={provided.innerRef}>
            {data.columnsOrdered.map((columnId, index) => {
              const column = data.columns[columnId];
              const items = column.items.map((itemId) => {
                return data.items[itemId];
              });
              return (
                <Column
                  key={columnId}
                  index={index}
                  items={items}
                  column={column}
                  handleAddItem={handleAddItem}
                  handleDeleteItem={handleDeleteItem}
                  handleEditItem={handleEditItem}
                ></Column>
              );
            })}
            {provided.placeholder}
          </ColumnContainer>
        )}
      </Droppable>
    </DragDropContext>
  );
}

export default App;
