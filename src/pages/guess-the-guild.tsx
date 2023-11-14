import React, { useState } from "react"
import Layout from "../components/common/Layout"
import GameRecord from "../components/guess-the-guild/GameRecord"
import { useGetFancyLayoutStyleProps } from "../components/guess-the-guild/hooks/useGetFancyLayoutStyleProps"
import { HStack, VStack } from "@chakra-ui/react"
import { GameDifficulty, GameDifficultColor, GameDifficultIcon } from "../types"
import GameDifficultySelector from "../components/guess-the-guild/GameDifficultySelector"
import GuildIconCard from "../components/guess-the-guild/GuildIconCard"

const GuessTheGuild = () => {
  const fancyLayoutStyle = useGetFancyLayoutStyleProps()

  const [isGameStarted, setIsGameStarted] = useState<boolean>(false)
  const [selectedDifficult, setSelectedDifficult] = useState<GameDifficulty>()

  const handleStartGame = (difficult: GameDifficulty) => {
    setSelectedDifficult(difficult)
  }
  const handleChangeGameDifficult = () => {
    setSelectedDifficult(undefined)
  }

  return (
    <Layout title="Guess the guild" {...fancyLayoutStyle}>
      <VStack alignItems="start" gap={10}>
        <HStack justifyContent={"space-between"}>
          {selectedDifficult && (
            <GuildIconCard
              w={200}
              h={200}
              bgColor={`var(${GameDifficultColor[selectedDifficult]})`}
              iconName={GameDifficultIcon[selectedDifficult]}
              iconBgColor={GameDifficultColor[selectedDifficult]}
              onClick={handleChangeGameDifficult}
            />
          )}
          <GameRecord />
        </HStack>
        {selectedDifficult ? (
          <></>
        ) : (
          <GameDifficultySelector onDifficultySelect={handleStartGame} />
        )}
      </VStack>
    </Layout>
  )
}

export default GuessTheGuild
