import { Game, Statistics, Timeframe } from "hive-bedrock-data";
import processGameAndXP from "./helpers/processGameAndXP";
import processPlayedAndVictories from "./helpers/processPlayedAndVictories";
import { OmittedSpecialStatistics } from "../types/types";
import processBuildRatings from "./helpers/processBuildRatings";

export interface Processed_BuildBattle_AllTimeStatistics
    extends OmittedSpecialStatistics<Game.BuildBattle, Timeframe.AllTime> {
    id: Game.BuildBattle;
    level: number;

    losses: number;
    win_percentage: number;

    total_ratings: number;
    first_played: number | null;
}
export interface Processed_BuildBattle_MonthlyStatistics
    extends Statistics<Game.BuildBattle, Timeframe.Monthly> {
    id: Game.BuildBattle;
    level: number;

    total_ratings: number;

    losses: number;
    win_percentage: number;
}

export function processAllTime_BUILD(
    statistics: Partial<Statistics<Game.BuildBattle, Timeframe.AllTime>>
): Processed_BuildBattle_AllTimeStatistics | null {
    if (!statistics || Array.isArray(statistics)) return null;
    return {
        UUID: statistics.UUID!,

        ...processGameAndXP(Game.BuildBattle, statistics.xp),
        ...processPlayedAndVictories(statistics.played, statistics.victories),
        ...processBuildRatings(
            statistics.rating_love_received,
            statistics.rating_great_received,
            statistics.rating_good_received,
            statistics.rating_okay_received,
            statistics.rating_meh_received
        ),

        first_played: statistics.first_played ?? null,
    };
}

export function processMonthly_BUILD(
    statistics: Partial<Statistics<Game.BuildBattle, Timeframe.Monthly>>
): Processed_BuildBattle_MonthlyStatistics | null {
    if (!statistics || Array.isArray(statistics)) return null;
    let index = statistics.index ?? 0;

    return {
        index: statistics.index ?? 0,
        human_index: index + 1,
        username: statistics.username!,

        ...processGameAndXP(Game.BuildBattle, statistics.xp),
        ...processPlayedAndVictories(statistics.played, statistics.victories),
        ...processBuildRatings(
            statistics.rating_love_received,
            statistics.rating_great_received,
            statistics.rating_good_received,
            statistics.rating_okay_received,
            statistics.rating_meh_received
        ),
    };
}
