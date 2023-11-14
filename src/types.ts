import type { Chain, Chains } from "chains"
import { FeatureFlag } from "components/[guild]/EditGuild/components/FeatureFlags"
import { ContractCallFunction } from "components/[guild]/RolePlatforms/components/AddRoleRewardModal/components/AddContractCallPanel/components/CreateNftForm/hooks/useCreateNft"
import { RequirementType } from "requirements"

type Token = {
  address: `0x${string}`
  name: string
  symbol: string
  decimals: number
}

type DiscordError = { error: string; errorDescription: string }

type WalletError = { code: number; message: string }

type Rest = {
  [x: string]: any
}

type Logic = "AND" | "OR" | "ANY_OF"

type Theme = {
  color?: string
  backgroundImage?: string
  backgroundCss?: string
}

type CoingeckoToken = {
  chainId: number
  address: string
  name: string
  symbol: string
  decimals: number
  logoURI: string
}

type Poap = {
  id: number
  fancy_id: string
  name: string
  event_url?: string
  image_url: string
  country?: string
  city?: string
  description?: string
  year: number
  start_date: string
  end_date: string
  expiry_date: string
  from_admin: boolean
  virtual_event: boolean
  event_template_id: number
  event_host_id: number
}

type GitPoap = {
  gitPoapEventId: number
  poapEventId: number
  poapEventFancyId: string
  name: string
  year: number
  description: string
  imageUrl: string
  repositories: string[]
  mintedCount: number
}

type NFT = {
  name: string
  type: string
  address: string
  logoUri: string
  slug: string
}

type PlatformName =
  | "TELEGRAM"
  | "DISCORD"
  | "GITHUB"
  | "TWITTER"
  | "GOOGLE"
  | "POAP"
  | "CONTRACT_CALL"
  | "TWITTER_V1"
  | "EMAIL"
  | "UNIQUE_TEXT"
  | "TEXT"

type PlatformUserData = {
  acessToken?: string
  scope?: string
  expiresIn?: number
  invalidToken?: boolean
  refreshToken?: string
  avatar?: string
  username?: string
  readonly?: boolean
}
type PlatformAccountDetails = {
  platformId: number
  platformName: PlatformName
  platformUserId: string
  platformUserData?: PlatformUserData
  username?: string
}

type SharedSocial = {
  guildId: number
  isShared: boolean
}

type AddressConnectionProvider = "DELEGATE"

type User = {
  id: number
  addresses: Array<{
    address: `0x${string}`
    userId: number
    isPrimary: boolean
    provider: AddressConnectionProvider
    createdAt: string
  }>
  platformUsers: PlatformAccountDetails[]
  sharedSocials: SharedSocial[]
  publicKey?: string
  isSuperAdmin: boolean

  captchaVerifiedSince: Date

  // Should be removed once we use only v2 API
  addressProviders?: Record<string, AddressConnectionProvider>

  emails: {
    emailAddress: string
    pending: boolean
    createdAt: Date
  }
}

type BaseUser = {
  id: number
  createdAt: Date
}

type GuildBase = {
  id: number
  name: string
  urlName: string
  imageUrl: string
  roles: Array<string>
  platforms: Array<PlatformName>
  memberCount: number
  rolesCount: number
  tags: Array<GuildTags>
}

type SimpleGuild = {
  id: number
  name: string
  urlName: string
  description: string
  imageUrl: string
  showMembers: boolean
  hideFromExplorer: boolean
  socialLinks: SocialLinks
  eventSources: EventSources
  onboardingComplete: boolean
  memberCount: number
  guildPin?: {
    chain: Chain
    isActive: boolean
  }
  theme: Theme
}

type BrainCardData = {
  id: string
  title: string
  tags?: Array<string>
  icon?: string
  backgroundImage?: string
}

type GuildAdmin = {
  id: number
  address: string
  isOwner: boolean
}

type PlatformGuildData = {
  DISCORD: {
    role?: never
    inviteChannel: string
    invite?: string
    joinButton?: boolean
    needCaptcha?: boolean
    mimeType?: never
    iconLink?: never
    type?: never
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    name?: never
    symbol?: never
    description?: never
    text?: never
    texts?: never
    imageUrl?: never
  }
  GOOGLE: {
    role?: "reader" | "commenter" | "writer"
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    mimeType?: string
    iconLink?: string
    type?: never
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    name?: never
    symbol?: never
    description?: never
    text?: never
    texts?: never
    imageUrl?: never
  }
  CONTRACT_CALL: {
    chain: Chain
    contractAddress: `0x${string}`
    function: ContractCallFunction
    argsToSign: string[]
    name: string
    symbol: string
    imageUrl: string
    description: string
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    role?: never
    mimeType?: never
    iconLink?: never
    text?: never
    texts?: never
  }
  UNIQUE_TEXT: {
    texts: string[]
    text?: never
    name: string
    imageUrl: string
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    symbol?: never
    description?: never
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    role?: never
    mimeType?: never
    iconLink?: never
  }
  TEXT: {
    text: string
    texts?: never
    name: string
    imageUrl: string
    chain?: never
    contractAddress?: never
    function?: never
    argsToSign?: never
    symbol?: never
    description?: never
    inviteChannel?: never
    joinButton?: never
    needCaptcha?: never
    role?: never
    mimeType?: never
    iconLink?: never
  }
}

type Trait = {
  trait_type?: string
  value?: string
  interval?: {
    min: number
    max: number
  }
}

type Requirement = {
  id: number
  type: RequirementType
  address?: `0x${string}`
  chain: Chain
  data?: Record<string, any>
  roleId: number
  name: string
  symbol: string
  decimals?: number
  isNegated: boolean
  visibility?: Visibility

  // temporary until POAP is not a real reward (for PoapRequirements instead of roleId)
  poapId?: number

  // Props used inside the forms on the UI
  formFieldId?: number
  nftRequirementType?: string
  balancyDecimals?: number
  createdAt?: string
  updatedAt?: string
}

type RolePlatform = {
  id: number
  platformRoleId?: string
  guildPlatformId?: number
  guildPlatform?: GuildPlatform
  platformRoleData?: Record<string, string | boolean>
  index?: number
  isNew?: boolean
  roleId?: number
  visibility?: Visibility
}

enum Visibility {
  PUBLIC = "PUBLIC",
  PRIVATE = "PRIVATE",
  HIDDEN = "HIDDEN",
}

type SimpleRole = {
  id: number
  name: string
  description?: string
  imageUrl?: string
  logic: Logic
  memberCount: number
  visibility: Visibility
  position?: number
  anyOfNum?: number
}

type Role = SimpleRole & {
  groupId?: number
  members: string[]
  requirements: Requirement[]
  rolePlatforms: RolePlatform[]
  hiddenRequirements?: boolean
  hiddenRewards?: boolean
}

type GuildPlatform = {
  id: number
  platformId: PlatformType
  platformName?: PlatformName
  platformGuildId: string
  platformGuildData?: PlatformGuildData[keyof PlatformGuildData]
  invite?: string
  platformGuildName: string
}

type PoapContract = {
  id: number
  poapId: number
  chainId: number
  vaultId: number
  contract: `0x${string}`
}

type GuildPoap = {
  id: number
  poapIdentifier: number
  fancyId: string
  activated: boolean
  expiryDate: number
  poapRequirements?: Requirement[]
}

const supportedSocialLinks = [
  "TWITTER",
  "LENS",
  "YOUTUBE",
  "SPOTIFY",
  "MIRROR",
  "MEDIUM",
  "SUBSTACK",
  "SNAPSHOT",
  "SOUND",
  "WEBSITE",
] as const
type SocialLinkKey = (typeof supportedSocialLinks)[number]
type SocialLinks = Partial<Record<SocialLinkKey, string>>

const guildTags = ["VERIFIED", "FEATURED"] as const
type GuildTags = (typeof guildTags)[number]

type GuildContact = {
  type: "EMAIL" | "TELEGRAM"
  contact: string
  id?: number
}

const supportedEventSources = ["LINK3", "EVENTBRITE", "LUMA", "DISCORD"] as const
type EventSourcesKey = (typeof supportedEventSources)[number]
type EventSources = Partial<Record<EventSourcesKey, string>>

type Guild = {
  id: number
  name: string
  urlName: string
  description?: string
  imageUrl: string
  showMembers: boolean
  memberCount: number
  hideFromExplorer: boolean
  socialLinks?: SocialLinks
  contacts?: GuildContact[]
  createdAt: string
  admins: GuildAdmin[]
  theme: Theme
  guildPlatforms: GuildPlatform[]
  roles: Role[]
  groups: Group[]
  members: Array<string>
  poaps: Array<GuildPoap>
  onboardingComplete: boolean
  featureFlags: FeatureFlag[]
  hiddenRoles?: boolean
  requiredPlatforms?: PlatformName[]
  tags: GuildTags[]
  eventSources: Record<EventSourcesKey, string>
  guildPin?: {
    chain: Chain
    isActive: boolean
  }
  isFallback?: boolean
  isDetailed?: boolean
}
type GuildFormType = Partial<
  Pick<
    Guild,
    | "id"
    | "urlName"
    | "name"
    | "imageUrl"
    | "description"
    | "roles"
    | "theme"
    | "contacts"
    | "featureFlags"
    | "tags"
    | "eventSources"
  >
> & {
  guildPlatforms?: (Partial<GuildPlatform> & { platformName: string })[]
  roles?: Array<
    Partial<
      Omit<Role, "requirements" | "rolePlatforms"> & {
        requirements: Array<Partial<Requirement>>
        rolePlatforms: Array<Partial<RolePlatform> & { guildPlatformIndex: number }>
      }
    >
  >
  logic?: Logic
  requirements?: Requirement[]
  socialLinks?: Record<string, string>
  admins?: Array<{
    address: string
    id?: number
    isOwner?: boolean
  }>
  eventSources?: Record<EventSourcesKey, string>
}

type Group = {
  id: number
  urlName: string
  name: string
  description?: string
  imageUrl?: string
  type?: string
  position?: number
  guildId: number
}

type SelectOption<T = string> = {
  label: string
  value: T
  img?: string | JSX.Element
} & Rest

// Requested with Discord OAuth token
type DiscordServerData = {
  id: string
  name: string
  icon: string
  owner: boolean
  permissions: number
  features: string[]
  permissions_new: string
}

type CreatePoapForm = {
  name: string
  description: string
  city: string
  country: string
  start_date: string
  end_date: string
  expiry_date: string
  year: number
  event_url: string
  virtual_event: boolean
  image: File
  secret_code: number
  event_template_id: number
  email: string
  requested_codes: number
  private_event: boolean
}

type CreatedPoapData = {
  id?: number
  fancy_id?: string
  name: string
  description: string
  city: string
  country: string
  start_date: string
  end_date: string
  expiry_date: string
  year: number
  event_url: string
  virtual_event: boolean
  image_url?: string
  event_template_id: number
  private_event: boolean
  event_host_id?: number
}

export enum PlatformType {
  "UNSET" = -1,
  "DISCORD" = 1,
  "TELEGRAM" = 2,
  "GITHUB" = 3,
  "GOOGLE" = 4,
  "TWITTER" = 5,
  // "STEAM" = 6,
  "CONTRACT_CALL" = 7,
  "TWITTER_V1" = 8,
  "UNIQUE_TEXT" = 9,
  "TEXT" = 10,
}

type WalletConnectConnectionData = {
  connected: boolean
  accounts: string[]
  chainId: number
  bridge: string
  key: string
  clientId: string
  clientMeta: {
    description: string
    url: string
    icons: string[]
    name: string
  }
  peerId: string
  peerMeta: {
    description: string
    url: string
    icons: string[]
    name: string
  }
  handshakeId: number
  handshakeTopic: string
}

enum ValidationMethod {
  STANDARD = 1,
  KEYPAIR = 2,
  EIP1271 = 3,
}

type MonetizePoapForm = {
  chain: Chain
  token: string
  fee: number
  owner: string
}

type RequestMintLinksForm = {
  event_id: number
  requested_codes: number
  secret_code: string
  redeem_type: string
}

type GoogleFile = {
  name: string
  mimeType: string
  webViewLink: string
  iconLink: string
  platformGuildId: string
}

type VoiceParticipationForm = {
  poapId: number
  serverId: string
  voiceChannelId: string
  voiceRequirement: {
    type: "PERCENT" | "MINUTE"
    percentOrMinute: number
  }
}

type VoiceRequirement =
  | {
      percent: number
      minute?: never
    }
  | {
      percent?: never
      minute: number
    }

type PoapEventDetails = {
  id: number
  poapIdentifier: number
  fancyId: string
  guildId: number
  activated: boolean
  createdAt: string
  expiryDate: number
  voiceChannelId?: string
  voiceRequirement?: VoiceRequirement
  voiceEventStartedAt: number
  voiceEventEndedAt: number
  contracts: PoapContract[]
}

type VoiceRequirementParams = {
  poapId: number
  voiceChannelId: string
  voiceRequirement: VoiceRequirement
  voiceEventStartedAt?: number
}

type Without<First, Second> = {
  [P in Exclude<keyof First, keyof Second>]?: never
}

type OneOf<First, Second> = First | Second extends object
  ? (Without<First, Second> & Second) | (Without<Second, First> & First)
  : First | Second

type GuildPinAttribute =
  | {
      trait_type: "type"
      value: string
    }
  | {
      trait_type: "guildId"
      value: string
    }
  | {
      trait_type: "userId"
      value: string
    }
  | {
      trait_type: "mintDate"
      display_type: "date"
      value: number
    }
  | {
      trait_type: "actionDate"
      display_type: "date"
      value: number
    }
  | {
      trait_type: "rank"
      value: string
    }

type GuildPinMetadata = {
  name: string
  description: string
  image: string
  attributes: GuildPinAttribute[]
}

type LeaderboardPinData = {
  tokenId: number
  chainId: Chains
  rank: number
  tokenUri: string
}

type DetailedUserLeaderboardData = {
  address: string
  score: number
  pins: LeaderboardPinData[]
}

export { ValidationMethod, Visibility, supportedEventSources, supportedSocialLinks }
export type {
  AddressConnectionProvider,
  BaseUser,
  BrainCardData,
  CoingeckoToken,
  CreatePoapForm,
  CreatedPoapData,
  DetailedUserLeaderboardData,
  DiscordError,
  DiscordServerData,
  EventSources,
  EventSourcesKey,
  GitPoap,
  GoogleFile,
  Group,
  Guild,
  GuildAdmin,
  GuildBase,
  GuildFormType,
  GuildPinMetadata,
  GuildPlatform,
  GuildPoap,
  GuildTags,
  LeaderboardPinData,
  Logic,
  MonetizePoapForm,
  NFT,
  OneOf,
  PlatformAccountDetails,
  PlatformGuildData,
  PlatformName,
  Poap,
  PoapContract,
  PoapEventDetails,
  RequestMintLinksForm,
  Requirement,
  RequirementType,
  Rest,
  Role,
  RolePlatform,
  SelectOption,
  SimpleGuild,
  SimpleRole,
  SocialLinkKey,
  SocialLinks,
  Token,
  Trait,
  User,
  VoiceParticipationForm,
  VoiceRequirement,
  VoiceRequirementParams,
  WalletConnectConnectionData,
  WalletError,
}

export type GameDifficulty = "easy" | "medium" | "hard"

export enum GameDifficultColor {
  "easy" = "--chakra-colors-blue-600",
  "medium" = "--chakra-colors-yellow-500",
  "hard" = "--chakra-colors-red-900",
}

export enum GameDifficultIcon {
  "easy" = "10.svg",
  "medium" = "36.svg",
  "hard" = "196.svg",
}

export enum GameMode {
  "guessByLogo",
  "pairTheLogos",
}

export type GameRecords = Partial<Record<GameDifficulty, number>>
