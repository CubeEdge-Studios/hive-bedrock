import type { Game } from "hive-bedrock-data";
import type { StatisticsByGame } from "../../types/statistics.js";

export type V0GameStatistics<G extends Game> = StatisticsByGame<"played">[G];
