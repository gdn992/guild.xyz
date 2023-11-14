import React from "react"
import Card from "../common/Card"
import { HStack, Text, useColorMode } from "@chakra-ui/react"
import ScoreBoard from "./ScoreBoard"

interface IGameSatsProps {
  scores: number
  rounds: number
}

const GameStats: React.FC<IGameSatsProps> = ({ rounds, scores }) => {
  const { colorMode } = useColorMode()

  return (
    <Card p={3} w="152px" bg={colorMode === "light" ? "gray.100" : "gray.700"}>
      <Text
        as="span"
        fontFamily="display"
        fontSize="2xl"
        fontWeight="bold"
        letterSpacing="wide"
        maxW="full"
        pb={3}
        noOfLines={1}
        wordBreak="break-all"
      >
        Stats
      </Text>

      <HStack>
        <ScoreBoard
          text={rounds}
          iconName={"68.svg"}
          iconBgColor={"--chakra-colors-gray-500"}
          bgColorRanges={600}
        />
        <ScoreBoard
          text={scores}
          iconName={"136.svg"}
          iconBgColor={"--chakra-colors-gray-500"}
          bgColorRanges={600}
        />
      </HStack>
    </Card>
  )
}

export default GameStats
