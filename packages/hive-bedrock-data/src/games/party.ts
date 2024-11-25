import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.BlockParty,
    short_name: "PARTY",
    name: "Block Party",

    description:
        "It's time to dance! Dance your way to the correct color or fall to your death!",
    icon_url: IMAGE_CDN + "/icons/hub/games/party.png",
    colour: "#0144f7",

    levelling: {
        max_level: 25,
        increment: 150,
        cap: null,
    },
} satisfies GameData<Game.BlockParty>;
