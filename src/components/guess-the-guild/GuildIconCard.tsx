import React from "react"
import {
  Box,
  ChakraProps,
  HStack,
  Img,
  Text,
  useColorMode,
  VStack,
} from "@chakra-ui/react"
import Card, { CardProps } from "../common/Card"

interface Props extends CardProps {
  text?: string | number
  iconName: string
  orientation?: "row" | "col"
  iconBgColor: ChakraProps["bgColor"]
  bgColorRanges?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
  onClick?: () => void
}

const GuildIconCard: React.FC<Props> = ({
  iconName,
  orientation = "row",
  iconBgColor,
  bgColorRanges = 700,
  text,
  onClick,
  ...rest
}) => {
  const Direction = orientation === "row" ? HStack : VStack
  const { colorMode } = useColorMode()

  return (
    <Card
      role="group"
      position="relative"
      bg={colorMode === "light" ? "gray.100" : `gray.${bgColorRanges}`}
      justifyContent="center"
      alignContent="center"
      {...rest}
      {...(onClick
        ? {
            onClick: onClick,
            _before: {
              content: `""`,
              position: "absolute",
              top: 0,
              bottom: 0,
              bg: colorMode === "light" ? "gray.700" : `gray.100`,
              left: 0,
              right: 0,
              opacity: 0,
              transition: "opacity 0.2s",
            },
            _hover: {
              _before: {
                opacity: 0.1,
              },
            },
            _active: {
              _before: {
                opacity: 0.17,
              },
            },
          }
        : {})}
    >
      <Direction>
        <Box
          px={{ base: 3, md: 3 }}
          py={{ base: 3, md: 3 }}
          bgColor={`var(${iconBgColor})`}
        >
          <Img src={`/guildLogos/${iconName}`} w={"40px"} />
        </Box>
        {text && (
          <Box px={{ base: 3, md: 3 }} py={{ base: 3, md: 3 }}>
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
        )}
      </Direction>
    </Card>
  )
}

export default GuildIconCard
