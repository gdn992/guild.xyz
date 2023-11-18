import React, { useState } from "react"
import Layout from "../components/common/Layout"
import {
  GameDifficultySelectorView,
  GameView,
  useGetFancyLayoutStyleProps,
} from "../components/guess-the-guild"
import { VStack } from "@chakra-ui/react"
import { GameRecordsProvider } from "../components/guess-the-guild/contexts/useGameRecordsProvider"
import { GameDifficulty } from "../components/guess-the-guild/types"

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
    <GameRecordsProvider difficulty={selectedDifficult}>
      <Layout title="Guess the guild" {...fancyLayoutStyle} backgroundImage={""}>
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
    </GameRecordsProvider>
  )
}

export default GuessTheGuild
