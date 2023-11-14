import React, { useState } from "react"
import Layout from "../components/common/Layout"
import { useGetFancyLayoutStyleProps } from "../components/guess-the-guild/hooks/useGetFancyLayoutStyleProps"
import GameView from "../components/guess-the-guild/GameView"
import { GameDifficulty } from "../types"
import { VStack } from "@chakra-ui/react"
import GameDifficultySelectorView from "../components/guess-the-guild/GameDifficultySelectorView"

const GuessTheGuild = () => {
  const fancyLayoutStyle = useGetFancyLayoutStyleProps()

  const [selectedDifficult, setSelectedDifficult] = useState<GameDifficulty>()

  const handleStartGame = (difficult: GameDifficulty) => {
    setSelectedDifficult(difficult)
  }

  const handleOnGoBack = () => {
    setSelectedDifficult(undefined)
  }

  return (
    <Layout title="Guess the guild" {...fancyLayoutStyle}>
      <VStack alignItems="start" gap={10}>
        {selectedDifficult ? (
          <GameView
            selectedDifficult={selectedDifficult}
            onGoBack={handleOnGoBack}
          />
        ) : (
          <GameDifficultySelectorView onDifficultySelect={handleStartGame} />
        )}
      </VStack>
    </Layout>
  )
}

export default GuessTheGuild
