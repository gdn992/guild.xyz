import React, { useState } from "react"
import { HStack } from "@chakra-ui/react"
import IconButton from "./IconButton"
import { GuildBase } from "../../../types"
import PairTheLogos from "../games/PairTheLogos"
import GuessByLogo from "../games/GuessByLogo"
import { GameDifficultColor, GameMode } from "../types"

interface IGameSelectorProps {
  guilds: GuildBase[]
}

const GameSelector: React.FC<IGameSelectorProps> = ({ guilds }) => {
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode>()

  return (
    <>
      <HStack spacing={5} wrap="wrap">
        <IconButton
          text="Guess the name"
          Icon="/136.svg"
          iconBgColor={GameDifficultColor.medium}
          onClick={() => setSelectedGameMode(GameMode.guessByLogo)}
        />
        <IconButton
          text="Pair the logos"
          Icon="/132.svg"
          iconBgColor={GameDifficultColor.medium}
          onClick={() => setSelectedGameMode(GameMode.pairTheLogos)}
        />
      </HStack>
      <GuessByLogo
        isOpen={selectedGameMode === GameMode.guessByLogo}
        guilds={guilds}
        onClose={() => setSelectedGameMode(undefined)}
      />
      <PairTheLogos
        isOpen={selectedGameMode === GameMode.pairTheLogos}
        initialGuilds={guilds}
        onClose={() => setSelectedGameMode(undefined)}
      />
    </>
  )
}

export default GameSelector
