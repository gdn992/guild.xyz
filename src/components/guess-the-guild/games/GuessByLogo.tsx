import React, { useRef, useState } from "react"
import Button from "../../common/Button"
import { Modal } from "../../common/Modal"
import {
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react"
import { GuildBase } from "../../../types"
import { useGetGameQuestion } from "./utils/useGetGameQuestion"
import { GuessByLogoContent } from "./components/GuessByLogoContent"
import { useGameStatsContext } from "../contexts/GameStatsProvider"
import { useGameRecordsContext } from "../contexts/useGameRecordsProvider"
import { NewRecordCelebration } from "./components/NewRecordCelebration"

interface IGuessByLogoProps {
  isOpen: boolean
  onClose: () => void
  guilds: GuildBase[]
}

const GuessByLogo: React.FC<IGuessByLogoProps> = ({ isOpen, onClose, guilds }) => {
  const modalContentRef = useRef()

  const { scores, roundWon, roundLose } = useGameStatsContext()
  const { updateRecord } = useGameRecordsContext()

  const { selectedGuilds, theChosenOne, reGenerate } = useGetGameQuestion(guilds)
  const [answer, setAnswer] = useState<GuildBase["id"]>()
  const [newRecord, setNewRecord] = useState<number>()

  const handleAnswer = (id: GuildBase["id"]) => {
    setAnswer(id)
    if (id === theChosenOne.id) roundWon(1)
    else {
      const valami = updateRecord(scores)
      setNewRecord(valami)
      roundLose()
    }
  }

  const handleResetGame = () => {
    reGenerate()
    setAnswer(undefined)
    setNewRecord(undefined)
  }
  const handleDifferentGame = () => {
    handleResetGame()
    handleCloseModal()
  }

  const handleCloseModal = () => {
    handleResetGame()
    onClose()
  }

  return (
    <Modal
      isOpen={Boolean(isOpen && selectedGuilds)}
      onClose={handleCloseModal}
      scrollBehavior="inside"
      colorScheme={"dark"}
      initialFocusRef={modalContentRef}
    >
      <ModalOverlay />
      <ModalContent ref={modalContentRef}>
        <ModalHeader textAlign={"center"}>
          {answer
            ? answer === theChosenOne.id
              ? "Good job"
              : "Oops! Better luck next time."
            : "Guess the guild by the logo"}
        </ModalHeader>
        <ModalBody>
          {newRecord && <NewRecordCelebration newRecord={newRecord} />}
          <GuessByLogoContent
            answer={answer}
            onAnswer={handleAnswer}
            theChosenOne={theChosenOne}
            selectedGuilds={selectedGuilds}
          />
        </ModalBody>
        {answer && (
          <ModalFooter gap={3}>
            <Button onClick={handleDifferentGame}>different game</Button>
            <Button onClick={handleResetGame}>new game</Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

export default GuessByLogo
