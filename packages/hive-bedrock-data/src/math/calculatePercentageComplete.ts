import { Games } from "../games/index.js";
import { Game } from "../types/games.js";
import calculateXPFromLevel from "./calculateXPFromLevel.js";

export default function calculatePercentageComplete(
    xp: number,
    game_id: Game,
): number {
    const metadata = Games[game_id];
    if (!metadata || !metadata.levelling) return 0;

    const max_level_xp = calculateXPFromLevel(
        metadata.levelling.max_level,
        game_id,
    );
    if (!max_level_xp) return 0;

    return Math.round((xp / max_level_xp) * 10000) / 10000;
}
