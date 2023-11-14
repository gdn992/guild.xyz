import useLocalStorage from "../../../hooks/useLocalStorage"
import { GameDifficulty, GameRecords } from "../../../types"
import { useCallback } from "react"

export const useGameRecords = () => {
  const [records, setValue] = useLocalStorage<GameRecords>("guessTheGuild.records", {
    easy: undefined,
    medium: undefined,
    hard: undefined,
  })

  const updateRecord = useCallback(
    (difficulty: GameDifficulty, value: number) => {
      setValue({ ...records, [difficulty]: value })
    },
    [records, setValue]
  )

  return { records, updateRecord }
}
