import React from "react"
import { HStack, Text, VStack } from "@chakra-ui/react"
import GuildIconCard from "./GuildIconCard"
import { GameDifficulty, GameDifficultColor, GameDifficultIcon } from "../../types"

interface Props {
  onDifficultySelect: (mode: GameDifficulty) => void
}

const GameDifficultySelector: React.FC<Props> = ({ onDifficultySelect }) => (
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
      <GuildIconCard
        text="Easy"
        iconName={GameDifficultIcon.easy}
        iconBgColor={GameDifficultColor.easy}
        onClick={() => onDifficultySelect("easy")}
        w={"full"}
      />
      <GuildIconCard
        text="Medium"
        iconName={GameDifficultIcon.medium}
        iconBgColor={GameDifficultColor.medium}
        onClick={() => onDifficultySelect("medium")}
        w={"full"}
      />
      <GuildIconCard
        text="Hard"
        iconName={GameDifficultIcon.hard}
        iconBgColor={GameDifficultColor.hard}
        onClick={() => onDifficultySelect("hard")}
        w={"full"}
      />
    </HStack>
  </VStack>
)

export default GameDifficultySelector
