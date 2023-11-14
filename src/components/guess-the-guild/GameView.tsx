import React, { useState } from "react"
import { GameDifficultColor, GameDifficultIcon, GameDifficulty } from "../../types"
import GameRecord from "./GameRecord"
import GuildCardButton from "./GuildCardButton"
import { HStack, VStack } from "@chakra-ui/react"
import Button from "../common/Button"
import { useGetGuildsByDifficulty } from "./utils/useGetGuildsByDifficulty"

interface Props {
  selectedDifficult: GameDifficulty
  onGoBack: () => void
}

const GameView: React.FC<Props> = ({ onGoBack, selectedDifficult }) => {
  const { isLoading, data } = useGetGuildsByDifficulty(selectedDifficult)

  const [rounds, setRounds] = useState<number>(0)

  const [openConfirmationDialog, setOpenConfirmationDialog] =
    useState<boolean>(false)

  const handleOnGoBack = () => {
    if (0 === rounds) {
      onGoBack()
    } else {
      setOpenConfirmationDialog(true)
    }
  }

  return (
    <VStack alignItems="start" gap={10}>
      <HStack justifyContent={"space-between"}>
        {selectedDifficult && (
          <GuildCardButton
            w={200}
            h={200}
            bgColor={`var(${GameDifficultColor[selectedDifficult]})`}
            iconName={GameDifficultIcon[selectedDifficult]}
            iconBgColor={GameDifficultColor[selectedDifficult]}
            onClick={handleOnGoBack}
          />
        )}
        <GameRecord />
      </HStack>
      {openConfirmationDialog && (
        <>
          <Button onClick={onGoBack}>ok</Button>
          <Button onClick={() => setOpenConfirmationDialog(false)}>stay</Button>
        </>
      )}
    </VStack>
  )
}

export default GameView
