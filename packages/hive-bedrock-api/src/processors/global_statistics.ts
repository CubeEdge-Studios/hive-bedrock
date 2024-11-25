import { Game } from "hive-bedrock-data";

export interface ProcessedGlobalStatisticsResponse {
    unique_players: {
        [key in Game]: number;
    } & {
        global: number;
        main: number;
    };
}
