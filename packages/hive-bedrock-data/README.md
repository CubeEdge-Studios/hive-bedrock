# Hive Bedrock Data

A repo to store and calculate data and type definitions from The Hive: Bedrock Edition server. This includes infomation for each game avaliable on the server, helper functions to calulate different game statistic infomation.

## Games

This repo contains metadata infomationm for each game, including content, statistical and game variant infomation.

This is an example of the data return for BedWars:

```ts
Games[Game.BedWars] = {
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
};
```

## Math Calculations

This repo contains functions to get levels and other statistical infomation.

```ts
// calculates the level from a given xp and game_id
function calculateLevelFromXP(xp: number, game_id: Game): number | null;

// claculates the total xp from a given level and game_id
function calculateXPFromLevel(level: number, game_id: Game): number | null;

// calculates the percentage complete of a game based on the xp amounts from a given xp and game_id
function calculatePercentageComplete(xp: number, game_id: Game): number;

// calculates the percentage of the current level from a given xp and game_id
function calculateLevelPercentageComplete(xp: number, game_id: Game): number;

// calculates the total xp amount for a given level and game_id
function calculateLevelXP(level: number, game_id: Game): number | null;

// calculates if a player has reached max level given a xp amount and game_id
function hasCompleted(xp: number, game_id: Game): boolean;
```
