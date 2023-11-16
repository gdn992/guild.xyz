import React, { useState } from "react"
import { HStack } from "@chakra-ui/react"
import IconButton from "./IconButton"
import { GameDifficultColor, GameMode, GuildBase } from "../../../types"
import PairTheLogos from "../games/PairTheLogos"
import GuessByLogo from "../games/GuessByLogo"

interface IGameSelectorProps {
  guilds: GuildBase[]
}

const GameSelector: React.FC<IGameSelectorProps> = ({ guilds }) => {
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode>()

  return (
    <>
      <HStack w="full" spacing={5} wrap="wrap">
        <IconButton
          text="Guess the name"
          iconName="/136.svg"
          iconBgColor={GameDifficultColor.medium}
          onClick={() => setSelectedGameMode(GameMode.guessByLogo)}
          w={300}
        />
        <IconButton
          text="Pair the logos"
          iconName="/132.svg"
          iconBgColor={GameDifficultColor.medium}
          onClick={() => setSelectedGameMode(GameMode.pairTheLogos)}
          w={300}
        />
      </HStack>
      <GuessByLogo
        isOpen={selectedGameMode === GameMode.guessByLogo}
        guilds={guilds}
        onClose={() => setSelectedGameMode(undefined)}
      />
      <PairTheLogos
        isOpen={selectedGameMode === GameMode.pairTheLogos}
        guilds={guilds}
        onClose={() => setSelectedGameMode(undefined)}
      />
    </>
  )
}

export default GameSelector
