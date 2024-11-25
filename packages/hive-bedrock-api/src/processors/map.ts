import { MapSeason, MapVariant } from "hive-bedrock-data";

export interface ProcessedMap {
    name: string;
    season: MapSeason;
    variant: MapVariant;
    image: string;
}
export type ProcessedMapResponse = ProcessedMap[];
