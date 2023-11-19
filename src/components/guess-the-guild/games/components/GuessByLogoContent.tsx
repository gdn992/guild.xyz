import React from "react"
import { VStack } from "@chakra-ui/react"
import GuildLogo from "../../../common/GuildLogo"
import FancyText from "../../components/FancyText"
import Button from "../../../common/Button"
import { GuildBase } from "../../../../types"
import { GuildCard } from "../../../explorer/GuildCard"

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
    {answer ? null : (
      <VStack
        pb={3}
        position={"sticky"}
        top={0}
        zIndex={"sticky"}
        backgroundColor={"gray.700"}
      >
        {theChosenOne && (
          <GuildLogo imageUrl={theChosenOne.imageUrl} size={"80px"} />
        )}
        <FancyText fontSize={"xs"}>???</FancyText>
      </VStack>
    )}
    <VStack spacing={2} alignItems="start">
      {selectedGuilds.map((guild) => {
        const isThisTheChosenOne = theChosenOne.id === guild.id
        const isThisSelected = answer === guild.id
        const outlineColor = isThisTheChosenOne ? "green.400" : "red.400"

        return answer ? (
          <GuildCard
            px={{ base: 2, md: 3 }}
            py={{ sm: 1, md: 2 }}
            key={guild.id}
            guildData={guild}
            backgroundColor={
              isThisTheChosenOne || isThisSelected ? outlineColor : undefined
            }
          />
        ) : (
          <Button
            key={guild.id}
            wordBreak={"break-all"}
            noOfLines={1}
            w={"100%"}
            onClick={() => onAnswer(guild.id)}
            outlineOffset={"-3"}
          >
            <FancyText
              as={"p"}
              maxW={"280px"}
              whiteSpace={"nowrap"}
              overflow={"hidden"}
              textOverflow={"ellipsis"}
              fontSize={"lg"}
              fontWeight={"semibold"}
            >
              {guild.name}
            </FancyText>
          </Button>
        )
      })}
    </VStack>
  </>
)
