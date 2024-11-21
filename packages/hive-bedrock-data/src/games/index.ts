import { Game, GameData } from "../types/games";

export const IMAGE_CDN = "https://cdn.playhive.com";

import bridge from "./bridge";
import build from "./build";
import ctf from "./ctf";
import dr from "./dr";
import drop from "./drop";
import grav from "./grav";
import ground from "./ground";
import hide from "./hide";
import murder from "./murder";
import party from "./party";
import sg from "./sg";
import sky from "./sky";
import wars from "./wars";
import bed from "./bed";
import parkour from "./parkour";
import skyKits from "./sky-kits";
import skyClassic from "./sky-classic";

export const Games = {
    [Game.BlockDrop]: drop,
    [Game.BlockParty]: party,
    [Game.CaptureTheFlag]: ctf,
    [Game.DeathRun]: dr,
    [Game.Gravity]: grav,
    [Game.GroundWars]: ground,
    [Game.HideAndSeek]: hide,
    [Game.JustBuild]: build,
    [Game.MurderMystery]: murder,
    [Game.SkyWars]: sky,
    [Game.SkyWarsClassic]: skyClassic,
    [Game.SkyWarsKits]: skyKits,
    [Game.SurvivalGames]: sg,
    [Game.TheBridge]: bridge,
    [Game.TreasureWars]: wars,
    [Game.BedWars]: bed,
    [Game.ParkourWorlds]: parkour,
} as { [G in Game]: GameData<G> };
