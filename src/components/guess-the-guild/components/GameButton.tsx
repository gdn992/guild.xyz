import IconButton from "./IconButton"
import { HStack, VStack } from "@chakra-ui/react"
import FancyText from "./FancyText"
import { CoinVertical } from "phosphor-react"
import React from "react"

export const GameButton = ({
  text,
  description,
  pointEarn,
  iconBgColor,
  Icon,
  onClick,
}) => (
  <IconButton
    text={text}
    subText={
      <VStack alignItems={"start"}>
        <FancyText fontSize={"md"}>{description}</FancyText>
        <HStack>
          {Array.from({ length: pointEarn }, (_, index) => (
            <CoinVertical
              key={index}
              weight="fill"
              size={25}
              color={"var(--chakra-colors-yellow-500)"}
            />
          ))}
        </HStack>
      </VStack>
    }
    flex={{ lg: 1 }}
    w={"full"}
    iconSize={"60px"}
    Icon={Icon}
    iconBgColor={iconBgColor}
    onClick={onClick}
  />
)
