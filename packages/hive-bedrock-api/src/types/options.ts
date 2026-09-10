import type { APIClientOptions } from "../client/types";

export type HiveAPIOptions = {
  resolveDynamicHubTitles?: boolean;
  resolveStatTrackHubTitles?: boolean;
  addVariableEntitlements?: boolean;
  useModernLeaderboardSource?: boolean;
} & APIClientOptions;
