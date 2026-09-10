import { API_BASE_ENDPOINT, Game, Games, Timeframe } from "hive-bedrock-data";
import { APIClient } from "../client/APIClient.js";
import type { APIRequestOptions } from "../client/types.js";
import type { HiveAPIOptions } from "../types/options.js";
import type { APIResponse } from "../types/response.js";
import {
  type AvailableLeaderboardResponse,
  type ProcessedAllGamesResponse,
  type ProcessedGame,
  type ProcessedMonthlyGamesResponse,
  processGame,
} from "./processors/game.js";
import type { ProcessedGlobalStatisticsResponse } from "./processors/global_statistics.js";
import type { ProcessedMapResponse } from "./processors/map.js";
import type { ProcessedGameMetadata } from "./processors/meta.js";
import processPlayerInfo, { type ProcessedPlayerResponse } from "./processors/player.js";
import processPlayerSearch, {
  type ProcessedPlayerSearchResponse,
} from "./processors/player_search.js";

export default class HiveAPIv0 {
  private client: APIClient;

  constructor(public options: HiveAPIOptions) {
    this.client = new APIClient({
      baseUrl: this.options.baseUrl ?? API_BASE_ENDPOINT,
      timeout: this.options.timeout ?? 10_000,
      headers: {
        "X-Hive-API-Version": "2024-03-29",
        "X-Hive-Resolve-Stat-Track": (this.options.resolveStatTrackHubTitles ?? true).toString(),
        "X-Hive-Resolve-Dynamic-Hub-Titles": (
          this.options.resolveDynamicHubTitles ?? true
        ).toString(),
        "X-Hive-Variable-Entitlements": (this.options.addVariableEntitlements ?? true).toString(),
        ...options.headers,
      },
    });
  }

  /**
   * `/game/all/main/{identifier}` Gets information about a player
   * @param identifier Username or UUID of the player
   * @returns The player information
   */
  public async getPlayer(
    identifier: string,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedPlayerResponse>> {
    const response = await this.client.request(
      `/game/all/main/${identifier}`,
      options?.requestInit,
    );
    if (response.error) return response;

    const data = processPlayerInfo(response);
    if (!data)
      return {
        data: null,
        error: { code: "PROCESSING_FAILED", message: "Failed to process player data", status: 500 },
        metadata: response.metadata,
      };

    return { data, error: null, metadata: response.metadata };
  }
  /**
   * `/player/search/{prefix}` Gets a list of players that match the prefix
   * @param prefix The prefix to search for (must be at least 4 characters long)
   * @returns A list of players that match the prefix
   */
  public async getPlayerSearch(
    prefix: string,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedPlayerSearchResponse>> {
    const response = await this.client.request(`/player/search/${prefix}`, options?.requestInit);
    if (response.error) return response;

    const data = processPlayerSearch(response);
    if (!data)
      return {
        data: null,
        error: {
          code: "PROCESSING_FAILED",
          message: "Failed to process player search data",
          status: 500,
        },
        metadata: response.metadata,
      };

    return { data, error: null, metadata: response.metadata };
  }

  /**
   * Gets statistics for a player
   * @param identifier Username or UUID of the player
   * @param timeframe The timeframe to get the statistics for
   * @param options Additional options including specific game, month, and year
   * @returns The player statistics
   */
  public async getStatistics(
    identifier: string,
    timeframe: Timeframe.AllTime,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedAllGamesResponse>>;
  public async getStatistics(
    identifier: string,
    timeframe: Timeframe.Monthly,
    month?: number,
    year?: number,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedMonthlyGamesResponse>>;
  public async getStatistics<G extends Game>(
    identifier: string,
    timeframe: Timeframe.Seasonal,
    game: G,
    season?: number,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedMonthlyGamesResponse["statistics"][G]>>;
  public async getStatistics(
    identifier: string,
    timeframe: Timeframe,
    ...args: (number | Game | Partial<APIRequestOptions> | undefined)[]
  ) {
    if (timeframe === Timeframe.AllTime) {
      const options = args[0] as Partial<APIRequestOptions> | undefined;
      return this._getStatisticsAllTime(identifier, options);
    }

    if (timeframe === Timeframe.Seasonal) {
      const game = args[0] as Game | undefined;
      let season = args[1] as number | undefined;
      const options = args[2] as Partial<APIRequestOptions> | undefined;

      if (!game) throw new Error("Game must be specified for seasonal statistics");
      if (Object.values(Game).indexOf(game) === -1)
        throw new Error(`Invalid game specified: ${game}`);
      if (!Games[game].statistics)
        throw new Error(`Statistics are not available for the game: ${game}`);
      if (season !== undefined && (Number.isNaN(season) || season < 1))
        throw new Error("Season must be a positive integer");
      if (!season) season = 1;

      return this._getStatisticsSeasonal(identifier, game, season, options);
    }

    let month = args[0] as number | undefined;
    let year = args[1] as number | undefined;
    const options = args[2] as Partial<APIRequestOptions> | undefined;
    if (month !== undefined && (Number.isNaN(month) || month < 1 || month > 12))
      throw new Error("Month must be a number between 1 and 12");
    if (year !== undefined && (Number.isNaN(year) || year < 1970))
      throw new Error("Year must be a number greater than or equal to 1970");
    if (!month) month = new Date().getMonth() + 1;
    if (!year) year = new Date().getFullYear();

    return this._getStatisticsMonthly(identifier, month, year, options);
  }
  // /game/all/{game}/{player}
  private async _getStatisticsAllTime(
    identifier: string,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedAllGamesResponse>> {
    const response = await this.client.request<{ [key: string]: any }>(
      `/game/all/all/${identifier}`,
      options?.requestInit,
    );
    if (response.error) return response;

    const data = Object.fromEntries(
      Object.entries(response).map(([id, res]) => [
        id,
        id === "main" ? null : (processGame(id as Game, Timeframe.AllTime, false, res) ?? null),
      ]),
    );
    delete data.main;
    return {
      data: {
        player: processPlayerInfo(response),
        statistics: data,
      } as ProcessedAllGamesResponse,
      error: null,
      metadata: response.metadata,
    };
  }
  // /game/monthly/{game}/{player}/{month}/{year}
  private async _getStatisticsMonthly(
    identifier: string,
    month?: number,
    year?: number,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedMonthlyGamesResponse>> {
    const response = await this.client.request<{ [key: string]: any }>(
      `/game/monthly/player/all/${identifier}/${year ?? new Date().getFullYear()}/${month ?? new Date().getMonth() + 1}`,
      options?.requestInit,
    );
    if (response.error) return response;

    const data = Object.fromEntries(
      Object.entries(response).map(([id, res]) => [
        id,
        id === "main" ? null : (processGame(id as Game, Timeframe.Monthly, false, res) ?? null),
      ]),
    );
    delete data.main;
    return {
      data: {
        statistics: data,
      } as ProcessedMonthlyGamesResponse,
      error: null,
      metadata: response.metadata,
    };
  }
  // /game/season/player/{game}/{player}/{season}
  private async _getStatisticsSeasonal<G extends Game>(
    identifier: string,
    game: G,
    season?: number,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedGame<Timeframe.Seasonal, false>[G] | null>> {
    if (!Games[game].statistics)
      throw new Error(`Statistics are not available for the game: ${game}`);
    const response = await this.client.request(
      `/game/season/player/${game}/${identifier}/${season ?? 1}`,
      options?.requestInit,
    );
    if (response.error) return response;
    return {
      data: processGame(game, Timeframe.Seasonal, false, response),
      error: null,
      metadata: response.metadata,
    };
  }

  public async getAvailableMonthlyLeaderboards<G extends Game>(
    game: G,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<AvailableLeaderboardResponse>> {
    const response = await this.client.request<AvailableLeaderboardResponse>(
      `/game/monthly/${game}/available`,
      options?.requestInit,
    );
    if (response.error) return response;
    return response;
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
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedGame<Timeframe.AllTime, true>[G][] | null>>;
  public async getLeaderboard<G extends Game>(
    timeframe: Timeframe.Monthly,
    game: G,
    month?: number,
    year?: number,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedGame<Timeframe.Monthly, true>[G][] | null>>;
  public async getLeaderboard<G extends Game>(
    timeframe: Timeframe.Seasonal,
    game: G,
    season?: number,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedGame<Timeframe.Seasonal, true>[G][] | null>>;
  public async getLeaderboard<T extends Timeframe, G extends Game>(
    timeframe: T,
    game: G,
    ...args: any[]
  ): Promise<APIResponse<ProcessedGame<Timeframe, true>[G][] | null>> {
    if (game && !Games[game].statistics)
      throw new Error(`Statistics are not available for the game: ${game}`);

    if (timeframe === Timeframe.Monthly) {
      let month = args[0] as number | undefined;
      let year = args[1] as number | undefined;
      const options = args[2] as Partial<APIRequestOptions> | undefined;

      if (month !== undefined && (Number.isNaN(month) || month < 1 || month > 12))
        throw new Error("Month must be a number between 1 and 12");
      if (year !== undefined && (Number.isNaN(year) || year < 1970))
        throw new Error("Year must be a number greater than or equal to 1970");
      if (!month) month = new Date().getMonth() + 1;
      if (!year) year = new Date().getFullYear();

      return this._getLeaderboardMonthly(game, month, year, options);
    }
    if (timeframe === Timeframe.Seasonal) {
      let season = args[0] as number | undefined;
      const options = args[1] as Partial<APIRequestOptions> | undefined;
      if (season !== undefined && (Number.isNaN(season) || season < 1))
        throw new Error("Season must be a positive integer");
      if (!season) season = 1;

      return this._getLeaderboardSeasonal(game, season, options);
    }

    const options = args[0] as Partial<APIRequestOptions> | undefined;
    return this._getLeaderboardAllTime(game, options);
  }
  // /game/all/{game}
  private async _getLeaderboardAllTime<G extends Game>(
    game: G,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedGame<Timeframe.AllTime, true>[G][] | null>> {
    const response = await this.client.request<any[]>(`/game/all/${game}`, options?.requestInit);
    if (response.error) return response;
    const data = response.data
      .map((res) => processGame(game, Timeframe.AllTime, true, res))
      .filter((res) => res !== null);
    return { data, error: null, metadata: response.metadata };
  }
  // /game/monthly/{game}/{year}/{month}
  private async _getLeaderboardMonthly<G extends Game>(
    game: G,
    month: number,
    year: number,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedGame<Timeframe.Monthly, true>[G][] | null>> {
    if (game && !Games[game].statistics)
      throw new Error(`Statistics are not available for the game: ${game}`);
    const response = await this.client.request<any[]>(
      `/game/monthly/${game}/${year}/${month}`,
      options?.requestInit,
    );
    if (response.error) return response;
    const data = response.data
      .map((res) => processGame(game, Timeframe.Monthly, true, res))
      .filter((res) => res !== null);
    return { data, error: null, metadata: response.metadata };
  }
  // /game/season/{game}/season
  private async _getLeaderboardSeasonal<G extends Game>(
    game: G,
    season: number = 1,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedGame<Timeframe.Seasonal, true>[G][] | null>> {
    if (game && !Games[game].statistics)
      throw new Error(`Statistics are not available for the game: ${game}`);
    const response = await this.client.request<any[]>(
      `/game/season/${game}/${season}`,
      options?.requestInit,
    );
    if (response.error) return response;
    const data = response.data
      .map((res) => processGame(game, Timeframe.Seasonal, true, res))
      .filter((res) => res !== null);
    return { data, error: null, metadata: response.metadata };
  }

  /**
   * `/global/statistics` Gets global statistics
   * @returns The global statistics
   */
  public async getGlobalStatistics(
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedGlobalStatisticsResponse>> {
    const response = await this.client.request<ProcessedGlobalStatisticsResponse>(
      "/global/statistics",
      options?.requestInit,
    );
    if (response.error) return response;
    return { data: response.data, error: null, metadata: response.metadata };
  }
  /**
   * `/game/map/{game}` Gets information about the maps in a game
   * @param game The game to get the maps for (fails for games without maps)
   * @returns A list of maps in the game
   */
  public async getGameMaps(
    game: Game,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedMapResponse>> {
    if (game && !Games[game].statistics)
      throw new Error(`Statistics are not available for the game: ${game}`);
    const response = await this.client.request<ProcessedMapResponse>(
      `/game/map/${game}`,
      options?.requestInit,
    );
    if (response.error) return response;
    return { data: response.data, error: null, metadata: response.metadata };
  }
  /**
   * `/game/meta/{game}` Gets metadata about a game
   * @param game The game to get the metadata for
   * @returns The metadata for the game
   */
  public async getGameMetadata(
    game: Game,
    options?: Partial<APIRequestOptions>,
  ): Promise<APIResponse<ProcessedGameMetadata>> {
    if (game && !Games[game].statistics)
      throw new Error(`Statistics are not available for the game: ${game}`);
    const response = await this.client.request<ProcessedGameMetadata>(
      `/game/meta/${game}`,
      options?.requestInit,
    );
    if (response.error) return response;
    return { data: response.data, error: null, metadata: response.metadata };
  }
}
