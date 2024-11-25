import { Games } from "../games";
import { Game } from "../types/games";

export default function calculateXPFromLevel(
    level: number,
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

        if (level <= 1) return 0;

        for (let l = 2; l <= max_level; l++) {
            if (l >= level) {
                let current_level_xp = total_xp - previous_level_xp;
                let input_level_percentage = level - l;

                let total_input_level_xp =
                    total_xp + current_level_xp * input_level_percentage;

                return Math.round(total_input_level_xp);
            }
            previous_level_xp = total_xp;

            increment = Math.floor(increment * multiplier);
            level_increment += increment;
            total_xp += level_increment;
        }

        return Math.round(previous_level_xp);
    }

    let { cap, increment } = metadata.levelling;

    let xp = increment * Math.pow(level, 2) - increment * level;
    if (!cap || level <= cap) return xp;

    xp = -increment * (cap - 1) * (cap - 2 * level);
    return xp;
}
