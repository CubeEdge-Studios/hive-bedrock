import { Games } from "../games/index.js";
import { Game } from "../types/games.js";
import calculateXPFromLevel from "./calculateXPFromLevel.js";

export default function calculateLevelXP(
    level: number,
    game_id: Game,
): number | null {
    const metadata = Games[game_id];
    if (!metadata || !metadata.levelling) return null;
    if (level > metadata.levelling.max_level) return null;

    const current_level_xp = calculateXPFromLevel(level - 1, game_id);
    if (current_level_xp === null) return null;

    const next_level_xp = calculateXPFromLevel(level, game_id);
    if (next_level_xp === null) return null;

    return Math.floor(next_level_xp) - Math.floor(current_level_xp);
}
