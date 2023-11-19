import React from "react"
import Card from "../../common/Card"
import { HStack } from "@chakra-ui/react"
import ScoreBoard from "./ScoreBoard"
import { useGameRecordsContext } from "../contexts/useGameRecordsProvider"
import FancyText from "./FancyText"
import { GameDifficultIcon } from "../types"

const GameRecord: React.FC = () => {
  const {
    records: { easy, medium, hard },
  } = useGameRecordsContext()

  return (
    <Card p={3} w="220px">
      <FancyText fontSize="2xl" fontWeight="bold" maxW="full" pb={3}>
        Records
      </FancyText>
      <HStack>
        <ScoreBoard
          text={easy === 0 ? "-" : easy}
          Icon={<GameDifficultIcon.easy size={40} color={"white"} />}
        />
        <ScoreBoard
          text={medium === 0 ? "-" : medium}
          Icon={<GameDifficultIcon.medium size={40} color={"white"} />}
        />
        <ScoreBoard
          text={hard === 0 ? "-" : hard}
          Icon={<GameDifficultIcon.hard size={40} color={"white"} />}
        />
      </HStack>
    </Card>
  )
}

export default GameRecord
