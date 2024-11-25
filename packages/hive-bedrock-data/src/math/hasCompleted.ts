import { Games } from "../games";
import { Game } from "../types/games";
import calculateLevelFromXP from "./calculateLevelFromXP";

export default function hasCompleted(xp: number, game_id: Game): boolean {
    const metadata = Games[game_id];
    if (!metadata || !metadata.levelling) return false;

    const level = calculateLevelFromXP(xp, game_id);
    if (level === null) return false;
    if (level >= metadata.levelling.max_level) return true;
    return false;
}
