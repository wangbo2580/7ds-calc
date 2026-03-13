// Game configuration for Seven Deadly Sins: Origin
// All gacha parameters centralized here for easy updates after game launch (3/16)
// ⚠️ Current data is from CBT + Grand Cross estimates. Update after official launch!

export const GAME_CONFIG = {
  // Base rates
  baseRate: 0.03, // 6★ base rate 3% (CBT observed)

  // Pity system
  softPityStart: 70, // Soft pity starts at pull 70 (estimated)
  hardPity: 90, // Hard pity at 90 pulls (CBT leak: 80-90, conservative 90)

  // 50/50 system
  featuredRate: 0.5, // 50% chance to get featured character when hitting 5★
  guaranteedAfterLoss: true, // After losing 50/50, next 5★ is guaranteed featured

  // Currency
  currencyPerPull: 300, // Diamonds per pull (estimated, similar games use 150-300)
  currencyName: "Diamonds",
  ticketName: "Summon Ticket",
  multiPullCount: 10, // 10-pull

  // Soft pity probability increment
  softPityIncrement: 0.05, // +5% per pull after soft pity (estimated, Genshin-like model)

  // Data status
  dataStatus: "CBT_ESTIMATE" as const satisfies "CBT_ESTIMATE" | "CONFIRMED",
  lastUpdated: "2026-03-12",
  notes:
    "Data from CBT observations and Grand Cross estimates. Verify after 3/16 PC launch.",
};

export type BannerType = "character" | "weapon";

export interface BannerInfo {
  name: string;
  type: BannerType;
  featuredUnit: string;
  endDate?: string;
}

// Current banners - update when game launches
export const CURRENT_BANNERS: BannerInfo[] = [
  {
    name: "Launch Banner",
    type: "character",
    featuredUnit: "TBA - Game launches 3/16",
    endDate: undefined,
  },
];
