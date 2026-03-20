import { CHARACTERS } from "./characters";

// ─── Types ───

export type WeaponType =
  | "Longsword"
  | "Axe"
  | "Dual Swords"
  | "Book"
  | "Wand"
  | "Staff"
  | "Lance"
  | "Rapier"
  | "Gauntlets"
  | "Cudgel"
  | "Greatsword"
  | "Shield";

export interface WeaponStats {
  attack: number;
  critChance: number;
  critDamage: number;
  efficiency: number;
  elementalDamage: number;
  burstDamage: number;
}

export interface WeaponTypeProfile {
  type: WeaponType;
  label: string;
  category: "Melee" | "Magic" | "Heavy" | "Defense";
  description: string;
  baseStats: WeaponStats;
  growthPerLevel: WeaponStats;
  playstyle: string;
}

export interface SlotConfig {
  weaponType: WeaponType;
  level: number;
  enhancement: number;
}

export interface WeaponSetup {
  characterId: string;
  main: SlotConfig;
  sub1: SlotConfig;
  sub2: SlotConfig;
}

export interface ComputedStats {
  attack: number;
  critChance: number;
  critDamage: number;
  efficiency: number;
  elementalDamage: number;
  burstDamage: number;
}

export interface RecommendedSetup {
  name: string;
  description: string;
  main: WeaponType;
  sub1: WeaponType;
  sub2: WeaponType;
  tags: string[];
}

export interface CharacterWeaponInfo {
  characterId: string;
  weaponTypes: WeaponType[];
  recommended: RecommendedSetup[];
}

// ─── Weapon Type Profiles ───
// Base stats at level 1. Growth applied per level.
// Data status: community-estimated from Early Access (2026-03-19).
// Exact values will be refined as more data is datamined.

export const WEAPON_PROFILES: WeaponTypeProfile[] = [
  {
    type: "Dual Swords",
    label: "Dual Swords",
    category: "Melee",
    description: "High crit rate and burst damage. Best for aggressive DPS.",
    playstyle: "Burst DPS",
    baseStats: { attack: 120, critChance: 8, critDamage: 30, efficiency: 3, elementalDamage: 5, burstDamage: 10 },
    growthPerLevel: { attack: 18, critChance: 0.12, critDamage: 0.4, efficiency: 0.04, elementalDamage: 0.06, burstDamage: 0.15 },
  },
  {
    type: "Longsword",
    label: "Longsword",
    category: "Melee",
    description: "Balanced offense and defense. Versatile option for most content.",
    playstyle: "Balanced",
    baseStats: { attack: 110, critChance: 5, critDamage: 20, efficiency: 5, elementalDamage: 5, burstDamage: 5 },
    growthPerLevel: { attack: 16, critChance: 0.08, critDamage: 0.3, efficiency: 0.06, elementalDamage: 0.06, burstDamage: 0.06 },
  },
  {
    type: "Axe",
    label: "Axe",
    category: "Heavy",
    description: "Raw attack power. Lower crit but consistent high damage.",
    playstyle: "Raw DPS",
    baseStats: { attack: 140, critChance: 3, critDamage: 25, efficiency: 2, elementalDamage: 3, burstDamage: 8 },
    growthPerLevel: { attack: 21, critChance: 0.05, critDamage: 0.35, efficiency: 0.03, elementalDamage: 0.04, burstDamage: 0.12 },
  },
  {
    type: "Greatsword",
    label: "Greatsword",
    category: "Heavy",
    description: "Highest base attack. Slow but devastating hits.",
    playstyle: "Power DPS",
    baseStats: { attack: 150, critChance: 4, critDamage: 35, efficiency: 2, elementalDamage: 3, burstDamage: 6 },
    growthPerLevel: { attack: 22, critChance: 0.06, critDamage: 0.5, efficiency: 0.02, elementalDamage: 0.04, burstDamage: 0.08 },
  },
  {
    type: "Lance",
    label: "Lance",
    category: "Melee",
    description: "Good reach with crit damage focus. Strong in PvE.",
    playstyle: "Crit DPS",
    baseStats: { attack: 115, critChance: 6, critDamage: 35, efficiency: 4, elementalDamage: 4, burstDamage: 6 },
    growthPerLevel: { attack: 17, critChance: 0.10, critDamage: 0.5, efficiency: 0.05, elementalDamage: 0.05, burstDamage: 0.08 },
  },
  {
    type: "Rapier",
    label: "Rapier",
    category: "Melee",
    description: "Fast attacks with high crit chance. Lower base damage.",
    playstyle: "Speed DPS",
    baseStats: { attack: 100, critChance: 10, critDamage: 25, efficiency: 5, elementalDamage: 5, burstDamage: 5 },
    growthPerLevel: { attack: 15, critChance: 0.15, critDamage: 0.35, efficiency: 0.06, elementalDamage: 0.06, burstDamage: 0.06 },
  },
  {
    type: "Gauntlets",
    label: "Gauntlets",
    category: "Melee",
    description: "Close-range brawler. Balanced ATK and burst damage.",
    playstyle: "Brawler",
    baseStats: { attack: 125, critChance: 5, critDamage: 20, efficiency: 4, elementalDamage: 4, burstDamage: 12 },
    growthPerLevel: { attack: 19, critChance: 0.08, critDamage: 0.3, efficiency: 0.05, elementalDamage: 0.05, burstDamage: 0.18 },
  },
  {
    type: "Cudgel",
    label: "Cudgel",
    category: "Heavy",
    description: "Stun-oriented heavy weapon. Good burst and CC potential.",
    playstyle: "CC / Burst",
    baseStats: { attack: 130, critChance: 3, critDamage: 20, efficiency: 3, elementalDamage: 3, burstDamage: 15 },
    growthPerLevel: { attack: 20, critChance: 0.05, critDamage: 0.25, efficiency: 0.04, elementalDamage: 0.04, burstDamage: 0.22 },
  },
  {
    type: "Staff",
    label: "Staff",
    category: "Magic",
    description: "Support-focused. High efficiency for faster skill rotations.",
    playstyle: "Support",
    baseStats: { attack: 85, critChance: 3, critDamage: 15, efficiency: 10, elementalDamage: 8, burstDamage: 4 },
    growthPerLevel: { attack: 12, critChance: 0.04, critDamage: 0.2, efficiency: 0.12, elementalDamage: 0.10, burstDamage: 0.05 },
  },
  {
    type: "Book",
    label: "Book",
    category: "Magic",
    description: "Elemental damage specialist. Best for element-focused builds.",
    playstyle: "Elemental DPS",
    baseStats: { attack: 90, critChance: 4, critDamage: 18, efficiency: 8, elementalDamage: 12, burstDamage: 3 },
    growthPerLevel: { attack: 13, critChance: 0.06, critDamage: 0.25, efficiency: 0.10, elementalDamage: 0.15, burstDamage: 0.04 },
  },
  {
    type: "Wand",
    label: "Wand",
    category: "Magic",
    description: "Balanced magic weapon. Decent efficiency and elemental damage.",
    playstyle: "Balanced Magic",
    baseStats: { attack: 88, critChance: 5, critDamage: 20, efficiency: 8, elementalDamage: 10, burstDamage: 4 },
    growthPerLevel: { attack: 13, critChance: 0.07, critDamage: 0.28, efficiency: 0.10, elementalDamage: 0.12, burstDamage: 0.05 },
  },
  {
    type: "Shield",
    label: "Shield",
    category: "Defense",
    description: "Defensive option. Low offense but provides survivability.",
    playstyle: "Tank",
    baseStats: { attack: 70, critChance: 2, critDamage: 10, efficiency: 6, elementalDamage: 2, burstDamage: 3 },
    growthPerLevel: { attack: 10, critChance: 0.03, critDamage: 0.15, efficiency: 0.08, elementalDamage: 0.03, burstDamage: 0.04 },
  },
];

// ─── Character Weapon Recommendations ───

export const CHARACTER_WEAPON_INFO: CharacterWeaponInfo[] = [
  {
    characterId: "meliodas",
    weaponTypes: ["Longsword", "Axe", "Dual Swords"],
    recommended: [
      { name: "Burst DPS", description: "Maximum burst damage with Darkness Burst combos", main: "Dual Swords", sub1: "Axe", sub2: "Longsword", tags: ["dps", "burst", "boss"] },
      { name: "Sustained DPS", description: "More consistent damage with better survivability", main: "Longsword", sub1: "Dual Swords", sub2: "Axe", tags: ["dps", "pve"] },
    ],
  },
  {
    characterId: "king",
    weaponTypes: ["Book", "Wand", "Staff"],
    recommended: [
      { name: "Pure Healer", description: "Maximize healing output and skill uptime", main: "Staff", sub1: "Wand", sub2: "Book", tags: ["heal", "support"] },
      { name: "Elemental Support", description: "More elemental damage while still healing", main: "Book", sub1: "Staff", sub2: "Wand", tags: ["support", "elemental"] },
    ],
  },
  {
    characterId: "jericho",
    weaponTypes: ["Dual Swords", "Lance", "Rapier"],
    recommended: [
      { name: "Crit Burst", description: "Frozen Saber + maximum crit for Ice Needle burst", main: "Dual Swords", sub1: "Rapier", sub2: "Lance", tags: ["dps", "crit", "burst"] },
      { name: "Sustained Crit", description: "Higher crit consistency with Lance main", main: "Lance", sub1: "Dual Swords", sub2: "Rapier", tags: ["dps", "crit"] },
    ],
  },
  {
    characterId: "diane",
    weaponTypes: ["Gauntlets", "Axe", "Cudgel"],
    recommended: [
      { name: "AoE Breaker", description: "Breaker stun combos with burst follow-up", main: "Gauntlets", sub1: "Cudgel", sub2: "Axe", tags: ["aoe", "cc", "dps"] },
      { name: "Raw Power", description: "Maximum attack for Breaker damage bonus", main: "Axe", sub1: "Gauntlets", sub2: "Cudgel", tags: ["dps", "power"] },
    ],
  },
  {
    characterId: "elaine",
    weaponTypes: ["Book", "Wand", "Staff"],
    recommended: [
      { name: "CC Support", description: "Fast skill rotations for Petrify uptime", main: "Staff", sub1: "Wand", sub2: "Book", tags: ["cc", "support"] },
      { name: "Damage Amp", description: "Higher personal damage while still providing CC", main: "Book", sub1: "Staff", sub2: "Wand", tags: ["support", "elemental"] },
    ],
  },
  {
    characterId: "drake",
    weaponTypes: ["Greatsword", "Staff", "Longsword"],
    recommended: [
      { name: "Thunder DPS", description: "Maximum damage output for Dragon King passive", main: "Greatsword", sub1: "Longsword", sub2: "Staff", tags: ["dps", "thunder"] },
      { name: "Balanced Explorer", description: "Good damage with faster skill cycling", main: "Longsword", sub1: "Greatsword", sub2: "Staff", tags: ["explore", "balanced"] },
    ],
  },
  {
    characterId: "manny",
    weaponTypes: ["Staff", "Dual Swords", "Longsword"],
    recommended: [
      { name: "Pure Support", description: "Maximize Stigmata uptime and skill efficiency", main: "Staff", sub1: "Longsword", sub2: "Dual Swords", tags: ["support", "debuff"] },
      { name: "Sub-DPS", description: "More personal damage while still applying Stigmata", main: "Dual Swords", sub1: "Staff", sub2: "Longsword", tags: ["dps", "support"] },
    ],
  },
  {
    characterId: "tristan",
    weaponTypes: ["Dual Swords", "Longsword", "Greatsword"],
    recommended: [
      { name: "Fire Burst", description: "Fire element burst with Dual Swords", main: "Dual Swords", sub1: "Greatsword", sub2: "Longsword", tags: ["fire", "burst", "dps"] },
      { name: "Crit Punisher", description: "Greatsword crit stacking into 243% Punisher", main: "Greatsword", sub1: "Dual Swords", sub2: "Longsword", tags: ["crit", "dps"] },
    ],
  },
  {
    characterId: "gilthunder",
    weaponTypes: ["Longsword", "Shield", "Lance"],
    recommended: [
      { name: "Thunder DPS", description: "Lightning Sword spam with cooldown reduction", main: "Longsword", sub1: "Lance", sub2: "Shield", tags: ["thunder", "dps"] },
      { name: "Defensive", description: "More survivability for harder content", main: "Shield", sub1: "Longsword", sub2: "Lance", tags: ["tank", "support"] },
    ],
  },
  {
    characterId: "tioreh",
    weaponTypes: ["Book", "Wand", "Staff"],
    recommended: [
      { name: "Fire Debuffer", description: "Maximize Combustion uptime for fire team", main: "Book", sub1: "Staff", sub2: "Wand", tags: ["fire", "debuff"] },
      { name: "Support Focus", description: "Faster skill rotation for more debuff applications", main: "Staff", sub1: "Book", sub2: "Wand", tags: ["support"] },
    ],
  },
  {
    characterId: "guila",
    weaponTypes: ["Lance", "Shield", "Rapier"],
    recommended: [
      { name: "DPS Demon Form", description: "Maximize damage during 20s Demon Form window", main: "Lance", sub1: "Rapier", sub2: "Shield", tags: ["dps", "fire", "burst"] },
      { name: "Tanky DPS", description: "More survivability with Shield sub-weapon", main: "Lance", sub1: "Shield", sub2: "Rapier", tags: ["dps", "tank"] },
    ],
  },
  {
    characterId: "slader",
    weaponTypes: ["Greatsword", "Axe", "Cudgel"],
    recommended: [
      { name: "Raw Power", description: "Maximum ATK for brute force damage", main: "Greatsword", sub1: "Axe", sub2: "Cudgel", tags: ["dps", "power"] },
      { name: "Mark Exploiter", description: "Cudgel +40% mark damage for team combos", main: "Cudgel", sub1: "Greatsword", sub2: "Axe", tags: ["dps", "burst"] },
    ],
  },
  {
    characterId: "howzer",
    weaponTypes: ["Lance", "Gauntlets", "Cudgel"],
    recommended: [
      { name: "Wind AoE", description: "Lance for crit damage on Tempest AoE", main: "Lance", sub1: "Gauntlets", sub2: "Cudgel", tags: ["aoe", "wind", "dps"] },
      { name: "Burst AoE", description: "Cudgel burst damage for Eye of the Storm", main: "Cudgel", sub1: "Lance", sub2: "Gauntlets", tags: ["aoe", "burst"] },
    ],
  },
  {
    characterId: "bug",
    weaponTypes: ["Dual Swords", "Axe", "Book"],
    recommended: [
      { name: "Backstab DPS", description: "Maximum crit for Backstab +50% damage", main: "Dual Swords", sub1: "Axe", sub2: "Book", tags: ["dps", "dark", "crit"] },
      { name: "Debuff Focus", description: "Faster Curse and Dark Vulnerability application", main: "Book", sub1: "Dual Swords", sub2: "Axe", tags: ["debuff", "support"] },
    ],
  },
  {
    characterId: "hendrickson",
    weaponTypes: ["Dual Swords", "Longsword", "Lance"],
    recommended: [
      { name: "Hybrid Damage", description: "Balanced offense for healing and cursing", main: "Longsword", sub1: "Dual Swords", sub2: "Lance", tags: ["hybrid", "support"] },
    ],
  },
  {
    characterId: "griamore",
    weaponTypes: ["Shield", "Cudgel", "Gauntlets"],
    recommended: [
      { name: "Pure Tank", description: "Maximum survivability for Wall Master passive", main: "Shield", sub1: "Gauntlets", sub2: "Cudgel", tags: ["tank"] },
      { name: "Stun Tank", description: "Gauntlets 8s stun with tank stats", main: "Gauntlets", sub1: "Shield", sub2: "Cudgel", tags: ["tank", "cc"] },
    ],
  },
  {
    characterId: "daisy",
    weaponTypes: ["Shield", "Book", "Wand"],
    recommended: [
      { name: "Charge Support", description: "Maximize Offbeat Girl +50% charge efficiency", main: "Book", sub1: "Wand", sub2: "Shield", tags: ["support", "elemental"] },
    ],
  },
  {
    characterId: "dreyfus",
    weaponTypes: ["Rapier", "Longsword", "Lance"],
    recommended: [
      { name: "DoT Specialist", description: "Fast attacks for DoT application and halved intervals", main: "Rapier", sub1: "Lance", sub2: "Longsword", tags: ["dot", "dps"] },
    ],
  },
  {
    characterId: "dreydrin",
    weaponTypes: ["Shield", "Axe", "Rapier"],
    recommended: [
      { name: "Emergency Tank", description: "Shield main for maximum protection", main: "Shield", sub1: "Axe", sub2: "Rapier", tags: ["tank", "support"] },
    ],
  },
];

// ─── Constants ───

export const MAX_WEAPON_LEVEL = 60;
export const MAX_ENHANCEMENT = 15;
export const ENHANCEMENT_MULTIPLIER = 0.03; // +3% stats per enhancement level

// ─── Calculation Functions ───

export function getWeaponProfile(type: WeaponType): WeaponTypeProfile | undefined {
  return WEAPON_PROFILES.find((p) => p.type === type);
}

export function getCharacterWeapons(characterId: string): CharacterWeaponInfo | undefined {
  return CHARACTER_WEAPON_INFO.find((c) => c.characterId === characterId);
}

export function calculateSlotStats(slot: SlotConfig): WeaponStats {
  const profile = getWeaponProfile(slot.weaponType);
  if (!profile) {
    return { attack: 0, critChance: 0, critDamage: 0, efficiency: 0, elementalDamage: 0, burstDamage: 0 };
  }

  const level = Math.max(1, Math.min(slot.level, MAX_WEAPON_LEVEL));
  const enhancement = Math.max(0, Math.min(slot.enhancement, MAX_ENHANCEMENT));
  const levelMultiplier = level - 1;
  const enhancementBonus = 1 + enhancement * ENHANCEMENT_MULTIPLIER;

  return {
    attack: Math.round((profile.baseStats.attack + profile.growthPerLevel.attack * levelMultiplier) * enhancementBonus),
    critChance: round2((profile.baseStats.critChance + profile.growthPerLevel.critChance * levelMultiplier) * enhancementBonus),
    critDamage: round2((profile.baseStats.critDamage + profile.growthPerLevel.critDamage * levelMultiplier) * enhancementBonus),
    efficiency: round2((profile.baseStats.efficiency + profile.growthPerLevel.efficiency * levelMultiplier) * enhancementBonus),
    elementalDamage: round2((profile.baseStats.elementalDamage + profile.growthPerLevel.elementalDamage * levelMultiplier) * enhancementBonus),
    burstDamage: round2((profile.baseStats.burstDamage + profile.growthPerLevel.burstDamage * levelMultiplier) * enhancementBonus),
  };
}

export function calculateTotalStats(setup: WeaponSetup): ComputedStats {
  const mainStats = calculateSlotStats(setup.main);
  const sub1Stats = calculateSlotStats(setup.sub1);
  const sub2Stats = calculateSlotStats(setup.sub2);

  return {
    attack: Math.round(mainStats.attack * 1.0 + sub1Stats.attack * 0.3 + sub2Stats.attack * 0.3),
    critChance: round2(mainStats.critChance * 1.0 + sub1Stats.critChance * 0.3 + sub2Stats.critChance * 0.3),
    critDamage: round2(mainStats.critDamage * 1.0 + sub1Stats.critDamage * 0.3 + sub2Stats.critDamage * 0.3),
    efficiency: round2(mainStats.efficiency * 1.0 + sub1Stats.efficiency * 0.3 + sub2Stats.efficiency * 0.3),
    elementalDamage: round2(mainStats.elementalDamage * 1.0 + sub1Stats.elementalDamage * 0.3 + sub2Stats.elementalDamage * 0.3),
    burstDamage: round2(mainStats.burstDamage * 1.0 + sub1Stats.burstDamage * 0.3 + sub2Stats.burstDamage * 0.3),
  };
}

export function calculateRecommendedStats(
  characterId: string,
  rec: RecommendedSetup,
  level: number,
  enhancement: number,
): ComputedStats {
  return calculateTotalStats({
    characterId,
    main: { weaponType: rec.main, level, enhancement },
    sub1: { weaponType: rec.sub1, level, enhancement },
    sub2: { weaponType: rec.sub2, level, enhancement },
  });
}

/** Get compatible characters for lookup */
export function getCompatibleCharacters(): { id: string; name: string; weaponTypes: WeaponType[] }[] {
  return CHARACTERS
    .filter((c) => c.tier !== "?" && !c.elements.includes("TBD"))
    .map((c) => {
      const info = getCharacterWeapons(c.id);
      return {
        id: c.id,
        name: c.name,
        weaponTypes: (info?.weaponTypes ?? c.weaponTypes) as WeaponType[],
      };
    });
}

function round2(n: number): number {
  return Math.round(n * 100) / 100;
}
