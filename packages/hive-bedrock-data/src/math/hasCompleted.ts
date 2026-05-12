import { Games } from "../games/index.js";
import { Game } from "../types/games.js";
import calculateLevelFromXP from "./calculateLevelFromXP.js";

export default function hasCompleted(xp: number, game_id: Game): boolean {
    const metadata = Games[game_id];
    if (!metadata || !metadata.levelling) return false;

    const level = calculateLevelFromXP(xp, game_id);
    if (level === null) return false;
    if (level >= metadata.levelling.max_level) return true;
    return false;
}
