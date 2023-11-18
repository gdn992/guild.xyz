import React from "react"
import Card from "../../common/Card"
import { HStack, Tag, TagLabel, useColorMode } from "@chakra-ui/react"
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
      w={{ sm: 270 }}
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
        w={{ sm: 270 }}
        pb={3}
      >
        If you consider change the difficulty, just click this fancy colorful button.
      </FancyText>
      <HStack justifyContent={"space-between"}>
        <HStack>
          <ScoreBoard
            h={140}
            text={rounds}
            Icon={<Flag size={30} />}
            bgColorRanges={600}
          />
          <ScoreBoard
            h={140}
            text={scores}
            Icon={<Coins size={30} />}
            bgColorRanges={600}
          />
        </HStack>
        <IconButton
          iconSize={140}
          bgColor={`var(${GameDifficultColor[selectedDifficult]})`}
          Icon={<SelectedDifficultIcon color={"white"} size={40} />}
          iconBgColor={GameDifficultColor[selectedDifficult]}
          onClick={onGoBack}
        />
      </HStack>
      <FancyText fontFamily="display" fontSize="xs" fontWeight="bold" pt={3}>
        <Tag
          w={"full"}
          py={1}
          bgColor={`var(${GameDifficultColor[selectedDifficult]})`}
          color={"white"}
        >
          <HStack gap={2}>
            <Trophy size={20} />{" "}
            <TagLabel fontWeight={"bold"}>
              The record is: {records[selectedDifficult]}
            </TagLabel>
          </HStack>
        </Tag>
      </FancyText>
    </Card>
  )
}

export default GameStats
