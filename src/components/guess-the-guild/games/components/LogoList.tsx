import React from "react"
import { Circle, HStack, HTMLChakraProps } from "@chakra-ui/react"
import GuildLogo from "../../../common/GuildLogo"

interface IGuildLogoListItemProps extends HTMLChakraProps<"div"> {
  logo: string
  highlighted: boolean
}

const LogoListItem: React.FC<IGuildLogoListItemProps> = ({
  logo,
  highlighted,
  ...rest
}) => (
  <Circle
    size={"64px"}
    outline={`${highlighted ? "3px" : "0"} solid`}
    outlineColor={"white"}
    {...rest}
  >
    <GuildLogo size={"64px"} imageUrl={logo} />
  </Circle>
)

interface LogosProps {
  selectedLogoIndex: number
  logos: string[]
  onLogoSelected: (selectedIndex: number, logo: string) => void
}

const LogoList: React.FC<LogosProps> = ({
  selectedLogoIndex,
  logos,
  onLogoSelected,
}) => (
  <HStack justifyContent={"center"} w={"full"}>
    {logos.map((logo, index) => (
      <LogoListItem
        highlighted={index === selectedLogoIndex}
        key={index}
        logo={logo}
        onClick={() => onLogoSelected(index, logo)}
      />
    ))}
  </HStack>
)
export default LogoList
