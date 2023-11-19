import React, { useRef, useState } from "react"
import Button from "../../common/Button"
import { Modal } from "../../common/Modal"
import {
  HStack,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
  Text,
} from "@chakra-ui/react"
import { GuildBase } from "../../../types"
import { useGetGameQuestion } from "./utils/useGetGameQuestion"
import { GuessByLogoContent } from "./components/GuessByLogoContent"
import { useGameStatsContext } from "../contexts/GameStatsProvider"
import { useGameRecordsContext } from "../contexts/useGameRecordsProvider"
import { NewRecordCelebration } from "./components/NewRecordCelebration"
import { ArrowsClockwise } from "phosphor-react"

interface IGuessByLogoProps {
  isOpen: boolean
  onClose: () => void
  guilds: GuildBase[]
}

const GuessByLogo: React.FC<IGuessByLogoProps> = ({ isOpen, onClose, guilds }) => {
  const modalContentRef = useRef()

  const { scores, roundWon, roundLose } = useGameStatsContext()
  const { updateRecord } = useGameRecordsContext()

  const { selectedRandomGuilds, theChosenOne, reGenerate } =
    useGetGameQuestion(guilds)
  const [answer, setAnswer] = useState<GuildBase["id"]>()
  const [newRecord, setNewRecord] = useState<number>()

  const handleAnswer = (id: GuildBase["id"]) => {
    setAnswer(id)
    if (id === theChosenOne.id) roundWon(1)
    else {
      const record = updateRecord(scores)
      setNewRecord(record)
      roundLose()
    }
  }

  const handleResetGame = () => {
    reGenerate()
    setAnswer(undefined)
    setNewRecord(undefined)
  }

  const handleCloseModal = () => {
    onClose()
  }

  return (
    <Modal
      isOpen={Boolean(isOpen && selectedRandomGuilds)}
      onClose={handleCloseModal}
      scrollBehavior="inside"
      size={"sm"}
      initialFocusRef={modalContentRef}
    >
      <ModalOverlay />
      <ModalContent ref={modalContentRef}>
        <ModalHeader p={5} textAlign={"center"}>
          {answer
            ? answer === theChosenOne.id
              ? "Good job"
              : "Oops! Better luck next time."
            : "Guess the guild by the logo"}
        </ModalHeader>
        <ModalBody pt={0} {...(answer ? { pb: 0 } : { pb: 6 })}>
          {newRecord && <NewRecordCelebration newRecord={newRecord} />}
          <GuessByLogoContent
            answer={answer}
            onAnswer={handleAnswer}
            theChosenOne={theChosenOne}
            selectedGuilds={selectedRandomGuilds}
          />
        </ModalBody>
        {answer && (
          <ModalFooter p={5} gap={3}>
            <Button w={"full"} onClick={handleResetGame}>
              <HStack>
                <ArrowsClockwise />
                <Text>New game</Text>
              </HStack>
            </Button>
          </ModalFooter>
        )}
      </ModalContent>
    </Modal>
  )
}

export default GuessByLogo
