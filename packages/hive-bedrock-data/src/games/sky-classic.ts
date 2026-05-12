import { IMAGE_CDN } from "../api.js";
import { Game, GameData } from "../types/games.js";

export default {
    id: Game.SkyWarsClassic,
    short_name: "SKY-CLASSIC",
    name: "SkyWars Classic",

    variant: Game.SkyWars,
    discontinued: true,
    statistics: true,

    description: "No lucky ores. Loot chests to collect items.",
    icon_url: IMAGE_CDN + "/icons/hub/games/sky.png",
    colour: "#d6654d",

    levelling: {
        max_level: 100,
        increment: 150,
        cap: 52,
    },
} satisfies GameData<Game.SkyWarsClassic>;
