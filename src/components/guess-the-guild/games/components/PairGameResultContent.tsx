import React from "react"
import { GuildCard } from "../../../explorer/GuildCard"
import { HStack, useColorMode, VStack } from "@chakra-ui/react"
import GuildLogo from "../../../common/GuildLogo"
import { ComparisonValue } from "../PairTheLogos"

interface IPairGameResultContentProps {
  result: ComparisonValue[]
}

const PairGameResultContent: React.FC<IPairGameResultContentProps> = ({
  result,
}) => {
  const { colorMode } = useColorMode()

  return (
    <VStack gap={2} alignItems={"start"} w={"full"}>
      {result.map(({ answeredGuild, originalGuild, isThisGood }) => (
        <HStack key={answeredGuild.id} w={"full"}>
          {!isThisGood ? (
            <GuildLogo size={"48px"} imageUrl={originalGuild.imageUrl} />
          ) : null}
          <GuildCard
            px={3}
            py={3}
            guildData={answeredGuild}
            bgColor={
              colorMode === "light"
                ? isThisGood
                  ? "green.400"
                  : "red.400"
                : isThisGood
                ? "green.900"
                : "red.900"
            }
          />
        </HStack>
      ))}
    </VStack>
  )
}

export default PairGameResultContent
