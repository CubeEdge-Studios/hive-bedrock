export interface ProcessedPlayerResponse {
  info: {
    uuid: string;
    xuid: string;
    mcid: string;
    username: string;
    rank: string;
    first_played: number;
    login_streak: {
      current: number;
      longest: number;
    };
    friend_count: number;
    quest_count: number;
    player_number: number;
  };

  equipped_cosmetics: {
    costume: CosmeticResponseTypes[CosmeticType.Costume];
    avatar: CosmeticResponseTypes[CosmeticType.Avatar];
    hub_title: CosmeticResponseTypes[CosmeticType.HubTitle];
    hat: CosmeticResponseTypes[CosmeticType.Hat];
    backbling: CosmeticResponseTypes[CosmeticType.Backbling];
  };

  owned_cosmetics: {
    costume: CosmeticResponseTypes[CosmeticType.Costume][];
    avatar: CosmeticResponseTypes[CosmeticType.Avatar][];
    hub_title: CosmeticResponseTypes[CosmeticType.HubTitle][];
    hat: CosmeticResponseTypes[CosmeticType.Hat][];
    pet: CosmeticResponseTypes[CosmeticType.Pet][];
    mount: CosmeticResponseTypes[CosmeticType.Mount][];
    backbling: CosmeticResponseTypes[CosmeticType.Backbling][];
  };
}

export enum CosmeticType {
  Costume = "costume",
  Avatar = "avatar",
  HubTitle = "hub_title",
  Hat = "hat",
  Pet = "pet",
  Mount = "mount",
  Backbling = "backbling",
}
export type SimpleHubTitle = { display: string };

export type StatTrackValue = { game: string; placeholder: string } & (
  | {
      keys: [string, string];
      operation: "divide" | "add" | "subtract";
      style?: "percent" | "dot";
    }
  | {
      key: string;
    }
);
export type StatTrackHubTitle = SimpleHubTitle & {
  special_type: "stat_track";
  stat_track: StatTrackValue[];
};
export type CombinedStatTrackHubTitle = SimpleHubTitle & {
  special_type: "combined_stat_track";
};

export type HubTitle = SimpleHubTitle | StatTrackHubTitle | CombinedStatTrackHubTitle;

export interface CosmeticResponseTypes {
  [CosmeticType.Costume]: {
    name: string;
    render: string;
  };
  [CosmeticType.Avatar]: {
    name: string;
    url: string;
  };
  [CosmeticType.HubTitle]: HubTitle;
  [CosmeticType.Hat]: {
    name: string;
    icon: string;
    rarity: string;
    render: string;
  };
  [CosmeticType.Pet]: {
    name: string;
    nickname: string;
    render: string;
  };
  [CosmeticType.Mount]: {
    name: string;
    render: string;
  };
  [CosmeticType.Backbling]: {
    name: string;
    icon: string;
    rarity: string;
    render: string;
  };
}

export default function processPlayerInfo(playerResponse: any): ProcessedPlayerResponse | null {
  if (!playerResponse) return null;
  const player = playerResponse.main;

  const info = {
    uuid: player.UUID,
    xuid: player.xuid.toString(),
    mcid: player.mcid,
    username: player.username_cc,
    rank: player.rank,
    first_played: player.first_played,
    login_streak: {
      current: player.daily_login_streak ?? 0,
      longest: player.longest_daily_login_streak ?? 0,
    },
    friend_count: player.friend_count ?? 0,
    quest_count: player.quest_count ?? 0,
    player_number: player.player_number ?? 0,
  };

  const equipped_cosmetics = {
    costume: player.equipped_costume ?? null,
    avatar: player.equipped_avatar ?? null,
    hub_title: player.equipped_hub_title ?? null,
    hat: player.equipped_hat ?? null,
    backbling: player.equipped_backbling ?? null,
  };

  const owned_cosmetics = {
    costume: player.costume_unlocked ?? [],
    avatar: player.avatar_unlocked ?? [],
    hub_title: player.hub_title_unlocked ?? [],
    hat: player.hat_unlocked ?? [],
    pet: player.pets ?? [],
    mount: player.mounts ?? [],
    backbling: player["cosmetics.backbling"] ?? [],
  };

  return {
    info,
    equipped_cosmetics,
    owned_cosmetics,
  };
}
