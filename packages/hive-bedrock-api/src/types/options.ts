export type HiveAPIOptions = {
  baseUrl?: string;

  resolveDynamicHubTitles?: boolean;
  resolveStatTrackHubTitles?: boolean;
  addVariableEntitlements?: boolean;
  useModernLeaderboardSource?: boolean;

  apiKey?: string;

  timeout?: number;
};
