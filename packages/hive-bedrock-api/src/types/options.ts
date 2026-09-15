import type { APIClientOptions } from "../client/types.js";

export type HiveAPIOptions = {
  resolveDynamicHubTitles?: boolean;
  resolveStatTrackHubTitles?: boolean;
  addVariableEntitlements?: boolean;
  useModernLeaderboardSource?: boolean;
} & APIClientOptions;
