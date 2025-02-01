import { API_BASE_ENDPOINT, Game, Timeframe } from "hive-bedrock-data";
import { MethodResponse } from "./utils";
import processPlayerInfo, { ProcessedPlayerResponse } from "./processors/player";
import { ProcessedGlobalStatisticsResponse } from "./processors/global_statistics";
import { ProcessedMapResponse } from "./processors/map";
import { ProcessedGameMetadata } from "./processors/meta";
import processPlayerSearch, { ProcessedPlayerSearchResponse } from "./processors/player_search";
import processGame, { ProcessedAllGamesResponse, ProcessedGame, ProcessedMonthlyGamesResponse } from "./processors/game";

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
                duration: Math.ceil(performance.now() - start),
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

    /**
     * `/game/all/main/{identifier}` Gets information about a player
     * @param identifier Username or UUID of the player
     * @returns The player information
     */
    public async getPlayer(identifier: string): Promise<MethodResponse<ProcessedPlayerResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/all/main/${identifier}`);
        if (error) return { data: null, error, meta };

        const data = processPlayerInfo(response);
        if (!data) return { data: null, error: { status: 500, message: "Failed to process player data" }, meta };

        return { data, error: null, meta };
    }
    /**
     * `/player/search/{prefix}` Gets a list of players that match the prefix
     * @param prefix The prefix to search for (must be at least 4 characters long)
     * @returns A list of players that match the prefix
     */
    public async getPlayerSearch(prefix: string): Promise<MethodResponse<ProcessedPlayerSearchResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/player/search/${prefix}`);
        if (error) return { data: null, error, meta };

        const data = processPlayerSearch(response);
        if (!data) return { data: null, error: { status: 500, message: "Failed to process player search data" }, meta };

        return { data, error: null, meta };
    }

    /**
     * Gets statistics for a player
     * @param identifier Username or UUID of the player
     * @param timeframe The timeframe to get the statistics for
     * @param options Additional options including specific game, month, and year
     * @returns The player statistics
     */
    public async getStatistics(identifier: string, timeframe: Timeframe.AllTime): Promise<MethodResponse<ProcessedAllGamesResponse>>;
    public async getStatistics<G extends Game>(
        identifier: string,
        timeframe: Timeframe.AllTime,
        options: { game: G }
    ): Promise<MethodResponse<ProcessedGame<Timeframe.AllTime, false>[G]>>;
    public async getStatistics(
        identifier: string,
        timeframe: Timeframe.Monthly,
        options?: { month?: number; year?: number }
    ): Promise<MethodResponse<ProcessedAllGamesResponse>>;
    public async getStatistics<G extends Game>(
        identifier: string,
        timeframe: Timeframe.Monthly,
        options: { game: G; month?: number; year?: number }
    ): Promise<MethodResponse<ProcessedGame<Timeframe.Monthly, false>[G]>>;
    public async getStatistics(identifier: string, timeframe: Timeframe, options?: { game?: Game; month?: number; year?: number }) {
        if (timeframe === Timeframe.AllTime) {
            if (options?.game) return this._getStatisticsAllTime(identifier, options.game);
            return this._getStatisticsAllTime(identifier);
        }

        if (options?.game) return this._getStatisticsMonthly(identifier, options.game, options.month, options.year);
        return this._getStatisticsMonthly(identifier, undefined, options?.month, options?.year);
    }
    // /game/all/{game}/{player}
    private async _getStatisticsAllTime(identifier: string): Promise<MethodResponse<ProcessedAllGamesResponse>>;
    private async _getStatisticsAllTime<G extends Game>(identifier: string, game: G): Promise<MethodResponse<ProcessedGame<Timeframe.AllTime, false>[G]>>;
    private async _getStatisticsAllTime<G extends Game>(
        identifier: string,
        game?: G
    ): Promise<MethodResponse<ProcessedAllGamesResponse | (ProcessedGame<Timeframe.AllTime, false>[G] | null)>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/all/${game ?? "all"}/${identifier}`);
        if (error) return { data: null, error, meta };

        if (game) return { data: processGame(game, Timeframe.AllTime, false, response), error: null, meta };

        let data = Object.fromEntries(
            Object.entries(response).map(([id, res]) => [id, id === "main" ? null : processGame(id as Game, Timeframe.AllTime, false, res) ?? null])
        );
        delete data.main;
        return {
            data: {
                player: processPlayerInfo(response),
                statistics: data,
            } as ProcessedAllGamesResponse,
            error: null,
            meta,
        };
    }
    // /game/monthly/{game}/{player}/{month}/{year}
    private async _getStatisticsMonthly(
        identifier: string,
        game: undefined,
        month?: number,
        year?: number
    ): Promise<MethodResponse<ProcessedMonthlyGamesResponse>>;
    private async _getStatisticsMonthly<G extends Game>(
        identifier: string,
        game: G,
        month?: number,
        year?: number
    ): Promise<MethodResponse<ProcessedGame<Timeframe.Monthly, false>[G]>>;
    private async _getStatisticsMonthly<G extends Game>(
        identifier: string,
        game?: G,
        month?: number,
        year?: number
    ): Promise<MethodResponse<ProcessedMonthlyGamesResponse | (ProcessedGame<Timeframe.Monthly, false>[G] | null)>> {
        const {
            data: response,
            error,
            meta,
        } = await this._fetchAPI<any>(
            `/game/monthly/player/${game ?? "all"}/${identifier}/${year ?? new Date().getFullYear()}/${month ?? new Date().getMonth() + 1}`
        );
        if (error) return { data: null, error, meta };

        if (game) return { data: processGame(game, Timeframe.Monthly, false, response), error: null, meta };

        let data = Object.fromEntries(
            Object.entries(response).map(([id, res]) => [id, id === "main" ? null : processGame(id as Game, Timeframe.Monthly, false, res) ?? null])
        );
        delete data.main;
        return {
            data: {
                statistics: data,
            } as ProcessedMonthlyGamesResponse,
            error: null,
            meta,
        };
    }

    /**
     * `/game/season/player/{game}/{player}/{season}` Gets seasonal statistics for a player
     * @param identifier Username or UUID of the player
     * @param game The game to get the statistics for
     * @param season The season to get the statistics for
     * @returns The player's seasonal statistics
     */
    public async getSeasonalStatistics<G extends Game>(
        identifier: string,
        game: G,
        season: number = 1
    ): Promise<MethodResponse<ProcessedGame<Timeframe.Monthly, true>[G] | null>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/season/player/${game}/${identifier}/${season}`);
        if (error) return { data: null, error, meta };
        let data = processGame(game, Timeframe.Monthly, true, response);
        return { data, error: null, meta };
    }

    /**
     * `/game/all/{game}` Gets statistics for a game
     * @param timeframe The timeframe to get the statistics for
     * @param game The game to get the statistics for
     * @param options Additional options including specific month and year
     */
    public async getLeaderboard<G extends Game>(
        timeframe: Timeframe.AllTime,
        game: G
    ): Promise<MethodResponse<ProcessedGame<Timeframe.AllTime, true>[G][] | null>>;
    public async getLeaderboard<G extends Game>(
        timeframe: Timeframe.Monthly,
        game: G
    ): Promise<MethodResponse<ProcessedGame<Timeframe.Monthly, true>[G][] | null>>;
    public async getLeaderboard<G extends Game>(
        timeframe: Timeframe.Monthly,
        game: G,
        options: { month?: number; year?: number }
    ): Promise<MethodResponse<ProcessedGame<Timeframe.Monthly, true>[G][] | null>>;
    public async getLeaderboard<T extends Timeframe, G extends Game>(
        timeframe: T,
        game: G,
        options?: { month?: number; year?: number }
    ): Promise<MethodResponse<ProcessedGame<Timeframe, true>[G][] | null>> {
        if (timeframe === Timeframe.Monthly)
            return this._getLeaderboardMonthly(game, options?.month || new Date().getMonth() + 1, options?.year || new Date().getFullYear());
        return this._getLeaderboardAllTime(game);
    }
    // /game/all/{game}
    private async _getLeaderboardAllTime<G extends Game>(game: G): Promise<MethodResponse<ProcessedGame<Timeframe.AllTime, true>[G][] | null>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/all/${game}`);
        if (error) return { data: null, error, meta };
        let data = response.map((res: any) => processGame(game, Timeframe.AllTime, true, res));
        return { data, error: null, meta };
    }
    // /game/monthly/{game}/{year}/{month}
    private async _getLeaderboardMonthly<G extends Game>(
        game: G,
        month: number,
        year: number
    ): Promise<MethodResponse<ProcessedGame<Timeframe.Monthly, true>[G][] | null>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/monthly/${game}/${year}/${month}`);
        if (error) return { data: null, error, meta };
        let data = response.map((res: any) => processGame(game, Timeframe.Monthly, true, res));
        return { data, error: null, meta };
    }
    /**
     * `/game/season/{game}/{season}` Gets seasonal statistics for a game
     * @param game The game to get the statistics for
     * @param season The season to get the statistics for
     * @returns The seasonal statistics for the game
     */
    public async getSeasonalLeaderboard<G extends Game>(game: G, season: number = 1): Promise<MethodResponse<ProcessedGame<Timeframe.Monthly, true>[G][]>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/season/${game}/${season ?? 1}`);
        if (error) return { data: null, error, meta };
        let data = response.map((res: any) => processGame(game, Timeframe.Monthly, true, res));
        return { data, error: null, meta };
    }

    /**
     * `/global/statistics` Gets global statistics
     * @returns The global statistics
     */
    public async getGlobalStatistics(): Promise<MethodResponse<ProcessedGlobalStatisticsResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>("/global/statistics");
        if (error) return { data: null, error, meta };
        return { data: response, error: null, meta };
    }
    /**
     * `/game/map/{game}` Gets information about the maps in a game
     * @param game The game to get the maps for (fails for games without maps)
     * @returns A list of maps in the game
     */
    public async getGameMaps(game: Game): Promise<MethodResponse<ProcessedMapResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/map/${game}`);
        if (error) return { data: null, error, meta };
        return { data: response, error: null, meta };
    }
    /**
     * `/game/meta/{game}` Gets metadata about a game
     * @param game The game to get the metadata for
     * @returns The metadata for the game
     */
    public async getGameMetadata(game: Game): Promise<MethodResponse<ProcessedGameMetadata>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/meta/${game}`);
        if (error) return { data: null, error, meta };
        return { data: response, error: null, meta };
    }
}
