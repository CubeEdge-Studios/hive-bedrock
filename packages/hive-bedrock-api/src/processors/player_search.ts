export interface PartialPlayer {
    uuid: string;
    username: string;
}
export type ProcessedPlayerSearchResponse = PartialPlayer[];

export default function processPlayerSearch(playerSearchResponse: any): ProcessedPlayerSearchResponse | null {
    if (!playerSearchResponse) return null;
    return playerSearchResponse.map((player: any) => ({
        uuid: player.UUID,
        username: player.username_cc,
    }));
}
