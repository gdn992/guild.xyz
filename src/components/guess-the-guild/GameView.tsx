import React, { useState } from "react"
import { GameDifficultColor, GameDifficultIcon, GameDifficulty } from "../../types"
import GameRecord from "./GameRecord"
import { HStack, Spinner, Text, VStack } from "@chakra-ui/react"
import { useGetGuildsByDifficulty } from "./utils/useGetGuildsByDifficulty"
import IconButton from "./IconButton"
import GameStats from "./GameStats"
import GameSelector from "./GameSelector"
import NavigationBackAlert from "./NavigationBackAlert"

interface Props {
  selectedDifficult: GameDifficulty
  onGoBack: () => void
}

const GameView: React.FC<Props> = ({ onGoBack, selectedDifficult }) => {
  const { isLoading, guilds } = useGetGuildsByDifficulty(selectedDifficult)

  const [rounds, setRounds] = useState<number>(1)
  const [scores, setScores] = useState<number>(0)

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
          <Text
            as="span"
            fontFamily="display"
            fontSize="2xl"
            fontWeight="bold"
            letterSpacing="wide"
            maxW="full"
            noOfLines={1}
            wordBreak="break-all"
          >
            Select a game mode
          </Text>
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

export default GameView
