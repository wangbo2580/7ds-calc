import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title:
    "7DS Origin Banners — Current & Upcoming Banner Schedule | 7DS Calc",
  description:
    "All active banners in Seven Deadly Sins: Origin with confirmed rates, pity details, and free pull resources. Updated for EA launch March 2026.",
  keywords: [
    "7ds origin banner",
    "seven deadly sins origin banner",
    "7ds origin current banner",
    "7ds origin banner schedule",
    "7ds origin meliodas banner",
    "7ds origin gacha rates",
    "7ds origin upcoming banners",
    "7ds origin lostvayne",
  ],
  alternates: { canonical: "https://7dscalc.com/banners" },
  openGraph: {
    title: "7DS Origin Banners — Current & Upcoming Banner Schedule",
    description:
      "Active banners in Seven Deadly Sins: Origin with confirmed gacha rates and pity info.",
    url: "https://7dscalc.com/banners",
  },
};

export default function BannersPage() {
  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Intro */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-2xl font-bold text-[#FFD700] mb-3">
            Seven Deadly Sins: Origin — Banner Schedule
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed">
            All currently active banners in 7DS Origin with confirmed rates,
            pity information, and tips on whether to pull. The game launched
            Early Access on March 16, 2026 (PC/PS5), with the full mobile
            release on March 23.
          </p>
        </section>

        {/* Meliodas Banner */}
        <section className="bg-[#1a1a2e] rounded-2xl border border-[#2a2a4a] overflow-hidden">
          <div className="bg-[#FF4444]/10 px-6 py-3 border-b border-[#FF4444]/20">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-[#FF4444] font-bold text-lg">
                Meliodas Pick-Up Character Banner
              </h3>
              <span className="bg-[#22C55E]/15 text-[#22C55E] text-xs font-medium px-2 py-1 rounded-md">
                ACTIVE — Rate-Up Banner
              </span>
            </div>
            <p className="text-gray-400 text-xs mt-1">
              &quot;Timelines Collide — Grand Cross!&quot;
            </p>
          </div>
          <div className="p-6 space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <h4 className="text-white font-medium text-sm mb-2">
                  Banner Details
                </h4>
                <table className="w-full text-sm">
                  <tbody className="text-gray-400">
                    <tr className="border-b border-[#2a2a4a]">
                      <td className="py-2 text-gray-500">Featured</td>
                      <td className="py-2 text-white font-medium">
                        [SSR] Meliodas ★★★★★★
                      </td>
                    </tr>
                    <tr className="border-b border-[#2a2a4a]">
                      <td className="py-2 text-gray-500">Duration</td>
                      <td className="py-2">
                        21 days from your first login
                        <br />
                        <span className="text-gray-600 text-xs">
                          (personal timer, not a global end date)
                        </span>
                      </td>
                    </tr>
                    <tr className="border-b border-[#2a2a4a]">
                      <td className="py-2 text-gray-500">Cost per pull</td>
                      <td className="py-2">300 Star Memory</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-500">10-pull cost</td>
                      <td className="py-2">3,000 Star Memory (no discount)</td>
                    </tr>
                  </tbody>
                </table>
              </div>

              <div>
                <h4 className="text-white font-medium text-sm mb-2">
                  Confirmed Rates
                </h4>
                <table className="w-full text-sm">
                  <tbody className="text-gray-400">
                    <tr className="border-b border-[#2a2a4a]">
                      <td className="py-2 text-gray-500">Meliodas</td>
                      <td className="py-2 text-[#FFD700] font-mono font-medium">
                        0.400%
                      </td>
                    </tr>
                    <tr className="border-b border-[#2a2a4a]">
                      <td className="py-2 text-gray-500">Other SSR (each)</td>
                      <td className="py-2 font-mono">0.057%</td>
                    </tr>
                    <tr className="border-b border-[#2a2a4a]">
                      <td className="py-2 text-gray-500">Total SSR rate</td>
                      <td className="py-2 font-mono">~0.8%</td>
                    </tr>
                    <tr>
                      <td className="py-2 text-gray-500">Source</td>
                      <td className="py-2 text-gray-600 text-xs">
                        In-game rate disclosure via @7DSOriginNews
                      </td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>

            {/* Pity Breakdown */}
            <div>
              <h4 className="text-white font-medium text-sm mb-3">
                Pity System on This Banner
              </h4>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
                  <p className="text-[#FFD700] text-xs font-medium mb-1">
                    Soft Pity
                  </p>
                  <p className="text-2xl font-bold text-white">~65 pulls</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Rates start increasing around pull 65. Not officially
                    confirmed, estimated from community data.
                  </p>
                </div>
                <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
                  <p className="text-[#FF6B35] text-xs font-medium mb-1">
                    Hard Pity (50/50)
                  </p>
                  <p className="text-2xl font-bold text-white">80 pulls</p>
                  <p className="text-gray-500 text-xs mt-1">
                    Guaranteed SSR at 80 pulls. 50% chance it&apos;s Meliodas,
                    50% chance it&apos;s an off-banner SSR.
                  </p>
                </div>
                <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
                  <p className="text-[#EF4444] text-xs font-medium mb-1">
                    120-Pull Guarantee
                  </p>
                  <p className="text-2xl font-bold text-white">120 pulls</p>
                  <p className="text-gray-500 text-xs mt-1">
                    One-time safety net. Within 120 pulls you&apos;re guaranteed
                    Meliodas regardless of 50/50 results.
                  </p>
                </div>
              </div>
              <p className="text-gray-500 text-xs mt-3">
                The 80-pull pity and 120-pull guarantee use{" "}
                <strong className="text-gray-400">
                  two independent pity counters
                </strong>
                . Worst-case scenario without the 120 safety net: lose the
                50/50 at pull 80, then pull another 80 for a guaranteed
                Meliodas = 160 pulls total. With the 120 safety net, the
                effective worst case is 120 pulls.{" "}
                <Link href="/" className="text-[#FFD700] underline">
                  Calculate your exact pull needs →
                </Link>
              </p>
            </div>

            {/* Should You Pull */}
            <div className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-4">
              <h4 className="text-[#22C55E] font-bold text-sm mb-1">
                Should you pull?
              </h4>
              <p className="text-gray-300 text-sm">
                <strong>Yes.</strong> Meliodas is the best character in the game
                at launch and this is his rate-up banner. Every tier list puts
                him at SS-tier. If you&apos;re starting the game, this is where
                your first pulls should go. The 21-day timer is personal (starts
                from your first login), so there&apos;s no rush on day 1 — but
                don&apos;t let it expire.
              </p>
            </div>
          </div>
        </section>

        {/* Lostvayne Skin Banner */}
        <section className="bg-[#1a1a2e] rounded-2xl border border-[#2a2a4a] overflow-hidden">
          <div className="bg-[#9333ea]/10 px-6 py-3 border-b border-[#9333ea]/20">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-[#c084fc] font-bold text-lg">
                Sacred Treasure: Demon Sword Lostvayne — Exclusive Skin
              </h3>
              <span className="bg-[#9333ea]/15 text-[#c084fc] text-xs font-medium px-2 py-1 rounded-md">
                ACTIVE — Skin Banner
              </span>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <table className="w-full text-sm">
              <tbody className="text-gray-400">
                <tr className="border-b border-[#2a2a4a]">
                  <td className="py-2 text-gray-500 w-1/3">Type</td>
                  <td className="py-2">
                    Exclusive Weapon Skin (cosmetic, not a stat weapon)
                  </td>
                </tr>
                <tr className="border-b border-[#2a2a4a]">
                  <td className="py-2 text-gray-500">Featured</td>
                  <td className="py-2 text-white">
                    Demon Sword Lostvayne skin + Meliodas Outfit Skin
                  </td>
                </tr>
                <tr className="border-b border-[#2a2a4a]">
                  <td className="py-2 text-gray-500">Duration</td>
                  <td className="py-2">March 16 — April 8, 2026 (UTC)</td>
                </tr>
                <tr className="border-b border-[#2a2a4a]">
                  <td className="py-2 text-gray-500">First draw</td>
                  <td className="py-2 text-[#22C55E]">FREE</td>
                </tr>
                <tr className="border-b border-[#2a2a4a]">
                  <td className="py-2 text-gray-500">Cost</td>
                  <td className="py-2">
                    Exclusive Skin Draw Tickets (after first free draw)
                  </td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Guarantee</td>
                  <td className="py-2">
                    Both skins guaranteed within 10 draws (one multi)
                  </td>
                </tr>
              </tbody>
            </table>
            <div className="bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl p-4">
              <h4 className="text-[#a5b4fc] font-bold text-sm mb-1">
                Should you pull?
              </h4>
              <p className="text-gray-300 text-sm">
                The first draw is free, so absolutely do that. Beyond that, this
                is purely cosmetic — the skin doesn&apos;t affect combat stats.
                Only spend Skin Draw Tickets here if you care about how
                Meliodas looks. The skin can only be equipped by Meliodas, so
                it&apos;s useless if you don&apos;t have him.
              </p>
            </div>
          </div>
        </section>

        {/* Standard Banner */}
        <section className="bg-[#1a1a2e] rounded-2xl border border-[#2a2a4a] overflow-hidden">
          <div className="bg-[#4FC3F7]/10 px-6 py-3 border-b border-[#4FC3F7]/20">
            <div className="flex items-center justify-between flex-wrap gap-2">
              <h3 className="text-[#4FC3F7] font-bold text-lg">
                New Encounters — Standard Banner
              </h3>
              <span className="bg-[#4FC3F7]/15 text-[#4FC3F7] text-xs font-medium px-2 py-1 rounded-md">
                PERMANENT
              </span>
            </div>
          </div>
          <div className="p-6 space-y-3">
            <table className="w-full text-sm">
              <tbody className="text-gray-400">
                <tr className="border-b border-[#2a2a4a]">
                  <td className="py-2 text-gray-500 w-1/3">Type</td>
                  <td className="py-2">Standard / permanent pool</td>
                </tr>
                <tr className="border-b border-[#2a2a4a]">
                  <td className="py-2 text-gray-500">Featured</td>
                  <td className="py-2">
                    None — all SSR characters have equal rates
                  </td>
                </tr>
                <tr className="border-b border-[#2a2a4a]">
                  <td className="py-2 text-gray-500">SSR rate (each)</td>
                  <td className="py-2 font-mono">0.1143%</td>
                </tr>
                <tr>
                  <td className="py-2 text-gray-500">Duration</td>
                  <td className="py-2">Permanent</td>
                </tr>
              </tbody>
            </table>
            <div className="bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl p-4">
              <h4 className="text-[#a5b4fc] font-bold text-sm mb-1">
                Should you pull?
              </h4>
              <p className="text-gray-300 text-sm">
                Only use free standard banner tickets here. Don&apos;t spend
                Star Memory on the standard banner — the rate-up banner gives
                you a much higher chance at specific characters. The standard
                banner is always available, so there&apos;s no urgency.
              </p>
            </div>
          </div>
        </section>

        {/* Free Resources */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-xl font-bold text-white mb-4">
            Free Pull Resources at Launch
          </h2>
          <p className="text-gray-400 text-sm mb-4">
            Confirmed free resources from the global launch event. Collect these
            from your mailbox and event menus.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
              <p className="text-[#FFD700] text-sm font-medium">
                Permanent Banner Free Pulls
              </p>
              <p className="text-3xl font-bold text-white mt-1">60</p>
              <p className="text-gray-500 text-xs mt-1">
                From launch event rewards
              </p>
            </div>
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
              <p className="text-[#FF4444] text-sm font-medium">
                Meliodas Banner Free Pulls
              </p>
              <p className="text-3xl font-bold text-white mt-1">10</p>
              <p className="text-gray-500 text-xs mt-1">
                From pre-registration rewards
              </p>
            </div>
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
              <p className="text-gray-400 text-sm font-medium">
                WELCOMEORIGIN Code
              </p>
              <p className="text-3xl font-bold text-white mt-1">5</p>
              <p className="text-gray-500 text-xs mt-1">
                Regular Hero Draw Tickets
              </p>
            </div>
            <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
              <p className="text-gray-400 text-sm font-medium">
                Story + Missions (estimated)
              </p>
              <p className="text-3xl font-bold text-white mt-1">~300</p>
              <p className="text-gray-500 text-xs mt-1">
                Star Memory from progression over the launch period
              </p>
            </div>
          </div>
          <p className="text-gray-500 text-xs mt-3">
            Total estimated free pulls during the launch period: ~370+
            (accumulated over weeks, not all available day 1). Source:{" "}
            <span className="text-gray-400">7dsorigin.gg launch event page</span>
          </p>
        </section>

        {/* Upcoming Banners */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-xl font-bold text-white mb-3">
            Upcoming Banners
          </h2>
          <p className="text-gray-400 text-sm leading-relaxed mb-3">
            Netmarble hasn&apos;t published an official banner roadmap yet.
            There&apos;s a leaked image circulating on social media claiming to
            show future banners, but it hasn&apos;t been confirmed by any
            official source.
          </p>
          <p className="text-gray-400 text-sm leading-relaxed">
            What we can reasonably expect: the mobile launch on March 23 will
            likely come with new events and possibly a new rate-up banner.
            Ban and Merlin are both 6-star characters with unrevealed kits, so
            they&apos;re strong candidates for the next rate-up banners. If
            you&apos;re saving pulls, our{" "}
            <Link href="/" className="text-[#FFD700] underline">
              pity calculator
            </Link>{" "}
            can help you plan how much Star Memory to hold.
          </p>
          <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl p-4 mt-4">
            <p className="text-[#fca5a5] text-sm">
              <strong>Leaks are not confirmed.</strong> We only list officially
              announced banners on this page. Any &quot;banner roadmap&quot; screenshots
              you see on Twitter/Reddit should be treated as speculation until
              Netmarble confirms them.
            </p>
          </div>
        </section>

        {/* CTA */}
        <section className="bg-[#2a2a4a] rounded-2xl p-6 text-center">
          <p className="text-gray-300 text-sm mb-3">
            Figure out exactly how many pulls you need for Meliodas.
          </p>
          <div className="flex flex-wrap justify-center gap-3">
            <Link
              href="/"
              className="inline-block bg-[#FFD700] text-[#0a0a14] font-bold px-6 py-2.5 rounded-lg hover:bg-[#FFE44D] transition-colors text-sm"
            >
              Pity Calculator
            </Link>
            <Link
              href="/tier-list"
              className="inline-block bg-[#1a1a2e] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#2a2a4a] transition-colors text-sm border border-[#2a2a4a]"
            >
              Tier List
            </Link>
            <Link
              href="/reroll-guide"
              className="inline-block bg-[#1a1a2e] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#2a2a4a] transition-colors text-sm border border-[#2a2a4a]"
            >
              Reroll Guide
            </Link>
          </div>
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
              "Seven Deadly Sins: Origin — All Current and Upcoming Banners (March 2026)",
            description:
              "Active banners in 7DS Origin with confirmed gacha rates, pity system details, and free pull resources.",
            datePublished: "2026-03-17",
            dateModified: "2026-03-17",
            url: "https://7dscalc.com/banners",
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
