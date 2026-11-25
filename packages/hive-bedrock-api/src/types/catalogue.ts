type EmptyObject = Record<PropertyKey, never>;

export type CatalogueUnlock = {
  active: boolean;
} & (
  | CatalogueUnlockLegacy
  | CatalogueUnlockStorePurchase
  | CatalogueUnlockQuestPoints
  | CatalogueUnlockAchievement
  | CatalogueUnlockGameLevel
  | CatalogueUnlockBundlePurchase
  | CatalogueUnlockGamePurchase
  | CatalogueUnlockSpecialEvent
);
export type CatalogueUnlockLegacy = {
  type: "legacy";
  metadata: {
    originalUnlockType: string;
    lastAvailable: string;
    description: string;
  };
};
export type CatalogueUnlockStorePurchase = {
  type: "store_purchase";
  metadata: EmptyObject;
};
export type CatalogueUnlockQuestPoints = {
  type: "quest_points";
  metadata: {
    questPoints: number;
  };
};
export type CatalogueUnlockAchievement = {
  type: "achievement";
  metadata: {
    requirement: string;
  };
};
export type CatalogueUnlockGameLevel = {
  type: "game_level";
  metadata: {
    game: string;
    level: number;
    additionalRequirement?: string;
  };
};
export type CatalogueUnlockBundlePurchase = {
  type: "bundle_purchase";
  metadata: {
    bundleId: string;
  };
};
export type CatalogueUnlockGamePurchase = {
  type: "game_purchase";
  metadata: {
    description: string;
  };
};
export type CatalogueUnlockSpecialEvent = {
  type: "special_event";
  metadata: {
    game?: string;
    description: string;
  };
};

type ToUppercase<T> = T extends { type: infer U extends string }
  ? Omit<T, "type"> & { type: Uppercase<U> }
  : never;

export type CatalogueUnlockUppercase = ToUppercase<CatalogueUnlock>;
