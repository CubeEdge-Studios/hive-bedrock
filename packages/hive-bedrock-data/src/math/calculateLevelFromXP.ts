import { Games } from "../games";
import { Game } from "../types/games";

export function _calculateLevelFromXP(
    xp: number,
    game_id: Game
): number | null {
    const metadata = Games[game_id];
    if (!metadata || !metadata.levelling) return null;

    // Bridge uses a different xp-level system to the other games
    if (metadata.id === Game.TheBridge) {
        // These values shouldn't change as only bridge uses this level system
        let { max_level, multiplier, increment } = metadata.levelling;

        let level_increment = increment;
        let total_xp = increment; // The total amount of xp required to reach n level
        let previous_level_xp = 0; // The total amount of xp required to reach n-1 level

        for (let level = 1; level <= max_level; level++) {
            if (xp < total_xp) {
                if (level === max_level) return level;

                let total_level_xp = total_xp - previous_level_xp; // Total amount of xp to complete the level
                let total_required = total_xp - xp; // Amount of xp player has left to complete the level
                let percentage_left = total_required / total_level_xp;
                let percentage_completed = 1 - percentage_left;
                let total_level_with_percentage = level + percentage_completed; // Add percentage completed to current level

                return Math.floor(total_level_with_percentage * 100) / 100;
            }

            previous_level_xp = total_xp;

            increment = Math.floor(increment * (multiplier ?? 1.08));
            level_increment += increment;
            total_xp += level_increment;
        }

        return 1;
    }

    let { increment, cap } = metadata.levelling;

    let level =
        (increment + Math.sqrt(increment * (increment + 4 * xp))) /
        (2 * increment); // Calculate the level without the level cap

    if (!cap || level <= cap) return Math.floor(level * 100) / 100; // Return if there is no level cap or the level dosen't reach the level cap

    let level_with_cap =
        cap +
        (xp - (increment * Math.pow(cap - 1, 2) + (cap - 1) * increment)) /
            ((cap - 1) * increment * 2); // The level is larger than the cap so the excess xp is removed and a level is calculated

    return Math.floor(level_with_cap * 100) / 100;
}

export default function calculateLevelFromXP(
    xp: number,
    game_id: Game
): number | null {
    const metadata = Games[game_id];
    if (!metadata || !metadata.levelling) return null;

    let level = _calculateLevelFromXP(xp, game_id);
    if (!level) return null;

    if (level < 1) return 1;
    if (level > metadata.levelling.max_level)
        return metadata.levelling.max_level;

    return _calculateLevelFromXP(xp, game_id);
}
