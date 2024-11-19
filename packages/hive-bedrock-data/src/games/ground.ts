import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.GroundWars,
    short_name: "GROUND",
    name: "Ground Wars",

    description:
        "Fight for territory control. each kill grants more territory.",
    icon_url: IMAGE_CDN + "/icons/hub/games/ground.png",
    colour: "#e47226",

    levelling: {
        max_level: 20,
        increment: 150,
        cap: null,
    },
} satisfies GameData<Game.GroundWars>;
