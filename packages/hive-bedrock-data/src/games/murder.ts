import { IMAGE_CDN } from "../api.js";
import { Game, GameData } from "../types/games.js";

export default {
    id: Game.MurderMystery,
    short_name: "MURDER",
    name: "Murder Mystery",

    statistics: true,

    description:
        "There is a murderer among you. Find the murderer, or be the murderer.",
    icon_url: IMAGE_CDN + "/icons/hub/games/murder.png",
    colour: "#79b7bf",

    levelling: {
        max_level: 100,
        increment: 100,
        cap: 82,
        max_prestige: 5,
    },
} satisfies GameData<Game.MurderMystery>;
