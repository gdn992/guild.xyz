import { useBreakpointValue, useColorModeValue } from "@chakra-ui/react"
import { useMemo } from "react"

export const useGetFancyLayoutStyleProps = () => {
  const bgColor = useColorModeValue("var(--chakra-colors-gray-800)", "#37373a") // dark color is from whiteAlpha.200, but without opacity so it can overlay the banner image
  const bgLinearPercentage = useBreakpointValue({ base: "50%", sm: "55%" })
  const bgOpacity = useColorModeValue(0.06, 0.1)
  const { bannerColor } = useColorModeValue(
    {
      bannerColor: "var(--chakra-colors-gray-800)",
    },
    { bannerColor: "whiteAlpha.200" }
  )

  return useMemo(
    () => ({
      background: bannerColor,
      textColor: "white",
      backgroundProps: {
        opacity: 1,
        _before: {
          content: '""',
          position: "absolute",
          top: 0,
          bottom: 0,
          left: 0,
          right: 0,
          bg: `linear-gradient(to top right, ${bgColor} ${bgLinearPercentage}, transparent), url('/banner.png ')`,
          bgSize: {
            base: "auto 100%",
            sm: "auto 115%",
          },
          bgRepeat: "no-repeat",
          bgPosition: "top 10px right 0px",
          opacity: bgOpacity,
        },
      },
      backgroundOffset: 47,
    }),
    [bannerColor, bgColor, bgLinearPercentage, bgOpacity]
  )
}
