import React from "react"
import { HStack, Tag, TagLabel, VStack } from "@chakra-ui/react"
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
      <HStack alignItems="start" w={"full"} spacing={5}>
        {Object.keys(records).map((difficulty: GameDifficulty) => {
          const DifficultyIcon = GameDifficultIcon[difficulty]

          return (
            <IconButton
              key={difficulty}
              iconSize={"65px"}
              maxW={300}
              text={difficulty.toUpperCase()}
              subText={
                <HStack>
                  <FancyText fontSize={12} noOfLines={1}>
                    {gameDifficultDescriptions[difficulty]}
                  </FancyText>
                  <Tag py={1}>
                    <HStack gap={2}>
                      <Trophy size={20} /> <TagLabel>{records[difficulty]}</TagLabel>
                    </HStack>
                  </Tag>
                </HStack>
              }
              Icon={<DifficultyIcon color={"white"} size={40} />}
              iconBgColor={GameDifficultColor[difficulty]}
              onClick={() => onDifficultySelect(difficulty)}
              w={"full"}
            />
          )
        })}
      </HStack>
    </VStack>
  )
}

export default GameDifficultySelectorView
