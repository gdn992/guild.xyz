import React from "react"
import { Box, HStack, VStack } from "@chakra-ui/react"
import IconButton from "./components/IconButton"
import {
  GameDifficultColor,
  gameDifficultDescriptions,
  GameDifficultIcon,
  GameDifficulty,
} from "./types"
import FancyText from "./components/FancyText"
import { useGameRecordsContext } from "./contexts/useGameRecordsProvider"
import { Trophy } from "phosphor-react"

interface Props {
  onDifficultySelect: (mode: GameDifficulty) => void
}

const GameDifficultySelectorView: React.FC<Props> = ({ onDifficultySelect }) => {
  const { records } = useGameRecordsContext()

  return (
    <VStack alignItems="start" gap={10} w={"full"}>
      <FancyText fontSize="2xl" fontWeight="bold" noOfLines={1} color={"white"}>
        Select a difficulty
      </FancyText>
      <Box
        display={"flex"}
        alignItems="start"
        w={"full"}
        gap={5}
        flexWrap={"wrap"}
        flexDirection={{ md: "row" }}
      >
        {Object.keys(records).map((difficulty: GameDifficulty) => {
          const DifficultyIcon = GameDifficultIcon[difficulty]

          return (
            <IconButton
              key={difficulty}
              iconSize={"65px"}
              maxW={{ sm: 280 }}
              text={difficulty}
              textTransform="capitalize"
              subText={
                <Box display={"flex"} gap={1}>
                  <FancyText fontSize={"sm"} noOfLines={1}>
                    {gameDifficultDescriptions[difficulty]}
                  </FancyText>
                  <HStack gap={2}>
                    <Trophy
                      size={25}
                      weight={"fill"}
                      color={`var(${GameDifficultColor[difficulty]})`}
                    />
                    <FancyText fontSize={"sm"}>{records[difficulty]}</FancyText>
                  </HStack>
                </Box>
              }
              Icon={<DifficultyIcon color={"white"} size={40} />}
              iconBgColor={GameDifficultColor[difficulty]}
              onClick={() => onDifficultySelect(difficulty)}
              w={"full"}
            />
          )
        })}
      </Box>
    </VStack>
  )
}

export default GameDifficultySelectorView
