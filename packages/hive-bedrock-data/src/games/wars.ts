import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.TreasureWars,
    short_name: "WARS",
    name: "Treasure Wars",

    discontinued: true,

    description:
        "Bedwars with treasure, Treasures grant infinite respawns. Protect your treasure and destroy others.",
    icon_url: IMAGE_CDN + "/icons/hub/games/wars.png",
    colour: "#ffc626",

    levelling: {
        max_level: 100,
        increment: 150,
        cap: 52,
    },
} as GameData<Game.TreasureWars>;
