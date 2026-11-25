import type { Game } from "hive-bedrock-data";
import type { CatalogueUnlockUppercase } from "../../types/catalogue.js";
import type { V0GameStatistics } from "./statistics.js";

export type V0Quest = {
  uuid: string;
  multi: boolean;
  special: boolean;
  description: string;
  short_description: string;
  games: (Game | string)[];
  exact_game: boolean;
  required: number | null;
  single_game: boolean;
  reward_type: string;
  reward_amount: number;
  reward_entitlement_id: string | null;
  reward_display: string | null;
  start: number;
  end: number;
  parts: V0Quest[] | null;
  accepted_at?: number;
  progress?: number;
  completed?: boolean;
};

export type V0WishlistEntry = {
  UUID: string;
  added: number;
  name: string;
  type: string;
  retail_product_id: string;
  minecoin_price: number;
  keyart: string;
};

export type V0PlayerQuests = {
  active: V0Quest[];
  completed_count: number;
  accepted_today: number;
  limit_resets_at: number | null;
};

export type V0Error = {
  message: string;
};

export type V0EmptyArray = [];

export type V0ValidationError = {
  message: string;
  errors: {
    [key: string]: string[];
  };
};

export type V0SearchValidationError = {
  error: string;
  messages: {
    partial: string[];
  };
};

export type V0MapEntry = {
  name: string;
  season: string;
  variant: string;
  image: string;
};

export type V0Maps = V0MapEntry[];

export type V0LevelUnlock = {
  name: string;
  icon: string | null;
  type: string;
  global: boolean;
  globalCosmetic?: any; // TODO: define global cosmetic
};

export type V0LevelUnlockType = {
  name: string;
  icon: string;
  default: string | null;
};

export type V0GameMeta = {
  name: string;
  shortName: string;
  maxLevel: number;
  allowPrestiging: boolean;
  maxPrestige: number;
  experienceToLevel: {
    [key: string]: number;
  };
  levelUnlocks: V0LevelUnlock[] | V0EmptyArray;
  levelUnlockTypes: V0LevelUnlockType[] | V0EmptyArray;
};

export type V0StoreOffer = {
  name: string;
  retailProductID: string;
  contents: {
    type: string;
    UUID: string | null;
  }[];
};

export type V0CatalogueItem = {
  UUID: string;
  display: string;
  total_sold?: number;
  unlock_data: CatalogueUnlockUppercase;
};

export type V0CatalogueItems = V0CatalogueItem[];

export type V0EditionHolder = {
  edition: number;
  UUID: string;
};

export type V0EditionHolders = V0EditionHolder[];

export type V0EditionDrop = {
  UUID: string;
  name: string | null;
  type: string | null;
  total_sold: number;
  windows: {
    from: number | null;
    to: number | null;
    stock: number;
  }[];
};

export type V0EditionDrops = V0EditionDrop[];

export type V0RoundPlayed = {
  time: number;
  type: "ROUND_PLAYED";
  game: string;
  victory: boolean;
  changeset: Partial<V0GameStatistics<Game>> & { level?: number };
};

export type V0LockerUnlock = {
  time: number;
  type: "LOCKER";
  unlock_type: string;
  unlock_id: string;
};

export type V0Activity = V0RoundPlayed | V0LockerUnlock;

export type V0SearchResults = {
  UUID: string;
  username: string;
  username_cc: string;
}[];

export type V0GlobalStatistics = {
  unique_players: {
    global: number;
    [game: string]: number;
  };
};

export type V0StatisticsMain = {
  UUID: string;
  xuid?: number;
  mcid?: string;
  username?: string;
  username_cc?: string;
  rank: string;
  first_played: number;
  daily_login_streak: number;
  longest_daily_login_streak: number;

  hub_title_count: number;
  hub_title_unlocked?: V0HubTitle[];
  equipped_hub_title?: V0HubTitle;

  avatar_count: number;
  avatar_unlocked?: V0Avatar[];
  equipped_avatar?: V0Avatar;

  costume_count: number;
  costume_unlocked?: V0Costume[];
  equipped_costume?: V0Costume;

  hat_count: number;
  hat_unlocked?: V0Hat[];
  equipped_hat?: V0Hat;

  backbling_count: number;
  "cosmetics.backbling"?: V0Backbling[];
  equipped_backbling?: V0Backbling;

  pets: V0Pet[];
  equipped_pet?: V0Pet;

  mounts: V0Mount[];

  friend_count?: number;
  quest_count?: number;
  paid_ranks?: string[];
  player_number: number;

  variable_entitlements?: string[];
};

export type V0HubTitle = {
  display: string;
};

export type V0Avatar = {
  url: string;
  name: string;
};

export type V0Costume = {
  name: string;
  render: string;
};

export type V0Hat = {
  name: string;
  icon: string;
  rarity: string;
  render: string;
};

export type V0Backbling = {
  name: string;
  icon: string;
  rarity: string;
  render: string;
};

export type V0Pet = {
  name: string;
  nickname: string | null;
  render: string;
};

export type V0Mount = {
  name: string;
  render: string;
};

export type V0GameStats<G extends Game> = V0GameStatistics<G> & { UUID: string };

export type V0AllGameStats = {
  [G in Game]: V0GameStats<G> | V0EmptyArray;
} & {
  main: V0StatisticsMain | V0EmptyArray;
};

export type V0MainProfile = {
  main: V0StatisticsMain | V0EmptyArray;
};

export type V0Leaderboard<G extends Game> =
  | V0LeaderboardEntry<G>[]
  | { [key: string]: V0LeaderboardEntry<G> };

export type V0LeaderboardEntry<G extends Game> = {
  index: number;
  human_index: number;
  username: string;
} & V0GameStats<G>;

export type V0MonthlyEntry<K extends Game | "all"> = K extends Game
  ? V0LeaderboardEntry<K>
  : { [G in Game]: V0LeaderboardEntry<G> };

export type V0AvailableMonths = {
  month: string;
  year: number;
  month_number: number;
  resource: string;
  entries?: number;
}[];
