import { Img, VStack } from "@chakra-ui/react"
import Card from "../../../common/Card"
import FancyText from "../../components/FancyText"
import React from "react"

export const NewRecordCelebration = ({ newRecord }) => (
  <VStack w={"full"} justifyContent={"space-evenly"} pb={10}>
    <FancyText textColor={"yellow.500"} fontSize={20}>
      But, Congratulation!
    </FancyText>
    <Card
      display={"flex"}
      flexDirection={"row"}
      gap={2}
      p={3}
      bgColor={"yellow.500"}
      alignItems={"center"}
    >
      <Img src={"/guildLogos/260.svg"} boxSize="10" borderRadius={"full"} />
      <FancyText fontSize={20}>{newRecord}</FancyText>
    </Card>
    <FancyText textColor={"yellow.500"} fontSize={20}>
      There is a new record!
    </FancyText>
  </VStack>
)
