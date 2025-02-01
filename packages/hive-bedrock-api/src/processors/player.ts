export interface ProcessedPlayerResponse {
    info: {
        uuid: string;
        xuid: string;
        username: string;
        rank: string;
        first_played: number;
        login_streak: {
            current: number;
            longest: number;
        };
        friend_count: number;
        quest_count: number;
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
export interface CosmeticResponseTypes {
    [CosmeticType.Costume]: string;
    [CosmeticType.Avatar]: {
        name: string;
        url: string;
    };
    [CosmeticType.HubTitle]: string;
    [CosmeticType.Hat]: {
        name: string;
        icon: string;
        rarity: string;
    };
    [CosmeticType.Pet]: string;
    [CosmeticType.Mount]: string;
    [CosmeticType.Backbling]: {
        name: string;
        icon: string;
        rarity: string;
    };
}

export default function processPlayerInfo(playerResponse: any): ProcessedPlayerResponse | null {
    if (!playerResponse) return null;
    const player = playerResponse.main;

    const info = {
        uuid: player.UUID,
        xuid: player.xuid.toString(),
        username: player.username_cc,
        rank: player.rank,
        first_played: player.first_played,
        login_streak: {
            current: player.daily_login_streak ?? 0,
            longest: player.longest_daily_login_streak ?? 0,
        },
        friend_count: player.friend_count ?? 0,
        quest_count: player.quest_count ?? 0,
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
