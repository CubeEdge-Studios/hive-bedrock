import { IMAGE_CDN } from ".";
import {
    Game,
    Game_Variant_Queue_Type,
    Game_Variant_Type,
    Game_Data,
} from "../types/games.types";

export default {
    id: Game.BuildBattle,
    short_name: "BUILD",
    name: "Build Battle",
    discontinued: false,

    description:
        "Battle it out to create the best build for a randomly chosen theme.",
    icon_url: IMAGE_CDN + "/icons/hub/games/build.png",

    has_levels: true,
    max_level: 30,
    can_prestige: false,
    max_prestige: null,
    level_increment: 100,
    level_cap: null,

    colours: ["#ae4009", "#dbdbdb", "#242a30", "#faee3a", "#744414"],

    modes: [
        {
            id: "build",
            type: Game_Variant_Type.Regular,
            name: "Solo",
            team_size: 1,
            team_amount: 12,
            limited: false,
            queue_type: Game_Variant_Queue_Type.Default,
        },
        {
            id: "buildx",
            type: Game_Variant_Type.Regular,
            name: "Solo Extended",
            team_size: 1,
            team_amount: 12,
            limited: false,
            queue_type: Game_Variant_Queue_Type.Default,
        },
        {
            id: "build-duos",
            type: Game_Variant_Type.Duos,
            name: "Duos",
            team_size: 2,
            team_amount: 12,
            limited: false,
            queue_type: Game_Variant_Queue_Type.Default,
        },
        {
            id: "build-duosx",
            type: Game_Variant_Type.Duos,
            name: "Duos Extended",
            team_size: 2,
            team_amount: 12,
            limited: false,
            queue_type: Game_Variant_Queue_Type.Default,
        },
        {
            id: "build-speed",
            type: Game_Variant_Type.Regular,
            name: "Speed Builders",
            team_size: 1,
            team_amount: 12,
            limited: false,
            queue_type: Game_Variant_Queue_Type.Default,
        },
    ],
} as Game_Data<Game.BuildBattle>;
