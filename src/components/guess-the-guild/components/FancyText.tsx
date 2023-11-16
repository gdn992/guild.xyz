import React, { PropsWithChildren } from "react"
import { HTMLChakraProps, Text } from "@chakra-ui/react"

const FancyText: React.FC<PropsWithChildren<HTMLChakraProps<"p">>> = ({
  children,
  ...rest
}) => (
  <Text
    as="span"
    fontFamily="display"
    fontSize="2xl"
    fontWeight="bold"
    letterSpacing="wide"
    maxW="full"
    noOfLines={1}
    wordBreak="break-all"
    {...rest}
  >
    {children}
  </Text>
)

export default FancyText
