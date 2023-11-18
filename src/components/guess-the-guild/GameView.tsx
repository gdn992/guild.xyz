import React, { useState } from "react"
import { Box, Spinner, VStack } from "@chakra-ui/react"
import { useGetGuildsByDifficulty } from "./utils/useGetGuildsByDifficulty"
import GameStats from "./components/GameStats"
import GameSelector from "./components/GameSelector"
import NavigationBackAlert from "./components/NavigationBackAlert"
import {
  useGameStatsContext,
  withGameStatsProvider,
} from "./contexts/GameStatsProvider"
import FancyText from "./components/FancyText"
import { GameDifficulty } from "./types"

interface Props {
  selectedDifficult: GameDifficulty
  onGoBack: () => void
}

const GameView: React.FC<Props> = ({ onGoBack, selectedDifficult }) => {
  const { isLoading, guilds } = useGetGuildsByDifficulty(selectedDifficult)
  const { scores, rounds } = useGameStatsContext()
  const [openNavigationBackAlert, setOpenNavigationBackAlert] =
    useState<boolean>(false)

  const handleOnGoBack = () => {
    if (0 === rounds) {
      onGoBack()
    } else {
      setOpenNavigationBackAlert(true)
    }
  }

  return (
    <>
      <VStack alignItems="start" w="full" gap={10}>
        <Box
          w="full"
          display={"flex"}
          gap={7}
          flexDir={{ base: "column", md: "row" }}
        >
          <GameStats
            selectedDifficult={selectedDifficult}
            scores={scores}
            rounds={rounds}
            onGoBack={handleOnGoBack}
          />
          <VStack w="full" alignItems="start">
            <FancyText fontWeight={"bold"} color={{ md: "white" }}>
              Select a game mode
            </FancyText>
            {isLoading ? (
              <Spinner alignSelf="center" />
            ) : (
              <GameSelector guilds={guilds} />
            )}
          </VStack>
        </Box>
      </VStack>
      <NavigationBackAlert
        open={openNavigationBackAlert}
        onNavigate={onGoBack}
        onCloseModal={() => setOpenNavigationBackAlert(false)}
        onStay={() => setOpenNavigationBackAlert(false)}
      />
    </>
  )
}

export default withGameStatsProvider(GameView)
