import React from "react"
import { VStack } from "@chakra-ui/react"
import GuildLogo from "../../../common/GuildLogo"
import FancyText from "../../components/FancyText"
import Button from "../../../common/Button"
import { GuildBase } from "../../../../types"
import Card from "../../../common/Card"

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

        return answer ? (
          <Card
            h={"44px"}
            bgColor={
              answer && (isThisTheChosenOne || isThisSelected)
                ? outlineColor
                : undefined
            }
            alignItems={"center"}
            justifyContent={"center"}
            borderRadius={"xl"}
            w={"full"}
          >
            <FancyText
              px={3}
              fontSize={"lg"}
              fontWeight={"semibold"}
              noOfLines={1}
              wordBreak="break-all"
            >
              {guild.name}
            </FancyText>
          </Card>
        ) : (
          <Button
            key={guild.id}
            wordBreak={"break-all"}
            noOfLines={1}
            w={"100%"}
            onClick={() => onAnswer(guild.id)}
            outlineOffset={"-3"}
            resize={"horizontal"}
          >
            <FancyText
              as={"p"}
              width={"280px"}
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
