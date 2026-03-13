"use client";

import { useState } from "react";
import PityCalculator from "@/components/PityCalculator";
import ProbabilityChart from "@/components/ProbabilityChart";
import FAQ from "@/components/FAQ";
import { GAME_CONFIG } from "@/lib/gameConfig";

export default function Home() {
  const [currentPulls, setCurrentPulls] = useState(0);

  return (
    <div className="min-h-screen bg-[#0a0a14]">
      {/* Header */}
      <header className="border-b border-[#2a2a4a] bg-[#0f0f1a]/80 backdrop-blur-sm sticky top-0 z-50">
        <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
          <div>
            <h1 className="text-xl sm:text-2xl font-bold">
              <span className="text-[#FFD700]">7DS Origin</span>{" "}
              <span className="text-white">Pity Calculator</span>
            </h1>
            <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
              Seven Deadly Sins: Origin — Summon Calculator & Resource Planner
            </p>
          </div>
          {GAME_CONFIG.dataStatus === "CBT_ESTIMATE" && (
            <div className="hidden sm:block bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-lg px-3 py-1.5">
              <p className="text-[#FF6B35] text-xs font-medium">
                CBT Data — Updated {GAME_CONFIG.lastUpdated}
              </p>
            </div>
          )}
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8 space-y-6">
        {/* Data Notice */}
        {GAME_CONFIG.dataStatus === "CBT_ESTIMATE" && (
          <div className="bg-[#FF6B35]/10 border border-[#FF6B35]/30 rounded-xl p-4 sm:hidden">
            <p className="text-[#FF6B35] text-xs">
              Data based on CBT estimates. Will be updated after official launch
              (March 16, 2026).
            </p>
          </div>
        )}

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
                Enter your resources to see if you have enough for pity
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
            How the Pity System Works in 7DS Origin
          </h2>
          <div className="space-y-4 text-sm text-gray-400 leading-relaxed">
            <p>
              The Seven Deadly Sins: Origin uses a <strong className="text-white">pity system</strong> to
              guarantee players will eventually receive a 5-star character. Every
              pull that doesn&apos;t result in a 5-star increases your &quot;pity
              counter.&quot;
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="bg-[#0f0f1a] rounded-xl p-4">
                <h3 className="text-[#6366f1] font-bold mb-2">
                  Soft Pity (Pull {GAME_CONFIG.softPityStart}+)
                </h3>
                <p>
                  Starting at pull {GAME_CONFIG.softPityStart}, the probability
                  of pulling a 5-star character increases with each pull. This
                  means most players will get their 5-star before reaching hard
                  pity.
                </p>
              </div>
              <div className="bg-[#0f0f1a] rounded-xl p-4">
                <h3 className="text-[#FF6B35] font-bold mb-2">
                  Hard Pity (Pull {GAME_CONFIG.hardPity})
                </h3>
                <p>
                  At pull {GAME_CONFIG.hardPity}, you are guaranteed a 5-star
                  character. This is the maximum number of pulls you&apos;ll ever
                  need for a single 5-star.
                </p>
              </div>
            </div>
            <p>
              The <strong className="text-white">50/50 system</strong> determines
              whether your 5-star will be the featured (rate-up) character. When
              you pull a 5-star, there&apos;s a 50% chance it&apos;s the featured
              character. If you &quot;lose&quot; the 50/50, your next 5-star is
              guaranteed to be the featured character.
            </p>
          </div>
        </section>

        {/* FAQ */}
        <FAQ />

        {/* Footer */}
        <footer className="text-center py-8 space-y-3">
          <p className="text-gray-600 text-xs">
            7DS Calc is a fan-made tool and is not affiliated with Netmarble or
            the Seven Deadly Sins franchise.
          </p>
          <p className="text-gray-700 text-xs">
            Game data is estimated from CBT and may change after official launch.
            Last updated: {GAME_CONFIG.lastUpdated}
          </p>
          <p className="text-gray-700 text-xs">
            &copy; {new Date().getFullYear()} 7dscalc.com
          </p>
        </footer>
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
              "Calculate how many pulls you need for a guaranteed 5-star character in Seven Deadly Sins: Origin.",
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
