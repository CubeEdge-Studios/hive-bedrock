import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.HideAndSeek,
    short_name: "HIDE",
    name: "Hide and Seek",

    description:
        "Become a Minecraft block and hide from seekers. Found hiders become seekers.",
    icon_url: IMAGE_CDN + "/icons/hub/games/hide.png",
    colour: "#7a5332",

    levelling: {
        max_level: 75,
        increment: 100,
        cap: null,
    },
} satisfies GameData<Game.HideAndSeek>;
