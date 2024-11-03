import { calculateLevelFromXP, Game, Timeframe } from "hive-bedrock-data";

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
export type AdditionalStatistics<T extends Timeframe, L extends boolean> = (T extends Timeframe.AllTime ? { level: number; first_played: number } : never) &
    (L extends true ? { position: number } : never);
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

    let data = processors[game](response) as ProcessedGame<T, L>[G];

    if (timeframe === Timeframe.AllTime && "xp" in data) data.level = calculateLevelFromXP(data.xp, game) ?? 1;
    if (timeframe === Timeframe.AllTime && "first_played" in data) data.first_played = response.first_played;
    if (isLeaderboard && data.id !== Game.ParkourWorlds) data.position = response.human_index;

    return data;
}

export const processors = {
    [Game.BedWars]: (response: any): ProcessedGameBED => ({
        id: Game.BedWars,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills,
        deaths: response.deaths,
        kdr: calculateKDR(response.kills, response.deaths),

        final_kills: response.final_kills,
        beds_destroyed: response.beds_destroyed,
    }),
    [Game.BlockDrop]: (response: any): ProcessedGameDROP => ({
        id: Game.BlockDrop,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        deaths: response.deaths,
        blocks_destroyed: response.blocks_destroyed,
        powerups_collected: response.powerups_collected,
        vaults_used: response.vaults_used,
    }),
    [Game.BlockParty]: (response: any): ProcessedGamePARTY => ({
        id: Game.BlockParty,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        powerups_collected: response.powerups_collected,
        rounds_survived: response.rounds_survived,
    }),
    [Game.CaptureTheFlag]: (response: any): ProcessedGameCTF => ({
        id: Game.CaptureTheFlag,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills,
        deaths: response.deaths,
        kdr: calculateKDR(response.kills, response.deaths),

        assists: response.assists,
        flags_captured: response.flags_captured,
        flags_returned: response.flags_returned,
    }),
    [Game.DeathRun]: (response: any): ProcessedGameDR => ({
        id: Game.DeathRun,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills,
        deaths: response.deaths,
        kdr: calculateKDR(response.kills, response.deaths),

        checkpoints: response.checkpoints,
        activated: response.activated,
    }),
    [Game.Gravity]: (response: any): ProcessedGameGRAV => ({
        id: Game.Gravity,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        deaths: response.deaths,
        maps_completed: response.maps_completed,
        maps_completed_without_dying: response.maps_completed_without_dying,
    }),
    [Game.GroundWars]: (response: any): ProcessedGameGROUND => ({
        id: Game.GroundWars,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills,
        deaths: response.deaths,
        kdr: calculateKDR(response.kills, response.deaths),

        blocks_destroyed: response.blocks_destroyed,
        blocks_placed: response.blocks_placed,
        projectiles_fired: response.projectiles_fired,
    }),
    [Game.JustBuild]: (response: any): ProcessedGameBUILD => ({
        id: Game.JustBuild,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        rating_meh_received: response.rating_meh_received,
        rating_okay_received: response.rating_okay_received,
        rating_good_received: response.rating_good_received,
        rating_great_received: response.rating_great_received,
        rating_love_received: response.rating_love_received,
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
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        deaths: response.deaths,
        hider_kills: response.hider_kills,
        kdr: calculateKDR(response.hider_kills, response.deaths),

        seeker_kills: response.seeker_kills,
    }),
    [Game.MurderMystery]: (response: any): ProcessedGameMURDER => ({
        id: Game.MurderMystery,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        murders: response.murders,
        deaths: response.deaths,
        kdr: calculateKDR(response.murders, response.deaths),

        coins: response.coins,
        murderer_eliminations: response.murderer_eliminations,
        prestige: response.prestige,
    }),
    [Game.Skywars]: (response: any): ProcessedGameSKY => ({
        id: Game.Skywars,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills,
        deaths: response.deaths,
        kdr: calculateKDR(response.kills, response.deaths),

        mystery_chests_destroyed: response.mystery_chests_destroyed,
        ores_mined: response.ores_mined,
        spells_used: response.spells_used,
    }),
    [Game.SkywarsKits]: (response: any): ProcessedGameSKYKITS => ({
        id: Game.SkywarsKits,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills,
        deaths: response.deaths,
        kdr: calculateKDR(response.kills, response.deaths),

        mystery_chests_destroyed: response.mystery_chests_destroyed,
        ores_mined: response.ores_mined,
        spells_used: response.spells_used,
        selected_kit: response.selected_kit,
    }),
    [Game.SkywarsClassic]: (response: any): ProcessedGameSKYCLASSIC => ({
        id: Game.SkywarsClassic,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills,
        deaths: response.deaths,
        kdr: calculateKDR(response.kills, response.deaths),

        selected_kit: response.selected_kit,
    }),
    [Game.SurvivalGames]: (response: any): ProcessedGameSG => ({
        id: Game.SurvivalGames,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills,
        deaths: response.deaths,
        kdr: calculateKDR(response.kills, response.deaths),

        cows: response.cows,
        deathmatches: response.deathmatches,
        crates: response.crates,
        teleporters_used: response.teleporters_used,
        launchpads_used: response.launchpads_used,
        flares_used: response.flares_used,
    }),
    [Game.TheBridge]: (response: any): ProcessedGameBRIDGE => ({
        id: Game.TheBridge,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills,
        deaths: response.deaths,
        kdr: calculateKDR(response.kills, response.deaths),

        goals: response.goals,
    }),
    [Game.TreasureWars]: (response: any): ProcessedGameWARS => ({
        id: Game.TreasureWars,
        xp: response.xp,

        played: response.played,
        victories: response.victories,
        losses: calculateLosses(response.played, response.victories),
        win_percentage: calculateWinPercentage(response.victories, response.played),

        kills: response.kills,
        deaths: response.deaths,
        kdr: calculateKDR(response.kills, response.deaths),

        final_kills: response.final_kills,
        treasure_destroyed: response.treasure_destroyed,
        prestige: response.prestige,
    }),
    [Game.ParkourWorlds]: (response: any): ProcessedGamePARKOUR => ({
        id: Game.ParkourWorlds,
        worlds: Object.entries(response.parkours)
            .filter(([_, value]) => typeof value === "object")
            .map(([key, value]: [string, any]) => ({
                name: key,
                parkour_stars: value.parkour_stars,
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
                        course_stars: value.course_stars,
                    })),
            })) as any,
        total_stars: response.parkours.total_stars,
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
