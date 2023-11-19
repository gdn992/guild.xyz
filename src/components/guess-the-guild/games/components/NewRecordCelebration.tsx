import { HStack, VStack } from "@chakra-ui/react"
import FancyText from "../../components/FancyText"
import React from "react"
import { Trophy } from "phosphor-react"

export const NewRecordCelebration = ({ newRecord }) => (
  <VStack w={"full"} alignContent={"center"} pb={10}>
    <FancyText fontSize={"md"} fontWeight={"bold"}>
      But, Congratulation! There is a new record!
    </FancyText>
    <HStack>
      <Trophy size={50} color="var(--chakra-colors-yellow-500)" />
      <FancyText fontSize={20} color={"yellow.500"} fontWeight={"bold"}>
        {newRecord}
      </FancyText>
    </HStack>
  </VStack>
)
