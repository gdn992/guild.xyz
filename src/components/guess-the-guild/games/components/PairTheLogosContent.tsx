import React, { useState } from "react"
import { GuildBase } from "../../../../types"

interface IPairTheLogosContentProps {
  selectedGuilds: GuildBase[]
}
export interface LogoForPairGame {
  id: number
  imageUrl: GuildBase["imageUrl"]
}

export interface GuildBaseForPairGame extends Omit<GuildBase, "imageUrl"> {
  imageUrl: LogoForPairGame
}

const PairTheLogosContent: React.FC<IPairTheLogosContentProps> = ({
  selectedGuilds,
}) => {
  const [guilds, setGuilds] = useState<GuildBaseForPairGame[]>(
    selectedGuilds.map((guild, index) => ({
      ...guild,
      imageUrl: null,
    }))
  )
  const [logos, setLogos] = useState<LogoForPairGame[]>(
    selectedGuilds.map((guild, index) => ({
      id: index,
      imageUrl: guild.imageUrl,
    }))
  )
  const changeLogoBetweenGuilds = (index1: number, index2: number) => {
    setGuilds((prevState) => {
      const copy = [...prevState]
      const tmp = copy[index1].imageUrl
      copy[index1].imageUrl = copy[index2].imageUrl
      copy[index2].imageUrl = tmp
      return copy
    })
  }
  const putLogoBackToLogoList = (index1: number, index2: number) => {
    setGuilds((prevState) => {
      const copy = [...prevState]
      const tmp = copy[index1].imageUrl
      copy[index1].imageUrl = copy[index2].imageUrl
      copy[index2].imageUrl = tmp
      return copy
    })
  }

      } else {
      }
    } else {
      } else {
      }
    }
  }

  return (
      <GuildLogosDragDrop logos={logos} droppableId={"LogoList"} />
      <GuildCardsDragDrop guilds={guilds} />
    <VStack gap={3} w={"full"}>
    </VStack>
  )
}

export default PairTheLogosContent
