// Game configuration for Seven Deadly Sins: Origin
// Updated with confirmed launch data (3/16/2026)
//
// Pity system (confirmed by @7DSOriginNews + Game8 livestream):
//   Layer 1: Hard pity at 80 pulls (guaranteed SSR)
//   Layer 2: 50/50 — if you lose, next SSR is guaranteed rate-up
//   Layer 3: 120-pull one-time safety net (guaranteed rate-up character)
//   Absolute worst case: 80 + 80 = 160 pulls for guaranteed rate-up

export const GAME_CONFIG = {
  // Base rates (exact % not yet officially disclosed, estimated from CBT)
  baseRate: 0.02, // SSR base rate ~1-3%, using 2% as middle estimate

  // Pity system — confirmed
  softPityStart: 65, // Soft pity estimated (not officially confirmed, conservative)
  hardPity: 80, // Guaranteed SSR within 80 pulls (confirmed)
  guaranteedRateUp: 120, // One-time safety net: guaranteed rate-up within 120 pulls
  absoluteWorstCase: 160, // 80 (lose 50/50) + 80 (guaranteed rate-up) = 160

  // 50/50 system — confirmed
  featuredRate: 0.5, // 50% chance SSR is the rate-up character
  guaranteedAfterLoss: true, // Lose 50/50 → next SSR is guaranteed rate-up

  // Currency — confirmed
  currencyPerPull: 300, // Star Memory per pull
  currencyName: "Star Memory",
  ticketName: "Hero Draw Ticket",
  multiPullCount: 10, // 10-pull = 3,000 Star Memory (no discount)

  // Soft pity probability increment (estimated, not confirmed)
  softPityIncrement: 0.04, // +4% per pull after soft pity (estimated)

  // Free pulls at launch
  launchFreePulls: 300, // ~300 free pulls from launch events

  // Data status
  dataStatus: "LAUNCH_DATA" as const satisfies "CBT_ESTIMATE" | "LAUNCH_DATA" | "CONFIRMED",
  lastUpdated: "2026-03-16",
  notes:
    "Pity system confirmed (80/120/160). Base rates and soft pity still estimated. No weapon banner exists.",
};

export type BannerType = "character";

export interface BannerInfo {
  name: string;
  type: BannerType;
  featuredUnit: string;
  endDate?: string;
}

export const CURRENT_BANNERS: BannerInfo[] = [
  {
    name: "Meliodas Special Pick Up Draw",
    type: "character",
    featuredUnit: "Meliodas",
    endDate: "3 weeks after first login",
  },
];
