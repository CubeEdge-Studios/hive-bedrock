import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.ParkourWorlds,
    short_name: "PARKOUR",
    name: "Parkour Worlds",

    description:
        "An epic hub filled with fun parkours! Collect stars to unlock new worlds.",
    icon_url: IMAGE_CDN + "/icons/hub/games/hub-parkour.png",
    colour: "#66d4e8",

    levelling: null,
} satisfies GameData<Game.ParkourWorlds>;
