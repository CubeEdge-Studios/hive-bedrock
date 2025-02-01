import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.SkyWarsClassic,
    short_name: "SKY-CLASSIC",
    name: "SkyWars Classic",

    variant: Game.SkyWars,

    description: "No lucky ores. Loot chests to collect items.",
    icon_url: IMAGE_CDN + "/icons/hub/games/sky.png",
    colour: "#d6654d",

    levelling: {
        max_level: 100,
        increment: 150,
        cap: 52,
    },
} satisfies GameData<Game.SkyWarsClassic>;
