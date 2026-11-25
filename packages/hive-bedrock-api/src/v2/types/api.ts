import type { Game } from "hive-bedrock-data";
import type { CatalogueUnlock } from "../../types/catalogue.js";
import type { V2GameStatistics } from "./statistics.js";

export type Discovery = {
  version: string;
  links: Record<string, string>;
};

export type GameRef = {
  game_id: Game;
  mode: string | null;
};

export type ListResponseQuestDto = {
  data: QuestDto[];
  pagination: Pagination;
};

export type Pagination = {
  limit?: number;
  offset?: number;
  cursor?: string;
  next_cursor?: string;
  total?: number;
};

export type QuestDto = {
  id: string;
  kind: string;
  category: string;
  description: string;
  short_description: string;
  games: GameRef[];
  required: number;
  single_game: boolean;
  reward: Reward;
  available_from: string;
  available_until: string;
  parent_id: string | null;
  parts: QuestDto[] | null;
};

export type Reward = {
  type: string;
  amount?: number;
  entitlement_id?: string;
  display?: string;
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

export type ExternalIdentities = {
  xuid: string;
  playfab_id: string;
};
export type LoginStreak = {
  current: number;
  longest: number;
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

export type ListResponseWishlistEntryDto = {
  data: WisthlistEntryDto[];
  pagination: Pagination;
};
export type WisthlistEntryDto = {
  id: string;
  type: string;
  display_name: string;
  added_at: string;
  retail_product_id: string;
  minecoins_price: number;
  keyart_url: string;
};

export type ListResponsePlayerStatisticsDto = {
  data: PlayerStatisticsDto<Game>[];
  pagination: Pagination;
};
export type PlayerStatisticsDto<G extends Game> = {
  player_id: string;
  game_id: G;
  first_played_at: string | null;
  statistics: V2GameStatistics<G>;
};

export type Active = {
  quest: QuestDto;
  accepted_at: string;
  progress: number;
  required: number;
  status: string;
  parts: Part[];
};
export type DailyLimit = {
  accepted: number;
  resets_at: string;
};
export type Part = {
  quest_id: string;
  progress: number;
  required: number;
  completed: boolean;
};
export type PlayerQuestsDto = {
  active: Active[];
  daily_limit: DailyLimit;
  completed_count: number;
};
export type CompletedQuestDto = {
  quest_id: string;
  quest: QuestDto;
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

export type Edition = {
  number: number;
  total: number;
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
  render_url?: string;
  edition?: Edition;
};

export type ActivityEventDto = ActivityEventDtoDetails &
  (ActivityRoundPlayed<Game> | ActivityCosmeticUnlocked);
export type ActivityEventDtoDetails = {
  id: string;
  occurred_at: string;
};
export type ActivityRoundPlayed<G extends Game> = {
  type: "round_played";
  game_id: G;
  details: {
    victory: boolean;
    changeset: Partial<V2GameStatistics<G>>;
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
export type LeaderboardEntryDto<G extends Game> = {
  rank: number;
  player: PlayerRef;
  statistics: V2GameStatistics<G>;
};
export type ListResponseLeaderboardEntryDto<G extends Game> = {
  data: LeaderboardEntryDto<G>[];
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
  type: string; // parkour returns type 'object' along with other broken statistics
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
  reward_types: { [rewardType: string]: RewardType };
};
export type LevelReward = {
  name: string;
  icon: string | null;
  type: string;
} & ({ global: true; globalCosmetic: RewardGlobalCosmetic } | { global: false });
export type RewardGlobalCosmetic = {
  type: string;
  display?: string;
  url?: string;
  name?: string;
};
export type RewardType = {
  name: string;
  icon: string | null;
  default: string | null;
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
  unlock?: CatalogueUnlock;
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

export type EditionHolderDto = {
  number: number;
  player: PlayerRef;
};
export type ListResponseEditionHolderDto = {
  data: EditionHolderDto[];
  pagination: Pagination;
};
export type EditionDropDto = {
  id: string;
  display_name: string;
  type: string;
  total: number;
  windows: Window[];
};
export type Window = {
  starts_at: string;
  ends_at: string;
  stock: number;
};
