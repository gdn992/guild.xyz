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
import { useGameStatsContext } from "../contexts/GameStatsProvider"
import { useGameRecordsContext } from "../contexts/useGameRecordsProvider"
import { NewRecordCelebration } from "./components/NewRecordCelebration"
import PairTheLogosContent from "./components/PairTheLogosContent"

interface IPairTheLogosProps {
  isOpen: boolean
  onClose: () => void
  guilds: GuildBase[]
}

const PairTheLogos: React.FC<IPairTheLogosProps> = ({ isOpen, onClose, guilds }) => {
  const modalContentRef = useRef()

  const { scores, roundWon, roundLose } = useGameStatsContext()
  const { updateRecord } = useGameRecordsContext()

  const { selectedGuilds, theChosenOne, reGenerate } = useGetGameQuestion(guilds)
  const [answers, setAnswers] = useState<GuildBase["id"]>()
  const [newRecord, setNewRecord] = useState<number>()

  const handleAnswer = (id: GuildBase["id"]) => {
    setAnswers(id)
    if (id === theChosenOne.id) roundWon(1)
    else {
      const valami = updateRecord(scores)
      setNewRecord(valami)
      roundLose()
    }
  }

  const handleResetGame = () => {
    reGenerate()
    setAnswers(undefined)
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
          {answers
            ? answers === theChosenOne.id
              ? "Good job"
              : "Oops! Better luck next time."
            : "Guess the guild by the logo"}
        </ModalHeader>
        <ModalBody>
          {newRecord && <NewRecordCelebration newRecord={newRecord} />}
          {selectedGuilds && <PairTheLogosContent selectedGuilds={selectedGuilds} />}
        </ModalBody>
        <ModalFooter>
          <Button onClick={handleResetGame} isDisabled={Boolean(answers)} w={"full"}>
            Submit
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PairTheLogos
