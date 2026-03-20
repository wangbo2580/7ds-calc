"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import {
  calculateDamage,
  getSkillsForCharacter,
  getApplicableDebuffs,
  DEBUFFS,
  type DamageInput,
  type DamageResult,
  type Skill,
} from "@/lib/damageCalc";
import { CHARACTERS, ELEMENT_COLORS, TIER_COLORS } from "@/lib/characters";

const STORAGE_KEY = "7ds-damage-calc";

const USABLE_CHARACTERS = CHARACTERS.filter(
  (c) => c.tier !== "?" && !c.elements.includes("TBD"),
);

// Characters that have skills defined
const CHARS_WITH_SKILLS = USABLE_CHARACTERS.filter(
  (c) => getSkillsForCharacter(c.id).length > 0,
);

const SKILL_TYPE_COLORS: Record<string, string> = {
  normal: "bg-[#6b7280]/15 text-[#9ca3af]",
  skill: "bg-[#6366f1]/15 text-[#a5b4fc]",
  ultimate: "bg-[#FFD700]/15 text-[#FFD700]",
};

function NumberInput({
  label,
  value,
  onChange,
  min = 0,
  max,
  suffix = "",
  hint,
}: {
  label: string;
  value: number;
  onChange: (v: number) => void;
  min?: number;
  max?: number;
  suffix?: string;
  hint?: string;
}) {
  return (
    <div>
      <label className="block text-xs text-gray-400 mb-1">{label}</label>
      <div className="flex items-center gap-1.5">
        <input
          type="number"
          min={min}
          max={max}
          value={value || ""}
          onChange={(e) => {
            let v = Number(e.target.value) || 0;
            if (max !== undefined) v = Math.min(v, max);
            v = Math.max(v, min);
            onChange(v);
          }}
          className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-3 py-2 text-white text-sm font-mono focus:border-[#FFD700] focus:outline-none transition-colors"
        />
        {suffix && <span className="text-xs text-gray-500 shrink-0">{suffix}</span>}
      </div>
      {hint && <p className="text-[10px] text-gray-600 mt-0.5">{hint}</p>}
    </div>
  );
}

function ResultCard({
  label,
  value,
  color,
  sub,
}: {
  label: string;
  value: string;
  color: string;
  sub?: string;
}) {
  return (
    <div className="bg-[#0f0f1a] rounded-xl p-3 text-center">
      <p className="text-[10px] text-gray-500 font-medium">{label}</p>
      <p className={`text-lg font-bold mt-0.5 ${color}`}>{value}</p>
      {sub && <p className="text-[10px] text-gray-600">{sub}</p>}
    </div>
  );
}

function CompareBar({
  label,
  base,
  withDebuffs,
  maxVal,
}: {
  label: string;
  base: number;
  withDebuffs: number;
  maxVal: number;
}) {
  const basePct = maxVal > 0 ? (base / maxVal) * 100 : 0;
  const debuffPct = maxVal > 0 ? (withDebuffs / maxVal) * 100 : 0;
  const increase = base > 0 ? ((withDebuffs - base) / base) * 100 : 0;

  return (
    <div className="mb-3">
      <div className="flex items-center justify-between mb-1">
        <span className="text-xs text-gray-400">{label}</span>
        <div className="flex items-center gap-2">
          <span className="text-xs text-white font-mono">{withDebuffs.toLocaleString()}</span>
          {increase > 0 && (
            <span className="text-[10px] text-[#22C55E]">+{increase.toFixed(0)}%</span>
          )}
        </div>
      </div>
      <div className="h-2 bg-[#0f0f1a] rounded-full overflow-hidden relative">
        <div
          className="absolute h-full rounded-full bg-[#2a2a4a]"
          style={{ width: `${basePct}%` }}
        />
        <div
          className="absolute h-full rounded-full bg-gradient-to-r from-[#6366f1] to-[#c084fc] transition-all duration-300"
          style={{ width: `${debuffPct}%` }}
        />
      </div>
    </div>
  );
}

export default function DamageCalculator() {
  // Character & Skill
  const [charId, setCharId] = useState(CHARS_WITH_SKILLS[0]?.id ?? "");
  const [skillId, setSkillId] = useState("");

  // Stats
  const [attack, setAttack] = useState(2000);
  const [critRate, setCritRate] = useState(25);
  const [critDamage, setCritDamage] = useState(150);
  const [elementalBonus, setElementalBonus] = useState(10);

  // Enemy
  const [enemyDef, setEnemyDef] = useState(300);
  const [enemyLevel, setEnemyLevel] = useState(40);
  const [enemyEleRes, setEnemyEleRes] = useState(10);

  // Debuffs
  const [activeDebuffs, setActiveDebuffs] = useState<Set<string>>(new Set());

  // Load saved
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const p = JSON.parse(saved);
        if (p.charId) setCharId(p.charId);
        if (p.skillId) setSkillId(p.skillId);
        if (p.attack) setAttack(p.attack);
        if (p.critRate !== undefined) setCritRate(p.critRate);
        if (p.critDamage !== undefined) setCritDamage(p.critDamage);
        if (p.elementalBonus !== undefined) setElementalBonus(p.elementalBonus);
        if (p.enemyDef !== undefined) setEnemyDef(p.enemyDef);
        if (p.enemyLevel !== undefined) setEnemyLevel(p.enemyLevel);
        if (p.enemyEleRes !== undefined) setEnemyEleRes(p.enemyEleRes);
        if (Array.isArray(p.activeDebuffs)) setActiveDebuffs(new Set(p.activeDebuffs));
      }
    } catch { /* ignore */ }
  }, []);

  // Save
  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        charId, skillId, attack, critRate, critDamage, elementalBonus,
        enemyDef, enemyLevel, enemyEleRes, activeDebuffs: Array.from(activeDebuffs),
      }));
    } catch { /* ignore */ }
  }, [charId, skillId, attack, critRate, critDamage, elementalBonus, enemyDef, enemyLevel, enemyEleRes, activeDebuffs]);

  // Derived
  const skills = useMemo(() => getSkillsForCharacter(charId), [charId]);
  const selectedSkill = useMemo(() => skills.find((s) => s.id === skillId) ?? skills[0], [skills, skillId]);

  const applicableDebuffs = useMemo(
    () => (selectedSkill ? getApplicableDebuffs(selectedSkill.element) : DEBUFFS),
    [selectedSkill],
  );

  // Auto-select first skill when character changes
  useEffect(() => {
    if (skills.length > 0 && !skills.find((s) => s.id === skillId)) {
      setSkillId(skills[0].id);
    }
  }, [skills, skillId]);

  // Calculate
  const result: DamageResult | null = useMemo(() => {
    if (!selectedSkill || selectedSkill.multiplier === 0) return null;
    return calculateDamage({
      attack,
      skill: selectedSkill,
      critRate,
      critDamage,
      elementalBonus,
      enemyDef,
      enemyLevel,
      enemyEleRes,
      activeDebuffs: Array.from(activeDebuffs),
    });
  }, [attack, selectedSkill, critRate, critDamage, elementalBonus, enemyDef, enemyLevel, enemyEleRes, activeDebuffs]);

  // Comparison: no debuffs vs with debuffs
  const noDebuffResult: DamageResult | null = useMemo(() => {
    if (!selectedSkill || selectedSkill.multiplier === 0) return null;
    return calculateDamage({
      attack, skill: selectedSkill, critRate, critDamage, elementalBonus,
      enemyDef, enemyLevel, enemyEleRes, activeDebuffs: [],
    });
  }, [attack, selectedSkill, critRate, critDamage, elementalBonus, enemyDef, enemyLevel, enemyEleRes]);

  const charData = CHARACTERS.find((c) => c.id === charId);

  const toggleDebuff = (id: string) => {
    setActiveDebuffs((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const handleCharChange = (newCharId: string) => {
    setCharId(newCharId);
    setActiveDebuffs(new Set());
  };

  return (
    <div className="space-y-6">
      {/* Character & Skill Selection */}
      <section className="bg-[#1a1a2e] rounded-2xl p-5 sm:p-6 border border-[#2a2a4a]">
        <h2 className="text-xl font-bold text-[#FFD700] mb-4">Character & Skill</h2>

        {/* Character */}
        <div className="mb-4">
          <label className="block text-xs text-gray-400 mb-1.5">Character</label>
          <select
            value={charId}
            onChange={(e) => handleCharChange(e.target.value)}
            className="w-full bg-[#0f0f1a] border border-[#2a2a4a] rounded-lg px-4 py-2.5 text-white text-sm focus:border-[#FFD700] focus:outline-none appearance-none cursor-pointer"
          >
            {CHARS_WITH_SKILLS.map((c) => (
              <option key={c.id} value={c.id}>
                {c.name} ({c.tier} Tier) — {c.elements.join("/")}
              </option>
            ))}
          </select>
          {charData && (
            <div className="mt-2 flex items-center gap-2 flex-wrap">
              <span className={`text-sm font-bold ${TIER_COLORS[charData.tier].text}`}>
                {charData.tier} Tier
              </span>
              {charData.elements.map((el) => (
                <span key={el} className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${ELEMENT_COLORS[el] ?? ELEMENT_COLORS.TBD}`}>
                  {el}
                </span>
              ))}
            </div>
          )}
        </div>

        {/* Skill */}
        <div>
          <label className="block text-xs text-gray-400 mb-1.5">Skill</label>
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-2">
            {skills.map((skill) => (
              <button
                key={skill.id}
                onClick={() => setSkillId(skill.id)}
                className={`text-left rounded-xl p-3 border transition-all ${
                  skillId === skill.id || (!skillId && skill === skills[0])
                    ? "bg-[#6366f1]/15 border-[#6366f1]/50 ring-1 ring-[#6366f1]/30"
                    : "bg-[#0f0f1a] border-[#2a2a4a] hover:border-[#3a3a5a]"
                }`}
              >
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-semibold text-white">{skill.name}</span>
                  <span className={`text-[9px] px-1.5 py-0.5 rounded-md ${SKILL_TYPE_COLORS[skill.type]}`}>
                    {skill.type}
                  </span>
                </div>
                <div className="flex items-center gap-2 text-[10px] text-gray-500">
                  <span>{(skill.multiplier * 100).toFixed(0)}% ATK</span>
                  {skill.hits > 1 && <span>× {skill.hits} hits</span>}
                  {skill.cooldown > 0 && <span>{skill.cooldown}s CD</span>}
                </div>
                <p className="text-[10px] text-gray-600 mt-1 line-clamp-2">{skill.description}</p>
              </button>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Input */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Your Stats */}
        <section className="bg-[#1a1a2e] rounded-2xl p-5 sm:p-6 border border-[#2a2a4a]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Your Stats</h2>
            <Link
              href="/weapon-optimizer"
              className="text-[10px] text-[#a5b4fc] hover:text-white transition-colors"
            >
              Get from Weapons &rarr;
            </Link>
          </div>
          <div className="grid grid-cols-2 gap-3">
            <NumberInput
              label="ATK"
              value={attack}
              onChange={setAttack}
              hint="Total from weapon optimizer"
            />
            <NumberInput
              label="Crit Rate"
              value={critRate}
              onChange={setCritRate}
              max={100}
              suffix="%"
            />
            <NumberInput
              label="Crit Damage"
              value={critDamage}
              onChange={setCritDamage}
              suffix="%"
              hint="Base 150%, check weapon stats"
            />
            <NumberInput
              label="Elemental DMG Bonus"
              value={elementalBonus}
              onChange={setElementalBonus}
              suffix="%"
              hint="From weapons & passives"
            />
          </div>
        </section>

        {/* Enemy Stats */}
        <section className="bg-[#1a1a2e] rounded-2xl p-5 sm:p-6 border border-[#2a2a4a]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-white">Enemy</h2>
            <div className="flex gap-1.5">
              {[
                { label: "Weak", def: 200, level: 30, res: 0 },
                { label: "Normal", def: 300, level: 40, res: 10 },
                { label: "Boss", def: 500, level: 50, res: 20 },
              ].map((preset) => (
                <button
                  key={preset.label}
                  onClick={() => {
                    setEnemyDef(preset.def);
                    setEnemyLevel(preset.level);
                    setEnemyEleRes(preset.res);
                  }}
                  className="text-[10px] px-2 py-1 rounded-lg bg-[#0f0f1a] text-gray-400 hover:text-white hover:bg-[#2a2a4a] transition-colors border border-[#2a2a4a]/50"
                >
                  {preset.label}
                </button>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3">
            <NumberInput label="DEF" value={enemyDef} onChange={setEnemyDef} />
            <NumberInput label="Level" value={enemyLevel} onChange={setEnemyLevel} max={80} />
            <NumberInput label="Ele RES" value={enemyEleRes} onChange={setEnemyEleRes} max={100} suffix="%" />
          </div>
        </section>
      </div>

      {/* Active Debuffs */}
      <section className="bg-[#1a1a2e] rounded-2xl p-5 sm:p-6 border border-[#2a2a4a]">
        <h2 className="text-lg font-bold text-white mb-1">Active Debuffs on Enemy</h2>
        <p className="text-[10px] text-gray-500 mb-3">
          Only showing debuffs that affect {selectedSkill?.element ?? "this"} element damage.
          {activeDebuffs.size > 0 && (
            <button
              onClick={() => setActiveDebuffs(new Set())}
              className="ml-2 text-[#EF4444] hover:text-white transition-colors"
            >
              Clear all
            </button>
          )}
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {applicableDebuffs.map((debuff) => {
            const isActive = activeDebuffs.has(debuff.id);
            return (
              <button
                key={debuff.id}
                onClick={() => toggleDebuff(debuff.id)}
                className={`text-left rounded-xl p-3 border transition-all ${
                  isActive
                    ? "bg-[#EF4444]/10 border-[#EF4444]/40 ring-1 ring-[#EF4444]/20"
                    : "bg-[#0f0f1a] border-[#2a2a4a] hover:border-[#3a3a5a]"
                }`}
              >
                <div className="flex items-center justify-between mb-0.5">
                  <span className={`text-sm font-medium ${isActive ? "text-white" : "text-gray-300"}`}>
                    {debuff.name}
                  </span>
                  <span className={`text-xs font-mono ${isActive ? "text-[#EF4444]" : "text-gray-500"}`}>
                    {debuff.type === "dmg_taken_increase" ? "+" : "-"}
                    {(debuff.value * 100).toFixed(0)}%
                  </span>
                </div>
                <p className="text-[10px] text-gray-500">
                  {debuff.source} — {debuff.description}
                </p>
              </button>
            );
          })}
        </div>
      </section>

      {/* Results */}
      {result && selectedSkill && (
        <section className="bg-[#1a1a2e] rounded-2xl p-5 sm:p-6 border border-[#2a2a4a]">
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-xl font-bold text-[#FFD700]">Damage Results</h2>
            <span className="text-[10px] text-gray-500 bg-[#0f0f1a] px-2.5 py-1 rounded-lg">
              {selectedSkill.name} ({(selectedSkill.multiplier * 100).toFixed(0)}%)
            </span>
          </div>

          {/* Main Numbers */}
          <div className="grid grid-cols-3 gap-3 mb-4">
            <ResultCard
              label="Non-Crit"
              value={result.nonCritHit.toLocaleString()}
              color="text-gray-300"
              sub={selectedSkill.hits > 1 ? `× ${selectedSkill.hits} = ${result.totalNonCrit.toLocaleString()}` : "per hit"}
            />
            <ResultCard
              label="Crit"
              value={result.critHit.toLocaleString()}
              color="text-[#FFD700]"
              sub={selectedSkill.hits > 1 ? `× ${selectedSkill.hits} = ${result.totalCrit.toLocaleString()}` : "per hit"}
            />
            <ResultCard
              label="Expected"
              value={result.expectedHit.toLocaleString()}
              color="text-[#22C55E]"
              sub={selectedSkill.hits > 1 ? `× ${selectedSkill.hits} = ${result.totalExpected.toLocaleString()}` : `at ${critRate}% crit`}
            />
          </div>

          {/* DPS */}
          {selectedSkill.cooldown > 0 && (
            <div className="bg-[#0f0f1a] rounded-xl p-4 mb-4 text-center">
              <p className="text-[10px] text-gray-500">DPS (Expected / {selectedSkill.cooldown}s Cooldown)</p>
              <p className="text-2xl font-bold text-[#c084fc] mt-1">{result.dps.toLocaleString()}/s</p>
            </div>
          )}

          {/* Debuff Comparison */}
          {activeDebuffs.size > 0 && noDebuffResult && (
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-300 mb-2">Debuff Impact</p>
              <CompareBar
                label="Non-Crit"
                base={noDebuffResult.nonCritHit}
                withDebuffs={result.nonCritHit}
                maxVal={result.critHit}
              />
              <CompareBar
                label="Crit"
                base={noDebuffResult.critHit}
                withDebuffs={result.critHit}
                maxVal={result.critHit}
              />
              <CompareBar
                label="Expected"
                base={noDebuffResult.expectedHit}
                withDebuffs={result.expectedHit}
                maxVal={result.critHit}
              />
              <div className="flex items-center gap-3 mt-2">
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-2 rounded-sm bg-[#2a2a4a]" />
                  <span className="text-[10px] text-gray-500">Without debuffs</span>
                </div>
                <div className="flex items-center gap-1.5">
                  <div className="w-3 h-2 rounded-sm bg-gradient-to-r from-[#6366f1] to-[#c084fc]" />
                  <span className="text-[10px] text-gray-500">With debuffs</span>
                </div>
              </div>
            </div>
          )}

          {/* Damage Reduction Stats */}
          <div className="grid grid-cols-3 gap-2 mb-4">
            <div className="bg-[#0f0f1a] rounded-lg p-2.5 text-center">
              <p className="text-[10px] text-gray-500">DEF Reduction</p>
              <p className="text-sm font-mono text-white">{result.defReduction.toFixed(1)}%</p>
            </div>
            <div className="bg-[#0f0f1a] rounded-lg p-2.5 text-center">
              <p className="text-[10px] text-gray-500">Net Ele Bonus</p>
              <p className={`text-sm font-mono ${result.effectiveEleBonus >= 0 ? "text-[#22C55E]" : "text-[#EF4444]"}`}>
                {result.effectiveEleBonus >= 0 ? "+" : ""}{result.effectiveEleBonus.toFixed(1)}%
              </p>
            </div>
            <div className="bg-[#0f0f1a] rounded-lg p-2.5 text-center">
              <p className="text-[10px] text-gray-500">DMG Amp</p>
              <p className={`text-sm font-mono ${result.effectiveDmgAmp > 0 ? "text-[#c084fc]" : "text-gray-400"}`}>
                +{result.effectiveDmgAmp.toFixed(0)}%
              </p>
            </div>
          </div>

          {/* Breakdown */}
          <details className="group">
            <summary className="text-sm font-medium text-[#a5b4fc] cursor-pointer hover:text-white transition-colors flex items-center gap-1.5">
              <svg className="w-4 h-4 transition-transform group-open:rotate-90" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
              </svg>
              Calculation Breakdown
            </summary>
            <div className="mt-2 bg-[#0f0f1a] rounded-lg p-3 space-y-1">
              {result.breakdown.map((line, i) => (
                <p key={i} className="text-xs text-gray-400 font-mono">{line}</p>
              ))}
            </div>
          </details>
        </section>
      )}

      {/* No damage skill selected */}
      {selectedSkill && selectedSkill.multiplier === 0 && (
        <section className="bg-[#1a1a2e] rounded-2xl p-8 border border-[#2a2a4a] text-center">
          <p className="text-gray-400 text-sm">
            {selectedSkill.name} is a utility skill with no damage component.
          </p>
          <p className="text-gray-600 text-xs mt-1">
            Select a different skill to calculate damage.
          </p>
        </section>
      )}

      {/* Data Notice */}
      <section className="bg-[#FF8C00]/5 border border-[#FF8C00]/20 rounded-xl p-4">
        <p className="text-xs text-[#FF8C00]">
          <strong>Data Status: Community Estimated</strong> — Skill multipliers marked &quot;Confirmed&quot;
          are from in-game skill descriptions. Others are estimated from gameplay testing. The damage
          formula is community-derived and may not match exact in-game calculations. We&apos;ll refine
          as more data is datamined.
        </p>
      </section>

      {/* CTA */}
      <section className="bg-[#2a2a4a] rounded-2xl p-6 text-center">
        <p className="text-gray-300 text-sm mb-1">
          Want to improve your damage numbers?
        </p>
        <p className="text-gray-500 text-xs mb-3">
          Optimize your weapon loadout for maximum ATK and crit stats.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/weapon-optimizer"
            className="inline-block bg-[#FFD700] text-[#0a0a14] font-bold px-5 py-2 rounded-lg hover:bg-[#FFE44D] transition-colors text-sm"
          >
            Weapon Optimizer
          </Link>
          <Link
            href="/team-builder"
            className="inline-block bg-[#1a1a2e] text-gray-300 font-bold px-5 py-2 rounded-lg hover:bg-[#2a2a4a] transition-colors text-sm border border-[#2a2a4a]"
          >
            Team Builder
          </Link>
        </div>
      </section>
    </div>
  );
}
