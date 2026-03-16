"use client";

import { useState, useEffect, useCallback } from "react";
import { calculatePity, type PityResult } from "@/lib/pityCalc";
import { GAME_CONFIG } from "@/lib/gameConfig";

const STORAGE_KEY = "7ds-calc-inputs";

interface SavedInputs {
  currentPulls: number;
  isGuaranteed: boolean;
  targetCharacters: number;
  ownedCurrency: number;
  ownedTickets: number;
}

export default function PityCalculator({
  onPullsChange,
}: {
  onPullsChange?: (pulls: number) => void;
}) {
  const [currentPulls, setCurrentPulls] = useState(0);
  const [isGuaranteed, setIsGuaranteed] = useState(false);
  const [targetCharacters, setTargetCharacters] = useState(1);
  const [ownedCurrency, setOwnedCurrency] = useState(0);
  const [ownedTickets, setOwnedTickets] = useState(0);
  const [result, setResult] = useState<PityResult | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed: SavedInputs = JSON.parse(saved);
        setCurrentPulls(parsed.currentPulls || 0);
        setIsGuaranteed(parsed.isGuaranteed || false);
        setTargetCharacters(parsed.targetCharacters || 1);
        setOwnedCurrency(parsed.ownedCurrency || 0);
        setOwnedTickets(parsed.ownedTickets || 0);
      }
    } catch {
      // ignore
    }
  }, []);

  const compute = useCallback(() => {
    const r = calculatePity({
      currentPulls,
      isGuaranteed,
      targetCharacters,
      ownedCurrency,
      ownedTickets,
    });
    setResult(r);
    onPullsChange?.(currentPulls);

    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({ currentPulls, isGuaranteed, targetCharacters, ownedCurrency, ownedTickets })
      );
    } catch {
      // ignore
    }
  }, [currentPulls, isGuaranteed, targetCharacters, ownedCurrency, ownedTickets, onPullsChange]);

  useEffect(() => {
    compute();
  }, [compute]);

  const inSoftPity = currentPulls >= GAME_CONFIG.softPityStart;
  const pityProgress = (currentPulls / GAME_CONFIG.hardPity) * 100;

  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Input Section */}
      <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
        <h2 className="text-xl font-bold text-[#FFD700] mb-6">
          Pity Calculator
        </h2>

        {/* Current Pulls */}
        <div className="mb-5">
          <label className="block text-sm text-gray-400 mb-2">
            Current Pity Count (within 80-pull cycle)
          </label>
          <div className="flex items-center gap-3">
            <input
              type="range"
              min={0}
              max={GAME_CONFIG.hardPity}
              value={currentPulls}
              onChange={(e) => setCurrentPulls(Number(e.target.value))}
              className="flex-1 accent-[#FFD700] h-2 bg-[#2a2a4a] rounded-lg cursor-pointer"
            />
            <input
              type="number"
              min={0}
              max={GAME_CONFIG.hardPity}
              value={currentPulls}
              onChange={(e) =>
                setCurrentPulls(
                  Math.min(GAME_CONFIG.hardPity, Math.max(0, Number(e.target.value) || 0))
                )
              }
              className="w-16 bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-2 py-1.5 text-center text-white text-lg font-mono"
            />
            <span className="text-gray-500 text-sm">/ {GAME_CONFIG.hardPity}</span>
          </div>
          {/* Progress bar */}
          <div className="mt-2 h-2 bg-[#0f0f1a] rounded-full overflow-hidden relative">
            {/* Soft pity marker */}
            <div
              className="absolute top-0 h-full w-px bg-[#FFD700]/60 z-10"
              style={{ left: `${(GAME_CONFIG.softPityStart / GAME_CONFIG.hardPity) * 100}%` }}
            />
            <div
              className={`h-full rounded-full transition-all duration-300 ${
                inSoftPity
                  ? "bg-gradient-to-r from-[#FFD700] to-[#FF6B35]"
                  : "bg-gradient-to-r from-[#6366f1] to-[#8b5cf6]"
              }`}
              style={{ width: `${pityProgress}%` }}
            />
          </div>
          <div className="flex justify-between mt-1 text-[10px] text-gray-600">
            <span>0</span>
            <span className="text-[#FFD700]">Soft ~{GAME_CONFIG.softPityStart}</span>
            <span className="text-[#FF6B35]">Hard {GAME_CONFIG.hardPity}</span>
          </div>
          {inSoftPity && (
            <p className="text-[#FF6B35] text-xs mt-1 font-medium">
              Soft pity active! Increased rates
            </p>
          )}
        </div>

        {/* 50/50 Status */}
        <div className="mb-5">
          <label className="block text-sm text-gray-400 mb-2">
            50/50 Status
          </label>
          <div className="flex gap-2">
            <button
              onClick={() => setIsGuaranteed(false)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                !isGuaranteed
                  ? "bg-[#6366f1] text-white"
                  : "bg-[#0f0f1a] text-gray-400 hover:bg-[#1a1a2e]"
              }`}
            >
              50/50
            </button>
            <button
              onClick={() => setIsGuaranteed(true)}
              className={`flex-1 py-2 px-3 rounded-lg text-sm font-medium transition-all ${
                isGuaranteed
                  ? "bg-[#22C55E] text-white"
                  : "bg-[#0f0f1a] text-gray-400 hover:bg-[#1a1a2e]"
              }`}
            >
              Guaranteed
            </button>
          </div>
          <p className="text-gray-500 text-xs mt-1">
            {isGuaranteed
              ? "You lost the 50/50 before — your next SSR is guaranteed to be the rate-up character"
              : "50% chance to get the rate-up character when you pull an SSR"}
          </p>
        </div>

        {/* Target Characters */}
        <div className="mb-5">
          <label className="block text-sm text-gray-400 mb-2">
            Target Characters
          </label>
          <div className="flex gap-2">
            {[1, 2, 3, 4, 5].map((n) => (
              <button
                key={n}
                onClick={() => setTargetCharacters(n)}
                className={`w-10 h-10 rounded-lg text-sm font-bold transition-all ${
                  targetCharacters === n
                    ? "bg-[#FFD700] text-[#0f0f1a]"
                    : "bg-[#0f0f1a] text-gray-400 hover:bg-[#1a1a2e]"
                }`}
              >
                {n}
              </button>
            ))}
          </div>
        </div>

        {/* Currency */}
        <div className="mb-5">
          <label className="block text-sm text-gray-400 mb-2">
            {GAME_CONFIG.currencyName} Owned
          </label>
          <input
            type="number"
            min={0}
            value={ownedCurrency || ""}
            onChange={(e) => setOwnedCurrency(Math.max(0, Number(e.target.value) || 0))}
            placeholder="0"
            className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-white font-mono focus:border-[#FFD700] focus:outline-none transition-colors"
          />
        </div>

        {/* Tickets */}
        <div className="mb-2">
          <label className="block text-sm text-gray-400 mb-2">
            {GAME_CONFIG.ticketName}s Owned
          </label>
          <input
            type="number"
            min={0}
            value={ownedTickets || ""}
            onChange={(e) => setOwnedTickets(Math.max(0, Number(e.target.value) || 0))}
            placeholder="0"
            className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-white font-mono focus:border-[#FFD700] focus:outline-none transition-colors"
          />
        </div>
      </div>

      {/* Results Section */}
      {result && (
        <div className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
          <h2 className="text-xl font-bold text-[#FFD700] mb-6">Results</h2>

          {/* Current Probability */}
          <div className="bg-[#0f0f1a] rounded-xl p-4 mb-4">
            <p className="text-gray-400 text-sm">Next Pull Probability</p>
            <p className="text-3xl font-bold text-white mt-1">
              {(result.currentProb * 100).toFixed(1)}%
            </p>
          </div>

          {/* Pity Milestones */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-[#0f0f1a] rounded-xl p-3 text-center">
              <p className="text-[#FFD700] text-[10px] font-medium">SSR Pity (80)</p>
              <p className="text-xl font-bold text-white mt-0.5">
                {result.pullsToHardPity}
              </p>
              <p className="text-gray-600 text-[10px]">pulls away</p>
            </div>
            <div className="bg-[#0f0f1a] rounded-xl p-3 text-center">
              <p className="text-[#FF6B35] text-[10px] font-medium">Rate-Up (120)</p>
              <p className="text-xl font-bold text-white mt-0.5">
                {result.pullsToGuaranteedRateUp}
              </p>
              <p className="text-gray-600 text-[10px]">pulls away</p>
            </div>
            <div className="bg-[#0f0f1a] rounded-xl p-3 text-center">
              <p className="text-[#EF4444] text-[10px] font-medium">Worst (160)</p>
              <p className="text-xl font-bold text-white mt-0.5">
                {result.pullsToAbsoluteWorst}
              </p>
              <p className="text-gray-600 text-[10px]">pulls away</p>
            </div>
          </div>

          {/* Scenario Cards */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <div className="bg-[#0f0f1a] rounded-xl p-3 text-center">
              <p className="text-gray-500 text-xs">Best</p>
              <p className="text-lg font-bold text-[#22C55E]">{result.bestCase}</p>
              <p className="text-gray-600 text-xs">pulls</p>
            </div>
            <div className="bg-[#0f0f1a] rounded-xl p-3 text-center">
              <p className="text-gray-500 text-xs">Average</p>
              <p className="text-lg font-bold text-[#FFD700]">{result.averageCase}</p>
              <p className="text-gray-600 text-xs">pulls</p>
            </div>
            <div className="bg-[#0f0f1a] rounded-xl p-3 text-center">
              <p className="text-gray-500 text-xs">Worst</p>
              <p className="text-lg font-bold text-[#EF4444]">{result.worstCase}</p>
              <p className="text-gray-600 text-xs">pulls</p>
            </div>
          </div>

          {/* Resource Check */}
          <div
            className={`rounded-xl p-4 mb-4 border ${
              result.canReachHardPity
                ? "bg-[#22C55E]/10 border-[#22C55E]/30"
                : "bg-[#EF4444]/10 border-[#EF4444]/30"
            }`}
          >
            <div className="flex items-center gap-2 mb-1">
              <span className="text-2xl">
                {result.canReachHardPity ? "\u2705" : "\u274C"}
              </span>
              <p className="font-bold text-white">
                {result.canReachGuaranteed
                  ? "You can reach the 120-pull rate-up guarantee!"
                  : result.canReachHardPity
                    ? "You can reach 80-pull hard pity!"
                    : "Not enough for hard pity (80)"}
              </p>
            </div>
            <p className="text-sm text-gray-400">
              Available: {result.totalPullsAvailable} pulls
              {!result.canReachHardPity && (
                <span className="text-[#EF4444]">
                  {" "}
                  (need {result.pullsShortHardPity} more = {result.currencyShortHardPity.toLocaleString()}{" "}
                  {GAME_CONFIG.currencyName})
                </span>
              )}
            </p>
          </div>

          {/* Advice */}
          <div className="bg-[#2a2a4a] rounded-xl p-4">
            <p className="text-sm text-gray-300 leading-relaxed">
              {result.advice}
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
