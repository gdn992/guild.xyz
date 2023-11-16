import { GuildBase } from "../../../../types"
import { useCallback, useEffect, useState } from "react"

export const useGetGameQuestion = (guilds: GuildBase[]) => {
  const [timestamp, reGenerateTheQuestion] = useState(new Date())

  const [selectedGuilds, setSelectedGuilds] = useState<GuildBase[]>([])
  const [theChosenOne, setTheChosenOne] = useState<GuildBase>()

  useEffect(() => {
    const copiedGuilds: GuildBase[] = [...guilds]
    const selectedRandomGuilds: GuildBase[] = []
    const numberOfRandomGuilds = 4

    for (let iterator = 0; iterator < numberOfRandomGuilds; iterator++) {
      const selectedRandomIndex = Math.floor(Math.random() * copiedGuilds.length)
      selectedRandomGuilds.push(copiedGuilds[selectedRandomIndex])
      copiedGuilds.splice(selectedRandomIndex, 1)
    }
    setSelectedGuilds(selectedRandomGuilds)
    setTheChosenOne(
      selectedRandomGuilds[Math.floor(Math.random() * numberOfRandomGuilds)]
    )
  }, [timestamp, guilds])

  const reGenerate = useCallback(() => {
    reGenerateTheQuestion(new Date())
  }, [])

  return { selectedGuilds, theChosenOne, reGenerate }
}
