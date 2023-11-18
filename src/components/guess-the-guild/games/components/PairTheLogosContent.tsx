import React, { useState } from "react"
import { GuildBase } from "../../../../types"
import { DragDropContext, OnDragEndResponder } from "react-beautiful-dnd"
import GuildCardsDragDrop from "./GuildCardsDragDrop"
import GuildLogosDragDrop from "./GuildLogosDragDrop"

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
  const getGuildIndex = (droppableId: string) =>
    Number.parseInt(droppableId.split(".")[1])

  const handleDragEnd: OnDragEndResponder = (result) => {
    if (result.destination === null) return
    const source = result.source
    const destination = result.destination

    const droppedItem = logos[source.index]

    if (source.droppableId === "LogoList") {
      if (destination.droppableId === "LogoList") {
      } else {
        // Guild.[index]
        const guildIndex = getGuildIndex(destination.droppableId)
        guilds[guildIndex].imageUrl = droppedItem
        logos.splice(source.index, 1)
      }
    } else {
      // Guild.[index]
      const sourceIndex = getGuildIndex(source.droppableId)
      if (destination.droppableId === "LogoList") {
      } else {
        //Guild.[index]
        const destinationIndex = getGuildIndex(destination.droppableId)
        changeLogoBetweenGuilds(sourceIndex, destinationIndex)
      }
    }
    console.log(
      "%c PairTheLogosContent.tsx: result",
      "background-image: linear-gradient(red 33.33%, yellow 33.33%, yellow 66.66%, green 66.66%); padding:20px; color: black; font-size:20px",
      result
    )
  }

  return (
    <DragDropContext
      onDragEnd={handleDragEnd}
      enableDefaultSensors={true}
      onDragUpdate={console.log}
    >
      <GuildLogosDragDrop logos={logos} droppableId={"LogoList"} />
      <GuildCardsDragDrop guilds={guilds} />
    </DragDropContext>
  )
}

export default PairTheLogosContent
