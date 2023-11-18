import React, { ReactNode } from "react"
import {
  Box,
  ChakraProps,
  HStack,
  HTMLChakraProps,
  Img,
  useColorMode,
  VStack,
} from "@chakra-ui/react"
import Card, { CardProps } from "../../common/Card"
import { getClickableStyle } from "../utils/getClickableStyle"
import FancyText from "./FancyText"

interface Props extends CardProps {
  text?: string | number
  subText?: string | ReactNode
  Icon: string | ReactNode
  iconBgColor: ChakraProps["bgColor"]
  bgColorRanges?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  iconSize?: HTMLChakraProps<"div">["h"]
  textPx?: HTMLChakraProps<"div">["px"]
  onClick?: () => void
}

const IconButton: React.FC<Props> = ({
  Icon,
  iconBgColor,
  bgColorRanges = 700,
  text,
  subText,
  onClick,
  iconSize = "40px",
  ...rest
}) => {
  const { colorMode } = useColorMode()

  return (
    <Card
      p={text || subText ? 3 : 0}
      position="relative"
      bg={colorMode === "light" ? "white" : `gray.700`}
      shadow={"xl"}
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      onClick={onClick}
      {...getClickableStyle(colorMode)}
      {...rest}
    >
      <HStack w={"full"} gap={3}>
        <Box
          p={3}
          rounded={"2xl"}
          shadow={"xl"}
          w={iconSize}
          h={iconSize}
          bgColor={`var(${iconBgColor})`}
          display={"flex"}
          justifyContent={"center"}
          alignItems={"center"}
        >
          {typeof Icon === "string" ? (
            <Img src={`/guildLogos/${Icon}`} h={iconSize} w={iconSize} />
          ) : (
            Icon
          )}
        </Box>
        {(text || subText) && (
          <VStack alignItems={"start"}>
            {text && (
              <FancyText fontSize={18} noOfLines={1} fontWeight={"bold"}>
                {text}
              </FancyText>
            )}
            {subText &&
              (typeof subText === "string" ? (
                <FancyText fontSize={12} noOfLines={1}>
                  {subText}
                </FancyText>
              ) : (
                subText
              ))}
          </VStack>
        )}
      </HStack>
    </Card>
  )
}

export default IconButton
