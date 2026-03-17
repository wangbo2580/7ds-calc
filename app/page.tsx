"use client";

import { useState } from "react";
import PityCalculator from "@/components/PityCalculator";
import ProbabilityChart from "@/components/ProbabilityChart";
import FAQ from "@/components/FAQ";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";
import { GAME_CONFIG } from "@/lib/gameConfig";

export default function Home() {
  const [currentPulls, setCurrentPulls] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Launch Notice */}
        <div className="bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl p-4">
          <p className="text-[#a5b4fc] text-sm">
            <strong>The game is now live!</strong> PC/Steam and PS5 launched March 16. Mobile (iOS/Android) launches March 23.
            Pity data updated with launch information. ~{GAME_CONFIG.launchFreePulls} free pulls available from launch events!
          </p>
        </div>

        {/* How to Use */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-lg font-bold text-white mb-3">
            How to Use This Calculator
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-sm">
            <div className="flex gap-3">
              <span className="text-[#FFD700] font-bold text-lg">1</span>
              <p className="text-gray-400">
                Enter your current pity count (how many pulls since your last
                5-star)
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#FFD700] font-bold text-lg">2</span>
              <p className="text-gray-400">
                Select your 50/50 status and how many characters you want
              </p>
            </div>
            <div className="flex gap-3">
              <span className="text-[#FFD700] font-bold text-lg">3</span>
              <p className="text-gray-400">
                Enter your resources to see if you can reach the 120-pull guarantee
              </p>
            </div>
          </div>
        </section>

        {/* Calculator */}
        <PityCalculator onPullsChange={setCurrentPulls} />

        {/* Probability Chart */}
        <ProbabilityChart currentPulls={currentPulls} />

        {/* Pity System Explained */}
        <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-xl font-bold text-[#FFD700] mb-4">
            How the Three-Layer Pity System Works in 7DS Origin
          </h2>
          <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
            <p>
              The Seven Deadly Sins: Origin uses a unique{" "}
              <strong className="text-white">three-layer pity system</strong>{" "}
              that&apos;s more complex than most gacha games. Understanding all
              three layers helps you plan your pulls effectively.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              <div className="bg-[#0f0f1a] rounded-xl p-4">
                <h3 className="text-[#FFD700] font-bold mb-2">
                  Layer 1: SSR Hard Pity
                </h3>
                <p className="text-[#FFD700] text-2xl font-bold mb-1">
                  {GAME_CONFIG.hardPity} Pulls
                </p>
                <p>
                  You&apos;re guaranteed an SSR within {GAME_CONFIG.hardPity} pulls.
                  Soft pity kicks in around pull {GAME_CONFIG.softPityStart},
                  increasing your odds with each pull.
                </p>
              </div>
              <div className="bg-[#0f0f1a] rounded-xl p-4">
                <h3 className="text-[#FF6B35] font-bold mb-2">
                  Layer 2: 50/50 &amp; Rate-Up Guarantee
                </h3>
                <p className="text-[#FF6B35] text-2xl font-bold mb-1">
                  {GAME_CONFIG.guaranteedRateUp} Pulls
                </p>
                <p>
                  When you pull an SSR, there&apos;s a 50/50 chance it&apos;s the
                  featured character. Plus, within {GAME_CONFIG.guaranteedRateUp} pulls
                  you&apos;re guaranteed the rate-up character no matter what.
                </p>
              </div>
              <div className="bg-[#0f0f1a] rounded-xl p-4">
                <h3 className="text-[#EF4444] font-bold mb-2">
                  Layer 3: Absolute Worst Case
                </h3>
                <p className="text-[#EF4444] text-2xl font-bold mb-1">
                  {GAME_CONFIG.absoluteWorstCase} Pulls
                </p>
                <p>
                  If you lose the 50/50 at pull {GAME_CONFIG.hardPity} and need
                  another {GAME_CONFIG.hardPity} pulls for the guaranteed rate-up,
                  the absolute maximum is {GAME_CONFIG.absoluteWorstCase} pulls.
                </p>
              </div>
            </div>
            <p>
              <strong className="text-white">In short:</strong> Most players will
              get the featured character well before {GAME_CONFIG.guaranteedRateUp} pulls
              thanks to soft pity and the 50/50 system. But even in the worst
              case scenario, you&apos;ll never need more than{" "}
              {GAME_CONFIG.absoluteWorstCase} pulls. Plan your{" "}
              {GAME_CONFIG.currencyName} around the {GAME_CONFIG.guaranteedRateUp}-pull
              mark for a stress-free experience.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        <SiteFooter />
      </main>

      {/* JSON-LD Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "WebApplication",
            name: "7DS Origin Pity Calculator",
            description:
              "Calculate how many pulls you need for a guaranteed featured character in Seven Deadly Sins: Origin. Three-layer pity system calculator with probability charts.",
            url: "https://7dscalc.com",
            applicationCategory: "GameApplication",
            operatingSystem: "Web",
            offers: {
              "@type": "Offer",
              price: "0",
              priceCurrency: "USD",
            },
          }),
        }}
      />
    </div>
  );
}
