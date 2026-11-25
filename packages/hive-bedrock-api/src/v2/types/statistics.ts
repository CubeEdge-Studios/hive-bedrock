import type { Game } from "hive-bedrock-data";
import type { StatisticsByGame } from "../../types/statistics.js";

export type V2GameStatistics<G extends Game> = StatisticsByGame<"matches_played">[G];
