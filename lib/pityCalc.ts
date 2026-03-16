import { GAME_CONFIG } from "./gameConfig";

export interface PityInput {
  currentPulls: number;
  isGuaranteed: boolean; // true = lost 50/50 before, next SSR is guaranteed rate-up
  targetCharacters: number;
  ownedCurrency: number;
  ownedTickets: number;
}

export interface PityResult {
  currentProb: number;
  pullsToHardPity: number;
  pullsToGuaranteedRateUp: number;
  pullsToAbsoluteWorst: number;
  bestCase: number;
  averageCase: number;
  worstCase: number;
  totalPullsAvailable: number;
  canReachHardPity: boolean;
  canReachGuaranteed: boolean;
  pullsShortHardPity: number;
  currencyShortHardPity: number;
  advice: string;
}

/**
 * Calculate single-pull probability at a given pull count (within one 80-pull cycle)
 */
export function getProbAtPull(pullNumber: number): number {
  const { baseRate, softPityStart, softPityIncrement, hardPity } = GAME_CONFIG;

  // Pull number within current 80-pull cycle
  const pullInCycle = pullNumber % hardPity;

  if (pullInCycle >= hardPity - 1) return 1.0;
  if (pullInCycle < softPityStart) return baseRate;

  const increment = (pullInCycle - softPityStart + 1) * softPityIncrement;
  return Math.min(baseRate + increment, 1.0);
}

/**
 * Calculate cumulative probability of getting at least one SSR within N pulls
 */
export function getCumulativeProb(startPull: number, totalPulls: number): number {
  let probNotGetting = 1.0;
  const maxPull = GAME_CONFIG.hardPity;
  for (let i = startPull; i < startPull + totalPulls && i < maxPull; i++) {
    probNotGetting *= 1 - getProbAtPull(i);
  }
  if (startPull + totalPulls >= maxPull) return 1.0;
  return 1 - probNotGetting;
}

/**
 * Calculate expected pulls to get an SSR from current position in 80-pull cycle
 */
function getExpectedPulls(currentPull: number): number {
  const { hardPity } = GAME_CONFIG;
  let expected = 0;
  let probStillGoing = 1.0;

  for (let i = currentPull; i < hardPity; i++) {
    const probHit = getProbAtPull(i);
    expected += probStillGoing * probHit * (i - currentPull + 1);
    probStillGoing *= 1 - probHit;
  }
  expected += probStillGoing * (hardPity - currentPull);
  return Math.ceil(expected);
}

/**
 * Main pity calculation
 *
 * System: 80-pull hard pity for SSR + 50/50 + 120-pull one-time guarantee
 * Worst case: 80 (lose 50/50) + 80 (guaranteed rate-up) = 160
 */
export function calculatePity(input: PityInput): PityResult {
  const { hardPity, guaranteedRateUp, absoluteWorstCase, currencyPerPull } = GAME_CONFIG;

  // Current single-pull probability
  const currentProb = getProbAtPull(input.currentPulls);

  // Distance to each pity milestone
  const pullsToHardPity = Math.max(0, hardPity - input.currentPulls);
  const pullsToGuaranteedRateUp = Math.max(0, guaranteedRateUp - input.currentPulls);
  const pullsToAbsoluteWorst = Math.max(0, absoluteWorstCase - input.currentPulls);

  // Single character scenarios
  const singleBest = 1;
  const singleExpected = getExpectedPulls(input.currentPulls);

  // Worst case for getting featured character
  let singleWorst: number;
  if (input.isGuaranteed) {
    // Already guaranteed rate-up, worst = just need to hit SSR within 80
    singleWorst = pullsToHardPity;
  } else {
    // Could lose 50/50, but 120-pull guarantee exists
    // Worst = min(120 pulls from start, 80 + 80 from current position)
    singleWorst = Math.min(pullsToGuaranteedRateUp, pullsToHardPity + hardPity);
  }

  // Multi-character (each additional starts fresh)
  const additionalBest = (input.targetCharacters - 1) * 1;
  const additionalExpected = (input.targetCharacters - 1) * getExpectedPulls(0);
  // Each additional worst: could need full 80+80=160 (but 120 guarantee helps)
  const additionalWorst = (input.targetCharacters - 1) * guaranteedRateUp;

  const bestCase = singleBest + additionalBest;
  const averageCase = singleExpected + additionalExpected;
  const worstCase = singleWorst + additionalWorst;

  // Resource calculation — primary target is hard pity (80)
  const pullsFromCurrency = Math.floor(input.ownedCurrency / currencyPerPull);
  const totalPullsAvailable = pullsFromCurrency + input.ownedTickets;

  const canReachHardPity = totalPullsAvailable >= pullsToHardPity;
  const canReachGuaranteed = totalPullsAvailable >= pullsToGuaranteedRateUp;
  const pullsShortHardPity = Math.max(0, pullsToHardPity - totalPullsAvailable);
  const currencyShortHardPity = pullsShortHardPity * currencyPerPull;

  // Dynamic advice
  let advice: string;
  const softPityDist = GAME_CONFIG.softPityStart - input.currentPulls;

  if (input.currentPulls >= GAME_CONFIG.softPityStart) {
    advice =
      "You're in soft pity range! Every pull has significantly increased odds. Keep pulling!";
  } else if (softPityDist <= 10 && softPityDist > 0) {
    advice = `Almost at soft pity! Just ${softPityDist} more pulls until rates start increasing.`;
  } else if (canReachGuaranteed) {
    advice = input.isGuaranteed
      ? `You have enough for guaranteed rate-up within ${pullsToHardPity} pulls. Safe to pull!`
      : `You have enough to reach the 120-pull guarantee. Even if you lose the 50/50, you'll get Meliodas!`;
  } else if (canReachHardPity) {
    advice = input.isGuaranteed
      ? "You can reach the 80-pull hard pity. Since you're guaranteed, your next SSR will be the featured character!"
      : "You can reach the 80-pull hard pity. There's a 50/50 chance for the featured character.";
  } else if (pullsShortHardPity <= 10) {
    advice = `Close! Only ${pullsShortHardPity} pulls short of hard pity. A few more events should cover it.`;
  } else {
    advice = `You need ${pullsShortHardPity} more pulls to reach hard pity (80). Save up and complete launch missions for more Star Memory!`;
  }

  return {
    currentProb,
    pullsToHardPity,
    pullsToGuaranteedRateUp,
    pullsToAbsoluteWorst,
    bestCase,
    averageCase,
    worstCase,
    totalPullsAvailable,
    canReachHardPity,
    canReachGuaranteed,
    pullsShortHardPity,
    currencyShortHardPity,
    advice,
  };
}

/**
 * Generate probability distribution data for chart (within one 80-pull cycle)
 */
export function generateProbDistribution(currentPulls: number): Array<{
  pull: number;
  probability: number;
  cumulative: number;
  isCurrentPosition: boolean;
  isSoftPity: boolean;
  isHardPity: boolean;
}> {
  const { hardPity, softPityStart } = GAME_CONFIG;
  const data = [];

  for (let i = 0; i <= hardPity; i++) {
    data.push({
      pull: i,
      probability: Math.round(getProbAtPull(i) * 10000) / 100,
      cumulative: Math.round(getCumulativeProb(0, i + 1) * 10000) / 100,
      isCurrentPosition: i === currentPulls,
      isSoftPity: i === softPityStart,
      isHardPity: i === hardPity,
    });
  }

  return data;
}
