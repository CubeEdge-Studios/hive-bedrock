import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.SkyWarsKits,
    short_name: "SKY-KITS",
    name: "SkyWars Kits",

    variant: Game.SkyWars,
    discontinued: true,

    description: "Choose between a variety of kits to fight with in SkyWars.",
    icon_url: IMAGE_CDN + "/icons/hub/games/sky-kits.png",
    colour: "#d6654d",

    levelling: {
        max_level: 100,
        increment: 150,
        cap: 52,
    },
} satisfies GameData<Game.SkyWarsKits>;
