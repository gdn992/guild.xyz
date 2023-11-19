import { GuildBase } from "../../../../types"
import { useGetGameQuestion } from "./useGetGameQuestion"
import { useEffect, useState } from "react"

export const useGetPairTheLogosQuestion = (initialGuilds: GuildBase[]) => {
  const { selectedRandomGuilds: answerGuilds, reGenerate } =
    useGetGameQuestion(initialGuilds)

  const [guilds, setGuilds] = useState<GuildBase[]>()
  const [logos, setLogos] = useState<string[]>()

  useEffect(() => {
    setGuilds(answerGuilds.map((guild) => ({ ...guild, imageUrl: "" })))
    setLogos(
      answerGuilds.map((guild) => guild.imageUrl).sort(() => Math.random() - 0.5)
    )
  }, [answerGuilds])

  return { guilds, setGuilds, logos, setLogos, answerGuilds, reGenerate }
}
