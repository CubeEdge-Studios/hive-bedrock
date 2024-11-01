import { Game, Leaderboards, Statistics, Timeframe } from "hive-bedrock-data";
import { APIResponse, Options } from "../types/types";
import fetchEndpoint from "../helpers/fetchEndpoint";
import isGame from "../helpers/isGame";
import { MonthlyProcessedLeaderboard } from "../types/output";
import { LeaderboardProcessors } from "../processors";

interface MonthlyOptions extends Options {
    month: number;
    year: number;
    amount: number;
    skip: number;
}
export default function getMonthlyLeaderboard<G extends Game>(
    game_id: G,
    options?: Partial<MonthlyOptions>
): Promise<APIResponse<MonthlyProcessedLeaderboard<G>>>;

export default async function getMonthlyLeaderboard<G extends Game>(
    game_id: G,
    options?: Partial<MonthlyOptions>
) {
    if (!isGame(game_id))
        return {
            status: 404,
            error: {
                code: 404,
                message: "Game not found.",
            },
            data: null,
        };

    let current_date = new Date();
    let endpoint = `/game/monthly/${game_id}/${options?.year ?? current_date.getFullYear()}/${
        options?.month ?? current_date.getMonth() + 1
    }/${options?.amount ?? 100}/${options?.skip ?? 0}` as const;

    let response = await fetchEndpoint(endpoint, options?.init);
    if (response.error) return response;

    let response_data = response.data as Leaderboards<G, Timeframe.Monthly>[];
    let processed_data = Array.from(response_data).map((statistics) =>
        LeaderboardProcessors[game_id](statistics as any)
    );

    return {
        ...response,
        data: processed_data,
        error: null,
    };
}
