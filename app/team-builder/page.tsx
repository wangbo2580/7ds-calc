import type { Metadata } from "next";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import TeamBuilder from "@/components/TeamBuilder";

export const metadata: Metadata = {
  title:
    "7DS Origin Team Builder — Best Team Compositions (March 2026) | 7DS Calc",
  description:
    "Build the best teams in Seven Deadly Sins: Origin. Interactive team builder with recommended compositions for PvE, Boss fights, and Exploration. Select your characters and get optimized team setups.",
  keywords: [
    "7ds origin team builder",
    "7ds origin best team",
    "seven deadly sins origin team comp",
    "7ds origin team composition",
    "7ds origin party builder",
    "7ds origin best party",
    "7ds origin team guide",
    "seven deadly sins origin best team",
    "7ds origin meliodas team",
    "7ds origin king team",
  ],
  alternates: { canonical: "https://7dscalc.com/team-builder" },
  openGraph: {
    title: "7DS Origin Team Builder — Best Team Compositions (March 2026)",
    description:
      "Interactive team builder for Seven Deadly Sins: Origin. Select your characters, pick content type, get optimized team recommendations with synergy breakdowns.",
    url: "https://7dscalc.com/team-builder",
  },
};

export default function TeamBuilderPage() {
  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Intro */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-3">
            Seven Deadly Sins: Origin — Team Builder
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            Select the characters you own and choose a content type to get
            optimized team recommendations. Each team includes recommended
            weapon loadouts, synergy breakdowns, and gameplay tips.
          </p>
          <p className="text-gray-500 text-xs">
            Teams are ranked by community consensus from Game8, Reddit, and
            Discord discussions. Updated for the Early Access launch (March
            2026). Your character selection is saved locally so you don&apos;t
            have to re-select every visit.
          </p>
        </section>

        <TeamBuilder />

        {/* FAQ */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-lg font-bold text-white mb-4">
            Team Building FAQ
          </h2>
          <div className="space-y-4">
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                Is King required for every team?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                King is in most recommended teams because he&apos;s currently
                the only strong healer in the game. However, you can substitute
                Hendrickson for basic healing in easier content. As more
                characters release, healer options will expand.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                I didn&apos;t get Meliodas. What should I do?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Check the F2P Starter team — it uses only free characters plus
                King. You can clear early-mid story comfortably without
                Meliodas. Use the{" "}
                <a href="/" className="text-[#FFD700] hover:underline">
                  pity calculator
                </a>{" "}
                to plan if you can reach pity before the banner ends.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                Does weapon choice matter for teams?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Yes, significantly. Each character plays differently depending
                on their weapon loadout. The recommended weapons shown in each
                team are specifically chosen to maximize that team&apos;s
                synergy. For example, Meliodas with Dual Swords is burst DPS,
                while Meliodas with Longsword is more sustained.
              </p>
            </div>
            <div>
              <h3 className="text-sm font-semibold text-gray-300 mb-1">
                How important is element matching?
              </h3>
              <p className="text-sm text-gray-400 leading-relaxed">
                Element matching is important for debuff stacking (e.g., fire
                DEF reduction only benefits fire damage). However, raw character
                power often matters more than perfect element synergy. King
                (Holy healer) works in every team regardless of element focus.
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
            name: "7DS Origin Team Builder",
            description:
              "Interactive team builder for Seven Deadly Sins: Origin. Select characters and get optimized team compositions.",
            url: "https://7dscalc.com/team-builder",
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
