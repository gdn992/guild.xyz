import React from "react"
import Card from "../../common/Card"
import { HStack, Text, useColorMode } from "@chakra-ui/react"
import { GameDifficultColor } from "../../../types"
import ScoreBoard from "./ScoreBoard"
import { useGameRecordsContext } from "../contexts/useGameRecordsProvider"

const GameRecord: React.FC = () => {
  const {
    records: { easy, medium, hard },
  } = useGameRecordsContext()
  const { colorMode } = useColorMode()

  return (
    <Card p={3} w="220px" bg={colorMode === "light" ? "gray.100" : "gray.700"}>
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
        Records
      </Text>
      <HStack>
        <ScoreBoard
          text={easy === 0 ? "-" : easy}
          iconName={"10.svg"}
          iconBgColor={GameDifficultColor.easy}
          bgColorRanges={600}
        />
        <ScoreBoard
          text={medium === 0 ? "-" : medium}
          iconName={"36.svg"}
          iconBgColor={GameDifficultColor.medium}
          bgColorRanges={600}
        />
        <ScoreBoard
          text={hard === 0 ? "-" : hard}
          iconName={"196.svg"}
          iconBgColor={GameDifficultColor.hard}
          bgColorRanges={600}
        />
      </HStack>
    </Card>
  )
}

export default GameRecord
