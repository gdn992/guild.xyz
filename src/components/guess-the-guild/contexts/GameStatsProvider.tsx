import React, { createContext, useCallback, useContext, useState } from "react"
import { GameStats } from "../../../types"

interface GameStatsCallbacks {
  roundWon: (pointEarned: number) => void
  roundLose: () => void
}

const GameStatsContext = createContext<GameStats & GameStatsCallbacks>({
  rounds: 0,
  scores: 0,
  roundWon: undefined,
  roundLose: undefined,
})

const GameStatsProvider = ({ children }) => {
  const [rounds, setRounds] = useState<number>(0)
  const [scores, setScores] = useState<number>(0)

  const roundWon = useCallback((pointEarned: number) => {
    setScores((prevScore) => prevScore + pointEarned)
    setRounds((prevRound) => prevRound + 1)
  }, [])

  const roundLose = useCallback(() => {
    setScores(0)
    setRounds(0)
  }, [])

  return (
    <GameStatsContext.Provider
      value={{
        rounds,
        scores,
        roundWon,
        roundLose,
      }}
    >
      {children}
    </GameStatsContext.Provider>
  )
}

export const withGameStatsProvider =
  (WrappedComponent: React.FC) =>
  (
    props // todo add type to the props
  ) =>
    (
      <GameStatsProvider>
        <WrappedComponent {...props} />
      </GameStatsProvider>
    )

const useGameStatsContext = () => {
  const context = useContext(GameStatsContext)
  if (!context) {
    throw new Error("useGameStats must be used within a GameStatsProvider")
  }
  return context
}

export { GameStatsProvider, useGameStatsContext }
