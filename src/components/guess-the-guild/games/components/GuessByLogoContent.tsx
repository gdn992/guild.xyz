import React from "react"
import { VStack } from "@chakra-ui/react"
import GuildLogo from "../../../common/GuildLogo"
import FancyText from "../../components/FancyText"
import Button from "../../../common/Button"
import { GuildBase } from "../../../../types"

interface Props {
  theChosenOne: GuildBase
  selectedGuilds: GuildBase[]
  answer: GuildBase["id"]
  onAnswer: (answer: GuildBase["id"]) => void
}

export const GuessByLogoContent: React.FC<Props> = ({
  theChosenOne,
  selectedGuilds,
  answer,
  onAnswer,
}) => (
  <>
    <VStack pb={3}>
      {theChosenOne && <GuildLogo imageUrl={theChosenOne.imageUrl} size={"80px"} />}
      <FancyText fontSize={12}>???</FancyText>
    </VStack>
    <VStack spacing={2} alignItems="start">
      {selectedGuilds.map((guild) => {
        const isThisTheChosenOne = theChosenOne.id === guild.id
        const isThisSelected = answer === guild.id
        const outlineColor = isThisTheChosenOne ? "green.400" : "red.400"

        return (
          <Button
            key={guild.id}
            w={"full"}
            onClick={() => onAnswer(guild.id)}
            isDisabled={answer !== undefined}
            hidden={answer ? !isThisTheChosenOne && !isThisSelected : false}
            outlineColor={answer ? outlineColor : undefined}
          >
            {guild.name}
          </Button>
        )
      })}
    </VStack>
  </>
)
