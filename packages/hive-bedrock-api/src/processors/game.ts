import { calculateLevelFromXP, Game, Timeframe } from "hive-bedrock-data";
import { ProcessedPlayerResponse } from "./player";

export interface ProcessedGameBED {
    id: Game.BedWars;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    kills: number;
    deaths: number;
    kdr: number;

    final_kills: number;
    beds_destroyed: number;
}
export interface ProcessedGameDROP {
    id: Game.BlockDrop;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    deaths: number;
    blocks_destroyed: number;
    powerups_collected: number;
    vaults_used: number;
}
export interface ProcessedGamePARTY {
    id: Game.BlockParty;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    powerups_collected: number;
    rounds_survived: number;
}
export interface ProcessedGameCTF {
    id: Game.CaptureTheFlag;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    kills: number;
    deaths: number;
    kdr: number;

    assists: number;
    flags_captured: number;
    flags_returned: number;
}
export interface ProcessedGameDR {
    id: Game.DeathRun;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    kills: number;
    deaths: number;
    kdr: number;

    checkpoints: number;
    activated: number;
}
export interface ProcessedGameGRAV {
    id: Game.Gravity;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    deaths: number;
    maps_completed: number;
    maps_completed_without_dying: number;
}
export interface ProcessedGameGROUND {
    id: Game.GroundWars;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    kills: number;
    deaths: number;
    kdr: number;

    blocks_destroyed: number;
    blocks_placed: number;
    projectiles_fired: number;
}
export interface ProcessedGameBUILD {
    id: Game.JustBuild;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    rating_meh_received: number;
    rating_okay_received: number;
    rating_good_received: number;
    rating_great_received: number;
    rating_love_received: number;
    total_ratings: number;
}
export interface ProcessedGameHIDE {
    id: Game.HideAndSeek;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    deaths: number;
    hider_kills: number;
    seeker_kills: number;
    kdr: number;
}
export interface ProcessedGameMURDER {
    id: Game.MurderMystery;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    murders: number;
    deaths: number;
    kdr: number;

    coins: number;
    murderer_eliminations: number;
    prestige: number;
}
export interface ProcessedGameSKY {
    id: Game.Skywars;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    kills: number;
    deaths: number;
    kdr: number;

    mystery_chests_destroyed: number;
    ores_mined: number;
    spells_used: number;
}
export interface ProcessedGameSKYKITS {
    id: Game.SkywarsKits;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    kills: number;
    deaths: number;
    kdr: number;

    mystery_chests_destroyed: number;
    ores_mined: number;
    spells_used: number;
    selected_kit: string;
}
export interface ProcessedGameSKYCLASSIC {
    id: Game.SkywarsClassic;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    kills: number;
    deaths: number;
    kdr: number;

    selected_kit: string;
}
export interface ProcessedGameSG {
    id: Game.SurvivalGames;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    kills: number;
    deaths: number;
    kdr: number;

    cows: number;
    deathmatches: number;
    crates: number;
    teleporters_used: number;
    launchpads_used: number;
    flares_used: number;
}
export interface ProcessedGameBRIDGE {
    id: Game.TheBridge;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    kills: number;
    deaths: number;
    kdr: number;

    goals: number;
}
export interface ProcessedGameWARS {
    id: Game.TreasureWars;
    xp: number;

    played: number;
    victories: number;
    losses: number;
    win_percentage: number;

    kills: number;
    deaths: number;
    kdr: number;

    final_kills: number;
    treasure_destroyed: number;
    prestige: number;
}
export interface ProcessedGamePARKOUR {
    id: Game.ParkourWorlds;
    worlds: {
        name: string;
        parkour_stars: number;
        courses: {
            name: string;
            best_run_time: number;
            best_checkpoint_times: {
                position: { x: number; y: number; z: number };
                time: number;
            }[];
            collected_stars: { x: number; y: number; z: number }[];
            course_stars: number;
        }[];
    }[];
    total_stars: number;
}
export type AdditionalStatistics<T extends Timeframe, L extends boolean> = (T extends Timeframe.AllTime ? { level: number; first_played: number } : {}) &
    (L extends true ? { position: number } : {});
export interface ProcessedGame<T extends Timeframe, L extends boolean> {
    [Game.BedWars]: ProcessedGameBED & AdditionalStatistics<T, L>;
    [Game.BlockDrop]: ProcessedGameDROP & AdditionalStatistics<T, L>;
    [Game.BlockParty]: ProcessedGamePARTY & AdditionalStatistics<T, L>;
    [Game.CaptureTheFlag]: ProcessedGameCTF & AdditionalStatistics<T, L>;
    [Game.DeathRun]: ProcessedGameDR & AdditionalStatistics<T, L>;
    [Game.Gravity]: ProcessedGameGRAV & AdditionalStatistics<T, L>;
    [Game.GroundWars]: ProcessedGameGROUND & AdditionalStatistics<T, L>;
    [Game.JustBuild]: ProcessedGameBUILD & AdditionalStatistics<T, L>;
    [Game.HideAndSeek]: ProcessedGameHIDE & AdditionalStatistics<T, L>;
    [Game.MurderMystery]: ProcessedGameMURDER & AdditionalStatistics<T, L>;
    [Game.Skywars]: ProcessedGameSKY & AdditionalStatistics<T, L>;
    [Game.SkywarsClassic]: ProcessedGameSKYCLASSIC & AdditionalStatistics<T, L>;
    [Game.SkywarsKits]: ProcessedGameSKYKITS & AdditionalStatistics<T, L>;
    [Game.SurvivalGames]: ProcessedGameSG & AdditionalStatistics<T, L>;
    [Game.TheBridge]: ProcessedGameBRIDGE & AdditionalStatistics<T, L>;
    [Game.TreasureWars]: ProcessedGameWARS & AdditionalStatistics<T, L>;
    [Game.ParkourWorlds]: ProcessedGamePARKOUR;
}

export default function processGame<G extends Game, T extends Timeframe, L extends boolean>(
    game: G,
    timeframe: T,
    isLeaderboard: L,
    response: any
): ProcessedGame<T, L>[G] | null {
    if (!response) return null;
    if ("index" in response && response.index === 2147483646) return null;
    if (typeof response.xp === "undefined") return null;

    let data = processors[game](response) as ProcessedGame<T, L>[G];

    if (timeframe === Timeframe.AllTime && "xp" in data) (data as any).level = calculateLevelFromXP(data.xp, game) ?? 1;
    if (timeframe === Timeframe.AllTime && "first_played" in data) data.first_played = response.first_played;
    if (isLeaderboard && data.id !== Game.ParkourWorlds) (data as any).position = response.human_index;

    return data;
}

export const processors = {
    [Game.BedWars]: (response: any): ProcessedGameBED => ({
        id: Game.BedWars,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills ?? 0,
        deaths: response.deaths ?? 0,
        kdr: calculateKDR(response.kills, response.deaths),

        final_kills: response.final_kills ?? 0,
        beds_destroyed: response.beds_destroyed ?? 0,
    }),
    [Game.BlockDrop]: (response: any): ProcessedGameDROP => ({
        id: Game.BlockDrop,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        deaths: response.deaths ?? 0,
        blocks_destroyed: response.blocks_destroyed ?? 0,
        powerups_collected: response.powerups_collected ?? 0,
        vaults_used: response.vaults_used ?? 0,
    }),
    [Game.BlockParty]: (response: any): ProcessedGamePARTY => ({
        id: Game.BlockParty,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        powerups_collected: response.powerups_collected ?? 0,
        rounds_survived: response.rounds_survived ?? 0,
    }),
    [Game.CaptureTheFlag]: (response: any): ProcessedGameCTF => ({
        id: Game.CaptureTheFlag,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills ?? 0,
        deaths: response.deaths ?? 0,
        kdr: calculateKDR(response.kills, response.deaths),

        assists: response.assists ?? 0,
        flags_captured: response.flags_captured ?? 0,
        flags_returned: response.flags_returned ?? 0,
    }),
    [Game.DeathRun]: (response: any): ProcessedGameDR => ({
        id: Game.DeathRun,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills ?? 0,
        deaths: response.deaths ?? 0,
        kdr: calculateKDR(response.kills, response.deaths),

        checkpoints: response.checkpoints ?? 0,
        activated: response.activated ?? 0,
    }),
    [Game.Gravity]: (response: any): ProcessedGameGRAV => ({
        id: Game.Gravity,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        deaths: response.deaths ?? 0,
        maps_completed: response.maps_completed ?? 0,
        maps_completed_without_dying: response.maps_completed_without_dying ?? 0,
    }),
    [Game.GroundWars]: (response: any): ProcessedGameGROUND => ({
        id: Game.GroundWars,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills ?? 0,
        deaths: response.deaths ?? 0,
        kdr: calculateKDR(response.kills, response.deaths),

        blocks_destroyed: response.blocks_destroyed ?? 0,
        blocks_placed: response.blocks_placed ?? 0,
        projectiles_fired: response.projectiles_fired ?? 0,
    }),
    [Game.JustBuild]: (response: any): ProcessedGameBUILD => ({
        id: Game.JustBuild,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        rating_meh_received: response.rating_meh_received ?? 0,
        rating_okay_received: response.rating_okay_received ?? 0,
        rating_good_received: response.rating_good_received ?? 0,
        rating_great_received: response.rating_great_received ?? 0,
        rating_love_received: response.rating_love_received ?? 0,
        total_ratings: calculateTotal([
            response.rating_meh_received,
            response.rating_okay_received,
            response.rating_good_received,
            response.rating_great_received,
            response.rating_love_received,
        ]),
    }),
    [Game.HideAndSeek]: (response: any): ProcessedGameHIDE => ({
        id: Game.HideAndSeek,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        deaths: response.deaths ?? 0,
        hider_kills: response.hider_kills ?? 0,
        kdr: calculateKDR(response.hider_kills, response.deaths),

        seeker_kills: response.seeker_kills ?? 0,
    }),
    [Game.MurderMystery]: (response: any): ProcessedGameMURDER => ({
        id: Game.MurderMystery,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        murders: response.murders ?? 0,
        deaths: response.deaths ?? 0,
        kdr: calculateKDR(response.murders, response.deaths),

        coins: response.coins ?? 0,
        murderer_eliminations: response.murderer_eliminations ?? 0,
        prestige: response.prestige ?? 0,
    }),
    [Game.Skywars]: (response: any): ProcessedGameSKY => ({
        id: Game.Skywars,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills ?? 0,
        deaths: response.deaths ?? 0,
        kdr: calculateKDR(response.kills, response.deaths),

        mystery_chests_destroyed: response.mystery_chests_destroyed ?? 0,
        ores_mined: response.ores_mined ?? 0,
        spells_used: response.spells_used ?? 0,
    }),
    [Game.SkywarsKits]: (response: any): ProcessedGameSKYKITS => ({
        id: Game.SkywarsKits,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills ?? 0,
        deaths: response.deaths ?? 0,
        kdr: calculateKDR(response.kills, response.deaths),

        mystery_chests_destroyed: response.mystery_chests_destroyed ?? 0,
        ores_mined: response.ores_mined ?? 0,
        spells_used: response.spells_used ?? 0,
        selected_kit: response.selected_kit,
    }),
    [Game.SkywarsClassic]: (response: any): ProcessedGameSKYCLASSIC => ({
        id: Game.SkywarsClassic,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills ?? 0,
        deaths: response.deaths ?? 0,
        kdr: calculateKDR(response.kills, response.deaths),

        selected_kit: response.selected_kit,
    }),
    [Game.SurvivalGames]: (response: any): ProcessedGameSG => ({
        id: Game.SurvivalGames,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills ?? 0,
        deaths: response.deaths ?? 0,
        kdr: calculateKDR(response.kills, response.deaths),

        cows: response.cows ?? 0,
        deathmatches: response.deathmatches ?? 0,
        crates: response.crates ?? 0,
        teleporters_used: response.teleporters_used ?? 0,
        launchpads_used: response.launchpads_used ?? 0,
        flares_used: response.flares_used ?? 0,
    }),
    [Game.TheBridge]: (response: any): ProcessedGameBRIDGE => ({
        id: Game.TheBridge,
        xp: response.xp ?? 0,

        played: response.played ?? response.m_solo_played ?? 0,
        victories: response.victories ?? response.m_solo_victories ?? 0,
        losses: calculateLosses(response.played ?? response.m_solo_played, response.victories ?? response.m_solo_victories),
        win_percentage: calculateWinPercentage(response.victories ?? response.m_solo_victories, response.played ?? response.m_solo_played),

        kills: response.kills ?? response.m_solo_kills ?? 0,
        deaths: response.deaths ?? response.m_solo_deaths ?? 0,
        kdr: calculateKDR(response.kills ?? response.m_solo_kills, response.deaths ?? response.m_solo_deaths),

        goals: response.goals ?? response.m_solo_goals ?? 0,
    }),
    [Game.TreasureWars]: (response: any): ProcessedGameWARS => ({
        id: Game.TreasureWars,
        xp: response.xp ?? 0,

        played: response.played ?? 0,
        victories: response.victories ?? 0,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills ?? 0,
        deaths: response.deaths ?? 0,
        kdr: calculateKDR(response.kills, response.deaths),

        final_kills: response.final_kills ?? 0,
        treasure_destroyed: response.treasure_destroyed ?? 0,
        prestige: response.prestige ?? 0,
    }),
    [Game.ParkourWorlds]: (response: any): ProcessedGamePARKOUR => ({
        id: Game.ParkourWorlds,
        worlds: Object.entries(response.parkours)
            .filter(([_, value]) => typeof value === "object")
            .map(([key, value]: [string, any]) => ({
                name: key,
                parkour_stars: value.parkour_stars ?? 0,
                courses: Object.entries(value)
                    .filter(([_, value]) => typeof value === "object")
                    .map(([key, value]: [string, any]) => ({
                        name: key,
                        best_run_time: value.best_run_time,
                        best_checkpoint_times: Object.entries(value.best_checkpoint_times).map(([key, value]: [string, any]) => ({
                            position: { x: Number(key.split(",")[0]), y: Number(key.split(",")[1]), z: Number(key.split(",")[2]) },
                            time: value,
                        })),
                        collected_stars: value.collected_stars.map((value: string) => ({
                            x: Number(value.split(",")[0]),
                            y: Number(value.split(",")[1]),
                            z: Number(value.split(",")[2]),
                        })),
                        course_stars: value.course_stars ?? 0,
                    })),
            })) as any,
        total_stars: response.parkours.total_stars ?? 0,
    }),
};

export function validateNumber(value: number, def: number = 0): number {
    if (isNaN(value) || !isFinite(value)) return def;
    return value ?? def;
}
export function calculateKDR(kills: number, deaths: number): number {
    if (deaths === 0) return validateNumber(kills ?? 0);
    return roundTo(validateNumber((kills ?? 0) / (deaths ?? 0)), 2);
}
export function calculateWinPercentage(victories: number, played: number): number {
    if (victories === 0 && played === 0) return 0;
    return validateNumber((victories ?? 0) / (played ?? 0));
}
export function calculateLosses(played: number, victories: number): number {
    return validateNumber((played ?? 0) - (victories ?? 0));
}
export function calculateTotal(values: number[]): number {
    return validateNumber(values.reduce((a, b) => (a ?? 0) + (b ?? 0), 0));
}
export function roundTo(value: number, places: number = 2): number {
    return validateNumber(Number(value.toFixed(places)));
}

export interface ProcessedAllGamesResponse {
    player: ProcessedPlayerResponse;
    statistics: {
        [G in Game]: ProcessedGame<Timeframe.AllTime, false>[G] | null;
    };
}

export interface ProcessedMonthlyGamesResponse {
    statistics: {
        [G in Game]: ProcessedGame<Timeframe.Monthly, false>[G] | null;
    };
}
