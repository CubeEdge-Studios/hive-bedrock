import { Timeframe } from "../enums";
import { Game } from "../games.types";
import * as API from "./games/index.types";

export * from "./metadata/game.types";
export * from "./metadata/global_statistics.types";
export * from "./metadata/maps.types";
export * from "./metadata/player.types";
export * from "./routes/index.types";

export type Statistics<
    G extends Game,
    T extends Timeframe
> = AllStatistics<T>[G];

interface AllStatistics<T extends Timeframe> {
    [Game.BlockDrop]: API.DropStatistics<T>;
    [Game.BlockParty]: API.PartyStatistics<T>;
    [Game.CaptureTheFlag]: API.CtfStatistics<T>;
    [Game.DeathRun]: API.DrStatistics<T>;
    [Game.Gravity]: API.GravStatistics<T>;
    [Game.GroundWars]: API.GroundStatistics<T>;
    [Game.HideAndSeek]: API.HideStatistics<T>;
    [Game.BuildBattle]: API.BuildStatistics<T>;
    [Game.MurderMystery]: API.MurderStatistics<T>;
    [Game.Skywars]: API.SkyStatistics<T>;
    [Game.SurvivalGames]: API.SgStatistics<T>;
    [Game.TheBridge]: API.BridgeStatistics<T>;
    [Game.TreasureWars]: API.WarsStatistics<T>;
    [Game.BedWars]: API.BedStatistics<T>;
    [Game.ParkourWorlds]: API.ParkourStatistics<T>;
}

export type Leaderboards<
    G extends Game,
    T extends Timeframe
> = AllLeaderboards<T>[G];

interface AllLeaderboards<T extends Timeframe> {
    [Game.BlockDrop]: API.DropLeaderboard<T>;
    [Game.BlockParty]: API.PartyLeaderboard<T>;
    [Game.CaptureTheFlag]: API.CtfLeaderboard<T>;
    [Game.DeathRun]: API.DrLeaderboard<T>;
    [Game.Gravity]: API.GravLeaderboard<T>;
    [Game.GroundWars]: API.GroundLeaderboard<T>;
    [Game.HideAndSeek]: API.HideLeaderboard<T>;
    [Game.BuildBattle]: API.BuildLeaderboard<T>;
    [Game.MurderMystery]: API.MurderLeaderboard<T>;
    [Game.Skywars]: API.SkyLeaderboard<T>;
    [Game.SurvivalGames]: API.SgLeaderboard<T>;
    [Game.TheBridge]: API.BridgeLeaderboard<T>;
    [Game.TreasureWars]: API.WarsLeaderboard<T>;
    [Game.BedWars]: API.BedLeaderboard<T>;
    [Game.ParkourWorlds]: never;
}
