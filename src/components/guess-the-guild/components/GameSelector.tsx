import React, { useState } from "react"
import { Box, HStack } from "@chakra-ui/react"
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
      <HStack w={"full"} spacing={5}>
        <IconButton
          text="Guess the name"
          iconName={"/136.svg"}
          iconBgColor={GameDifficultColor.medium}
          onClick={() => setSelectedGameMode(GameMode.guessByLogo)}
          w={"full"}
        />
        <IconButton
          text="Pair the logos"
          iconName={"/132.svg"}
          iconBgColor={GameDifficultColor.medium}
          onClick={() => setSelectedGameMode(GameMode.pairTheLogos)}
          w={"full"}
        />
        <Box w={"full"} />
      </HStack>
      <GuessByLogo />
      <PairTheLogos />
    </>
  )
}

export default GameSelector
