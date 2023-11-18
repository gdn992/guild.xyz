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
  VStack,
} from "@chakra-ui/react"
import { GuildBase } from "../../../types"
import { useGetGameQuestion } from "./utils/useGetGameQuestion"
import { useGameStatsContext } from "../contexts/GameStatsProvider"
import { useGameRecordsContext } from "../contexts/useGameRecordsProvider"
import { NewRecordCelebration } from "./components/NewRecordCelebration"
import PairTheLogosContent from "./components/PairTheLogosContent"
import { GuildCard } from "../../explorer/GuildCard"
import GuildLogo from "../../common/GuildLogo"

interface IPairTheLogosProps {
  isOpen: boolean
  onClose: () => void
  initialGuilds: GuildBase[]
}
interface ComparisonValue {
  isThisGood: boolean
  originalGuild: GuildBase
  answeredGuild: GuildBase
}
const PairTheLogos: React.FC<IPairTheLogosProps> = ({
  isOpen,
  onClose,
  initialGuilds,
}) => {
  const modalContentRef = useRef()

  const { scores, roundWon, roundLose } = useGameStatsContext()
  const { updateRecord } = useGameRecordsContext()

  const { selectedRandomGuilds, reGenerate } = useGetGameQuestion(initialGuilds)

  const [result, setResult] = useState<ComparisonValue[]>()
  const [isAllGuildFilledWithLogos, setIsAllGuildFilledWithLogos] =
    useState<boolean>(false)
  const [guilds, setGuilds] = useState<GuildBase[]>()
  const [logos, setLogos] = useState<string[]>()
  const [goodJob, setGoodJob] = useState<boolean>()
  useEffect(() => {
    setGuilds(selectedRandomGuilds.map((guild) => ({ ...guild, imageUrl: "" })))
    setLogos(selectedRandomGuilds.map((guild) => guild.imageUrl)) // todo randomize
  }, [selectedRandomGuilds])

  const [newRecord, setNewRecord] = useState<number>()

  useEffect(() => {
    setIsAllGuildFilledWithLogos(
      !Boolean(guilds?.find((guild) => guild.imageUrl === ""))
    )
  }, [guilds])
  const handleCheckTheAnswers = () => {
    let isThereMistakes = false
    const countedResult = guilds.map((guild, index) => {
      const isThisGood = guild.imageUrl === selectedRandomGuilds[index].imageUrl
      if (!isThisGood) isThereMistakes = true
      return {
        isThisGood: guild.imageUrl === selectedRandomGuilds[index].imageUrl,
        originalGuild: selectedRandomGuilds[index],
        answeredGuild: guild,
      }
    })
    setGoodJob(!isThereMistakes)
    setResult(countedResult)

    if (isThereMistakes) {
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
      isOpen={Boolean(isOpen && selectedRandomGuilds)}
      onClose={handleCloseModal}
      scrollBehavior="inside"
      colorScheme={"dark"}
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
          {!result && selectedRandomGuilds && (
            <PairTheLogosContent
              guilds={guilds}
              setGuilds={setGuilds}
              logos={logos}
              setLogos={setLogos}
            />
          )}
          {result && (
            <VStack gap={2} alignItems={"start"} w={"full"}>
              {result.map(
                ({ answeredGuild, originalGuild, isThisGood }, index) =>
                  !isThisGood && (
                    <HStack key={answeredGuild.id} w={"full"}>
                      {!isThisGood ? (
                        <GuildLogo size={"48px"} imageUrl={originalGuild.imageUrl} />
                      ) : null}
                      <GuildCard
                        px={3}
                        py={3}
                        guildData={answeredGuild}
                        guildLogoProps={{
                          outline: `2px dashed ${isThisGood ? "green" : "red"}`,
                        }}
                      />
                    </HStack>
                  )
              )}
            </VStack>
          )}
        </ModalBody>
        <ModalFooter gap={3}>
          {result === undefined ? (
            <Button
              onClick={handleCheckTheAnswers}
              isDisabled={!isAllGuildFilledWithLogos}
              w={"full"}
            >
              Submit
            </Button>
          ) : (
            <>
              <Button w={"full"} onClick={handleDifferentGame}>
                different game
              </Button>
              <Button w={"full"} onClick={handleResetGame}>
                new game
              </Button>
            </>
          )}
        </ModalFooter>
      </ModalContent>
    </Modal>
  )
}

export default PairTheLogos
