import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.BuildBattle,
    short_name: "BUILD",
    name: "Build Battle",

    discontinued: false,

    description:
        "Battle it out to create the best build for a randomly chosen theme.",
    icon_url: IMAGE_CDN + "/icons/hub/games/build.png",
    colour: "#ae4009",

    levelling: {
        max_level: 30,
        increment: 100,
        cap: null,
    },
} satisfies GameData<Game.BuildBattle>;
