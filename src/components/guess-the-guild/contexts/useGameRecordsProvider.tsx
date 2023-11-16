import useLocalStorage from "../../../hooks/useLocalStorage"
import { GameDifficulty, GameRecords } from "../../../types"
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react"

export const GAME_RECORDS_STORAGE_KEY = "guessTheGuild.records"

interface IGameRecordsContext {
  records: GameRecords
  updateRecord: (value: number) => number | undefined
}

export const GameRecordsContext = createContext<IGameRecordsContext>({
  records: {
    easy: 0,
    medium: 0,
    hard: 0,
  },
  updateRecord: undefined,
})

interface Props {
  difficulty: GameDifficulty
}

export const GameRecordsProvider: React.FC<PropsWithChildren<Props>> = ({
  children,
  difficulty,
}) => {
  const [records, setValue] = useLocalStorage<GameRecords>(
    GAME_RECORDS_STORAGE_KEY,
    {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    true
  )
  const updateRecord = useCallback(
    (value: number) => {
      if (records[difficulty] < value) {
        setValue({
          ...records,
          [difficulty]: value,
        })
        console.log(
          "%c useGameRecordsProvider.tsx: value",
          "background-image: linear-gradient(red 33.33%, yellow 33.33%, yellow 66.66%, green 66.66%); padding:20px; color: black; font-size:20px",
          value
        )
        return value
      }
      return undefined
    },
    [difficulty, records, setValue]
  )

  console.log(
    "%c useGameRecordsProvider.ts: records",
    "background-image: linear-gradient(white 33.33%, black 33.33%, black 66.66%, white 66.66%); padding:20px; color: black; font-size:20px",
    records
  )

  return (
    <GameRecordsContext.Provider value={{ records, updateRecord }}>
      {children}
    </GameRecordsContext.Provider>
  )
}

export const useGameRecordsContext = () => useContext(GameRecordsContext)
