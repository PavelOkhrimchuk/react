import React, { useState } from 'react';
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import { Link } from 'react-router-dom'; 
import "./dnd.css";
function DndPage() {
  const [columns, setColumns] = useState({
    todo: {
      name: 'To Do',
      items: [
        { id: '1', content: 'First task' },
        { id: '2', content: 'Second task' },
      ],
    },
    inProgress: {
      name: 'In Progress',
      items: [],
    },
    done: {
      name: 'Done',
      items: [],
    },
    blocked: {
      name: 'Blocked',
      items: [],
    },
  });

  const deleteTask = (columnId, taskId) => {
    const column = columns[columnId];
    const newItems = column.items.filter(item => item.id !== taskId);
    setColumns({
      ...columns,
      [columnId]: {
        ...column,
        items: newItems,
      },
    });
  };

  const onDragEnd = (result) => {
    const { source, destination } = result;

    if (!destination) return;

    if (
      source.droppableId === destination.droppableId &&
      source.index === destination.index
    ) {
      return; 
    }

    const sourceColumn = columns[source.droppableId];
    const destColumn = columns[destination.droppableId];
    const sourceItems = [...sourceColumn.items];
    const destItems = [...destColumn.items];

    const [removed] = sourceItems.splice(source.index, 1);

    if (source.droppableId === destination.droppableId) {
      sourceItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
      });
    } else {
      destItems.splice(destination.index, 0, removed);
      setColumns({
        ...columns,
        [source.droppableId]: {
          ...sourceColumn,
          items: sourceItems,
        },
        [destination.droppableId]: {
          ...destColumn,
          items: destItems,
        },
      });
    }
  };

  return (
    <div className="main-container">
      <Link to="/">Перейти к обычному To-Do листу</Link>
      <DragDropContext onDragEnd={onDragEnd}>
        <div className="columns">
          {Object.entries(columns).map(([columnId, column], index) => (
            <div className={`column ${columnId}`} key={columnId}>
              <div className="column-header">
                <h4>{column.name}</h4>
              </div>
              <Droppable droppableId={columnId}>
                {(provided, snapshot) => (
                  <div
                    {...provided.droppableProps}
                    ref={provided.innerRef}
                    className={`task-list ${snapshot.isDraggingOver ? 'dragging-over' : ''}`}
                  >
                    {column.items.map((item, index) => (
                      <Draggable key={item.id} draggableId={item.id} index={index}>
                        {(provided, snapshot) => (
                          <div
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                            className={`task ${snapshot.isDragging ? 'dragging' : ''}`}
                          >
                            {item.content}
                            <button
                              onClick={() => deleteTask(columnId, item.id)}
                              className="delete-button"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </Draggable>
                    ))}
                    {provided.placeholder}
                  </div>
                )}
              </Droppable>
            </div>
          ))}
        </div>
      </DragDropContext>
    </div>
  );
}

export default DndPage;
