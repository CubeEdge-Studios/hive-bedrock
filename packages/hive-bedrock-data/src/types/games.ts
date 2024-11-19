export enum Game {
    HideAndSeek = "hide",
    DeathRun = "dr",
    TreasureWars = "wars",
    MurderMystery = "murder",
    SurvivalGames = "sg",
    Skywars = "sky",
    SkywarsKits = "sky-kits",
    SkywarsClassic = "sky-classic",
    CaptureTheFlag = "ctf",
    BlockDrop = "drop",
    GroundWars = "ground",
    JustBuild = "build",
    BlockParty = "party",
    TheBridge = "bridge",
    Gravity = "grav",
    BedWars = "bed",
    ParkourWorlds = "parkour",
}

export interface GameData<G extends Game> {
    id: G;
    short_name: string;
    name: string;

    discontinued?: boolean;
    variant?: Game;

    description: string;
    icon_url: string;
    colour: string;

    levelling: {
        max_level: number;
        increment: number;
        cap: number | null;
        multiplier?: number;
        max_prestige?: number;
    } | null;
}
