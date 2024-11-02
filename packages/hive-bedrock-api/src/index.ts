import { API_BASE_ENDPOINT, Game, Timeframe } from "hive-bedrock-data";
import { MethodResponse } from "./utils";
import processPlayerInfo, { ProcessedPlayerResponse } from "./processors/player";
import { ProcessedGlobalStatisticsResponse } from "./processors/global_statistics";
import { ProcessedMapResponse } from "./processors/map";
import { ProcessedGameMetadata } from "./processors/meta";

type TODO = any;

interface Options {
    resolveDynamicTitles?: boolean;
    apiBaseEndpoint?: string;
    requestInit?: RequestInit;
}

export default class HiveAPI {
    constructor(public options: Options = { resolveDynamicTitles: true, apiBaseEndpoint: API_BASE_ENDPOINT }) {}

    private async _fetchAPI<R extends any>(endpoint: string): Promise<MethodResponse<R>> {
        const url = this.options.apiBaseEndpoint + endpoint;

        try {
            const start = performance.now();
            const request = await fetch(url, {
                ...this.options.requestInit,
                headers: {
                    "X-Hive-Resolve-Stat-Track": (this.options.resolveDynamicTitles ?? true).toString(),
                    ...this.options.requestInit?.headers,
                },
            });
            if (!request.ok) return { data: null, error: { status: request.status } };

            const meta: MethodResponse<any>["meta"] = {
                duration: performance.now() - start,
                ratelimit: {
                    limit: Number(request.headers.get("X-Ratelimit-Limit")),
                    remaining: Number(request.headers.get("X-Ratelimit-Remaining")),
                    reset: Number(request.headers.get("X-Ratelimit-Reset")),
                },
                retryAfter: Number(request.headers.get("Retry-After")),
            };

            const response = await request.json();
            return { data: response, error: null, meta };
        } catch (err) {
            return { data: null, error: { status: 500, message: (err as any).message } };
        }
    }

    // /game/all/main/{player}
    public async getPlayer(identifier: string): Promise<MethodResponse<ProcessedPlayerResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/all/main/${identifier}`);
        if (error) return { data: null, error, meta };

        const data = processPlayerInfo(response);
        if (!data) return { data: null, error: { status: 500, message: "Failed to process player data" }, meta };

        return { data, error: null, meta };
    }
    // /player/search/{prefix}
    public async getPlayerSearch(prefix: string): Promise<TODO> {}

    // /game/{timeframe}/[all/{game}]/{player}
    public async getStatistics(identifier: string, timeframe: Timeframe, options: { game?: Game; month?: number; year?: number }): Promise<TODO> {}
    // /game/season/player/{game}/{player}/{season};
    public async getSeasonalStatistics(identifier: string, game: Game, season?: number): Promise<TODO> {}

    // /game/{timeframe}/{game}
    public async getLeaderboard(identifier: string, timeframe: Timeframe, game: Game, options?: { month?: number; year?: number }): Promise<TODO> {}
    // /game/season/{game}/{season}
    public async getSeasonalLeaderboard(identifier: string, game: Game, season?: number): Promise<TODO> {}

    // /global/statistics
    public async getGlobalStatistics(): Promise<MethodResponse<ProcessedGlobalStatisticsResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>("/global/statistics");
        if (error) return { data: null, error, meta };
        return { data: response, error: null, meta };
    }
    // /game/map/{game}
    public async getGameMaps(game: Game): Promise<MethodResponse<ProcessedMapResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/map/${game}`);
        if (error) return { data: null, error, meta };
        return { data: response, error: null, meta };
    }
    // /game/meta/{game}
    public async getGameMetadata(game: Game): Promise<MethodResponse<ProcessedGameMetadata>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/meta/${game}`);
        if (error) return { data: null, error, meta };
        return { data: response, error: null, meta };
    }
}
