import React from "react"
import { VStack } from "@chakra-ui/react"
import { GuildCard } from "../../../explorer/GuildCard"
import { GuildBase } from "../../../../types"

interface IGuildProps {
  selectedGuildIndex: number
  guilds: GuildBase[]
  onGuildSelected: (selectedIndex: number, guild: GuildBase) => void
}

const GuildList: React.FC<IGuildProps> = ({
  selectedGuildIndex,
  guilds,
  onGuildSelected,
}) => (
  <VStack gap={2} alignItems={"start"} w={"full"}>
    {guilds.map((guild, index) => (
      <GuildCard
        px={3}
        py={3}
        key={guild.id}
        guildData={guild}
        onClick={() => onGuildSelected(index, guild)}
        guildLogoProps={{
          outline: `2px dashed ${selectedGuildIndex === index ? "white" : "gray"}`,
        }}
      />
    ))}
  </VStack>
)
export default GuildList
