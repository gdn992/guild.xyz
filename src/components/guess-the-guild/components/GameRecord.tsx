import React from "react"
import { useGameRecords } from "../hooks/useGameRecords"
import Card from "../../common/Card"
import { HStack, Text, useColorMode } from "@chakra-ui/react"
import { GameDifficultColor } from "../../../types"
import ScoreBoard from "./ScoreBoard"

const GameRecord: React.FC = () => {
  const {
    records: { easy, medium, hard },
  } = useGameRecords()
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
          text={easy ?? "-"}
          iconName={"10.svg"}
          iconBgColor={GameDifficultColor.easy}
          bgColorRanges={600}
        />
        <ScoreBoard
          text={medium ?? "-"}
          iconName={"36.svg"}
          iconBgColor={GameDifficultColor.medium}
          bgColorRanges={600}
        />
        <ScoreBoard
          text={hard ?? "-"}
          iconName={"196.svg"}
          iconBgColor={GameDifficultColor.hard}
          bgColorRanges={600}
        />
      </HStack>
    </Card>
  )
}

export default GameRecord
