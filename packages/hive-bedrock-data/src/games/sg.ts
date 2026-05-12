import { IMAGE_CDN } from "../api.js";
import { Game, GameData } from "../types/games.js";

export default {
    id: Game.SurvivalGames,
    short_name: "SG",
    name: "Survival Games",

    statistics: true,

    description:
        "The original battle royale. Loot a vast world and fight other players to be the last player standing.",
    icon_url: IMAGE_CDN + "/icons/hub/games/sg.png",
    colour: "#78b159",

    levelling: {
        max_level: 50,
        increment: 150,
        cap: null,
    },
} satisfies GameData<Game.SurvivalGames>;
