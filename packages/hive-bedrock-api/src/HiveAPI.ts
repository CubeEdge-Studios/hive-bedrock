import { API_BASE_ENDPOINT, Game, Games, Timeframe } from "hive-bedrock-data";
import { MethodResponse } from "./utils.js";
import processPlayerInfo, { ProcessedPlayerResponse } from "./processors/player.js";
import { ProcessedGlobalStatisticsResponse } from "./processors/global_statistics.js";
import { ProcessedMapResponse } from "./processors/map.js";
import { ProcessedGameMetadata } from "./processors/meta.js";
import processPlayerSearch, { ProcessedPlayerSearchResponse } from "./processors/player_search.js";
import { processGame, AvailableLeaderboardResponse, ProcessedAllGamesResponse, ProcessedGame, ProcessedMonthlyGamesResponse } from "./processors/game.js";

interface Options {
    resolveDynamicTitles?: boolean;
    useModernLeaderboardSource?: boolean;

    apiBaseEndpoint?: string;
    requestInit?: RequestInit;
}
interface MethodOptions {
    requestInit?: RequestInit;
}

export default class HiveAPI {
    constructor(public options: Options = {}) {
        this.options = options;
        this.options.apiBaseEndpoint = this.options.apiBaseEndpoint ?? API_BASE_ENDPOINT;
    }

    private async _fetchAPI<R extends any>(endpoint: string, requestInit?: RequestInit): Promise<MethodResponse<R>> {
        const url = this.options.apiBaseEndpoint + endpoint;

        try {
            const start = performance.now();
            const request = await fetch(url, {
                ...this.options.requestInit,
                ...requestInit,
                headers: {
                    "X-Hive-Resolve-Stat-Track": (this.options.resolveDynamicTitles ?? true).toString(),
                    "X-Hive-Leaderboard-Source": this.options.useModernLeaderboardSource ? "modern" : "legacy",
                    ...this.options.requestInit?.headers,
                    ...requestInit?.headers,
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
    public async getPlayer(identifier: string, options?: Partial<MethodOptions>): Promise<MethodResponse<ProcessedPlayerResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/all/main/${identifier}`, options?.requestInit);
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
    public async getPlayerSearch(prefix: string, options?: Partial<MethodOptions>): Promise<MethodResponse<ProcessedPlayerSearchResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/player/search/${prefix}`, options?.requestInit);
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
    public async getStatistics(
        identifier: string,
        timeframe: Timeframe.Monthly,
        month?: number,
        year?: number,
        options?: Partial<MethodOptions>,
    ): Promise<MethodResponse<ProcessedMonthlyGamesResponse>>;
    public async getStatistics<G extends Game>(
        identifier: string,
        timeframe: Timeframe.Seasonal,
        game: G,
        season?: number,
        options?: Partial<MethodOptions>,
    ): Promise<MethodResponse<ProcessedMonthlyGamesResponse["statistics"][G]>>;
    public async getStatistics(identifier: string, timeframe: Timeframe, ...args: any[]) {
        if (timeframe === Timeframe.AllTime) {
            let options = args[0] as Partial<MethodOptions> | undefined;
            return this._getStatisticsAllTime(identifier, options);
        }

        if (timeframe === Timeframe.Seasonal) {
            let game = args[0] as Game | undefined;
            let season = args[1] as number | undefined;
            let options = args[2] as Partial<MethodOptions> | undefined;

            if (!game) throw new Error("Game must be specified for seasonal statistics");
            if (Object.values(Game).indexOf(game) === -1) throw new Error(`Invalid game specified: ${game}`);
            if (!Games[game].statistics) throw new Error(`Statistics are not available for the game: ${game}`);
            if (season !== undefined && (isNaN(season) || season < 1)) throw new Error("Season must be a positive integer");
            if (!season) season = 1;

            return this._getStatisticsSeasonal(identifier, game, season, options);
        }

        let month = args[0] as number | undefined;
        let year = args[1] as number | undefined;
        let options = args[2] as Partial<MethodOptions> | undefined;
        if (month !== undefined && (isNaN(month) || month < 1 || month > 12)) throw new Error("Month must be a number between 1 and 12");
        if (year !== undefined && (isNaN(year) || year < 1970)) throw new Error("Year must be a number greater than or equal to 1970");
        if (!month) month = new Date().getMonth() + 1;
        if (!year) year = new Date().getFullYear();

        return this._getStatisticsMonthly(identifier, month, year, options);
    }
    // /game/all/{game}/{player}
    private async _getStatisticsAllTime(identifier: string, options?: Partial<MethodOptions>): Promise<MethodResponse<ProcessedAllGamesResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/all/all/${identifier}`, options?.requestInit);
        if (error) return { data: null, error, meta };

        let data = Object.fromEntries(
            Object.entries(response).map(([id, res]) => [id, id === "main" ? null : (processGame(id as Game, Timeframe.AllTime, false, res) ?? null)]),
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
        month?: number,
        year?: number,
        options?: Partial<MethodOptions>,
    ): Promise<MethodResponse<ProcessedMonthlyGamesResponse>> {
        const {
            data: response,
            error,
            meta,
        } = await this._fetchAPI<any>(
            `/game/monthly/player/all/${identifier}/${year ?? new Date().getFullYear()}/${month ?? new Date().getMonth() + 1}`,
            options?.requestInit,
        );
        if (error) return { data: null, error, meta };

        let data = Object.fromEntries(
            Object.entries(response).map(([id, res]) => [id, id === "main" ? null : (processGame(id as Game, Timeframe.Monthly, false, res) ?? null)]),
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
    // /game/season/player/{game}/{player}/{season}
    private async _getStatisticsSeasonal<G extends Game>(
        identifier: string,
        game: G,
        season?: number,
        options?: Partial<MethodOptions>,
    ): Promise<MethodResponse<ProcessedGame<Timeframe.Seasonal, false>[G] | null>> {
        if (!Games[game].statistics) throw new Error(`Statistics are not available for the game: ${game}`);
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/season/player/${game}/${identifier}/${season ?? 1}`, options?.requestInit);
        if (error) return { data: null, error, meta };
        return { data: processGame(game, Timeframe.Seasonal, false, response), error: null, meta };
    }

    public async getAvailableMonthlyLeaderboards<G extends Game>(
        game: G,
        options?: Partial<MethodOptions>,
    ): Promise<MethodResponse<AvailableLeaderboardResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/monthly/${game}/available`, options?.requestInit);
        if (error) return { data: null, error, meta };
        return { data: response, error: null, meta };
    }

    /**
     * `/game/all/{game}` Gets statistics for a game
     * @param timeframe The timeframe to get the statistics for
     * @param game The game to get the statistics for
     * @param options Additional options including specific month and year
     */
    public async getLeaderboard<G extends Game>(
        timeframe: Timeframe.AllTime,
        game: G,
        options?: Partial<MethodOptions>,
    ): Promise<MethodResponse<ProcessedGame<Timeframe.AllTime, true>[G][] | null>>;
    public async getLeaderboard<G extends Game>(
        timeframe: Timeframe.Monthly,
        game: G,
        month?: number,
        year?: number,
        options?: Partial<MethodOptions>,
    ): Promise<MethodResponse<ProcessedGame<Timeframe.Monthly, true>[G][] | null>>;
    public async getLeaderboard<G extends Game>(
        timeframe: Timeframe.Seasonal,
        game: G,
        season?: number,
        options?: Partial<MethodOptions>,
    ): Promise<MethodResponse<ProcessedGame<Timeframe.Seasonal, true>[G][] | null>>;
    public async getLeaderboard<T extends Timeframe, G extends Game>(
        timeframe: T,
        game: G,
        ...args: any[]
    ): Promise<MethodResponse<ProcessedGame<Timeframe, true>[G][] | null>> {
        if (game && !Games[game].statistics) throw new Error(`Statistics are not available for the game: ${game}`);

        if (timeframe === Timeframe.Monthly) {
            let month = args[0] as number | undefined;
            let year = args[1] as number | undefined;
            let options = args[2] as Partial<MethodOptions> | undefined;

            if (month !== undefined && (isNaN(month) || month < 1 || month > 12)) throw new Error("Month must be a number between 1 and 12");
            if (year !== undefined && (isNaN(year) || year < 1970)) throw new Error("Year must be a number greater than or equal to 1970");
            if (!month) month = new Date().getMonth() + 1;
            if (!year) year = new Date().getFullYear();

            return this._getLeaderboardMonthly(game, month, year, options);
        }
        if (timeframe === Timeframe.Seasonal) {
            let season = args[0] as number | undefined;
            let options = args[1] as Partial<MethodOptions> | undefined;
            if (season !== undefined && (isNaN(season) || season < 1)) throw new Error("Season must be a positive integer");
            if (!season) season = 1;

            return this._getLeaderboardSeasonal(game, season, options);
        }

        let options = args[0] as Partial<MethodOptions> | undefined;
        return this._getLeaderboardAllTime(game, options);
    }
    // /game/all/{game}
    private async _getLeaderboardAllTime<G extends Game>(
        game: G,
        options?: Partial<MethodOptions>,
    ): Promise<MethodResponse<ProcessedGame<Timeframe.AllTime, true>[G][] | null>> {
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/all/${game}`, options?.requestInit);
        if (error) return { data: null, error, meta };
        let data = response.map((res: any) => processGame(game, Timeframe.AllTime, true, res));
        return { data, error: null, meta };
    }
    // /game/monthly/{game}/{year}/{month}
    private async _getLeaderboardMonthly<G extends Game>(
        game: G,
        month: number,
        year: number,
        options?: Partial<MethodOptions>,
    ): Promise<MethodResponse<ProcessedGame<Timeframe.Monthly, true>[G][] | null>> {
        if (game && !Games[game].statistics) throw new Error(`Statistics are not available for the game: ${game}`);
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/monthly/${game}/${year}/${month}`, options?.requestInit);
        if (error) return { data: null, error, meta };
        let data = response.map((res: any) => processGame(game, Timeframe.Monthly, true, res));
        return { data, error: null, meta };
    }
    // /game/season/{game}/season
    private async _getLeaderboardSeasonal<G extends Game>(
        game: G,
        season: number = 1,
        options?: Partial<MethodOptions>,
    ): Promise<MethodResponse<ProcessedGame<Timeframe.Seasonal, true>[G][] | null>> {
        if (game && !Games[game].statistics) throw new Error(`Statistics are not available for the game: ${game}`);
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/season/${game}/${season}`, options?.requestInit);
        if (error) return { data: null, error, meta };
        let data = response.map((res: any) => processGame(game, Timeframe.Seasonal, true, res));
        return { data, error: null, meta };
    }

    /**
     * `/global/statistics` Gets global statistics
     * @returns The global statistics
     */
    public async getGlobalStatistics(options?: Partial<MethodOptions>): Promise<MethodResponse<ProcessedGlobalStatisticsResponse>> {
        const { data: response, error, meta } = await this._fetchAPI<any>("/global/statistics", options?.requestInit);
        if (error) return { data: null, error, meta };
        return { data: response, error: null, meta };
    }
    /**
     * `/game/map/{game}` Gets information about the maps in a game
     * @param game The game to get the maps for (fails for games without maps)
     * @returns A list of maps in the game
     */
    public async getGameMaps(game: Game, options?: Partial<MethodOptions>): Promise<MethodResponse<ProcessedMapResponse>> {
        if (game && !Games[game].statistics) throw new Error(`Statistics are not available for the game: ${game}`);
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/map/${game}`, options?.requestInit);
        if (error) return { data: null, error, meta };
        return { data: response, error: null, meta };
    }
    /**
     * `/game/meta/{game}` Gets metadata about a game
     * @param game The game to get the metadata for
     * @returns The metadata for the game
     */
    public async getGameMetadata(game: Game, options?: Partial<MethodOptions>): Promise<MethodResponse<ProcessedGameMetadata>> {
        if (game && !Games[game].statistics) throw new Error(`Statistics are not available for the game: ${game}`);
        const { data: response, error, meta } = await this._fetchAPI<any>(`/game/meta/${game}`, options?.requestInit);
        if (error) return { data: null, error, meta };
        return { data: response, error: null, meta };
    }
}
