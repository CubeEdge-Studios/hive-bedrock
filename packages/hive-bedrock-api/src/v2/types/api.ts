export type Discovery = {
  version: string;
  links: Record<string, string>;
};

export type Pagination = {
  limit?: number;
  offset?: number;
  cursor?: string;
  next_cursor?: string;
  total?: number;
};

export type ListResponsePlayerSummaryDto = {
  data: PlayerSummaryDto[];
  pagination: Pagination;
};
export type PlayerSummaryDto = {
  id: string;
  username: string;
  username_normalized: string;
  links?: Record<string, string>;
};

export type PlayerProfileDto = {
  id: string;
  username: string;
  username_normalized: string;
  external_identities: ExternalIdentities;
  rank: string;
  paid_ranks: string[];
  first_joined_at: string;
  player_number: number;
  login_streak: LoginStreak;
  friend_count: number;
  quest_count: number;
  links?: Record<string, string>;
};
export type ExternalIdentities = {
  xuid: string;
  playfab_id: string;
};
export type LoginStreak = {
  current: number;
  longest: number;
};

export type ListResponsePlayerStatisticsDto = {
  data: PlayerStatisticsDto[];
  pagination: Pagination;
};
export type PlayerStatisticsDto = {
  player_id: string;
  game_id: string;
  first_played_at: string | null;
  statistics: Record<string, unknown>; // TODO: add types
};

export type EntitlementDto = {
  id: string;
  type: string;
  display_name: string | null;
  known: boolean;
};
export type ListResponseEntitlementDto = {
  data: EntitlementDto[];
  pagination: Pagination;
};

export type ListResponseOwnedCosmeticDto = {
  data: OwnedCosmeticDto[];
  pagination: Pagination;
};
export type OwnedCosmeticDto = {
  id: string;
  type: string;
  display_name?: string;
  image_url?: string;
  equipped: boolean;
  edition?: Edition;
};
export type Edition = {
  number: number;
  total: number;
};

export type ActivityEventDto = ActivityEventDtoDetails &
  (ActivityRoundPlayed | ActivityCosmeticUnlocked);
export type ActivityEventDtoDetails = {
  id: string;
  occurred_at: string;
};
export type ActivityRoundPlayed = {
  type: "round_played";
  game_id: string;
  details: {
    victory: boolean;
    changeset: Record<string, unknown>; // TODO: add types
  };
};
export type ActivityCosmeticUnlocked = {
  type: "cosmetic_unlocked";
  details: {
    unlock_type: string;
    unlock_id?: string;
  };
};
export type ActivityMeta = {
  player_online: boolean;
  activity_disabled?: boolean;
};
export type ActivityResponse = {
  data: ActivityEventDto[];
  pagination: Pagination;
  meta: ActivityMeta;
};

export type EnvelopeNetworkStatisticsDto = {
  data: NetworkStatisticsDto;
  meta: Meta;
};
export type GameCount = {
  game_id: string;
  estimated_unique: number;
};
export type Meta = {
  as_of: string;
  is_estimate: boolean;
};
export type NetworkStatisticsDto = {
  players: Players;
};
export type Players = {
  estimated_unique_total: number;
  estimated_unique_by_game: GameCount[];
};

export type LeaderboardDto = {
  id: string;
  game_id: string;
  kind: string; // 'all_time' | 'monthly' | 'season' | 'event'
  period?: string;
  season_id?: number;
  event_id?: string; // 'rewards-2023'
  status: string; // 'active' | 'closed'
  ordered_by: string;
  entry_count?: number; // no example found
  entry_count_is_estimate?: boolean; // no example found
  links?: Record<string, string>;
};
export type ListResponseLeaderboardDto = {
  data: LeaderboardDto[];
  pagination: Pagination;
};
export type LeaderboardEntryDto = {
  rank: number;
  player: PlayerRef;
  statistics: Record<string, unknown>; // TODO: add types
};
export type ListResponseLeaderboardEntryDto = {
  data: LeaderboardEntryDto[];
  pagination: Pagination;
};
export type PlayerRef = {
  id: string;
  username: string;
};

export type Capabilities = {
  statistics: boolean;
  maps: boolean;
  progression: boolean;
  all_time_leaderboards: boolean;
  monthly_leaderboards: boolean;
  season_leaderboards: boolean;
};
export type GameDto = {
  id: string;
  name: string;
  short_name: string;
  capabilities: Capabilities;
  stat_schema: Record<string, StatSchemaEntry>;
  links?: Record<string, string>;
};
export type ListResponseGameDto = {
  data: GameDto[];
  pagination: Pagination;
};
export type StatSchemaEntry = {
  key: string;
  type: string; // parkour returns 'object' along with other broken statistics
};
export type Level = {
  level: number;
  cumulative_xp: number;
  rewards: LevelReward[];
};
export type Prestige = {
  enabled: boolean;
  max_level: number;
};
export type ProgressionDto = {
  game_id: string;
  max_level: number;
  prestige: Prestige;
  levels: Level[];
  reward_types: Record<string, unknown>; // TODO: add types
};
export type LevelReward = {
  // TODO: add union for global boolean and globalCosmetic
  name: string;
  icon: string | null;
  type: string;
  global: boolean;
  globalCosmetic?: RewardGlobalCosmetic;
};
export type RewardGlobalCosmetic = {
  type: string;
  display?: string;
  url?: string;
  name?: string;
};
export type ListResponseMapDto = {
  data: MapDto[];
  pagination: Pagination;
};
export type MapDto = {
  id: string;
  game_id: string;
  name: string;
  variant?: string;
  seasonal_theme?: string;
  image_url?: string;
};

export type Content = {
  type?: string;
  id?: string;
};
export type CosmeticDto = {
  id?: string;
  type?: string;
  display_name?: string;
  image_url?: string;
  total_sold?: number;
  unlock?: Unlock;
  store_offer?: StoreOffer;
};
export type ListResponseCosmeticDto = {
  data?: CosmeticDto[];
  pagination?: Pagination;
};
export type StoreOffer = {
  name?: string;
  retail_product_id?: string;
  contents?: Content[];
};
export type Unlock = {
  type?: string;
  active?: boolean;
  metadata?: Record<string, unknown>; // TODO: add types
};
