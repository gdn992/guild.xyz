import React from "react"
import { LogoForPairGame } from "./PairTheLogosContent"
import { Draggable, Droppable } from "react-beautiful-dnd"
import { Circle, HStack } from "@chakra-ui/react"
import GuildLogo from "../../../common/GuildLogo"

interface IGuildLogosDragDropProps {
  logos: LogoForPairGame[]
  droppableId: string
}

const GuildLogosDragDrop: React.FC<IGuildLogosDragDropProps> = ({
  logos,
  droppableId,
}) => {
  console.log(
    "%c GuildLogosDragDrop.tsx: logos",
    "background-image: linear-gradient(gray 33.33%, yellow 33.33%, yellow 66.66%, gray 66.66%); padding:20px; color: black; font-size:20px",
    logos
  )
  return (
    <Droppable droppableId={droppableId} direction="horizontal">
      {(provided, snapshot) => (
        <HStack ref={provided.innerRef}>
          {logos.map((logo, index) => (
            <Draggable key={logo.id} draggableId={logo.id.toString()} index={index}>
              {(dragProvided, dragSnapshot, rubric) => (
                <Circle
                  ref={dragProvided.innerRef}
                  {...dragProvided.draggableProps}
                  {...dragProvided.dragHandleProps}
                >
                  <GuildLogo imageUrl={logo.imageUrl} />
                </Circle>
              )}
            </Draggable>
          ))}
          {provided.placeholder}
        </HStack>
      )}
    </Droppable>
  )
}

export default GuildLogosDragDrop
