import React, { Dispatch, SetStateAction, useState } from "react"
import { VStack } from "@chakra-ui/react"
import LogoList from "./LogoList"
import GuildList from "./GuildList"
import { GuildBase } from "../../../../types"

interface IPairTheLogosContentProps {
  guilds: GuildBase[]
  setGuilds: Dispatch<SetStateAction<GuildBase[]>>
  logos: string[]
  setLogos: Dispatch<SetStateAction<string[]>>
}

const PairTheLogosContent: React.FC<IPairTheLogosContentProps> = ({
  guilds,
  setGuilds,
  logos,
  setLogos,
}) => {
  const [selectedLogoIndex, setSelectedLogoIndex] = useState<number>()
  const [selectedGuildIndex, setSelectedGuildIndex] = useState<number>()
  const resetSelection = () => {
    setSelectedGuildIndex(undefined)
    setSelectedLogoIndex(undefined)
  }

  const swapLogos = (logoIndex: number, guildIndex: number) => {
    const selectedLogo = logos[logoIndex]
    const selectedGuildLogo = guilds[guildIndex].imageUrl

    setGuilds((prevState) => {
      const tmp = [...prevState]
      tmp[guildIndex].imageUrl = selectedLogo
      return tmp
    })
    setLogos((prevState) => {
      const tmp = [...prevState]
      tmp[logoIndex] = selectedGuildLogo
      return tmp
    })
    resetSelection()
  }
  const swapLogosBetweenGuilds = (guildIndex1: number, guildIndex2: number) => {
    const selectedGuild1Logo = guilds[guildIndex1].imageUrl
    const selectedGuild2Logo = guilds[guildIndex2].imageUrl

    setGuilds((prevState) => {
      const tmp = [...prevState]
      tmp[guildIndex1].imageUrl = selectedGuild2Logo
      tmp[guildIndex2].imageUrl = selectedGuild1Logo
      return tmp
    })
    resetSelection()
  }

  const handleLogoSelect = (selectedIndex: number) => {
    if (selectedLogoIndex === undefined) {
      if (selectedGuildIndex === undefined) {
        setSelectedLogoIndex(selectedIndex)
      } else {
        swapLogos(selectedIndex, selectedGuildIndex)
      }
    } else {
      if (selectedLogoIndex === selectedIndex) setSelectedLogoIndex(undefined)
      else setSelectedLogoIndex(selectedIndex)
    }
  }
  const handleGuildSelect = (selectedIndex: number) => {
    if (selectedGuildIndex === undefined) {
      if (selectedLogoIndex === undefined) {
        setSelectedGuildIndex(selectedIndex)
      } else {
        swapLogos(selectedLogoIndex, selectedIndex)
      }
    } else {
      if (selectedGuildIndex === selectedIndex) setSelectedGuildIndex(undefined)
      else swapLogosBetweenGuilds(selectedIndex, selectedGuildIndex)
    }
  }

  return (
    <VStack gap={1}>
      <LogoList
        selectedLogoIndex={selectedLogoIndex}
        onLogoSelected={handleLogoSelect}
        logos={logos}
      />
      <GuildList
        selectedGuildIndex={selectedGuildIndex}
        onGuildSelected={handleGuildSelect}
        guilds={guilds}
      />
    </VStack>
  )
}

export default PairTheLogosContent
