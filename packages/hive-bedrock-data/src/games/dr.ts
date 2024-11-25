import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.DeathRun,
    short_name: "DR",
    name: "Deathrun",

    description:
        "Race through parkour maps, avoiding the obstacles being activated by deaths.",
    icon_url: IMAGE_CDN + "/icons/hub/games/dr.png",
    colour: "#dac4a2",

    levelling: {
        max_level: 75,
        increment: 200,
        cap: 42,
    },
} satisfies GameData<Game.DeathRun>;
