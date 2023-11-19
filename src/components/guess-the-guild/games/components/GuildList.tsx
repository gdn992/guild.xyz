import React from "react"
import { useColorMode, VStack } from "@chakra-ui/react"
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
}) => {
  const { colorMode } = useColorMode()
  return (
    <VStack gap={2} alignItems={"start"} w={"full"}>
      {guilds.map((guild, index) => (
        <GuildCard
          px={3}
          py={3}
          key={guild.id}
          guildData={guild}
          onClick={() => onGuildSelected(index, guild)}
          guildLogoProps={{
            outlineOffset: selectedGuildIndex === index ? 3 : 0,
            outlineColor: colorMode === "light" ? "gray.800" : "white",
            outline: `${selectedGuildIndex === index ? "3px solid" : "2px dashed"}`,
          }}
        />
      ))}
    </VStack>
  )
}
export default GuildList
