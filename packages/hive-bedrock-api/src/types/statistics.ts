import { Game } from "hive-bedrock-data";

export type PlayedKey = "played" | "matches_played";
type PlayedStatistics<K extends PlayedKey> = {
  [P in K]: number;
};

export type StatisticsByGame<K extends PlayedKey> = {
  [Game.HideAndSeek]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    deaths: number;
    hider_kills: number;
    seeker_kills: number;
    taunts: number;
  };
  [Game.DeathRun]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    deaths: number;
    checkpoints: number;
    activated: number;
    kills: number;
  };
  [Game.TreasureWars]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    final_kills: number;
    kills: number;
    treasure_destroyed: number;
    deaths: number;
    prestige: number;
  };
  [Game.MurderMystery]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    deaths: number;
    coins: number;
    murders: number;
    murderer_eliminations: number;
    prestige: number;
    bux: number;
  };
  [Game.SurvivalGames]: PlayedStatistics<K> & {
    xp: number;
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
  [Game.SkyWars]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    kills: number;
    mystery_chests_destroyed: number;
    ores_mined: number;
    spells_used: number;
    deaths: number;
    final_kills: number;
    prestige: number;
  };
  [Game.CaptureTheFlag]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    assists: number;
    deaths: number;
    flags_captured: number;
    kills: number;
    flags_returned: number;
  };
  [Game.BlockDrop]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    blocks_destroyed: number;
    powerups_collected: number;
    vaults_used: number;
    deaths: number;
  };
  [Game.GroundWars]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    blocks_destroyed: number;
    blocks_placed: number;
    deaths: number;
    projectiles_fired: number;
    kills: number;
  };
  [Game.BuildBattle]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    rating_good_received: number;
    rating_love_received: number;
    rating_meh_received: number;
    rating_okay_received: number;
    rating_great_received: number;
  };
  [Game.BlockParty]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    powerups_collected: number;
    rounds_survived: number;
  };
  [Game.TheBridge]: PlayedStatistics<K> & {
    xp: number;
    deaths: number;
    goals: number;
    kills: number;
    victories: number;
  };
  [Game.Gravity]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    deaths: number;
    maps_completed: number;
    maps_completed_without_dying: number;
  };
  [Game.BedWars]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    final_kills: number;
    kills: number;
    beds_destroyed: number;
    deaths: number;
    prestige: number;
  };
  [Game.SkyWarsClassic]: PlayedStatistics<K> & {
    xp: number;
    victories: number;
    kills: number;
    deaths: number;
    selected_kit: string;
  };
  [Game.SkyWarsKits]: PlayedStatistics<K> & {
    xp: number;
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
