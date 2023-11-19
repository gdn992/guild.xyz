import {
  Box,
  Button as ChakraButton,
  ButtonProps as ChakraButtonProps,
  ChakraProps,
  HTMLChakraProps,
  Text,
} from "@chakra-ui/react"
import { forwardRef, LegacyRef, PropsWithChildren } from "react"

export type ButtonProps = Omit<ChakraButtonProps, "colorScheme"> & {
  colorScheme?: ChakraProps["color"]
} & HTMLChakraProps<"a"> // we use button as an "a" tag

const Button = forwardRef(
  (
    { children, ...props }: PropsWithChildren<ButtonProps>,
    ref: LegacyRef<HTMLButtonElement>
  ): JSX.Element => {
    const { isLoading, loadingText, colorScheme, ...rest } = props

    if (typeof children === "string")
      return (
        <ChakraButton
          key={
            isLoading && loadingText ? loadingText.toString() : children.toString()
          }
          ref={ref}
          isLoading={isLoading}
          loadingText={
            loadingText && (
              <Text
                as="span"
                noOfLines={1}
                sx={{
                  display: "inline",
                }}
              >
                {loadingText}
              </Text>
            )
          }
          {...rest}
          colorScheme={colorScheme as string}
        >
          <Text
            as="span"
            noOfLines={1}
            sx={{
              display: "inline",
            }}
          >
            {isLoading && loadingText ? loadingText : children}
          </Text>
        </ChakraButton>
      )

    return (
      <ChakraButton
        ref={ref}
        isLoading={isLoading}
        {...rest}
        colorScheme={colorScheme as string}
      >
        {isLoading && loadingText ? (
          <Text
            as="span"
            key={loadingText.toString()}
            noOfLines={1}
            sx={{
              display: "inline",
            }}
          >
            {loadingText}
          </Text>
        ) : (
          <Box>{children}</Box>
        )}
      </ChakraButton>
    )
  }
)

export default Button
