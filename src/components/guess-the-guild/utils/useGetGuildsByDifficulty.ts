import { GuildBase } from "../../../types"
import useSWR from "swr"
import { useMemo } from "react"
import { GameDifficulty } from "../types"

export const useGetGuildsByDifficulty = (selectedDifficulty: GameDifficulty) => {
  const limit =
    selectedDifficulty === "easy"
      ? 100
      : selectedDifficulty === "medium"
      ? 500
      : 1000

  const { isLoading, data: rawData } = useSWR<GuildBase[]>(
    `/v2/guilds/?limit=${limit}`,
    {
      refreshInterval: 0,
      revalidateIfStale: false,
      revalidateOnFocus: false,
      revalidateOnReconnect: false,
    }
  )

  const data = useMemo(() => {
    if (!isLoading) {
      return rawData.filter(({ imageUrl }) => imageUrl)
    }
    return undefined
  }, [rawData, isLoading])

  return { guilds: data, isLoading }
}
