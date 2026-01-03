import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.MobGame,
    short_name: "MOB",
    name: "Mob Game",

    statistics: false,
    discontinued: true,

    description:
        "Become iconic Minecraft mobs and inherit their unique characteristics! Each mob comes with its own special abilities, movement speed, and more.",
    icon_url: IMAGE_CDN + "/icons/hub/games/mob.png",
    colour: "#035a61",

    levelling: {
        max_level: 20,
        increment: 100,
        cap: null,
    },
} satisfies GameData<Game.MobGame>;
