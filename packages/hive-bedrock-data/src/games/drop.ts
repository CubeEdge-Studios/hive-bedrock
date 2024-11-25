import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.BlockDrop,
    short_name: "DROP",
    name: "Block Drop",

    description:
        "Competitive parkour. Be the last player standing in a disintegrating arena.",
    icon_url: IMAGE_CDN + "/icons/hub/games/drop.png",
    colour: "#116a2e",

    levelling: {
        max_level: 25,
        increment: 150,
        cap: 22,
    },
} satisfies GameData<Game.BlockDrop>;
