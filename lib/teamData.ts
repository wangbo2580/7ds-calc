import { type Character, CHARACTERS } from "./characters";

export type ContentType = "pve" | "boss" | "explore";

export interface TeamMember {
  characterId: string;
  recommendedWeapon: string;
  roleInTeam: string;
}

export interface TeamPreset {
  id: string;
  name: string;
  description: string;
  members: TeamMember[];
  content: ContentType[];
  strengths: string[];
  weaknesses: string[];
  synergies: string[];
  difficulty: "Easy" | "Medium" | "Hard";
  priority: number;
}

export const TEAM_PRESETS: TeamPreset[] = [
  {
    id: "holy-sustain",
    name: "Holy Sustain",
    description:
      "The safest team for clearing hard content. King keeps everyone alive while Meliodas and Elaine deal damage. Elaine's Petrify gives the entire team +100% damage during its duration, creating huge burst windows.",
    members: [
      { characterId: "meliodas", recommendedWeapon: "Dual Swords", roleInTeam: "Main DPS" },
      { characterId: "king", recommendedWeapon: "Staff", roleInTeam: "Healer" },
      { characterId: "elaine", recommendedWeapon: "Staff", roleInTeam: "CC / Damage Amp" },
      { characterId: "manny", recommendedWeapon: "Staff", roleInTeam: "DEF Shred" },
    ],
    content: ["pve", "boss"],
    strengths: [
      "Extremely high sustain from King's healing + shields",
      "Elaine's Petrify gives +100% team damage burst window",
      "Manny's Stigmata reduces all elemental DEF by 20%",
      "Can clear almost all content without dying",
    ],
    weaknesses: [
      "Lower AoE damage \u2014 clearing large groups is slower",
      "Relies on Elaine landing Petrify for peak damage",
    ],
    synergies: [
      "Manny Stigmata (-20% Ele DEF) \u2192 Meliodas Dark burst hits harder",
      "Elaine Petrify (+100% DMG) \u2192 entire team burst window",
      "King emergency heal \u2192 keeps everyone above danger threshold",
    ],
    difficulty: "Easy",
    priority: 1,
  },
  {
    id: "fire-burst",
    name: "Fire Burst",
    description:
      "An aggressive Fire-focused team that stacks fire debuffs for massive damage. Guila and Tioreh both reduce fire resistance, and Tristan provides additional fire burst. King covers healing.",
    members: [
      { characterId: "guila", recommendedWeapon: "Lance", roleInTeam: "Main DPS" },
      { characterId: "tristan", recommendedWeapon: "Dual Swords", roleInTeam: "Sub-DPS / Fire Burst" },
      { characterId: "tioreh", recommendedWeapon: "Book", roleInTeam: "Fire Debuffer" },
      { characterId: "king", recommendedWeapon: "Staff", roleInTeam: "Healer" },
    ],
    content: ["pve", "boss"],
    strengths: [
      "Double fire DEF reduction (Guila -20% + Tioreh Combustion)",
      "Very high burst damage against fire-weak enemies",
      "Guila and Tioreh are both free \u2014 accessible to all players",
      "Tristan adds versatility with fire and wind options",
    ],
    weaknesses: [
      "Weak against fire-resistant enemies",
      "No crowd control \u2014 pure offense",
      "Guila's Demon Form has 20s duration, timing matters",
    ],
    synergies: [
      "Guila Blazing Burst (-20% Fire DEF) + Tioreh Combustion \u2192 stacked fire shred",
      "Tristan Fire burst (Dual Swords) \u2192 benefits from fire shred",
      "King heals \u2192 keeps aggressive team alive",
    ],
    difficulty: "Medium",
    priority: 2,
  },
  {
    id: "dark-shred",
    name: "Dark Shred",
    description:
      "Maximizes Meliodas damage through stacking debuffs. Bug applies Curse (+20% damage taken) and Dark Vulnerability (-30% Dark RES), while Manny adds Stigmata (-20% Ele DEF). Requires good positioning for Bug's Backstab.",
    members: [
      { characterId: "meliodas", recommendedWeapon: "Dual Swords", roleInTeam: "Main DPS" },
      { characterId: "bug", recommendedWeapon: "Dual Swords", roleInTeam: "Debuffer / Sub-DPS" },
      { characterId: "manny", recommendedWeapon: "Staff", roleInTeam: "DEF Shred" },
      { characterId: "king", recommendedWeapon: "Staff", roleInTeam: "Healer" },
    ],
    content: ["boss"],
    strengths: [
      "Highest single-target damage potential in the game",
      "Triple debuff stacking: Curse + Dark Vuln + Stigmata",
      "Meliodas Dark element benefits from all three debuffs",
    ],
    weaknesses: [
      "Bug requires back positioning \u2014 harder to execute",
      "Mono-Dark is weak if boss resists Dark",
      "No AoE or crowd control",
    ],
    synergies: [
      "Bug Curse (+20% DMG taken) \u2192 all damage amplified",
      "Bug Dark Vulnerability (-30% Dark RES) \u2192 Meliodas Dark hits much harder",
      "Manny Stigmata (-20% Ele DEF) \u2192 stacks with Dark Vulnerability",
    ],
    difficulty: "Hard",
    priority: 3,
  },
  {
    id: "aoe-clear",
    name: "AoE Clear",
    description:
      "Built for clearing large groups of enemies quickly. Diane (Earth AoE) and Howzer (Wind AoE) provide area damage while Elaine buffs and controls. Good for story stages and farming.",
    members: [
      { characterId: "diane", recommendedWeapon: "Gauntlets", roleInTeam: "AoE DPS / Tank" },
      { characterId: "howzer", recommendedWeapon: "Lance", roleInTeam: "AoE DPS" },
      { characterId: "elaine", recommendedWeapon: "Staff", roleInTeam: "CC / Shield" },
      { characterId: "king", recommendedWeapon: "Staff", roleInTeam: "Healer" },
    ],
    content: ["pve"],
    strengths: [
      "Fastest mob clearing speed at launch",
      "Diane's Breaker stuns + boosts follow-up AoE by 30-100%",
      "Howzer's triple wind gives consistent area damage",
      "Elaine's shields protect during AoE rotations",
    ],
    weaknesses: [
      "Lower single-target damage \u2014 boss fights are slower",
      "Limited wind synergy partners at launch",
      "Diane needs to trigger Breaker for peak performance",
    ],
    synergies: [
      "Diane Breaker stun \u2192 Howzer AoE hits stunned enemies",
      "Diane Breaker +30-100% follow-up \u2192 Howzer Tempest",
      "Elaine shields \u2192 Diane and Howzer stay in melee range safely",
    ],
    difficulty: "Easy",
    priority: 4,
  },
  {
    id: "exploration",
    name: "Exploration",
    description:
      "Optimized for open-world exploration and resource farming. Drake reveals treasure chests and Manny reveals Star Dust Fragments, dramatically increasing resource efficiency. Meliodas and King handle any combat encounters.",
    members: [
      { characterId: "drake", recommendedWeapon: "Greatsword", roleInTeam: "Treasure Finder / DPS" },
      { characterId: "manny", recommendedWeapon: "Staff", roleInTeam: "Star Dust Finder / Support" },
      { characterId: "meliodas", recommendedWeapon: "Dual Swords", roleInTeam: "Combat DPS" },
      { characterId: "king", recommendedWeapon: "Staff", roleInTeam: "Healer" },
    ],
    content: ["explore"],
    strengths: [
      "Drake reveals hidden treasure chests on the map",
      "Manny reveals Star Dust Fragment locations",
      "Fastest resource accumulation in open world",
      "Still strong enough to handle exploration encounters",
    ],
    weaknesses: [
      "Not optimized for hard combat content",
      "Two utility slots reduce overall team power",
    ],
    synergies: [
      "Drake treasure reveal + Manny Star Dust reveal \u2192 nothing hidden",
      "Meliodas handles any combat that comes up",
      "King heals through incidental damage",
    ],
    difficulty: "Easy",
    priority: 5,
  },
  {
    id: "ice-burst",
    name: "Ice Burst",
    description:
      "Centers around Jericho's massive single-target burst damage. Manny provides elemental DEF shred and Elaine adds crowd control plus damage amplification. Strong against bosses weak to Ice.",
    members: [
      { characterId: "jericho", recommendedWeapon: "Dual Swords", roleInTeam: "Main DPS" },
      { characterId: "elaine", recommendedWeapon: "Staff", roleInTeam: "CC / Damage Amp" },
      { characterId: "manny", recommendedWeapon: "Staff", roleInTeam: "DEF Shred" },
      { characterId: "king", recommendedWeapon: "Staff", roleInTeam: "Healer" },
    ],
    content: ["boss"],
    strengths: [
      "Jericho has the highest single-target burst in the game",
      "Frozen Saber gives +30% crit rate for consistent crits",
      "Elaine Petrify (+100% DMG) during Jericho burst = devastating",
      "Manny Stigmata further amplifies damage",
    ],
    weaknesses: [
      "Very weak AoE \u2014 bad for mob clearing",
      "Jericho is squishy and needs King's protection",
      "Ice element has fewer debuff synergies than Dark",
    ],
    synergies: [
      "Elaine Petrify (+100% DMG) \u2192 Jericho Ice Needle during Petrify",
      "Manny Stigmata (-20% Ele DEF) \u2192 Ice damage amplified",
      "Jericho Freeze \u2192 additional CC layering with Elaine",
    ],
    difficulty: "Medium",
    priority: 6,
  },
  {
    id: "f2p-starter",
    name: "F2P Starter",
    description:
      "Built entirely from free characters plus King (the most common SR pull). Perfect for players who didn't get Meliodas from rerolling or want to save pulls. Covers all basics for early story.",
    members: [
      { characterId: "slader", recommendedWeapon: "Greatsword", roleInTeam: "Main DPS" },
      { characterId: "guila", recommendedWeapon: "Lance", roleInTeam: "Sub-DPS / Fire" },
      { characterId: "tioreh", recommendedWeapon: "Book", roleInTeam: "Fire Support" },
      { characterId: "king", recommendedWeapon: "Staff", roleInTeam: "Healer" },
    ],
    content: ["pve"],
    strengths: [
      "All DPS characters are free (Tutorial + Launch Event + Pre-reg)",
      "Only need King from gacha (most common SR pull)",
      "Solid fire synergy between Guila and Tioreh",
      "Can clear early-mid story comfortably",
    ],
    weaknesses: [
      "Lower damage ceiling than SSR-heavy teams",
      "Falls off in late-game content",
      "No crowd control or exploration utility",
    ],
    synergies: [
      "Guila Blazing Burst (-20% Fire DEF) \u2192 Slader Fire attacks",
      "Tioreh Combustion \u2192 stacks with Guila's fire shred",
      "King heals \u2192 compensates for lower team durability",
    ],
    difficulty: "Easy",
    priority: 7,
  },
];

const CONTENT_LABELS: Record<ContentType, string> = {
  pve: "PvE / Story",
  boss: "Boss Fights",
  explore: "Exploration",
};

export function getContentLabel(content: ContentType): string {
  return CONTENT_LABELS[content];
}

export interface TeamMatch {
  team: TeamPreset;
  matchedCount: number;
  missingCharacters: Character[];
  matchScore: number;
}

export function recommendTeams(
  ownedCharacterIds: string[],
  contentFilter: ContentType | "all",
): TeamMatch[] {
  const ownedSet = new Set(ownedCharacterIds);

  const matches: TeamMatch[] = TEAM_PRESETS
    .filter((team) => contentFilter === "all" || team.content.includes(contentFilter))
    .map((team) => {
      const memberIds = team.members.map((m) => m.characterId);
      const matchedCount = memberIds.filter((id) => ownedSet.has(id)).length;
      const missingCharacters = memberIds
        .filter((id) => !ownedSet.has(id))
        .map((id) => CHARACTERS.find((c) => c.id === id)!)
        .filter(Boolean);

      // Score: heavily favor full matches, then partial matches with priority
      const matchScore = matchedCount * 25 + (4 - team.priority) * 2 + (matchedCount === 4 ? 20 : 0);

      return { team, matchedCount, missingCharacters, matchScore };
    });

  matches.sort((a, b) => b.matchScore - a.matchScore);
  return matches;
}
