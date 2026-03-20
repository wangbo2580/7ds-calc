export interface Character {
  id: string;
  name: string;
  rarity: number;
  elements: string[];
  role: string;
  weaponTypes: string[];
  tier: "SS" | "S" | "A" | "B" | "C" | "?";
  tags: string[];
  free?: string;
  note: string;
}

export const CHARACTERS: Character[] = [
  // SS Tier
  {
    id: "meliodas",
    name: "Meliodas",
    rarity: 6,
    elements: ["Dark"],
    role: "DPS",
    weaponTypes: ["Longsword", "Axe", "Dual Swords"],
    tier: "SS",
    tags: ["burst", "dps", "dark"],
    note: "The launch banner star. Absurd burst damage across all three weapon loadouts. Darkness Burst mechanic stacks Demon Energy for devastating combos.",
  },
  {
    id: "king",
    name: "King",
    rarity: 5,
    elements: ["Holy", "Physics", "Earth"],
    role: "Healer / Support",
    weaponTypes: ["Book", "Wand", "Staff"],
    tier: "SS",
    tags: ["heal", "shield", "support"],
    note: "Best healer at launch. Fairy King passive triggers emergency shields and healing below 30% HP. Ultimate gives 50% max HP shield + regen to entire party.",
  },

  // S Tier
  {
    id: "jericho",
    name: "Jericho",
    rarity: 5,
    elements: ["Ice"],
    role: "DPS / Crowd Control",
    weaponTypes: ["Dual Swords", "Lance", "Rapier"],
    tier: "S",
    tags: ["burst", "dps", "cc", "ice"],
    note: "Highest single-target burst. Frozen Saber gives +30% crit rate with teleport. Ultimate Ice Needle hits 262% ATK with crit buff. Brings Freeze CC.",
  },
  {
    id: "diane",
    name: "Diane",
    rarity: 5,
    elements: ["Earth"],
    role: "Tank / AoE DPS",
    weaponTypes: ["Gauntlets", "Axe", "Cudgel"],
    tier: "S",
    tags: ["aoe", "tank", "dps", "earth"],
    note: "Best AoE damage at launch. Giant Girl passive gives free 30% max HP shield. Breaker stuns for 4s then boosts follow-up damage 30-100%. Brings Petrify.",
  },
  {
    id: "elaine",
    name: "Elaine",
    rarity: 5,
    elements: ["Wind", "Holy", "Earth"],
    role: "Support / Crowd Control",
    weaponTypes: ["Book", "Wand", "Staff"],
    tier: "S",
    tags: ["cc", "support", "shield", "wind"],
    note: "Top-tier support. Guardian's Blossom gives 300% DEF shields. Ultimate Dust Seal: 268% DMG + 3s Bind into 6s Petrify. During Petrify, team gets +100% DMG.",
  },
  {
    id: "drake",
    name: "Drake",
    rarity: 5,
    elements: ["Thunder"],
    role: "DPS / Utility",
    weaponTypes: ["Greatsword", "Staff", "Longsword"],
    tier: "S",
    tags: ["dps", "explore", "thunder"],
    note: "Strong thunder DPS with Dragon King passive. Reveals treasure chests on the map, making exploration significantly more efficient.",
  },
  {
    id: "manny",
    name: "Manny",
    rarity: 5,
    elements: ["Holy", "Ice"],
    role: "Support / Sub-DPS",
    weaponTypes: ["Staff", "Dual Swords", "Longsword"],
    tier: "S",
    tags: ["debuff", "support", "explore"],
    note: "Flash Explosion applies Stigmata: -20% all elemental DEF on enemies. Reveals Star Dust Fragment locations. High-value pull for team damage and exploration.",
  },

  // A Tier
  {
    id: "tristan",
    name: "Tristan",
    rarity: 5,
    elements: ["Fire", "Wind"],
    role: "DPS / Hybrid",
    weaponTypes: ["Dual Swords", "Longsword", "Greatsword"],
    tier: "A",
    tags: ["dps", "fire", "wind"],
    note: "Versatile with Fire burst (Dual Swords) and Wind support (Longsword). Greatsword gives crit stacking with 243% Punisher finisher. Decent all-rounder.",
  },
  {
    id: "gilthunder",
    name: "Gilthunder",
    rarity: 5,
    elements: ["Thunder"],
    role: "DPS / Support Hybrid",
    weaponTypes: ["Longsword", "Shield", "Lance"],
    tier: "A",
    tags: ["dps", "support", "thunder"],
    note: "Solid thunder DPS. Lightning Sword (176% + Shock). Charge Electricity reduces cooldowns. Outclassed by Drake in damage but brings more defensive utility.",
  },
  {
    id: "tioreh",
    name: "Tioreh",
    rarity: 5,
    elements: ["Fire", "Wind"],
    role: "Sub-DPS / Support",
    weaponTypes: ["Book", "Wand", "Staff"],
    tier: "A",
    tags: ["debuff", "fire", "support"],
    free: "Pre-registration",
    note: "Free from pre-reg. Combustion debuff is useful for Fire teams. Dragon Breath hits 273% DMG. Competent Fire option everyone starts with.",
  },
  {
    id: "guila",
    name: "Guila",
    rarity: 5,
    elements: ["Fire"],
    role: "DPS / Shielder",
    weaponTypes: ["Lance", "Shield", "Rapier"],
    tier: "A",
    tags: ["dps", "fire", "shield"],
    free: "Launch event",
    note: "Free from launch event. Demon Form transformation buffs for 20s. Blazing Burst reduces enemy fire DEF by 20%. Do NOT pull on gacha \u2014 she's given free.",
  },
  {
    id: "slader",
    name: "Slader",
    rarity: 5,
    elements: ["Fire", "Physics"],
    role: "DPS",
    weaponTypes: ["Greatsword", "Axe", "Cudgel"],
    tier: "A",
    tags: ["dps", "fire"],
    free: "Tutorial",
    note: "Free from tutorial. Straightforward physical/fire DPS with 252-356% ultimate. Cudgel gives +40% mark damage. Usable early but gets outscaled.",
  },

  // B Tier
  {
    id: "howzer",
    name: "Howzer",
    rarity: 5,
    elements: ["Wind"],
    role: "AoE DPS",
    weaponTypes: ["Lance", "Gauntlets", "Cudgel"],
    tier: "B",
    tags: ["aoe", "wind", "dps"],
    note: "Triple wind element makes him core for wind teams. Tempest magic and Eye of the Storm provide consistent AoE. Limited by lack of wind synergy partners at launch.",
  },
  {
    id: "bug",
    name: "Bug",
    rarity: 5,
    elements: ["Dark"],
    role: "DPS / Debuffer",
    weaponTypes: ["Dual Swords", "Axe", "Book"],
    tier: "B",
    tags: ["debuff", "dps", "dark"],
    note: "Backstab: +50% DMG from behind. Applies Curse (+20% team DMG) and Dark vulnerability (+30%). Requires specific positioning to maximize.",
  },
  {
    id: "hendrickson",
    name: "Hendrickson",
    rarity: 5,
    elements: ["Holy", "Physics", "Dark"],
    role: "Hybrid Support",
    weaponTypes: ["Dual Swords", "Longsword", "Lance"],
    tier: "B",
    tags: ["heal", "debuff", "support"],
    note: "Jack-of-all-trades with healing, cursing, and damage. Ultimate heals allies (268% ATK) or curses enemies. Doesn't excel at any one thing.",
  },
  {
    id: "griamore",
    name: "Griamore",
    rarity: 5,
    elements: ["Physics"],
    role: "Tank",
    weaponTypes: ["Shield", "Cudgel", "Gauntlets"],
    tier: "B",
    tags: ["tank", "shield"],
    note: "Pure tank. Wall Master: team +20% burst efficiency with shields active. Shield Stance gives +25% DEF. Gauntlets can stun 8s. Most early content doesn't need a dedicated tank.",
  },
  {
    id: "daisy",
    name: "Daisy",
    rarity: 5,
    elements: ["Earth", "Thunder", "Wind"],
    role: "Support",
    weaponTypes: ["Shield", "Book", "Wand"],
    tier: "B",
    tags: ["support"],
    note: "Offbeat Girl: +50% magic charge efficiency for faster ultimates. Domby mount summon. Low damage contribution, mostly utility.",
  },

  // C Tier
  {
    id: "dreyfus",
    name: "Dreyfus",
    rarity: 5,
    elements: ["Physics", "Earth", "Holy"],
    role: "DoT / Control",
    weaponTypes: ["Rapier", "Longsword", "Lance"],
    tier: "C",
    tags: ["dot", "cc"],
    note: "DoT specialist. Grandmaster's Honor: +15% DoT DMG, halved DoT intervals against stunned/paralyzed targets. Requires specific setups.",
  },
  {
    id: "dreydrin",
    name: "Dreydrin",
    rarity: 5,
    elements: ["Earth", "Physics", "Holy"],
    role: "Tank / Support",
    weaponTypes: ["Shield", "Axe", "Rapier"],
    tier: "C",
    tags: ["tank", "shield", "support"],
    note: "Emergency shielder below 30% HP. Rapier ultimate buffs team Holy and Fire ATK. Overlaps with King who does everything better.",
  },
  {
    id: "escanor",
    name: "Escanor",
    rarity: 5,
    elements: ["TBD"],
    role: "DPS (Time-gated)",
    weaponTypes: ["Axe", "Greatsword", "Shield"],
    tier: "C",
    tags: ["dps"],
    note: "Sunshine mechanic: stronger during daytime, weaker at night, peak at noon. Creates inconsistency. Full skill data not yet disclosed.",
  },
  {
    id: "gowther",
    name: "Gowther",
    rarity: 5,
    elements: ["TBD"],
    role: "TBD",
    weaponTypes: ["Book", "Wand", "Staff"],
    tier: "C",
    tags: [],
    note: "Skills and element data not yet disclosed at launch. Major character in the series so expect him to be relevant eventually.",
  },
  {
    id: "elizabeth",
    name: "Elizabeth",
    rarity: 5,
    elements: ["TBD"],
    role: "Healer (Expected)",
    weaponTypes: ["Book", "Wand", "Staff"],
    tier: "C",
    tags: [],
    note: "Skills undisclosed. Likely a healer/support based on the source material. Can't rank properly until full kit is revealed.",
  },

  // ? Tier (data incomplete)
  {
    id: "ban",
    name: "Ban",
    rarity: 6,
    elements: ["TBD"],
    role: "TBD",
    weaponTypes: ["Cudgel", "Greatsword", "Gauntlets"],
    tier: "?",
    tags: [],
    note: "6-star rarity. Immortality mechanic confirmed. Skills and element not disclosed. Likely future banner character.",
  },
  {
    id: "merlin",
    name: "Merlin",
    rarity: 6,
    elements: ["TBD"],
    role: "TBD",
    weaponTypes: ["Book", "Wand", "Staff"],
    tier: "?",
    tags: [],
    note: "6-star rarity. No skill data. Traditionally one of the most powerful in the series. Almost certainly top-tier once released.",
  },
];

export const ELEMENT_COLORS: Record<string, string> = {
  Dark: "bg-[#9333ea]/20 text-[#c084fc]",
  Fire: "bg-[#ef4444]/20 text-[#fca5a5]",
  Wind: "bg-[#22c55e]/20 text-[#86efac]",
  Ice: "bg-[#06b6d4]/20 text-[#67e8f9]",
  Thunder: "bg-[#eab308]/20 text-[#fde047]",
  Holy: "bg-[#f59e0b]/20 text-[#fcd34d]",
  Earth: "bg-[#a16207]/20 text-[#d97706]",
  Physics: "bg-[#6b7280]/20 text-[#d1d5db]",
  TBD: "bg-[#374151]/20 text-[#6b7280]",
};

export const TIER_COLORS: Record<string, { text: string; bg: string; border: string }> = {
  SS: { text: "text-[#FF4444]", bg: "bg-[#FF4444]/15", border: "border-[#FF4444]/30" },
  S: { text: "text-[#FF8C00]", bg: "bg-[#FF8C00]/15", border: "border-[#FF8C00]/30" },
  A: { text: "text-[#FFD700]", bg: "bg-[#FFD700]/15", border: "border-[#FFD700]/30" },
  B: { text: "text-[#4FC3F7]", bg: "bg-[#4FC3F7]/15", border: "border-[#4FC3F7]/30" },
  C: { text: "text-[#9E9E9E]", bg: "bg-[#9E9E9E]/15", border: "border-[#9E9E9E]/30" },
  "?": { text: "text-[#7C4DFF]", bg: "bg-[#7C4DFF]/15", border: "border-[#7C4DFF]/30" },
};

export function getCharacter(id: string): Character | undefined {
  return CHARACTERS.find((c) => c.id === id);
}

export function getCharactersByTier(tier: Character["tier"]): Character[] {
  return CHARACTERS.filter((c) => c.tier === tier);
}
