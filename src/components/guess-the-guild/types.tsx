import { Barbell, Butterfly, Skull } from "phosphor-react"
import { IconProps } from "phosphor-react/src/lib"
import { ForwardRefExoticComponent, RefAttributes } from "react"

export const GameDifficultIcon: Record<
  GameDifficulty,
  ForwardRefExoticComponent<IconProps & RefAttributes<SVGSVGElement>>
> = {
  easy: Butterfly,
  medium: Barbell,
  hard: Skull,
}
export const gameDifficultDescriptions: Record<GameDifficulty, string> = {
  easy: "First 100 guilds",
  medium: "First 500 guilds",
  hard: "First 1000 guilds",
}

export enum GameDifficultColor {
  "easy" = "--chakra-colors-blue-600",
  "medium" = "--chakra-colors-yellow-500",
  "hard" = "--chakra-colors-red-900",
}

export interface GameStats {
  rounds: number
  scores: number
}

export type GameDifficulty = "easy" | "medium" | "hard"

export type GameRecords = Partial<Record<GameDifficulty, number>>

export enum GameMode {
  "guessByLogo",
  "pairTheLogos",
}
