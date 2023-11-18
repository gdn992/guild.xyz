import { GuildBase } from "../../../types"
import React, { useState } from "react"
import {
  DragDropContext,
  Draggable,
  Droppable,
  OnDragEndResponder,
} from "react-beautiful-dnd"
import {
  Circle,
  HStack,
  SimpleGrid,
  Tag,
  TagLabel,
  TagLeftIcon,
  Text,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import GuildLogo from "../../common/GuildLogo"
import Card from "../../common/Card"
import VerifiedIcon from "../../common/VerifiedIcon"
import { Users } from "phosphor-react"
import pluralize from "../../../utils/pluralize"

interface Logo {
  id: number
  imageUrl: GuildBase["imageUrl"]
}

interface PairTheLogosContentProps {
  guilds: GuildBase[]
}

interface ExtendedGuildBase extends Omit<GuildBase, "imageUrl"> {
  imageUrl: Logo
}

const swapElements = (array: Array<any>, indexA: number, indexB: number) => {
  const tmp = array[indexA]
  array[indexA] = array[indexB]
  array[indexB] = tmp
}
export const PairTheLogosContent: React.FC<PairTheLogosContentProps> = ({
  guilds: initial,
}) => {
  const [guilds, setGuilds] = useState<ExtendedGuildBase[]>(
    initial.map((value) => ({ ...value, imageUrl: undefined }))
  )
  const [icons, setIcons] = useState<Logo[]>(
    initial.map(({ id, imageUrl }, index) => ({ imageUrl, id: id }))
  )

  const onDragEnd: OnDragEndResponder = ({ source, destination, draggableId }) => {
    if (!destination) {
      return
    }
    console.log(
      "%c PairTheLogos.tsx: source, destination",
      "background-image: linear-gradient(red 33.33%, yellow 33.33%, yellow 66.66%, green 66.66%); padding:20px; color: black; font-size:20px",
      source,
      destination,
      draggableId
    )
    if (source.droppableId === "IconList") {
      if (destination.droppableId === "IconList") {
        swapElements(icons, destination.index, source.index)
      } else {
        const droppableId = Number.parseInt(destination.droppableId)
        guilds[droppableId].imageUrl = icons[source.index]
        icons.splice(source.index, 1)
      }
    }
  }

  return (
    <>
      <DragDropContext onDragEnd={onDragEnd}>
        <VStack gap={3}>
          <IconList icons={icons} />
          <VStack w={"full"} gap={3}>
            {guilds.map((guild, index) => (
              <Card key={guild.id} px={3} py={3} w={"full"}>
                <SimpleGrid
                  templateColumns={"3rem calc(100% - 5.25rem)"}
                  gap={2}
                  alignItems="center"
                >
                  <Droppable
                    droppableId={index.toString()}
                    renderClone={(provided, snapshot, descriptor) => <Circle />}
                  >
                    {(dropProvided, snapshot) => (
                      <Circle
                        size={12}
                        borderWidth={1}
                        ref={dropProvided.innerRef}
                        display={"flex"}
                        justifyContent={"center"}
                        alignItems={"center"}
                      >
                        {guild.imageUrl && (
                          <Draggable draggableId={guild.id.toString()} index={0}>
                            {(dragProvided, dragSnapshot) => (
                              <GuildIcon
                                icon={guild.imageUrl}
                                isDragging={dragSnapshot.isDragging}
                                provided={dragProvided}
                              />
                            )}
                          </Draggable>
                        )}
                        {dropProvided.placeholder}
                      </Circle>
                    )}
                  </Droppable>
                  <VStack
                    spacing={1}
                    alignItems="start"
                    w="full"
                    maxW="full"
                    mb="0.5"
                    mt="-1"
                  >
                    <HStack spacing={1}>
                      <Text
                        as="span"
                        fontFamily="display"
                        fontSize="lg"
                        fontWeight="bold"
                        letterSpacing="wide"
                        maxW="full"
                        noOfLines={1}
                        wordBreak="break-all"
                      >
                        {guild.name}
                      </Text>
                      {guild.tags?.includes("VERIFIED") && <VerifiedIcon size={5} />}
                    </HStack>

                    <Wrap zIndex="1">
                      <Tag as="li">
                        <TagLeftIcon as={Users} />
                        <TagLabel>
                          {new Intl.NumberFormat("en", {
                            notation: "compact",
                          }).format(guild.memberCount ?? 0)}
                        </TagLabel>
                      </Tag>
                      <Tag as="li">
                        <TagLabel>
                          {pluralize(guild.rolesCount ?? 0, "role")}
                        </TagLabel>
                      </Tag>
                    </Wrap>
                  </VStack>
                </SimpleGrid>
              </Card>
            ))}
          </VStack>
        </VStack>
      </DragDropContext>
    </>
  )
}

interface GuildIconProps {
  icon: Logo
  isDragging: boolean
  provided
}

const GuildIcon: React.FC<GuildIconProps> = ({ icon, isDragging, provided }) => (
  <div
    ref={provided.innerRef}
    data-is-dragging={isDragging}
    {...provided.draggableProps}
    {...provided.dragHandleProps}
  >
    <GuildLogo imageUrl={icon.imageUrl} />
  </div>
)

interface InnerListProps {
  icons: Logo[]
  dropProvided
}

interface IconListProps {
  icons: Logo[]
}

const IconList: React.FC<IconListProps> = ({ icons }) => (
  <Droppable
    direction={"horizontal"}
    droppableId={"IconList"}
    renderClone={(provided, snapshot, descriptor) => (
      <GuildIcon
        icon={icons[descriptor.source.index]}
        provided={provided}
        isDragging={snapshot.isDragging}
      />
    )}
  >
    {(dropProvided) => (
      <HStack justifyContent={"space-between"} ref={dropProvided.innerRef}>
        <div style={{ display: "none" }}>{dropProvided.placeholder}</div>
        {icons.map((icon, index) => (
          <Draggable
            shouldRespectForcePress
            key={icon.id}
            draggableId={icon.id.toString()}
            index={index}
          >
            {(dragProvided, dragSnapshot) => (
              <GuildIcon
                key={icon.id}
                icon={icon}
                isDragging={dragSnapshot.isDragging}
                provided={dragProvided}
              />
            )}
          </Draggable>
        ))}
      </HStack>
    )}
  </Droppable>
)
