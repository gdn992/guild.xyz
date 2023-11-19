import React, { useEffect, useRef, useState } from "react"
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
import { useGameStatsContext } from "../contexts/GameStatsProvider"
import { useGameRecordsContext } from "../contexts/useGameRecordsProvider"
import { NewRecordCelebration } from "./components/NewRecordCelebration"
import PairTheLogosContent from "./components/PairTheLogosContent"
import PairGameResultContent from "./components/PairGameResultContent"
import ModalButton from "../../common/ModalButton"
import { ArrowsClockwise } from "phosphor-react"
import { useGetPairTheLogosQuestion } from "./utils/useGetPairTheLogosQuestion"

export interface ComparisonValue {
  isThisGood: boolean
  originalGuild: GuildBase
  answeredGuild: GuildBase
}

interface IPairTheLogosProps {
  isOpen: boolean
  onClose: () => void
  initialGuilds: GuildBase[]
}

const PairTheLogos: React.FC<IPairTheLogosProps> = ({
  isOpen,
  onClose,
  initialGuilds,
}) => {
  const modalContentRef = useRef()

  const { scores, roundWon, roundLose } = useGameStatsContext()
  const { updateRecord } = useGameRecordsContext()
  const [newRecord, setNewRecord] = useState<number>()

  const { guilds, setGuilds, logos, setLogos, answerGuilds, reGenerate } =
    useGetPairTheLogosQuestion(initialGuilds)

  const [result, setResult] = useState<ComparisonValue[]>()
  const [goodJob, setGoodJob] = useState<boolean>()

  const [isAllGuildFilledWithLogos, setIsAllGuildFilledWithLogos] =
    useState<boolean>(false)

  useEffect(() => {
    setIsAllGuildFilledWithLogos(
      !Boolean(guilds?.find((guild) => guild.imageUrl === ""))
    )
  }, [guilds])

  const handleCheckTheAnswers = () => {
    let isThereMistake = false

    const countedResult = guilds.map((guild, index) => {
      const isThisGood = guild.imageUrl === answerGuilds[index].imageUrl
      if (!isThisGood) isThereMistake = true

      return {
        isThisGood: guild.imageUrl === answerGuilds[index].imageUrl,
        originalGuild: answerGuilds[index],
        answeredGuild: guild,
      }
    })

    setGoodJob(!isThereMistake)
    setResult(countedResult)

    if (isThereMistake) {
      setNewRecord(updateRecord(scores))
      roundLose()
    } else roundWon(2)
  }

  const handleResetGame = () => {
    reGenerate()
    setResult(undefined)
    setNewRecord(undefined)
    setIsAllGuildFilledWithLogos(false)
  }

  const handleCloseModal = () => {
    handleResetGame()
    onClose()
  }

  return (
    <Modal
      isOpen={Boolean(isOpen && answerGuilds)}
      onClose={handleCloseModal}
      scrollBehavior="inside"
      size={"md"}
      initialFocusRef={modalContentRef}
    >
      <ModalOverlay />
      <ModalContent ref={modalContentRef}>
        <ModalHeader textAlign={"center"}>
          {result !== undefined
            ? goodJob
              ? "Good job"
              : "Oops! Better luck next time."
            : "Guess the guild by the logo"}
        </ModalHeader>
        <ModalBody>
          {newRecord && <NewRecordCelebration newRecord={newRecord} />}
          {!result && answerGuilds && (
            <PairTheLogosContent
              guilds={guilds}
              setGuilds={setGuilds}
              logos={logos}
              setLogos={setLogos}
            />
          )}
          {result && <PairGameResultContent result={result} />}
        </ModalBody>
        <ModalFooter gap={3}>
          {result === undefined ? (
            <ModalButton
              onClick={handleCheckTheAnswers}
              bgColor={"green.500"}
              isDisabled={!isAllGuildFilledWithLogos}
              w={"full"}
            >
              Submit
            </ModalButton>
          ) : (
            <Button w={"full"} onClick={handleResetGame}>
              <HStack>
                <ArrowsClockwise />
                <Text>New game</Text>
              </HStack>
            </Button>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PairTheLogos
