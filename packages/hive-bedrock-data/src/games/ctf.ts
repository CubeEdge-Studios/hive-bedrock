import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.CaptureTheFlag,
    short_name: "CTF",
    name: "Capture The Flag",

    description: "Capture and defend! Capture the other teams flag to score.",
    icon_url: IMAGE_CDN + "/icons/hub/games/ctf.png",
    colour: "#2aa7d0",

    levelling: {
        max_level: 50,
        increment: 150,
        cap: null,
    },
} satisfies GameData<Game.CaptureTheFlag>;
