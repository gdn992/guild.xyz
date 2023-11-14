import { ColorMode } from "@chakra-ui/react"

export const getClickableStyle = (colorMode: ColorMode) => ({
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
})
