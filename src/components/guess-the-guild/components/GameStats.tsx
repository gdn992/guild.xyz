import React from "react"
import Card from "../../common/Card"
import { HStack, useColorMode } from "@chakra-ui/react"
import ScoreBoard from "./ScoreBoard"
import IconButton from "./IconButton"
import { GameDifficultColor, GameDifficultIcon, GameDifficulty } from "../types"
import FancyText from "./FancyText"
import { Coins, Flag, Trophy } from "phosphor-react"
import { useGameRecordsContext } from "../contexts/useGameRecordsProvider"

interface IGameStatsProps {
  onGoBack: () => void
  selectedDifficult: GameDifficulty
  scores: number
  rounds: number
}

const GameStats: React.FC<IGameStatsProps> = ({
  onGoBack,
  selectedDifficult,
  rounds,
  scores,
}) => {
  const SelectedDifficultIcon = GameDifficultIcon[selectedDifficult]
  const { records } = useGameRecordsContext()
  const { colorMode } = useColorMode()

  return (
    <Card
      p={3}
      w={{ sm: 320 }}
      bg={colorMode === "light" ? "gray.100" : "gray.700"}
      isFullWidthOnMobile
      flex={"none"}
    >
      <FancyText fontFamily="display" fontSize="2xl" fontWeight="bold" pb={3}>
        Stats
      </FancyText>

      <FancyText
        fontFamily="display"
        fontSize="s"
        fontWeight="bold"
        w={{ sm: 370 }}
        pb={3}
      >
        If you consider changing the difficulty, just click this fancy, colorful
        button.
      </FancyText>
      <HStack justifyContent={"space-between"} alignItems={"start"}>
        <HStack>
          <ScoreBoard
            h={140}
            bgColor={`var(${GameDifficultColor[selectedDifficult]})`}
            color={"white"}
            text={records[selectedDifficult]}
            Icon={<Trophy size={30} />}
            bgColorRanges={600}
          />
          <IconButton
            iconSize={140}
            bgColor={`var(${GameDifficultColor[selectedDifficult]})`}
            Icon={<SelectedDifficultIcon color={"white"} size={40} />}
            iconBgColor={GameDifficultColor[selectedDifficult]}
            onClick={onGoBack}
          />
        </HStack>
        <HStack>
          <ScoreBoard
            h={140}
            bgColor={"blue.500"}
            color={"white"}
            text={rounds}
            Icon={<Flag size={30} />}
            bgColorRanges={600}
          />
          <ScoreBoard
            h={140}
            bgColor={"yellow.500"}
            color={"white"}
            text={scores}
            Icon={<Coins size={30} />}
            bgColorRanges={600}
          />
        </HStack>
      </HStack>
    </Card>
  )
}

export default GameStats
