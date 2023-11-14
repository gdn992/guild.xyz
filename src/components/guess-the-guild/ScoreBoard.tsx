import React from "react"
import { Box, ChakraProps, Img, Text, useColorMode } from "@chakra-ui/react"
import Card, { CardProps } from "../common/Card"

interface Props extends CardProps {
  text: string | number
  iconName: string
  iconBgColor: ChakraProps["bgColor"]
  bgColorRanges?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
}

const ScoreBoard: React.FC<Props> = ({
  iconName,
  iconBgColor,
  bgColorRanges = 700,
  text,
  ...rest
}) => {
  const { colorMode } = useColorMode()

  return (
    <Card
      role="group"
      position="relative"
      bg={colorMode === "light" ? "gray.100" : `gray.${bgColorRanges}`}
      w={64}
      h={128}
      {...rest}
    >
      <Box
        flex={1}
        bgColor={`var(${iconBgColor})`}
        display="flex"
        alignItems="center"
        justifyContent="center"
      >
        <Img src={`/guildLogos/${iconName}`} w="40px" h="40px" />
      </Box>
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <Text
          as="span"
          fontFamily="display"
          fontSize="lg"
          fontWeight="bold"
          letterSpacing="wide"
          maxW="full"
          noOfLines={1}
          wordBreak="break-all"
        >
          {text}
        </Text>
      </Box>
    </Card>
  )
}

export default ScoreBoard
