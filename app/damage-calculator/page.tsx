import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import DamageCalculator from "@/components/DamageCalculator";

export const metadata: Metadata = {
  title:
    "7DS Origin Damage Calculator — Skill Damage & DPS Calculator | 7DS Calc",
  description:
    "Calculate skill damage and DPS for every character in Seven Deadly Sins: Origin. Input your stats, select skills, apply debuffs, and see exact damage numbers with full calculation breakdown.",
  keywords: [
    "7ds origin damage calculator",
    "7ds origin dps calculator",
    "seven deadly sins origin damage calc",
    "7ds origin skill damage",
    "7ds origin damage formula",
    "7ds origin meliodas damage",
    "7ds origin jericho damage",
    "seven deadly sins origin dps",
    "7ds origin debuff damage",
    "7ds origin crit damage calculator",
  ],
  alternates: { canonical: "https://7dscalc.com/damage-calculator" },
  openGraph: {
    title: "7DS Origin Damage Calculator — Skill Damage & DPS",
    description:
      "Calculate exact skill damage for Seven Deadly Sins: Origin. Compare debuff combinations, optimize rotations, and maximize DPS.",
    url: "https://7dscalc.com/damage-calculator",
  },
};

export default function DamageCalculatorPage() {
  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Intro */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-3">
            Seven Deadly Sins: Origin — Damage Calculator
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            Calculate exact skill damage for any character in 7DS Origin. Select
            a character and skill, input your ATK and crit stats, set enemy
            parameters, and apply team debuffs to see how damage stacks up. The
            calculator shows non-crit, crit, and expected damage with a full
            formula breakdown.
          </p>
          <p className="text-gray-500 text-xs">
            Debuff stacking is one of the most important damage mechanics in 7DS
            Origin. Use this calculator to compare how different debuff
            combinations (Stigmata, Curse, Petrify, etc.) affect your total
            damage output. Your settings are saved locally.
          </p>
        </section>

        {/* Quick Reference */}
        <section className="bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl p-4">
          <p className="text-[#a5b4fc] text-sm">
            <strong>Tip:</strong> Get your ATK and crit stats from the{" "}
            <a
              href="/weapon-optimizer"
              className="underline hover:text-white"
            >
              Weapon Optimizer
            </a>
            , then paste them here. Use the enemy presets (Weak / Normal / Boss)
            for quick comparisons.
          </p>
        </section>

        <DamageCalculator />

        {/* FAQ */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-lg font-bold text-white mb-4">
            Damage FAQ
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                How does DEF reduction work?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                DEF reduces damage by a percentage calculated as DEF / (DEF +
                500 + Enemy Level × 10). A level 40 enemy with 300 DEF reduces
                damage by about 25%. Higher DEF has diminishing returns — going
                from 300 to 600 DEF only increases reduction from ~25% to ~40%.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                Do debuffs stack?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Yes. Elemental resistance shred (Stigmata, Combustion, Dark
                Vulnerability) stacks additively with each other. Damage taken
                increases (Curse, Petrify Amplify, Breaker Follow-up) also stack
                additively. The two categories multiply with each other. This
                means combining both types gives the highest total damage boost.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                Which debuff combination is best for Meliodas?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                For Dark Meliodas: Stigmata (Manny, -20% all Ele DEF) + Dark
                Vulnerability (Bug, -30% Dark RES) + Curse (Bug, +20% DMG
                taken). If you can also get Elaine&apos;s Petrify Amplify (+100%
                DMG taken), that&apos;s the maximum debuff stack possible in the
                current meta. Use this calculator to see the exact numbers.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                Why is my DPS lower than expected?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                DPS is calculated as total expected damage divided by the skill
                cooldown. Normal attacks show per-rotation damage instead. Keep
                in mind that real DPS includes animation time, positioning, and
                skill rotation — this calculator shows theoretical maximum DPS
                per skill use.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                Are the skill multipliers accurate?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Some multipliers are confirmed from in-game skill descriptions
                (Jericho&apos;s Ice Needle at 262%, Tristan&apos;s Punisher at
                243%, Gilthunder&apos;s Lightning Sword at 176%, Tioreh&apos;s
                Dragon Breath at 273%). Others are estimated from gameplay
                testing and may be slightly off. We update as more data is
                confirmed.
              </p>
            </div>
          </div>
        </section>

        <SiteFooter />
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "7DS Origin Damage Calculator",
            description:
              "Calculate skill damage and DPS for Seven Deadly Sins: Origin characters. Supports debuff stacking, crit calculations, and full damage breakdown.",
            url: "https://7dscalc.com/damage-calculator",
            applicationCategory: "GameApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
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
