import React, { useState } from "react"
import { GameDifficultColor, GameDifficultIcon, GameDifficulty } from "../../types"
import GameRecord from "./components/GameRecord"
import { HStack, Spinner, VStack } from "@chakra-ui/react"
import { useGetGuildsByDifficulty } from "./utils/useGetGuildsByDifficulty"
import IconButton from "./components/IconButton"
import GameStats from "./components/GameStats"
import GameSelector from "./components/GameSelector"
import NavigationBackAlert from "./components/NavigationBackAlert"
import {
  useGameStatsContext,
  withGameStatsProvider,
} from "./contexts/GameStatsProvider"
import FancyText from "./components/FancyText"

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
        <HStack justifyContent="space-between" w="full">
          <GameStats scores={scores} rounds={rounds} />
          <IconButton
            w={200}
            h={200}
            iconSize={180}
            bgColor={`var(${GameDifficultColor[selectedDifficult]})`}
            iconName={GameDifficultIcon[selectedDifficult]}
            iconBgColor={GameDifficultColor[selectedDifficult]}
            onClick={handleOnGoBack}
          />
          <GameRecord />
        </HStack>
        <VStack w="full" alignItems="start">
          <FancyText fontWeight={"bold"}>Select a game mode</FancyText>
          {isLoading ? (
            <Spinner alignSelf="center" />
          ) : (
            <GameSelector guilds={guilds} />
          )}
        </VStack>
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
