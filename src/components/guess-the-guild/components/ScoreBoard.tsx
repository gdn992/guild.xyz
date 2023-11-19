import React, { ReactNode } from "react"
import { Box, Img, useColorMode } from "@chakra-ui/react"
import Card, { CardProps } from "../../common/Card"
import FancyText from "./FancyText"

interface Props extends CardProps {
  text: string | number
  Icon: string | ReactNode
  bgColorRanges?: 50 | 100 | 200 | 300 | 400 | 500 | 600 | 700 | 800 | 900
}

const ScoreBoard: React.FC<Props> = ({ Icon, text, bgColorRanges, ...rest }) => {
  const { colorMode } = useColorMode()
  return (
    <Card
      role="group"
      position="relative"
      h={128}
      bg={colorMode === "light" ? "gray.100" : `gray.${bgColorRanges}`}
      {...rest}
    >
      <Box p={2} flex={1} display="flex" alignItems="center" justifyContent="center">
        {typeof Icon === "string" ? (
          <Img src={`/guildLogos/${Icon}`} w="40px" h="40px" />
        ) : (
          Icon
        )}
      </Box>
      <Box flex={1} display="flex" justifyContent="center" alignItems="center">
        <FancyText fontSize="lg" fontWeight="bold">
          {text}
        </FancyText>
      </Box>
    </Card>
  )
}

export default ScoreBoard
