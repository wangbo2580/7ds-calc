// Damage Calculator engine for Seven Deadly Sins: Origin
// Formula: community-estimated from Early Access (2026-03-19)
//
// Base Damage = ATK × Skill Multiplier
// After DEF  = Base × (1 - DEF_reduction)
// After Elem = AfterDEF × (1 + Elemental Bonus - Enemy Ele RES + Ele RES Shred)
// If Crit    = AfterElem × (1 + Crit Damage%)
// Final      = Crit/NonCrit × (1 + sum of DMG Taken debuffs)
//
// DEF_reduction approximation: DEF / (DEF + 500 + Level×10)

// ─── Types ───

export interface Skill {
  id: string;
  name: string;
  characterId: string;
  type: "normal" | "skill" | "ultimate";
  multiplier: number; // e.g. 2.62 = 262% ATK
  element: string;
  hits: number;
  cooldown: number; // seconds, 0 for normals
  description: string;
}

export interface Debuff {
  id: string;
  name: string;
  source: string; // character name
  type: "ele_res_reduce" | "dmg_taken_increase";
  value: number; // 0.20 = 20%
  element?: string; // if element-specific (e.g. fire only)
  description: string;
}

export interface DamageInput {
  attack: number;
  skill: Skill;
  critRate: number; // 0-100
  critDamage: number; // e.g. 150 = 150%
  elementalBonus: number; // 0-100 %
  enemyDef: number;
  enemyLevel: number;
  enemyEleRes: number; // 0-100 %
  activeDebuffs: string[]; // debuff ids
}

export interface DamageResult {
  baseDamage: number;
  afterDef: number;
  nonCritHit: number;
  critHit: number;
  expectedHit: number;
  totalNonCrit: number; // × hits
  totalCrit: number;
  totalExpected: number;
  dps: number; // expected / cooldown (or per-hit for normals)
  defReduction: number; // % reduced by DEF
  effectiveEleBonus: number; // after shred
  effectiveDmgAmp: number; // from debuffs
  breakdown: string[];
}

// ─── Skill Database ───
// Multipliers extracted from character notes in tier-list data.
// "estimated" means derived from gameplay observation, not datamined.

export const SKILLS: Skill[] = [
  // Meliodas
  { id: "meliodas_normal", name: "Basic Attack", characterId: "meliodas", type: "normal", multiplier: 1.0, element: "Dark", hits: 3, cooldown: 0, description: "3-hit Dark melee combo" },
  { id: "meliodas_darkness_burst", name: "Darkness Burst", characterId: "meliodas", type: "skill", multiplier: 2.80, element: "Dark", hits: 1, cooldown: 12, description: "Consume Demon Energy for massive Dark burst. Estimated 280% ATK." },
  { id: "meliodas_ultimate", name: "Ultimate", characterId: "meliodas", type: "ultimate", multiplier: 3.50, element: "Dark", hits: 1, cooldown: 25, description: "Full Demon Energy ultimate. Estimated 350% ATK." },

  // Jericho
  { id: "jericho_normal", name: "Basic Attack", characterId: "jericho", type: "normal", multiplier: 1.0, element: "Ice", hits: 4, cooldown: 0, description: "4-hit fast Ice combo" },
  { id: "jericho_frozen_saber", name: "Frozen Saber", characterId: "jericho", type: "skill", multiplier: 2.10, element: "Ice", hits: 1, cooldown: 10, description: "+30% crit rate on use. Teleport strike. Estimated 210% ATK." },
  { id: "jericho_ice_needle", name: "Ice Needle", characterId: "jericho", type: "ultimate", multiplier: 2.62, element: "Ice", hits: 1, cooldown: 20, description: "262% ATK single-target Ice burst with crit buff. Confirmed from skill data." },

  // Diane
  { id: "diane_normal", name: "Basic Attack", characterId: "diane", type: "normal", multiplier: 1.0, element: "Earth", hits: 2, cooldown: 0, description: "2-hit Earth AoE combo" },
  { id: "diane_breaker", name: "Breaker", characterId: "diane", type: "skill", multiplier: 1.80, element: "Earth", hits: 1, cooldown: 10, description: "Stun 4s. Follow-up damage +30-100%. Using 65% average. Estimated 180% ATK." },
  { id: "diane_ultimate", name: "Ultimate", characterId: "diane", type: "ultimate", multiplier: 2.90, element: "Earth", hits: 1, cooldown: 22, description: "AoE Earth damage. Estimated 290% ATK." },

  // Elaine
  { id: "elaine_normal", name: "Basic Attack", characterId: "elaine", type: "normal", multiplier: 1.0, element: "Wind", hits: 3, cooldown: 0, description: "3-hit Wind magic combo" },
  { id: "elaine_guardians_blossom", name: "Guardian's Blossom", characterId: "elaine", type: "skill", multiplier: 0, element: "Wind", hits: 0, cooldown: 14, description: "300% DEF shield to entire team. No damage." },
  { id: "elaine_dust_seal", name: "Dust Seal", characterId: "elaine", type: "ultimate", multiplier: 2.68, element: "Wind", hits: 1, cooldown: 22, description: "268% ATK + 3s Bind into 6s Petrify. Team +100% DMG during Petrify." },

  // Drake
  { id: "drake_normal", name: "Basic Attack", characterId: "drake", type: "normal", multiplier: 1.0, element: "Thunder", hits: 2, cooldown: 0, description: "2-hit Thunder combo" },
  { id: "drake_lightning_stream", name: "Lightning Stream", characterId: "drake", type: "skill", multiplier: 2.20, element: "Thunder", hits: 1, cooldown: 10, description: "Thunder skill. Stacks King's Magic buffs. Estimated 220% ATK." },
  { id: "drake_ultimate", name: "Ultimate", characterId: "drake", type: "ultimate", multiplier: 3.10, element: "Thunder", hits: 1, cooldown: 24, description: "Dragon King passive burst. Estimated 310% ATK." },

  // Manny
  { id: "manny_normal", name: "Basic Attack", characterId: "manny", type: "normal", multiplier: 1.0, element: "Holy", hits: 3, cooldown: 0, description: "3-hit Holy magic combo" },
  { id: "manny_flash_explosion", name: "Flash Explosion", characterId: "manny", type: "skill", multiplier: 1.80, element: "Holy", hits: 1, cooldown: 12, description: "Applies Stigmata: -20% all elemental DEF. Estimated 180% ATK." },
  { id: "manny_ultimate", name: "Ultimate", characterId: "manny", type: "ultimate", multiplier: 2.50, element: "Holy", hits: 1, cooldown: 20, description: "Holy AoE burst. Estimated 250% ATK." },

  // Tristan
  { id: "tristan_normal", name: "Basic Attack", characterId: "tristan", type: "normal", multiplier: 1.0, element: "Fire", hits: 3, cooldown: 0, description: "3-hit Fire/Wind combo" },
  { id: "tristan_fire_slash", name: "Fire Burst", characterId: "tristan", type: "skill", multiplier: 2.00, element: "Fire", hits: 1, cooldown: 10, description: "Fire element burst with Dual Swords. Estimated 200% ATK." },
  { id: "tristan_punisher", name: "Punisher", characterId: "tristan", type: "ultimate", multiplier: 2.43, element: "Fire", hits: 1, cooldown: 18, description: "243% ATK finisher with crit stacking. Confirmed from skill data." },

  // Gilthunder
  { id: "gilthunder_normal", name: "Basic Attack", characterId: "gilthunder", type: "normal", multiplier: 1.0, element: "Thunder", hits: 2, cooldown: 0, description: "2-hit Thunder combo" },
  { id: "gilthunder_lightning_sword", name: "Lightning Sword", characterId: "gilthunder", type: "skill", multiplier: 1.76, element: "Thunder", hits: 1, cooldown: 8, description: "176% ATK + Shock status. Confirmed from skill data." },
  { id: "gilthunder_judgment", name: "Judgment", characterId: "gilthunder", type: "ultimate", multiplier: 2.40, element: "Thunder", hits: 1, cooldown: 20, description: "Thunder burst + team shield. Estimated 240% ATK." },

  // Tioreh
  { id: "tioreh_normal", name: "Basic Attack", characterId: "tioreh", type: "normal", multiplier: 1.0, element: "Fire", hits: 3, cooldown: 0, description: "3-hit Fire magic combo" },
  { id: "tioreh_combustion", name: "Combustion", characterId: "tioreh", type: "skill", multiplier: 1.50, element: "Fire", hits: 1, cooldown: 10, description: "Applies Combustion debuff. Estimated 150% ATK." },
  { id: "tioreh_dragon_breath", name: "Dragon Breath", characterId: "tioreh", type: "ultimate", multiplier: 2.73, element: "Fire", hits: 1, cooldown: 20, description: "273% ATK Fire burst. Confirmed from skill data." },

  // Guila
  { id: "guila_normal", name: "Basic Attack", characterId: "guila", type: "normal", multiplier: 1.0, element: "Fire", hits: 3, cooldown: 0, description: "3-hit Fire combo" },
  { id: "guila_blazing_burst", name: "Blazing Burst", characterId: "guila", type: "skill", multiplier: 2.10, element: "Fire", hits: 1, cooldown: 12, description: "Reduces enemy fire DEF by 20%. Estimated 210% ATK." },
  { id: "guila_demon_form", name: "Demon Form", characterId: "guila", type: "ultimate", multiplier: 3.00, element: "Fire", hits: 1, cooldown: 25, description: "Demon Form transformation + burst. Estimated 300% ATK." },

  // Slader
  { id: "slader_normal", name: "Basic Attack", characterId: "slader", type: "normal", multiplier: 1.0, element: "Fire", hits: 2, cooldown: 0, description: "2-hit Physical/Fire combo" },
  { id: "slader_heavy_strike", name: "Skill Attack", characterId: "slader", type: "skill", multiplier: 1.80, element: "Fire", hits: 1, cooldown: 10, description: "Physical/Fire strike. Estimated 180% ATK." },
  { id: "slader_ultimate", name: "Ultimate", characterId: "slader", type: "ultimate", multiplier: 3.04, element: "Fire", hits: 1, cooldown: 22, description: "252-356% ATK (avg 304%). From skill data range." },

  // Bug
  { id: "bug_normal", name: "Basic Attack", characterId: "bug", type: "normal", multiplier: 1.0, element: "Dark", hits: 4, cooldown: 0, description: "4-hit Dark combo" },
  { id: "bug_backstab", name: "Backstab", characterId: "bug", type: "skill", multiplier: 2.25, element: "Dark", hits: 1, cooldown: 10, description: "+50% DMG from behind. Applies Curse. Estimated 225% ATK (150% × 1.5 backstab)." },
  { id: "bug_shadow_strike", name: "Ultimate", characterId: "bug", type: "ultimate", multiplier: 2.80, element: "Dark", hits: 1, cooldown: 20, description: "Dark burst + applies Dark Vulnerability (-30% Dark RES). Estimated 280% ATK." },

  // Howzer
  { id: "howzer_normal", name: "Basic Attack", characterId: "howzer", type: "normal", multiplier: 1.0, element: "Wind", hits: 2, cooldown: 0, description: "2-hit Wind AoE combo" },
  { id: "howzer_tempest", name: "Tempest", characterId: "howzer", type: "skill", multiplier: 1.90, element: "Wind", hits: 1, cooldown: 10, description: "Wind AoE magic. Estimated 190% ATK." },
  { id: "howzer_eye_storm", name: "Eye of the Storm", characterId: "howzer", type: "ultimate", multiplier: 2.60, element: "Wind", hits: 1, cooldown: 20, description: "Wind AoE burst. Estimated 260% ATK." },
];

// ─── Debuff Database ───

export const DEBUFFS: Debuff[] = [
  {
    id: "stigmata",
    name: "Stigmata",
    source: "Manny",
    type: "ele_res_reduce",
    value: 0.20,
    description: "Reduces all elemental DEF by 20%",
  },
  {
    id: "curse",
    name: "Curse",
    source: "Bug",
    type: "dmg_taken_increase",
    value: 0.20,
    description: "Target takes 20% more damage from all sources",
  },
  {
    id: "dark_vulnerability",
    name: "Dark Vulnerability",
    source: "Bug",
    type: "ele_res_reduce",
    value: 0.30,
    element: "Dark",
    description: "Reduces Dark resistance by 30%",
  },
  {
    id: "combustion",
    name: "Combustion",
    source: "Tioreh",
    type: "ele_res_reduce",
    value: 0.20,
    element: "Fire",
    description: "Reduces Fire resistance by 20%",
  },
  {
    id: "blazing_burst_shred",
    name: "Fire DEF Shred",
    source: "Guila",
    type: "ele_res_reduce",
    value: 0.20,
    element: "Fire",
    description: "Reduces Fire DEF by 20%",
  },
  {
    id: "petrify_amp",
    name: "Petrify Amplify",
    source: "Elaine",
    type: "dmg_taken_increase",
    value: 1.00,
    description: "Petrified target takes 100% more damage (6s window)",
  },
  {
    id: "breaker_amp",
    name: "Breaker Follow-up",
    source: "Diane",
    type: "dmg_taken_increase",
    value: 0.65,
    description: "After Breaker stun, follow-up +30-100% (avg 65%)",
  },
];

// ─── Calculation ───

export function calculateDamage(input: DamageInput): DamageResult {
  const { attack, skill, critRate, critDamage, elementalBonus, enemyDef, enemyLevel, enemyEleRes, activeDebuffs } = input;

  const activeDebuffList = DEBUFFS.filter((d) => activeDebuffs.includes(d.id));

  // Step 1: Base damage
  const baseDamage = attack * skill.multiplier;

  // Step 2: DEF reduction
  // Approximation: DEF / (DEF + 500 + Level × 10)
  const defDivisor = enemyDef + 500 + enemyLevel * 10;
  const defReduction = defDivisor > 0 ? enemyDef / defDivisor : 0;
  const afterDef = baseDamage * (1 - defReduction);

  // Step 3: Elemental bonus and resistance shred
  let totalEleShred = 0;
  for (const debuff of activeDebuffList) {
    if (debuff.type === "ele_res_reduce") {
      // Element-specific shred only applies if skill element matches
      if (!debuff.element || debuff.element === skill.element) {
        totalEleShred += debuff.value;
      }
    }
  }
  const effectiveEleBonus = (elementalBonus / 100) - (enemyEleRes / 100) + totalEleShred;
  const afterElement = afterDef * (1 + effectiveEleBonus);

  // Step 4: Crit
  const nonCritHit = Math.round(afterElement);
  const critHit = Math.round(afterElement * (1 + critDamage / 100));
  const clampedCritRate = Math.min(100, Math.max(0, critRate)) / 100;
  const expectedHit = Math.round(nonCritHit * (1 - clampedCritRate) + critHit * clampedCritRate);

  // Step 5: Damage taken debuffs (additive with each other)
  let totalDmgAmp = 0;
  for (const debuff of activeDebuffList) {
    if (debuff.type === "dmg_taken_increase") {
      totalDmgAmp += debuff.value;
    }
  }
  const effectiveDmgAmp = totalDmgAmp;
  const finalNonCrit = Math.round(nonCritHit * (1 + effectiveDmgAmp));
  const finalCrit = Math.round(critHit * (1 + effectiveDmgAmp));
  const finalExpected = Math.round(expectedHit * (1 + effectiveDmgAmp));

  // Totals (× hits)
  const hits = Math.max(1, skill.hits);
  const totalNonCrit = finalNonCrit * hits;
  const totalCrit = finalCrit * hits;
  const totalExpected = finalExpected * hits;

  // DPS
  const dps = skill.cooldown > 0
    ? Math.round(totalExpected / skill.cooldown)
    : totalExpected; // for normals, show per-rotation

  // Breakdown
  const breakdown: string[] = [
    `ATK ${attack.toLocaleString()} × ${(skill.multiplier * 100).toFixed(0)}% = ${Math.round(baseDamage).toLocaleString()} base`,
    `DEF reduces by ${(defReduction * 100).toFixed(1)}% → ${Math.round(afterDef).toLocaleString()}`,
  ];

  if (effectiveEleBonus !== 0) {
    breakdown.push(
      `Elemental: +${(elementalBonus).toFixed(1)}% bonus - ${enemyEleRes.toFixed(1)}% resist + ${(totalEleShred * 100).toFixed(0)}% shred = ${(effectiveEleBonus * 100).toFixed(1)}% net`,
    );
  }

  if (effectiveDmgAmp > 0) {
    const debuffNames = activeDebuffList
      .filter((d) => d.type === "dmg_taken_increase")
      .map((d) => `${d.name} +${(d.value * 100).toFixed(0)}%`);
    breakdown.push(`Debuffs: ${debuffNames.join(" + ")} = +${(effectiveDmgAmp * 100).toFixed(0)}% total`);
  }

  if (hits > 1) {
    breakdown.push(`${hits} hits × ${finalExpected.toLocaleString()} = ${totalExpected.toLocaleString()} total`);
  }

  if (skill.cooldown > 0) {
    breakdown.push(`DPS: ${totalExpected.toLocaleString()} / ${skill.cooldown}s CD = ${dps.toLocaleString()}/s`);
  }

  return {
    baseDamage: Math.round(baseDamage),
    afterDef: Math.round(afterDef),
    nonCritHit: finalNonCrit,
    critHit: finalCrit,
    expectedHit: finalExpected,
    totalNonCrit,
    totalCrit,
    totalExpected,
    dps,
    defReduction: defReduction * 100,
    effectiveEleBonus: effectiveEleBonus * 100,
    effectiveDmgAmp: effectiveDmgAmp * 100,
    breakdown,
  };
}

export function getSkillsForCharacter(characterId: string): Skill[] {
  return SKILLS.filter((s) => s.characterId === characterId);
}

export function getApplicableDebuffs(skillElement: string): Debuff[] {
  return DEBUFFS.filter((d) => {
    if (d.type === "dmg_taken_increase") return true;
    if (d.type === "ele_res_reduce") {
      return !d.element || d.element === skillElement;
    }
    return false;
  });
}
