import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import WeaponOptimizer from "@/components/WeaponOptimizer";

export const metadata: Metadata = {
  title:
    "7DS Origin Weapon Optimizer — Best Weapon Setups Calculator | 7DS Calc",
  description:
    "Calculate the optimal 3-weapon loadout for every character in Seven Deadly Sins: Origin. Compare main weapon (100%) and sub weapon (30%) stats, view recommended setups, and maximize your damage output.",
  keywords: [
    "7ds origin weapon calculator",
    "7ds origin best weapons",
    "seven deadly sins origin weapon guide",
    "7ds origin weapon tier list",
    "7ds origin weapon optimizer",
    "7ds origin weapon stats",
    "7ds origin weapon setup",
    "seven deadly sins origin weapon build",
    "7ds origin main weapon sub weapon",
    "7ds origin weapon enhancement",
  ],
  alternates: { canonical: "https://7dscalc.com/weapon-optimizer" },
  openGraph: {
    title:
      "7DS Origin Weapon Optimizer — Best Weapon Setups Calculator",
    description:
      "Calculate optimal 3-weapon loadouts for Seven Deadly Sins: Origin. Main weapon (100%) + Sub weapons (30% each).",
    url: "https://7dscalc.com/weapon-optimizer",
  },
};

export default function WeaponOptimizerPage() {
  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Intro */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-3">
            Seven Deadly Sins: Origin — Weapon Optimizer
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            Every character in 7DS Origin equips 3 weapons: a main weapon
            contributing 100% of its stats, and two sub weapons contributing 30%
            each. This optimizer calculates your total weapon stats and shows
            recommended setups for each character.
          </p>
          <p className="text-gray-500 text-xs">
            Select a character, configure your weapon levels and enhancements,
            and see the combined stats instantly. Use the recommended setups as a
            starting point, then customize based on your available weapons. Your
            configuration is saved locally.
          </p>
        </section>

        {/* Quick Reference */}
        <section className="bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl p-4">
          <p className="text-[#a5b4fc] text-sm">
            <strong>How weapon stats work:</strong> Main weapon gives 100% of
            its stats. Each sub weapon gives 30%. Total = Main + (Sub1 × 0.3) +
            (Sub2 × 0.3). Enhancement adds +3% per level to all stats.
          </p>
        </section>

        <WeaponOptimizer />

        {/* FAQ */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-lg font-bold text-white mb-4">Weapon FAQ</h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                Does my main weapon choice really matter that much?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Yes. Your main weapon provides 100% of its stats, while each sub
                weapon only provides 30%. This means the main weapon has roughly
                3.3x more impact than a sub weapon on your final stats. Always
                prioritize upgrading your main weapon first.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                Should I level all three weapons equally?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                No. Focus resources on the main weapon first since it contributes
                the most. Sub weapons at 30% contribution are less
                resource-efficient. A common strategy is main weapon at max
                level, sub weapons 10-20 levels behind.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                What does Enhancement (+) do?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Enhancement adds approximately +3% to all weapon stats per
                level. At +15, that&apos;s a +45% bonus to all stats. It&apos;s
                a significant boost and should be pursued for your main weapon as
                resources allow.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                Which stat should I prioritize?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                For DPS characters: ATK &gt; Crit Damage &gt; Crit Rate. For
                supports: Efficiency &gt; Elemental DMG. For tanks: ATK matters
                less, focus on sub-stat utility. The recommended setups are
                already optimized for each character&apos;s role.
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
            name: "7DS Origin Weapon Optimizer",
            description:
              "Calculate optimal 3-weapon loadouts for Seven Deadly Sins: Origin characters. Main weapon (100%) + sub weapons (30% each).",
            url: "https://7dscalc.com/weapon-optimizer",
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
