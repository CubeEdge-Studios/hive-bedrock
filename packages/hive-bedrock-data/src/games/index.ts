import { Game, GameData } from "../types/games.js";

import bridge from "./bridge.js";
import build from "./build.js";
import ctf from "./ctf.js";
import dr from "./dr.js";
import drop from "./drop.js";
import grav from "./grav.js";
import ground from "./ground.js";
import hide from "./hide.js";
import murder from "./murder.js";
import party from "./party.js";
import sg from "./sg.js";
import sky from "./sky.js";
import wars from "./wars.js";
import bed from "./bed.js";
import parkour from "./parkour.js";
import skyKits from "./sky-kits.js";
import skyClassic from "./sky-classic.js";
import gi from "./gi.js";
import mob from "./mob.js";

export const Games = {
    [Game.BlockDrop]: drop,
    [Game.BlockParty]: party,
    [Game.CaptureTheFlag]: ctf,
    [Game.DeathRun]: dr,
    [Game.Gravity]: grav,
    [Game.GroundWars]: ground,
    [Game.HideAndSeek]: hide,
    [Game.BuildBattle]: build,
    [Game.MurderMystery]: murder,
    [Game.SkyWars]: sky,
    [Game.SkyWarsClassic]: skyClassic,
    [Game.SkyWarsKits]: skyKits,
    [Game.SurvivalGames]: sg,
    [Game.TheBridge]: bridge,
    [Game.TreasureWars]: wars,
    [Game.BedWars]: bed,
    [Game.ParkourWorlds]: parkour,
    [Game.MobGame]: mob,
    [Game.GhostInvasion]: gi,
} as { [G in Game]: GameData<G> };
