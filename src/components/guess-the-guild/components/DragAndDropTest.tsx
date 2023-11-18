import React, { useState } from "react"
import { DragDropContext, Draggable, Droppable } from "react-beautiful-dnd"

export const HorizontalList = ({ icons, onIconDragEnd }) => (
  <DragDropContext onDragEnd={onIconDragEnd}>
    <Droppable droppableId="horizontalList" direction="horizontal">
      {(provided) => (
        <div
          {...provided.droppableProps}
          ref={provided.innerRef}
          style={{ display: "flex" }}
        >
          {icons.map((icon, index) => (
            <Draggable key={icon.id} draggableId={icon.id} index={index}>
              {(dragProvided) => (
                <div
                  {...dragProvided.draggableProps}
                  {...dragProvided.dragHandleProps}
                  ref={dragProvided.innerRef}
                >
                  <img
                    src={icon.url}
                    alt={`Icon ${icon.id}`}
                    style={{ width: "50px", height: "50px" }}
                  />
                </div>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </div>
      )}
    </Droppable>
  </DragDropContext>
)

export const VerticalList = ({ circles }) => (
  <div>
    {circles.map((circle, index) => (
      <div
        key={index}
        style={{ display: "flex", alignItems: "center", margin: "10px" }}
      >
        <div
          style={{
            width: "50px",
            height: "50px",
            borderRadius: "50%",
            backgroundColor: "lightblue",
            marginRight: "10px",
          }}
        >
          {/* Ide húzható az ikon */}
        </div>
        <p>{circle.text}</p>
      </div>
    ))}
  </div>
)

const App = () => {
  const [icons, setIcons] = useState([
    { id: "1", url: "https://example.com/icon1.png" },
    { id: "2", url: "https://example.com/icon2.png" },
    { id: "3", url: "https://example.com/icon3.png" },
  ])

  const [circles, setCircles] = useState([
    { text: "Circle 1" },
    { text: "Circle 2" },
    { text: "Circle 3" },
  ])

  const onIconDragEnd = (result) => {
    if (!result.destination) return

    const reorderedIcons = Array.from(icons)
    const [movedIcon] = reorderedIcons.splice(result.source.index, 1)
    reorderedIcons.splice(result.destination.index, 0, movedIcon)

    setIcons(reorderedIcons)
  }

  return (
    <div style={{ display: "flex" }}>
      <HorizontalList icons={icons} onIconDragEnd={onIconDragEnd} />
      <VerticalList circles={circles} />
    </div>
  )
}

export default App
