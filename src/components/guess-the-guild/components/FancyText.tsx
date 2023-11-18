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
    letterSpacing="wide"
    maxW="full"
    {...rest}
  >
    {children}
  </Text>
)

export default FancyText
