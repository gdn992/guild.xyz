import useLocalStorage from "../../../hooks/useLocalStorage"
import React, {
  createContext,
  PropsWithChildren,
  useCallback,
  useContext,
} from "react"
import useJsConfetti from "../../create-guild/hooks/useJsConfetti"
import { GameDifficulty, GameRecords } from "../types"

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
  const triggerConfetti = useJsConfetti()

  const [records, setValue] = useLocalStorage<GameRecords>(
    GAME_RECORDS_STORAGE_KEY,
    {
      easy: 0,
      medium: 0,
      hard: 0,
    },
    true
  )
  const checkThisRecord = useCallback(
    (value: number) => {
      if (records[difficulty] < value) {
        setValue({
          ...records,
          [difficulty]: value,
        })
        triggerConfetti()
        return value // this is a new record
      }
      return undefined // this is not record
    },
    [difficulty, records, setValue, triggerConfetti]
  )

  return (
    <GameRecordsContext.Provider value={{ records, updateRecord: checkThisRecord }}>
      {children}
    </GameRecordsContext.Provider>
  )
}

export const useGameRecordsContext = () => useContext(GameRecordsContext)
