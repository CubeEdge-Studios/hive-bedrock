import { Game } from "hive-bedrock-data";

export type StatisticsByGame = {
  [Game.HideAndSeek]: {
    xp: number;
    matches_played: number;
    victories: number;
    deaths: number;
    hider_kills: number;
    seeker_kills: number;
    taunts: number;
  };
  [Game.DeathRun]: {
    xp: number;
    matches_played: number;
    victories: number;
    deaths: number;
    checkpoints: number;
    activated: number;
    kills: number;
  };
  [Game.TreasureWars]: {
    xp: number;
    matches_played: number;
    victories: number;
    final_kills: number;
    kills: number;
    treasure_destroyed: number;
    deaths: number;
    prestige: number;
  };
  [Game.MurderMystery]: {
    xp: number;
    matches_played: number;
    victories: number;
    deaths: number;
    coins: number;
    murders: number;
    murderer_eliminations: number;
    prestige: number;
    bux: number;
  };
  [Game.SurvivalGames]: {
    xp: number;
    matches_played: number;
    victories: number;
    crates: number;
    deathmatches: number;
    cows: number;
    kills: number;
    deaths: number;
    teleporters_used: number;
    launchpads_used: number;
    flares_used: number;
  };
  [Game.SkyWars]: {
    xp: number;
    matches_played: number;
    victories: number;
    kills: number;
    mystery_chests_destroyed: number;
    ores_mined: number;
    spells_used: number;
    deaths: number;
    final_kills: number;
    prestige: number;
  };
  [Game.CaptureTheFlag]: {
    xp: number;
    matches_played: number;
    victories: number;
    assists: number;
    deaths: number;
    flags_captured: number;
    kills: number;
    flags_returned: number;
  };
  [Game.BlockDrop]: {
    xp: number;
    matches_played: number;
    victories: number;
    blocks_destroyed: number;
    powerups_collected: number;
    vaults_used: number;
    deaths: number;
  };
  [Game.GroundWars]: {
    xp: number;
    matches_played: number;
    victories: number;
    blocks_destroyed: number;
    blocks_placed: number;
    deaths: number;
    projectiles_fired: number;
    kills: number;
  };
  [Game.BuildBattle]: {
    xp: number;
    matches_played: number;
    victories: number;
    rating_good_received: number;
    rating_love_received: number;
    rating_meh_received: number;
    rating_okay_received: number;
    rating_great_received: number;
  };
  [Game.BlockParty]: {
    xp: number;
    matches_played: number;
    victories: number;
    powerups_collected: number;
    rounds_survived: number;
  };
  [Game.TheBridge]: {
    xp: number;
    deaths: number;
    goals: number;
    kills: number;
    matches_played: number;
    victories: number;
  };
  [Game.Gravity]: {
    xp: number;
    matches_played: number;
    victories: number;
    deaths: number;
    maps_completed: number;
    maps_completed_without_dying: number;
  };
  [Game.BedWars]: {
    xp: number;
    matches_played: number;
    victories: number;
    final_kills: number;
    kills: number;
    beds_destroyed: number;
    deaths: number;
    prestige: number;
  };
  [Game.SkyWarsClassic]: {
    xp: number;
    matches_played: number;
    victories: number;
    kills: number;
    deaths: number;
    selected_kit: string;
  };
  [Game.SkyWarsKits]: {
    xp: number;
    matches_played: number;
    victories: number;
    kills: number;
    deaths: number;
    ores_mined: number;
    spells_used: number;
    mystery_chests_destroyed: number;
    selected_kit: string;
  };
  [Game.ParkourWorlds]: {
    parkours: {
      total_stars: number;
    } & {
      [worldName: string]: ParkourWorld;
    };
  };

  [Game.MobGame]: never;
  [Game.GhostInvasion]: never;
};
export type GameStatistics<G extends Game> = StatisticsByGame[G];

export type ParkourCourse = {
  best_run_time: number;
  best_checkpoint_times: {
    [coordinates: string]: number;
  };
  collected_stars: string[];
  course_stars: number;
};
export type ParkourWorld = {
  parkour_stars: number;
} & {
  [courseName: string]: ParkourCourse;
};
