import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.BedWars,
    short_name: "BED",
    name: "BedWars",

    description:
        "Defend your bed, eliminate others, solo or as a team. Last team standing wins!",
    icon_url: IMAGE_CDN + "/icons/hub/games/bed.png",
    colour: "#894233",

    levelling: {
        max_level: 50,
        increment: 150,
        cap: null,
    },
} satisfies GameData<Game.BedWars>;
