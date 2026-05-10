import { IMAGE_CDN } from ".";
import { Game, GameData } from "../types/games";

export default {
    id: Game.GhostInvasion,
    short_name: "GI",
    name: "Ghost Invasion",

    statistics: false,
    discontinued: true,

    description:
        "As a human defend yourself from the spooky ghosts. As a ghost, try to infect all humans before the time runs out!",
    icon_url: IMAGE_CDN + "/icons/hub/games/gi.png",
    colour: "#88a2bc",

    levelling: {
        max_level: 20,
        increment: 100,
        cap: null,
    },
} satisfies GameData<Game.GhostInvasion>;
