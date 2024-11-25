import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.JustBuild,
    short_name: "BUILD",
    name: "Just Build",

    discontinued: false,

    description:
        "Battle it out to create the best build for a randomly chosen theme.",
    icon_url: IMAGE_CDN + "/icons/hub/games/build.png",
    colour: "#ae4009",

    levelling: {
        max_level: 20,
        increment: 100,
        cap: null,
    },
} satisfies GameData<Game.JustBuild>;
