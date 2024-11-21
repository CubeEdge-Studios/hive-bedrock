import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.SkyWars,
    short_name: "SKY",
    name: "SkyWars",

    description:
        "Loot chests and mine ores to gain items, then fight! Last team standing wins.",
    icon_url: IMAGE_CDN + "/icons/hub/games/sky.png",
    colour: "#d6654d",

    levelling: {
        max_level: 100,
        increment: 150,
        cap: 52,
    },
} satisfies GameData<Game.SkyWars>;
