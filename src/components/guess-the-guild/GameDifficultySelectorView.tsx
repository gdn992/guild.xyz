import React from "react"
import { HStack, Text, VStack } from "@chakra-ui/react"
import IconButton from "./components/IconButton"
import { GameDifficultColor, GameDifficultIcon, GameDifficulty } from "../../types"
import GameRecord from "./components/GameRecord"

interface Props {
  onDifficultySelect: (mode: GameDifficulty) => void
}

const GameDifficultySelectorView: React.FC<Props> = ({ onDifficultySelect }) => (
  <VStack alignItems="start" gap={10} w={"full"}>
    <GameRecord />
    <VStack alignItems="start" w={"full"}>
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
        Select a difficulty
      </Text>
      <HStack spacing={5} w={"full"}>
        <IconButton
          text="Easy"
          iconName={GameDifficultIcon.easy}
          iconBgColor={GameDifficultColor.easy}
          onClick={() => onDifficultySelect("easy")}
          w={"full"}
        />
        <IconButton
          text="Medium"
          iconName={GameDifficultIcon.medium}
          iconBgColor={GameDifficultColor.medium}
          onClick={() => onDifficultySelect("medium")}
          w={"full"}
        />
        <IconButton
          text="Hard"
          iconName={GameDifficultIcon.hard}
          iconBgColor={GameDifficultColor.hard}
          onClick={() => onDifficultySelect("hard")}
          w={"full"}
        />
      </HStack>
    </VStack>
  </VStack>
)

export default GameDifficultySelectorView
