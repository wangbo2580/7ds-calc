import { GAME_CONFIG } from "./gameConfig";

export interface PityInput {
  currentPulls: number;
  isGuaranteed: boolean; // true = next 5★ is guaranteed featured
  targetCharacters: number;
  ownedCurrency: number;
  ownedTickets: number;
}

export interface PityResult {
  currentProb: number;
  pullsToHardPity: number;
  bestCase: number;
  averageCase: number;
  worstCase: number;
  totalPullsAvailable: number;
  canReachPity: boolean;
  pullsShort: number;
  currencyShort: number;
  advice: string;
}

/**
 * Calculate single-pull probability at a given pull count
 */
export function getProbAtPull(pullNumber: number): number {
  const { baseRate, softPityStart, softPityIncrement, hardPity } = GAME_CONFIG;

  if (pullNumber >= hardPity) return 1.0;
  if (pullNumber < softPityStart) return baseRate;

  const increment = (pullNumber - softPityStart + 1) * softPityIncrement;
  return Math.min(baseRate + increment, 1.0);
}

/**
 * Calculate cumulative probability of getting at least one 5★ within N pulls
 */
export function getCumulativeProb(startPull: number, totalPulls: number): number {
  let probNotGetting = 1.0;
  for (let i = startPull; i < startPull + totalPulls && i < GAME_CONFIG.hardPity; i++) {
    probNotGetting *= 1 - getProbAtPull(i);
  }
  if (startPull + totalPulls >= GAME_CONFIG.hardPity) return 1.0;
  return 1 - probNotGetting;
}

/**
 * Calculate expected pulls to get a 5★ from current position
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
  // At hard pity, guaranteed
  expected += probStillGoing * (hardPity - currentPull);
  return Math.ceil(expected);
}

/**
 * Main pity calculation
 */
export function calculatePity(input: PityInput): PityResult {
  const { hardPity, currencyPerPull } = GAME_CONFIG;

  // Current single-pull probability
  const currentProb = getProbAtPull(input.currentPulls);

  // Pulls to hard pity
  const pullsToHardPity = Math.max(0, hardPity - input.currentPulls);

  // Single character scenarios
  const singleBest = 1;
  const singleExpected = getExpectedPulls(input.currentPulls);

  // Worst case for single character
  let singleWorst: number;
  if (input.isGuaranteed) {
    singleWorst = pullsToHardPity;
  } else {
    // Could lose 50/50, then need another full pity
    singleWorst = pullsToHardPity + hardPity;
  }

  // Multi-character calculation
  const additionalBest = (input.targetCharacters - 1) * 1;
  const additionalExpected = (input.targetCharacters - 1) * getExpectedPulls(0);
  // Worst: each additional character could lose 50/50 + hard pity twice
  const additionalWorst = (input.targetCharacters - 1) * hardPity * 2;

  const bestCase = singleBest + additionalBest;
  const averageCase = singleExpected + additionalExpected;
  const worstCase = singleWorst + additionalWorst;

  // Resource calculation
  const pullsFromCurrency = Math.floor(input.ownedCurrency / currencyPerPull);
  const totalPullsAvailable = pullsFromCurrency + input.ownedTickets;
  const neededForGuarantee = input.isGuaranteed ? pullsToHardPity : pullsToHardPity + hardPity;
  const canReachPity = totalPullsAvailable >= pullsToHardPity;
  const pullsShort = Math.max(0, pullsToHardPity - totalPullsAvailable);
  const currencyShort = pullsShort * currencyPerPull;

  // Dynamic advice
  let advice: string;
  if (input.currentPulls >= GAME_CONFIG.softPityStart) {
    advice =
      "You're in soft pity range! Every pull has significantly increased odds. Keep pulling!";
  } else if (input.currentPulls >= GAME_CONFIG.softPityStart - 10) {
    advice = `Almost at soft pity! Just ${GAME_CONFIG.softPityStart - input.currentPulls} more pulls until rates start increasing.`;
  } else if (canReachPity && totalPullsAvailable >= neededForGuarantee) {
    advice =
      "You have enough resources for a guaranteed featured character. Safe to pull!";
  } else if (canReachPity) {
    advice =
      "You can reach hard pity, but might lose the 50/50. You have a good chance though!";
  } else if (pullsShort <= 10) {
    advice = `You're close! Only ${pullsShort} pulls short of hard pity. A few more events should cover it.`;
  } else {
    advice = `You need ${pullsShort} more pulls to reach hard pity. Save up and wait for more events!`;
  }

  return {
    currentProb,
    pullsToHardPity,
    bestCase,
    averageCase,
    worstCase,
    totalPullsAvailable,
    canReachPity,
    pullsShort,
    currencyShort,
    advice,
  };
}

/**
 * Generate probability distribution data for chart
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
