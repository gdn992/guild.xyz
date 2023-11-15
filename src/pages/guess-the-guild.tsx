import React, { useState } from "react"
import Layout from "../components/common/Layout"
import {
  GameDifficultySelectorView,
  GameView,
  useGetFancyLayoutStyleProps,
} from "../components/guess-the-guild"
import { GameDifficulty } from "../types"
import { VStack } from "@chakra-ui/react"

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
