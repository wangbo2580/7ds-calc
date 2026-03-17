import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title:
    "7DS Origin Tier List (March 2026) — Best Characters Ranked | 7DS Calc",
  description:
    "Seven Deadly Sins: Origin tier list updated for Early Access launch. See which characters are worth pulling and building, with detailed explanations for every tier.",
  keywords: [
    "7ds origin tier list",
    "seven deadly sins origin tier list",
    "7ds origin best characters",
    "seven deadly sins origin character ranking",
    "7ds origin reroll tier list",
    "7ds origin meliodas tier",
    "7ds origin who to pull",
  ],
  alternates: { canonical: "https://7dscalc.com/tier-list" },
  openGraph: {
    title: "7DS Origin Tier List — Best Characters Ranked (March 2026)",
    description:
      "Community-sourced tier list for Seven Deadly Sins: Origin. Updated for EA launch.",
    url: "https://7dscalc.com/tier-list",
  },
};

interface Character {
  name: string;
  rarity: number;
  element: string;
  role: string;
  weapons: string;
  note: string;
  free?: string;
}

const TIERS: {
  tier: string;
  color: string;
  bg: string;
  border: string;
  desc: string;
  characters: Character[];
}[] = [
  {
    tier: "SS",
    color: "text-[#FF4444]",
    bg: "bg-[#FF4444]/8",
    border: "border-[#FF4444]/25",
    desc: "Top-priority pulls. These characters define the early meta and will carry you through everything the game throws at you right now.",
    characters: [
      {
        name: "Meliodas",
        rarity: 6,
        element: "Dark",
        role: "DPS",
        weapons: "Longsword / Axe / Dual Swords",
        note: "The launch banner star and for good reason. Meliodas deals absurd burst damage across all three weapon loadouts. His Darkness Burst mechanic lets him stack Demon Energy for devastating combos, and he scales well into late-game content. Every tier list from Game8, GachaGo, and UltimateGacha puts him at the top. If you're rerolling, this is who you're aiming for.",
      },
      {
        name: "King",
        rarity: 5,
        element: "Holy / Physics / Earth",
        role: "Healer / Support",
        weapons: "Book / Wand / Staff",
        note: "The best healer in the game at launch. King's Fairy King passive triggers emergency shields and healing when teammates drop below 30% HP, which is a lifesaver in harder story stages and early boss fights. His ultimate (Forest's Protection) gives the entire party a 50% max HP shield plus regeneration. No other character comes close to his sustain output right now.",
      },
    ],
  },
  {
    tier: "S",
    color: "text-[#FF8C00]",
    bg: "bg-[#FF8C00]/8",
    border: "border-[#FF8C00]/25",
    desc: "Extremely strong picks. Worth building immediately if you pull them, and perfectly valid reroll targets alongside Meliodas.",
    characters: [
      {
        name: "Jericho",
        rarity: 5,
        element: "Ice",
        role: "DPS / Crowd Control",
        weapons: "Dual Swords / Lance / Rapier",
        note: "Highest single-target burst in the game right now. Her Frozen Saber (Dual Swords) gives +30% crit rate with a teleport attack, and her ultimate Ice Needle hits for 262% attack damage with a crit buff. She also brings Freeze crowd control, which makes her relevant in both PvE and PvP. Multiple community tier lists rank her as the second-best DPS after Meliodas.",
      },
      {
        name: "Diane",
        rarity: 5,
        element: "Earth",
        role: "Tank / AoE DPS",
        weapons: "Gauntlets / Axe / Cudgel",
        note: "The best AoE damage dealer at launch. Her Giant Girl passive gives a free 30% max HP shield, and her Breaker mechanic stuns enemies for 4 seconds on first trigger, then boosts follow-up damage by 30-100%. Extremely strong for clearing story stages and farming. Also brings Petrify via Earth Burst synergy.",
      },
      {
        name: "Elaine",
        rarity: 5,
        element: "Wind / Holy / Earth",
        role: "Support / Crowd Control",
        weapons: "Book / Wand / Staff",
        note: "A top-tier support with a unique kit. Guardian's Blossom gives 300% defense shields to the entire team, and her ultimate Dust Seal hits for 268% damage plus a 3-second Bind into a 6-second Petrify. During Petrify, your whole team gets +100% damage. The crowd control plus damage amp makes her incredibly valuable for boss fights.",
      },
      {
        name: "Drake",
        rarity: 5,
        element: "Thunder",
        role: "DPS / Utility",
        weapons: "Greatsword / Staff / Longsword",
        note: "Strong thunder DPS with the Dragon King passive. But the real reason Drake is rated this high: he reveals treasure chests on the map. This makes exploration and resource farming significantly more efficient, especially in the first few weeks when you're trying to gear up. His combat is solid too — Lightning Stream hits hard and stacks King's Magic buffs.",
      },
      {
        name: "Manny",
        rarity: 5,
        element: "Holy / Ice",
        role: "Support / Sub-DPS",
        weapons: "Staff / Dual Swords / Longsword",
        note: "Manny's Flash Explosion applies Stigmata, which reduces all elemental defense by 20% on enemies. That's a team-wide damage boost that works for everyone. She's also the other exploration utility character — she reveals Star Dust Fragment locations on the map, which is huge for progression. Between the defense shred and the exploration utility, she's a high-value pull.",
      },
    ],
  },
  {
    tier: "A",
    color: "text-[#FFD700]",
    bg: "bg-[#FFD700]/8",
    border: "border-[#FFD700]/25",
    desc: "Solid characters that perform well in their niche. Good to have, but you shouldn't chase them specifically on the gacha.",
    characters: [
      {
        name: "Tristan",
        rarity: 5,
        element: "Fire / Wind",
        role: "DPS / Hybrid",
        weapons: "Dual Swords / Longsword / Greatsword",
        note: "Versatile character with both Fire burst (Dual Swords) and Wind support (Longsword). His Greatsword loadout gives crit stacking with a massive 243% Punisher finisher. Decent all-rounder but doesn't excel in any single area compared to S-tier picks.",
      },
      {
        name: "Gilthunder",
        rarity: 5,
        element: "Thunder",
        role: "DPS / Support Hybrid",
        weapons: "Longsword / Shield / Lance",
        note: "Solid thunder DPS with Lightning Sword (176% + Shock status) and some team shielding via Judgment. Charge Electricity also reduces cooldowns, giving him good skill uptime. Outclassed by Drake in pure damage but brings more defensive utility.",
      },
      {
        name: "Tioreh",
        rarity: 5,
        element: "Fire / Wind",
        role: "Sub-DPS / Support",
        weapons: "Book / Wand / Staff",
        note: "Free from pre-registration rewards. Her Combustion debuff is useful for Fire teams, and Dragon Breath hits for 273% damage. She's a competent character you'll use early on, and the fact that she's free means everyone starts with a decent Fire option.",
        free: "Pre-registration",
      },
      {
        name: "Guila",
        rarity: 5,
        element: "Fire",
        role: "DPS / Shielder",
        weapons: "Lance / Shield / Rapier",
        note: "Free from the launch celebration event. Guila has a Demon Form transformation that buffs her for 20 seconds, and her Blazing Burst reduces enemy fire defense by 20%. Solid for a free character but you absolutely should NOT pull for her on the gacha — she's given for free.",
        free: "Launch event",
      },
      {
        name: "Slader",
        rarity: 5,
        element: "Fire / Physics",
        role: "DPS",
        weapons: "Greatsword / Axe / Cudgel",
        note: "Free from the gacha tutorial. A straightforward physical/fire DPS with a 252-356% ultimate. His Cudgel loadout gives a 40% mark damage bonus. Perfectly usable early on but gets outscaled by S and SS-tier characters.",
        free: "Tutorial",
      },
    ],
  },
  {
    tier: "B",
    color: "text-[#4FC3F7]",
    bg: "bg-[#4FC3F7]/8",
    border: "border-[#4FC3F7]/25",
    desc: "Usable but not a priority. They fill a role if you don't have better options.",
    characters: [
      {
        name: "Howzer",
        rarity: 5,
        element: "Wind",
        role: "AoE DPS",
        weapons: "Lance / Gauntlets / Cudgel",
        note: "Triple wind element makes him the core of wind-focused teams. His Tempest magic and Eye of the Storm passive provide consistent AoE damage. Currently limited by the lack of wind synergy partners at launch.",
      },
      {
        name: "Bug",
        rarity: 5,
        element: "Dark",
        role: "DPS / Debuffer",
        weapons: "Dual Swords / Axe / Book",
        note: "Backstab mechanic gives 50% bonus damage from behind, and he applies Curse (+20% team damage) and Dark vulnerability (+30%). Interesting kit but requires specific positioning and team setup to maximize, which makes him harder to use effectively.",
      },
      {
        name: "Hendrickson",
        rarity: 5,
        element: "Holy / Physics / Dark",
        role: "Hybrid Support",
        weapons: "Dual Swords / Longsword / Lance",
        note: "Jack-of-all-trades with healing, cursing, and damage. His ultimate can heal allies (268% ATK) or curse enemies. The problem is he doesn't do any one thing well enough to justify a slot over dedicated healers or DPS characters.",
      },
      {
        name: "Griamore",
        rarity: 5,
        element: "Physics",
        role: "Tank",
        weapons: "Shield / Cudgel / Gauntlets",
        note: "Pure tank with the Wall Master passive (team gets +20% burst efficiency when shields are active). Shield Stance gives +25% defense, and his Gauntlets loadout can stun for up to 8 seconds. Useful in content that requires a dedicated tank, but most early content doesn't.",
      },
      {
        name: "Daisy",
        rarity: 5,
        element: "Earth / Thunder / Wind",
        role: "Support",
        weapons: "Shield / Book / Wand",
        note: "Offbeat Girl passive gives +50% magic charge efficiency, which lets her fire off ultimates faster. Unique kit with her Domby mount summon, but her damage contribution is low and she's mostly there for utility.",
      },
    ],
  },
  {
    tier: "C",
    color: "text-[#9E9E9E]",
    bg: "bg-[#9E9E9E]/8",
    border: "border-[#9E9E9E]/25",
    desc: "Niche picks or characters with incomplete data. Use them if you like the character, but don't expect them to carry.",
    characters: [
      {
        name: "Dreyfus",
        rarity: 5,
        element: "Physics / Earth / Holy",
        role: "DoT / Control",
        weapons: "Rapier / Longsword / Lance",
        note: "Grandmaster's Honor passive boosts DoT damage by 15% and halves DoT intervals against stunned/paralyzed targets. A DoT specialist that requires very specific setups to shine. May become better as more synergy partners release.",
      },
      {
        name: "Dreydrin",
        rarity: 5,
        element: "Earth / Physics / Holy",
        role: "Tank / Support",
        weapons: "Shield / Axe / Rapier",
        note: "Emergency shielder who protects teammates when they drop below 30% HP. His Rapier ultimate buffs team Holy and Fire attack. Functional but his kit overlaps with King's and King does everything better.",
      },
      {
        name: "Escanor",
        rarity: 5,
        element: "TBD",
        role: "DPS (Time-gated)",
        weapons: "Axe / Greatsword / Shield",
        note: "The Sunshine mechanic (stronger during daytime, weaker at night, peak at noon) is a fan-favorite concept but creates inconsistency. Full skill data hasn't been disclosed yet, so this ranking may change. Could move up significantly once we know his exact numbers.",
      },
      {
        name: "Gowther",
        rarity: 5,
        element: "TBD",
        role: "TBD",
        weapons: "Book / Wand / Staff",
        note: "Skills and element data not yet disclosed at launch. Gowther is a major character in the series so expect him to be relevant eventually, but right now there's nothing to evaluate.",
      },
      {
        name: "Elizabeth",
        rarity: 5,
        element: "TBD",
        role: "Healer (Expected)",
        weapons: "Book / Wand / Staff",
        note: "Another character with undisclosed skills. Likely a healer/support based on the source material. Can't rank her properly until Netmarble releases her full kit.",
      },
    ],
  },
  {
    tier: "?",
    color: "text-[#7C4DFF]",
    bg: "bg-[#7C4DFF]/8",
    border: "border-[#7C4DFF]/25",
    desc: "6-star characters with incomplete data. Ban and Merlin are confirmed as the highest rarity alongside Meliodas, but their full kits haven't been revealed yet.",
    characters: [
      {
        name: "Ban",
        rarity: 6,
        element: "TBD",
        role: "TBD",
        weapons: "Cudgel / Greatsword / Gauntlets",
        note: "6-star rarity like Meliodas. Immortality mechanic confirmed from the source material. Skills and element data not yet disclosed. Given his rarity, expect him to be a future banner character — possibly the next rate-up after Meliodas. Hold your Star Memory if you're a Ban fan.",
      },
      {
        name: "Merlin",
        rarity: 6,
        element: "TBD",
        role: "TBD",
        weapons: "Book / Wand / Staff",
        note: "6-star rarity. No skill data available yet. Merlin is traditionally one of the most powerful characters in the series, so she'll almost certainly be top-tier once released. Another good reason to save pulls if you're done with Meliodas.",
      },
    ],
  },
];

const elementColors: Record<string, string> = {
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

function ElementBadge({ element }: { element: string }) {
  const els = element.split(" / ");
  return (
    <div className="flex gap-1 flex-wrap">
      {els.map((el) => (
        <span
          key={el}
          className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${elementColors[el.trim()] || elementColors.TBD}`}
        >
          {el.trim()}
        </span>
      ))}
    </div>
  );
}

export default function TierListPage() {
  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Intro */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-3">
            Seven Deadly Sins: Origin — Character Tier List
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            This tier list reflects the Early Access launch meta as of March
            2026. Rankings are based on community consensus from Game8,
            GachaGo, UltimateGacha, and player discussions across Reddit and
            Discord. The game just launched, so expect these rankings to shift
            as players discover new synergies and Netmarble releases balance
            patches.
          </p>
          <p className="text-gray-500 text-xs">
            Several characters (Ban, Merlin, Escanor, Gowther, Elizabeth) have
            incomplete skill data. They&apos;re ranked based on what we know so
            far, but their positions will change once full kits are revealed.
          </p>
        </section>

        {/* Quick Reference */}
        <section className="bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl p-4">
          <p className="text-[#a5b4fc] text-sm">
            <strong>Rerolling?</strong> Aim for Meliodas + King or Meliodas +
            Jericho. Check our{" "}
            <Link href="/reroll-guide" className="underline hover:text-white">
              reroll guide
            </Link>{" "}
            for step-by-step instructions, or use the{" "}
            <Link href="/" className="underline hover:text-white">
              pity calculator
            </Link>{" "}
            to plan your pulls.
          </p>
        </section>

        {/* Tier Sections */}
        {TIERS.map((section) => (
          <section
            key={section.tier}
            className={`${section.bg} border ${section.border} rounded-2xl overflow-hidden`}
          >
            <div className="p-5 sm:p-6">
              <div className="flex items-center gap-3 mb-2">
                <span
                  className={`${section.color} text-3xl font-black tracking-tight`}
                >
                  {section.tier === "?" ? "???" : section.tier}
                </span>
                <span className={`${section.color} text-sm font-medium`}>
                  Tier
                </span>
              </div>
              <p className="text-gray-400 text-sm mb-5">{section.desc}</p>

              <div className="space-y-3">
                {section.characters.map((char) => (
                  <div
                    key={char.name}
                    className="bg-[#0a0a14]/60 rounded-xl p-4 border border-[#2a2a4a]/50"
                  >
                    <div className="flex flex-wrap items-start gap-2 mb-2">
                      <h3 className="text-white font-bold text-base">
                        {char.name}
                      </h3>
                      <span className="text-[#FFD700] text-xs font-mono">
                        {"★".repeat(char.rarity)}
                      </span>
                      <ElementBadge element={char.element} />
                      <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#1a1a2e] text-gray-400 font-medium">
                        {char.role}
                      </span>
                      {char.free && (
                        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#22C55E]/15 text-[#22C55E] font-medium">
                          Free: {char.free}
                        </span>
                      )}
                    </div>
                    <p className="text-xs text-gray-500 mb-2">
                      Weapons: {char.weapons}
                    </p>
                    <p className="text-sm text-gray-300 leading-relaxed">
                      {char.note}
                    </p>
                  </div>
                ))}
              </div>
            </div>
          </section>
        ))}

        {/* Important Notes */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-lg font-bold text-white mb-3">
            Things to Keep in Mind
          </h2>
          <ul className="space-y-2 text-sm text-gray-400 leading-relaxed">
            <li>
              <strong className="text-gray-300">
                This is an Early Access tier list.
              </strong>{" "}
              The game launched on March 16, 2026 (PC/PS5), with the mobile
              version coming March 23. Meta shifts are expected as more players
              test characters and Netmarble pushes updates.
            </li>
            <li>
              <strong className="text-gray-300">Weapon choice matters a lot.</strong>{" "}
              Each character plays differently depending on which of their 3
              weapon loadouts you use. A character might be B-tier with one
              weapon and S-tier with another. We&apos;ll add weapon-specific
              ratings in a future update.
            </li>
            <li>
              <strong className="text-gray-300">
                Don&apos;t sleep on exploration utility.
              </strong>{" "}
              Drake (reveals treasure chests) and Manny (reveals Star Dust
              Fragments) provide massive value that doesn&apos;t show up in
              combat tier lists. Having at least one of them makes progression
              noticeably faster.
            </li>
            <li>
              <strong className="text-gray-300">Free characters are solid.</strong>{" "}
              Tioreh (pre-reg), Slader (tutorial), and Guila (launch event) are
              all usable. You don&apos;t need to spend a dime to clear the
              early story.
            </li>
          </ul>
        </section>

        {/* CTA */}
        <section className="bg-[#2a2a4a] rounded-2xl p-6 text-center">
          <p className="text-gray-300 text-sm mb-3">
            Planning your pulls? Use our calculator to see exactly how many Star
            Memory you need.
          </p>
          <Link
            href="/"
            className="inline-block bg-[#FFD700] text-[#0a0a14] font-bold px-6 py-2.5 rounded-lg hover:bg-[#FFE44D] transition-colors text-sm"
          >
            Open Pity Calculator
          </Link>
        </section>

        <SiteFooter />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "Article",
            headline:
              "Seven Deadly Sins: Origin Tier List — Best Characters Ranked (March 2026)",
            description:
              "Community-sourced character tier list for 7DS Origin Early Access launch. Rankings based on Game8, GachaGo, and player feedback.",
            datePublished: "2026-03-17",
            dateModified: "2026-03-17",
            url: "https://7dscalc.com/tier-list",
            publisher: {
              "@type": "Organization",
              name: "7DS Calc",
              url: "https://7dscalc.com",
            },
          }),
        }}
      />
    </div>
  );
}
