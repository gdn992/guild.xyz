import React from "react"
import pluralize from "../../../../utils/pluralize"
import {
  Box,
  Circle,
  Grid,
  GridItem,
  HStack,
  Tag,
  TagLabel,
  TagLeftIcon,
  VStack,
  Wrap,
} from "@chakra-ui/react"
import VerifiedIcon from "../../../common/VerifiedIcon"
import GuildLogo from "../../../common/GuildLogo"
import { Users } from "phosphor-react"
import { Draggable, Droppable } from "react-beautiful-dnd"
import Card from "../../../common/Card"
import { GuildBaseForPairGame } from "./PairTheLogosContent"
import FancyText from "../../components/FancyText"

interface IGuildCardsDragDroProps {
  guilds: GuildBaseForPairGame[]
}

const GuildCardsDragDrop: React.FC<IGuildCardsDragDroProps> = ({ guilds }) => (
  <VStack gap={2} alignItems={"start"}>
    {guilds.map((guild, index) => (
      <Card key={guild.id} w={"full"} p={3}>
        <Grid
          templateColumns={"[logo]50px auto"}
          templateRows={"[name]26px [stats]24px"}
          columnGap={3}
          rowGap={2}
        >
          <GridItem alignSelf={"center"} rowSpan={2}>
            <Circle
              size={"50px"}
              borderRadius={"full"}
              border={`1px`}
              borderStyle={"dashed"}
              borderColor={guild.imageUrl ? "transparent" : "gray.100"}
            >
              <Droppable droppableId={`Guild.${index}`} direction={"horizontal"}>
                {(provided, snapshot) => (
                  <Box
                    ref={provided.innerRef}
                    borderRadius={"full"}
                    w={"full"}
                    h={"full"}
                    {...provided.droppableProps}
                  >
                    {guild.imageUrl && (
                      <Draggable
                        draggableId={guild.imageUrl.id.toString()}
                        index={index}
                      >
                        {(dragProvided) => (
                          <div
                            ref={dragProvided.innerRef}
                            {...dragProvided.draggableProps}
                            {...dragProvided.dragHandleProps}
                          >
                            <GuildLogo imageUrl={guild.imageUrl.imageUrl} />
                          </div>
                        )}
                      </Draggable>
                    )}
                    {provided.placeholder}
                  </Box>
                )}
              </Droppable>
            </Circle>
          </GridItem>
          <HStack spacing={1}>
            <FancyText fontSize="lg">{guild.name}</FancyText>
            {guild.tags?.includes("VERIFIED") && <VerifiedIcon size={5} />}
          </HStack>
          <Wrap zIndex="1">
            <Tag as="li">
              <TagLeftIcon as={Users} />
              <TagLabel>
                {new Intl.NumberFormat("en", { notation: "compact" }).format(
                  guild.memberCount ?? 0
                )}
              </TagLabel>
            </Tag>
            <Tag as="li">
              <TagLabel>{pluralize(guild.rolesCount ?? 0, "role")}</TagLabel>
            </Tag>
          </Wrap>
        </Grid>
      </Card>
    ))}
  </VStack>
)

export default GuildCardsDragDrop
