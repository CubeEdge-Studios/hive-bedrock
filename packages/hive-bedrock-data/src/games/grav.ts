import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.Gravity,
    short_name: "GRAV",
    name: "Gravity",

    description:
        "The ultimate movement challenge! Can you fall to the bottom safely?",
    icon_url: IMAGE_CDN + "/icons/hub/games/grav.png",
    colour: "#3D9BA4",

    levelling: {
        max_level: 25,
        increment: 150,
        cap: null,
    },
} satisfies GameData<Game.Gravity>;
