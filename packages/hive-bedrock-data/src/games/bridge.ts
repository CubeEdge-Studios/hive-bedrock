import { IMAGE_CDN } from "../api.js";
import { Game, GameData } from "../types/games.js";

export default {
    id: Game.TheBridge,
    short_name: "BRIDGE",
    name: "The Bridge",

    statistics: true,

    description: "Bridge to victory in this fast-paced PvP game.",
    icon_url: IMAGE_CDN + "/icons/hub/games/bridge.png",
    colour: "#9f2b33",

    levelling: {
        max_level: 20,
        increment: 300,
        cap: null,
        multiplier: 1.08,
    },
} satisfies GameData<Game.TheBridge>;
