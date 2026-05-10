export interface ProcessedGameMetadata {
    name: string;
    shortName: string;
    maxLevel: number;
    allowPrestiging: boolean;
    maxPrestige: number;
    experienceToLevel: {
        [xp: number]: number;
    };
    levelUnlocks: {
        [level: number]: LevelUnlock[];
    };
    levelUnlockTypes: {
        [type: string]: {
            name: string;
            icon: string | null;
            default: string | null;
        };
    };
}

export type LevelUnlock = {
    name: string;
    icon: string | null;
    type: string;
    global: false;
} & (
    | {
          global: false;
      }
    | {
          global: true;
          globalCosmetic: GlobalUnlock;
      }
);

export type GlobalUnlock = GlobalTitleUnlock | GlobalAvatarUnlock | GlobalCostumeUnlock;

export interface GlobalTitleUnlock {
    type: "hub_title";
    display: string;
}
export interface GlobalAvatarUnlock {
    type: "avatar";
    name: string;
    url: string;
}
export interface GlobalCostumeUnlock {
    type: "costume";
    name: string;
}
