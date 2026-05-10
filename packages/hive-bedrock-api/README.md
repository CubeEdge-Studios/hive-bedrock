# Hive Bedrock API

An API wrapper for the Hive Minecraft Bedrock Edition server. Which allows you to get stats for leaderboards, players, cosmetics, unique player counts, maps and metadata.

> [!NOTE]
> This API responses returned from this package will differ from the responses returned by the official Hive API. This due to our preference and needs when using this package on [Hive Backpack](https://hivebackpack.com).

## Getting started

```bash
$ npm install hive-bedrock-api
$ yarn add hive-bedrock-api
```

You should also include `hive-bedrock-data` as it includes useful functions and game information.

## Usage

To start using the API, construct the main class `HiveAPI`. This class takes in options that will be used in every HTTP request.

```ts
const api = new HiveAPI({
    resolveDynamicTitles: true,
    apiBaseEndpoint: "https://api.playhive.com/v0",
    requestInit: { headers: {} },
});
```

### Fetch Player Infomation

```ts
// Returns player, cosmetics, server statistics and profile infomation
const { data, error, meta } = await api.getPlayer("player");
```

### Fetch Player Search

```ts
// Returns a list of players matching the prefix
const { data, error, meta } = await api.getPlayerSearch("prefix");
```

### Fetch All-Time/Monthly Player Statistics

```ts
import { Timeframe, Game } from "hive-bedrock-data";

// Returns all all-time games
const { data, error, meta } = await api.getStatistics("player", Timeframe.AllTime);
// Returns all monthly games
const { data, error, meta } = await api.getStatistics("player", Timeframe.Monthly);

// Add in options a game to return a single game
const { data, error, meta } = await api.getStatistics("player", Timeframe.AllTime, { game: Game.BedWars });
```

### Fetch Seasonal Player Statistics

```ts
import { Game } from "hive-bedrock-data";

// Returns seasonal statistics for a game
const { data, error, meta } = await api.getSeasonalStatistics("player", Game.BedWars, 1);
```

### Fetch All-Time/Monthly Leaderboard

```ts
import { Timeframe, Game } from "hive-bedrock-data";

// Returns all-time leaderboard
const { data, error, meta } = await api.getLeaderboard(Timeframe.AllTime, Game.SkyWars);
// Returns monthly leaderboard
const { data, error, meta } = await api.getLeaderboard(Timeframe.Monthly, Game.SkyWars);

// Add in options the month and year for a specific leaderboard
const { data, error, meta } = await api.getLeaderboard(Timeframe.Monthly, { month: 11, year: 2024 });
```

### Fetch Seasonal Leaderboard

```ts
import { Game } from "hive-bedrock-data";

// Returns seasonal leaderboard for a game
const { data, error, meta } = await api.getSeasonalLeaderboard(Game.BedWars, 1);
```

### Fetch Global Statistics

```ts
// Returns unqiue total player counts for different games
const { data, error, meta } = await api.getGlobalStatistics();
```

### Fetch Maps

```ts
import { Game } from "hive-bedrock-data";

// Returns data for a specific game's currently active maps
const { data, error, meta } = await api.getGameMaps(Game.TreasureWars);
```

### Fetch Metadata

```ts
import { Game } from "hive-bedrock-data";

// Returns data for a specific game's currently active maps
const { data, error, meta } = await api.getGameMetadata(Game.TreasureWars);
```

## Documentation

More documentation will be added about what is returned when using this package.
