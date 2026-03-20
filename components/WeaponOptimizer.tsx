"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  getCompatibleCharacters,
  getCharacterWeapons,
  getWeaponProfile,
  calculateSlotStats,
  calculateTotalStats,
  calculateRecommendedStats,
  MAX_WEAPON_LEVEL,
  MAX_ENHANCEMENT,
  type WeaponType,
  type SlotConfig,
  type ComputedStats,
  type WeaponStats,
} from "@/lib/weapons";
import { CHARACTERS, ELEMENT_COLORS, TIER_COLORS } from "@/lib/characters";

const STORAGE_KEY = "7ds-weapon-optimizer";

const STAT_LABELS: { key: keyof ComputedStats; label: string; suffix: string; color: string; maxRef: number }[] = [
  { key: "attack", label: "ATK", suffix: "", color: "#EF4444", maxRef: 3000 },
  { key: "critChance", label: "Crit Rate", suffix: "%", color: "#FFD700", maxRef: 40 },
  { key: "critDamage", label: "Crit DMG", suffix: "%", color: "#FF8C00", maxRef: 200 },
  { key: "efficiency", label: "Efficiency", suffix: "%", color: "#22C55E", maxRef: 30 },
  { key: "elementalDamage", label: "Ele DMG", suffix: "%", color: "#6366f1", maxRef: 30 },
  { key: "burstDamage", label: "Burst DMG", suffix: "%", color: "#c084fc", maxRef: 40 },
];

interface SlotProps {
  label: string;
  contribution: string;
  availableTypes: WeaponType[];
  config: SlotConfig;
  onChange: (config: SlotConfig) => void;
  stats: WeaponStats;
}

function WeaponSlot({ label, contribution, availableTypes, config, onChange, stats }: SlotProps) {
  const profile = getWeaponProfile(config.weaponType);

  return (
    <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]/50">
      {/* Header */}
      <div className="flex items-center justify-between mb-3">
        <div>
          <p className="text-sm font-semibold text-white">{label}</p>
          <p className="text-[10px] text-gray-500">{contribution} stats</p>
        </div>
        {profile && (
          <span className="text-[10px] px-2 py-0.5 rounded-md bg-[#1a1a2e] text-gray-400">
            {profile.playstyle}
          </span>
        )}
      </div>

      {/* Weapon Type Select */}
      <div className="mb-3">
        <label className="block text-[10px] text-gray-500 mb-1">Weapon Type</label>
        <select
          value={config.weaponType}
          onChange={(e) => onChange({ ...config, weaponType: e.target.value as WeaponType })}
          className="w-full bg-[#1a1a2e] border border-[#2a2a4a] rounded-lg px-3 py-2 text-sm text-white focus:border-[#6366f1] focus:outline-none appearance-none cursor-pointer"
        >
          {availableTypes.map((type) => {
            const p = getWeaponProfile(type);
            return (
              <option key={type} value={type}>
                {type} {p ? `— ${p.playstyle}` : ""}
              </option>
            );
          })}
        </select>
      </div>

      {/* Level */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] text-gray-500">Level</label>
          <span className="text-xs text-white font-mono">{config.level}</span>
        </div>
        <input
          type="range"
          min={1}
          max={MAX_WEAPON_LEVEL}
          value={config.level}
          onChange={(e) => onChange({ ...config, level: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-gray-600">
          <span>1</span>
          <span>{MAX_WEAPON_LEVEL}</span>
        </div>
      </div>

      {/* Enhancement */}
      <div className="mb-3">
        <div className="flex items-center justify-between mb-1">
          <label className="text-[10px] text-gray-500">Enhancement</label>
          <span className="text-xs text-[#FFD700] font-mono">+{config.enhancement}</span>
        </div>
        <input
          type="range"
          min={0}
          max={MAX_ENHANCEMENT}
          value={config.enhancement}
          onChange={(e) => onChange({ ...config, enhancement: Number(e.target.value) })}
          className="w-full"
        />
        <div className="flex justify-between text-[10px] text-gray-600">
          <span>+0</span>
          <span>+{MAX_ENHANCEMENT}</span>
        </div>
      </div>

      {/* Slot Stats Preview */}
      <div className="bg-[#1a1a2e]/50 rounded-lg p-2.5">
        <p className="text-[10px] text-gray-500 mb-1.5">Slot Stats</p>
        <div className="grid grid-cols-3 gap-x-3 gap-y-1">
          <StatMini label="ATK" value={stats.attack} />
          <StatMini label="Crit%" value={stats.critChance} suffix="%" />
          <StatMini label="CritD" value={stats.critDamage} suffix="%" />
          <StatMini label="Eff" value={stats.efficiency} suffix="%" />
          <StatMini label="Ele" value={stats.elementalDamage} suffix="%" />
          <StatMini label="Burst" value={stats.burstDamage} suffix="%" />
        </div>
      </div>
    </div>
  );
}

function StatMini({ label, value, suffix = "" }: { label: string; value: number; suffix?: string }) {
  return (
    <div className="flex items-center justify-between">
      <span className="text-[10px] text-gray-500">{label}</span>
      <span className="text-[10px] text-gray-300 font-mono">
        {typeof value === "number" && value % 1 !== 0 ? value.toFixed(1) : value}
        {suffix}
      </span>
    </div>
  );
}

function StatBar({
  label,
  value,
  suffix,
  color,
  maxRef,
}: {
  label: string;
  value: number;
  suffix: string;
  color: string;
  maxRef: number;
}) {
  const pct = Math.min(100, (value / maxRef) * 100);
  const displayValue = value % 1 !== 0 ? value.toFixed(1) : value;

  return (
    <div>
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400">{label}</span>
        <span className="text-sm font-bold text-white font-mono">
          {displayValue}
          {suffix}
        </span>
      </div>
      <div className="h-2 bg-[#0f0f1a] rounded-full overflow-hidden">
        <div
          className="h-full rounded-full transition-all duration-300"
          style={{ width: `${pct}%`, backgroundColor: color }}
        />
      </div>
    </div>
  );
}

export default function WeaponOptimizer() {
  const characters = useMemo(() => getCompatibleCharacters(), []);
  const [selectedCharId, setSelectedCharId] = useState(characters[0]?.id ?? "");
  const [main, setMain] = useState<SlotConfig>({ weaponType: "Dual Swords", level: 40, enhancement: 5 });
  const [sub1, setSub1] = useState<SlotConfig>({ weaponType: "Axe", level: 30, enhancement: 3 });
  const [sub2, setSub2] = useState<SlotConfig>({ weaponType: "Longsword", level: 30, enhancement: 3 });

  // Load saved state
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.selectedCharId) setSelectedCharId(parsed.selectedCharId);
        if (parsed.main) setMain(parsed.main);
        if (parsed.sub1) setSub1(parsed.sub1);
        if (parsed.sub2) setSub2(parsed.sub2);
      }
    } catch {
      // ignore
    }
  }, []);

  // Save state
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({ selectedCharId, main, sub1, sub2 }));
    } catch {
      // ignore
    }
  }, [selectedCharId, main, sub1, sub2]);

  // When character changes, reset to their first recommended setup
  const handleCharacterChange = (charId: string) => {
    setSelectedCharId(charId);
    const weaponInfo = getCharacterWeapons(charId);
    if (weaponInfo && weaponInfo.recommended.length > 0) {
      const rec = weaponInfo.recommended[0];
      setMain((prev) => ({ ...prev, weaponType: rec.main }));
      setSub1((prev) => ({ ...prev, weaponType: rec.sub1 }));
      setSub2((prev) => ({ ...prev, weaponType: rec.sub2 }));
    } else if (weaponInfo) {
      setMain((prev) => ({ ...prev, weaponType: weaponInfo.weaponTypes[0] }));
      setSub1((prev) => ({ ...prev, weaponType: weaponInfo.weaponTypes[1] ?? weaponInfo.weaponTypes[0] }));
      setSub2((prev) => ({ ...prev, weaponType: weaponInfo.weaponTypes[2] ?? weaponInfo.weaponTypes[0] }));
    }
  };

  const charData = CHARACTERS.find((c) => c.id === selectedCharId);
  const weaponInfo = getCharacterWeapons(selectedCharId);
  const availableTypes = weaponInfo?.weaponTypes ?? [];

  const mainStats = useMemo(() => calculateSlotStats(main), [main]);
  const sub1Stats = useMemo(() => calculateSlotStats(sub1), [sub1]);
  const sub2Stats = useMemo(() => calculateSlotStats(sub2), [sub2]);

  const totalStats = useMemo(
    () => calculateTotalStats({ characterId: selectedCharId, main, sub1, sub2 }),
    [selectedCharId, main, sub1, sub2],
  );

  // Calculate recommended setup stats for comparison
  const recommendedComparisons = useMemo(() => {
    if (!weaponInfo) return [];
    return weaponInfo.recommended.map((rec) => ({
      rec,
      stats: calculateRecommendedStats(selectedCharId, rec, main.level, main.enhancement),
    }));
  }, [weaponInfo, selectedCharId, main.level, main.enhancement]);

  const applyRecommended = (rec: { main: WeaponType; sub1: WeaponType; sub2: WeaponType }) => {
    setMain((prev) => ({ ...prev, weaponType: rec.main }));
    setSub1((prev) => ({ ...prev, weaponType: rec.sub1 }));
    setSub2((prev) => ({ ...prev, weaponType: rec.sub2 }));
  };

  const setAllLevels = (level: number) => {
    setMain((prev) => ({ ...prev, level }));
    setSub1((prev) => ({ ...prev, level }));
    setSub2((prev) => ({ ...prev, level }));
  };

  const setAllEnhancements = (enhancement: number) => {
    setMain((prev) => ({ ...prev, enhancement }));
    setSub1((prev) => ({ ...prev, enhancement }));
    setSub2((prev) => ({ ...prev, enhancement }));
  };

  return (
    <div className="space-y-6">
      {/* Character Selection */}
      <section className="bg-[#1a1a2e] rounded-2xl p-5 sm:p-6 border border-[#2a2a4a]">
        <h2 className="text-xl font-bold text-[#FFD700] mb-4">Select Character</h2>

        <select
          value={selectedCharId}
          onChange={(e) => handleCharacterChange(e.target.value)}
          className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-4 py-3 text-white focus:border-[#FFD700] focus:outline-none appearance-none cursor-pointer text-sm"
        >
          {characters.map((c) => {
            const char = CHARACTERS.find((ch) => ch.id === c.id);
            return (
              <option key={c.id} value={c.id}>
                {c.name} ({char?.tier} Tier) — {c.weaponTypes.join(" / ")}
              </option>
            );
          })}
        </select>

        {charData && (
          <div className="mt-3 flex items-center gap-2 flex-wrap">
            <span className={`text-sm font-bold ${TIER_COLORS[charData.tier].text}`}>
              {charData.tier} Tier
            </span>
            {charData.elements.map((el) => (
              <span
                key={el}
                className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${ELEMENT_COLORS[el] ?? ELEMENT_COLORS.TBD}`}
              >
                {el}
              </span>
            ))}
            <span className="text-xs text-gray-500">{charData.role}</span>
          </div>
        )}
      </section>

      {/* Quick Level Controls */}
      <section className="bg-[#1a1a2e] rounded-2xl p-5 sm:p-6 border border-[#2a2a4a]">
        <h2 className="text-sm font-semibold text-gray-300 mb-3">Quick Level Presets</h2>
        <div className="flex flex-wrap gap-2">
          <span className="text-xs text-gray-500 self-center mr-1">All Levels:</span>
          {[1, 20, 30, 40, 50, 60].map((lv) => (
            <button
              key={lv}
              onClick={() => setAllLevels(lv)}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#0f0f1a] text-gray-400 hover:text-white hover:bg-[#2a2a4a] transition-colors border border-[#2a2a4a]/50"
            >
              Lv.{lv}
            </button>
          ))}
          <span className="text-xs text-gray-500 self-center ml-3 mr-1">All Enhance:</span>
          {[0, 5, 10, 15].map((en) => (
            <button
              key={en}
              onClick={() => setAllEnhancements(en)}
              className="text-xs px-3 py-1.5 rounded-lg bg-[#0f0f1a] text-gray-400 hover:text-white hover:bg-[#2a2a4a] transition-colors border border-[#2a2a4a]/50"
            >
              +{en}
            </button>
          ))}
        </div>
      </section>

      {/* Weapon Slots */}
      <section className="grid grid-cols-1 lg:grid-cols-3 gap-4">
        <WeaponSlot
          label="Main Weapon"
          contribution="100%"
          availableTypes={availableTypes}
          config={main}
          onChange={setMain}
          stats={mainStats}
        />
        <WeaponSlot
          label="Sub Weapon 1"
          contribution="30%"
          availableTypes={availableTypes}
          config={sub1}
          onChange={setSub1}
          stats={sub1Stats}
        />
        <WeaponSlot
          label="Sub Weapon 2"
          contribution="30%"
          availableTypes={availableTypes}
          config={sub2}
          onChange={setSub2}
          stats={sub2Stats}
        />
      </section>

      {/* Total Stats */}
      <section className="bg-[#1a1a2e] rounded-2xl p-5 sm:p-6 border border-[#2a2a4a]">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#FFD700]">Total Weapon Stats</h2>
          <span className="text-[10px] text-gray-500 bg-[#0f0f1a] px-2.5 py-1 rounded-lg">
            Main 100% + Sub 30% + Sub 30%
          </span>
        </div>

        <div className="space-y-3">
          {STAT_LABELS.map((stat) => (
            <StatBar
              key={stat.key}
              label={stat.label}
              value={totalStats[stat.key]}
              suffix={stat.suffix}
              color={stat.color}
              maxRef={stat.maxRef}
            />
          ))}
        </div>
      </section>

      {/* Recommended Setups */}
      {recommendedComparisons.length > 0 && (
        <section className="bg-[#1a1a2e] rounded-2xl p-5 sm:p-6 border border-[#2a2a4a]">
          <h2 className="text-lg font-bold text-white mb-1">
            Recommended Setups for {charData?.name}
          </h2>
          <p className="text-xs text-gray-500 mb-4">
            Click to apply. Stats shown at your current level (Lv.{main.level}, +{main.enhancement}).
          </p>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
            {recommendedComparisons.map(({ rec, stats }) => {
              const isActive =
                main.weaponType === rec.main &&
                sub1.weaponType === rec.sub1 &&
                sub2.weaponType === rec.sub2;

              return (
                <button
                  key={rec.name}
                  onClick={() => applyRecommended(rec)}
                  className={`text-left rounded-xl p-4 border transition-all ${
                    isActive
                      ? "bg-[#6366f1]/15 border-[#6366f1]/50 ring-1 ring-[#6366f1]/30"
                      : "bg-[#0f0f1a] border-[#2a2a4a] hover:border-[#3a3a5a]"
                  }`}
                >
                  <div className="flex items-center justify-between mb-1">
                    <p className="text-sm font-semibold text-white">{rec.name}</p>
                    {isActive && (
                      <span className="text-[10px] text-[#6366f1] font-medium">Active</span>
                    )}
                  </div>
                  <p className="text-xs text-gray-400 mb-2">{rec.description}</p>

                  <div className="flex items-center gap-1.5 mb-2">
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#EF4444]/15 text-[#fca5a5]">
                      {rec.main}
                    </span>
                    <span className="text-[10px] text-gray-600">+</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a2e] text-gray-400">
                      {rec.sub1}
                    </span>
                    <span className="text-[10px] text-gray-600">+</span>
                    <span className="text-[10px] px-1.5 py-0.5 rounded bg-[#1a1a2e] text-gray-400">
                      {rec.sub2}
                    </span>
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-center">
                    <div>
                      <p className="text-[10px] text-gray-500">ATK</p>
                      <p className="text-xs font-mono text-white">{stats.attack}</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500">Crit%</p>
                      <p className="text-xs font-mono text-white">{stats.critChance.toFixed(1)}%</p>
                    </div>
                    <div>
                      <p className="text-[10px] text-gray-500">CritD%</p>
                      <p className="text-xs font-mono text-white">{stats.critDamage.toFixed(1)}%</p>
                    </div>
                  </div>

                  <div className="flex gap-1 mt-2 flex-wrap">
                    {rec.tags.map((tag) => (
                      <span
                        key={tag}
                        className="text-[9px] px-1.5 py-0.5 rounded bg-[#2a2a4a] text-gray-500"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </button>
              );
            })}
          </div>
        </section>
      )}

      {/* Data Notice */}
      <section className="bg-[#FF8C00]/5 border border-[#FF8C00]/20 rounded-xl p-4">
        <p className="text-xs text-[#FF8C00]">
          <strong>Data Status: Community Estimated</strong> — Weapon base stats and growth values
          are estimated from Early Access gameplay data collected by the community. Actual in-game values
          may differ slightly. We&apos;ll update with confirmed data as it becomes available.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-[#2a2a4a] rounded-2xl p-6 text-center">
        <p className="text-gray-300 text-sm mb-1">
          Found the best weapon setup?
        </p>
        <p className="text-gray-500 text-xs mb-3">
          Build a team around your character, or check which characters are worth pulling.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/team-builder"
            className="inline-block bg-[#FFD700] text-[#0a0a14] font-bold px-5 py-2 rounded-lg hover:bg-[#FFE44D] transition-colors text-sm"
          >
            Team Builder
          </Link>
          <Link
            href="/tier-list"
            className="inline-block bg-[#1a1a2e] text-gray-300 font-bold px-5 py-2 rounded-lg hover:bg-[#2a2a4a] transition-colors text-sm border border-[#2a2a4a]"
          >
            Tier List
          </Link>
        </div>
      </section>
    </div>
  );
}
