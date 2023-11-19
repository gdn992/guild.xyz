import React, { useState } from "react"
import { HStack } from "@chakra-ui/react"
import { GuildBase } from "../../../types"
import PairTheLogos from "../games/PairTheLogos"
import GuessByLogo from "../games/GuessByLogo"
import { GameDifficultColor, GameDifficulty, GameMode } from "../types"
import { Question, SelectionInverse } from "phosphor-react"
import { GameButton } from "./GameButton"

interface IGameSelectorProps {
  guilds: GuildBase[]
  selectedDifficult: GameDifficulty
}

const GameSelector: React.FC<IGameSelectorProps> = ({
  guilds,
  selectedDifficult,
}) => {
  const [selectedGameMode, setSelectedGameMode] = useState<GameMode>()

  return (
    <>
      <HStack spacing={5} wrap="wrap" w={"full"} alignItems={"start"}>
        <GameButton
          text={"Guess the name"}
          Icon={<Question color={"white"} size={60} />}
          iconBgColor={GameDifficultColor[selectedDifficult]}
          description={"Select the name of the visible guild icon"}
          pointEarn={1}
          onClick={() => setSelectedGameMode(GameMode.guessByLogo)}
        />
        <GameButton
          text={"Pair the logos"}
          Icon={<SelectionInverse color={"white"} size={60} />}
          iconBgColor={GameDifficultColor[selectedDifficult]}
          description={"Match the guild logo to the guild."}
          pointEarn={2}
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
