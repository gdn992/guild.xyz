import React from "react"
import {
  Box,
  ChakraProps,
  HTMLChakraProps,
  Img,
  Text,
  useColorMode,
} from "@chakra-ui/react"
import Card, { CardProps } from "../../common/Card"
import { getClickableStyle } from "../utils/getClickableStyle"

interface Props extends CardProps {
  text?: string | number
  iconName: string
  iconBgColor: ChakraProps["bgColor"]
  bgColorRanges?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  iconSize?: HTMLChakraProps<"div">["h"]
  textPx?: HTMLChakraProps<"div">["px"]
  onClick?: () => void
}

const IconButton: React.FC<Props> = ({
  iconName,
  iconBgColor,
  bgColorRanges = 700,
  text,
  onClick,
  iconSize = "40px",
  textPx = 1,
  h = "64px",
  ...rest
}) => {
  const { colorMode } = useColorMode()

  return (
    <Card
      role="group"
      position="relative"
      bg={colorMode === "light" ? "gray.100" : `gray.${bgColorRanges}`}
      shadow={"xl"}
      justifyContent="center"
      alignItems="center"
      flexDirection="row"
      onClick={onClick}
      h={h}
      {...getClickableStyle(colorMode)}
      {...rest}
    >
      <Box
        h={h}
        rounded={"2xl"}
        shadow={"xl"}
        w={h}
        flex={"none"}
        bgColor={`var(${iconBgColor})`}
        display={"flex"}
        justifyContent={"center"}
        alignItems={"center"}
      >
        <Img src={`/guildLogos/${iconName}`} h={iconSize} w={iconSize} />
      </Box>
      {text && (
        <Text
          px={textPx}
          as="span"
          fontFamily="display"
          textAlign={"center"}
          fontSize="lg"
          fontWeight="bold"
          letterSpacing="wide"
          w="full"
          noOfLines={1}
          wordBreak="break-all"
        >
          {text}
        </Text>
      )}
    </Card>
  )
}

export default IconButton
