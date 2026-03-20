"use client";

import { useState, useMemo, useEffect } from "react";
import Link from "next/link";
import { CHARACTERS, ELEMENT_COLORS, TIER_COLORS, type Character } from "@/lib/characters";
import {
  recommendTeams,
  getContentLabel,
  type ContentType,
  type TeamMatch,
} from "@/lib/teamData";

const STORAGE_KEY = "7ds-team-builder";

const CONTENT_OPTIONS: { value: ContentType | "all"; label: string; desc: string }[] = [
  { value: "all", label: "All Content", desc: "Show teams for everything" },
  { value: "pve", label: "PvE / Story", desc: "Story stages & farming" },
  { value: "boss", label: "Boss Fights", desc: "High single-target damage" },
  { value: "explore", label: "Exploration", desc: "Resource farming & map" },
];

const DIFFICULTY_COLORS: Record<string, string> = {
  Easy: "bg-[#22C55E]/15 text-[#22C55E]",
  Medium: "bg-[#FFD700]/15 text-[#FFD700]",
  Hard: "bg-[#EF4444]/15 text-[#EF4444]",
};

// Only show characters that are usable (have known skills)
const SELECTABLE_CHARACTERS = CHARACTERS.filter(
  (c) => c.tier !== "?" && !c.elements.includes("TBD"),
);

function ElementBadge({ element }: { element: string }) {
  const colorClass = ELEMENT_COLORS[element] || ELEMENT_COLORS.TBD;
  return (
    <span className={`text-[10px] px-1.5 py-0.5 rounded-md font-medium ${colorClass}`}>
      {element}
    </span>
  );
}

function CharacterCard({
  character,
  selected,
  onToggle,
}: {
  character: Character;
  selected: boolean;
  onToggle: () => void;
}) {
  const tierColor = TIER_COLORS[character.tier];

  return (
    <button
      onClick={onToggle}
      className={`relative text-left w-full rounded-xl p-3 border transition-all ${
        selected
          ? "bg-[#6366f1]/15 border-[#6366f1]/50 ring-1 ring-[#6366f1]/30"
          : "bg-[#0f0f1a]/60 border-[#2a2a4a]/50 hover:border-[#3a3a5a]"
      }`}
    >
      {/* Selection indicator */}
      <div
        className={`absolute top-2 right-2 w-5 h-5 rounded-md border-2 flex items-center justify-center transition-all ${
          selected
            ? "bg-[#6366f1] border-[#6366f1]"
            : "border-[#3a3a5a] bg-transparent"
        }`}
      >
        {selected && (
          <svg className="w-3 h-3 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={3}>
            <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
          </svg>
        )}
      </div>

      <div className="flex items-center gap-2 mb-1.5 pr-6">
        <span className="text-white font-semibold text-sm">{character.name}</span>
        <span className={`text-[10px] font-bold ${tierColor.text}`}>{character.tier}</span>
        {character.rarity === 6 && (
          <span className="text-[#FFD700] text-[10px]">★6</span>
        )}
      </div>
      <div className="flex items-center gap-1.5 flex-wrap">
        {character.elements.map((el) => (
          <ElementBadge key={el} element={el} />
        ))}
        <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#1a1a2e] text-gray-500">
          {character.role}
        </span>
        {character.free && (
          <span className="text-[10px] px-1.5 py-0.5 rounded-md bg-[#22C55E]/10 text-[#22C55E]">
            Free
          </span>
        )}
      </div>
    </button>
  );
}

function TeamCard({ match }: { match: TeamMatch }) {
  const { team, matchedCount, missingCharacters } = match;
  const isFullMatch = matchedCount === 4;

  return (
    <div
      className={`rounded-2xl border overflow-hidden ${
        isFullMatch
          ? "bg-[#22C55E]/5 border-[#22C55E]/25"
          : "bg-[#1a1a2e] border-[#2a2a4a]"
      }`}
    >
      {/* Header */}
      <div className="p-5">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-3">
            <h3 className="text-lg font-bold text-white">{team.name}</h3>
            <span className={`text-[10px] px-2 py-0.5 rounded-full font-medium ${DIFFICULTY_COLORS[team.difficulty]}`}>
              {team.difficulty}
            </span>
          </div>
          <div className="flex items-center gap-1.5">
            {isFullMatch ? (
              <span className="text-xs font-medium text-[#22C55E] bg-[#22C55E]/15 px-2.5 py-1 rounded-lg">
                Full Match
              </span>
            ) : (
              <span className="text-xs font-medium text-gray-400 bg-[#0f0f1a] px-2.5 py-1 rounded-lg">
                {matchedCount}/4 owned
              </span>
            )}
          </div>
        </div>

        {/* Content tags */}
        <div className="flex gap-1.5 mb-3">
          {team.content.map((c) => (
            <span
              key={c}
              className="text-[10px] px-2 py-0.5 rounded-md bg-[#6366f1]/10 text-[#a5b4fc] font-medium"
            >
              {getContentLabel(c)}
            </span>
          ))}
        </div>

        <p className="text-sm text-gray-400 leading-relaxed">{team.description}</p>
      </div>

      {/* Team Members */}
      <div className="px-5 pb-4">
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {team.members.map((member) => {
            const char = CHARACTERS.find((c) => c.id === member.characterId);
            if (!char) return null;
            const isMissing = missingCharacters.some((mc) => mc.id === char.id);
            const tierColor = TIER_COLORS[char.tier];

            return (
              <div
                key={member.characterId}
                className={`rounded-xl p-3 border text-center ${
                  isMissing
                    ? "bg-[#EF4444]/5 border-[#EF4444]/20 opacity-70"
                    : "bg-[#0f0f1a]/80 border-[#2a2a4a]/50"
                }`}
              >
                <div className="flex items-center justify-center gap-1 mb-1">
                  <p className="text-white font-semibold text-sm">{char.name}</p>
                  <span className={`text-[10px] font-bold ${tierColor.text}`}>{char.tier}</span>
                </div>
                <p className="text-[#FFD700] text-xs font-medium">{member.recommendedWeapon}</p>
                <p className="text-gray-500 text-[10px] mt-0.5">{member.roleInTeam}</p>
                {isMissing && (
                  <p className="text-[#EF4444] text-[10px] mt-1 font-medium">Not owned</p>
                )}
                {char.free && !isMissing && (
                  <p className="text-[#22C55E] text-[10px] mt-1">Free: {char.free}</p>
                )}
              </div>
            );
          })}
        </div>
      </div>

      {/* Synergies */}
      <div className="px-5 pb-4">
        <details className="group">
          <summary className="text-sm font-medium text-[#a5b4fc] cursor-pointer hover:text-white transition-colors flex items-center gap-1.5">
            <svg
              className="w-4 h-4 transition-transform group-open:rotate-90"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth={2}
            >
              <path strokeLinecap="round" strokeLinejoin="round" d="M9 5l7 7-7 7" />
            </svg>
            Team Synergies & Details
          </summary>
          <div className="mt-3 space-y-3">
            {/* Synergies */}
            <div>
              <p className="text-xs font-medium text-gray-400 mb-1.5">Synergies</p>
              <ul className="space-y-1">
                {team.synergies.map((syn, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-1.5">
                    <span className="text-[#6366f1] mt-0.5 shrink-0">&bull;</span>
                    {syn}
                  </li>
                ))}
              </ul>
            </div>
            {/* Strengths */}
            <div>
              <p className="text-xs font-medium text-[#22C55E] mb-1.5">Strengths</p>
              <ul className="space-y-1">
                {team.strengths.map((s, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-1.5">
                    <span className="text-[#22C55E] mt-0.5 shrink-0">+</span>
                    {s}
                  </li>
                ))}
              </ul>
            </div>
            {/* Weaknesses */}
            <div>
              <p className="text-xs font-medium text-[#EF4444] mb-1.5">Weaknesses</p>
              <ul className="space-y-1">
                {team.weaknesses.map((w, i) => (
                  <li key={i} className="text-xs text-gray-300 flex items-start gap-1.5">
                    <span className="text-[#EF4444] mt-0.5 shrink-0">&minus;</span>
                    {w}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </details>
      </div>

      {/* Missing characters CTA */}
      {missingCharacters.length > 0 && (
        <div className="px-5 pb-4">
          <div className="bg-[#0f0f1a] rounded-lg p-3 flex items-center justify-between">
            <p className="text-xs text-gray-400">
              Missing: {missingCharacters.map((c) => c.name).join(", ")}
            </p>
            <Link
              href="/"
              className="text-xs text-[#FFD700] hover:text-white transition-colors whitespace-nowrap ml-3"
            >
              Calculate pulls &rarr;
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}

export default function TeamBuilder() {
  const [selectedIds, setSelectedIds] = useState<Set<string>>(new Set());
  const [contentFilter, setContentFilter] = useState<ContentType | "all">("all");
  const [showAllTeams, setShowAllTeams] = useState(false);

  // Load saved selection
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed.selectedIds)) {
          setSelectedIds(new Set(parsed.selectedIds));
        }
        if (parsed.contentFilter) {
          setContentFilter(parsed.contentFilter);
        }
      }
    } catch {
      // ignore
    }
  }, []);

  // Save selection
  useEffect(() => {
    try {
      localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify({
          selectedIds: Array.from(selectedIds),
          contentFilter,
        }),
      );
    } catch {
      // ignore
    }
  }, [selectedIds, contentFilter]);

  const toggleCharacter = (id: string) => {
    setSelectedIds((prev) => {
      const next = new Set(prev);
      if (next.has(id)) {
        next.delete(id);
      } else {
        next.add(id);
      }
      return next;
    });
  };

  const selectAll = () => {
    setSelectedIds(new Set(SELECTABLE_CHARACTERS.map((c) => c.id)));
  };

  const clearAll = () => {
    setSelectedIds(new Set());
  };

  const selectFreeOnly = () => {
    setSelectedIds(new Set(SELECTABLE_CHARACTERS.filter((c) => c.free).map((c) => c.id)));
  };

  const matches = useMemo(
    () => recommendTeams(Array.from(selectedIds), contentFilter),
    [selectedIds, contentFilter],
  );

  const displayedMatches = showAllTeams ? matches : matches.slice(0, 4);
  const hasMore = matches.length > 4 && !showAllTeams;
  const fullMatches = matches.filter((m) => m.matchedCount === 4);
  const partialMatches = matches.filter((m) => m.matchedCount < 4 && m.matchedCount > 0);

  return (
    <div className="space-y-6">
      {/* Character Selection */}
      <section className="bg-[#1a1a2e] rounded-2xl p-5 sm:p-6 border border-[#2a2a4a]">
        <div className="flex items-center justify-between mb-4">
          <div>
            <h2 className="text-xl font-bold text-[#FFD700]">Select Your Characters</h2>
            <p className="text-gray-500 text-xs mt-1">
              {selectedIds.size} selected &mdash; check the characters you own
            </p>
          </div>
          <div className="flex gap-2">
            <button
              onClick={selectFreeOnly}
              className="text-[10px] px-2.5 py-1.5 rounded-lg bg-[#22C55E]/10 text-[#22C55E] hover:bg-[#22C55E]/20 transition-colors font-medium"
            >
              Free Only
            </button>
            <button
              onClick={selectAll}
              className="text-[10px] px-2.5 py-1.5 rounded-lg bg-[#6366f1]/10 text-[#a5b4fc] hover:bg-[#6366f1]/20 transition-colors font-medium"
            >
              All
            </button>
            <button
              onClick={clearAll}
              className="text-[10px] px-2.5 py-1.5 rounded-lg bg-[#0f0f1a] text-gray-500 hover:text-gray-300 transition-colors font-medium"
            >
              Clear
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2">
          {SELECTABLE_CHARACTERS.map((char) => (
            <CharacterCard
              key={char.id}
              character={char}
              selected={selectedIds.has(char.id)}
              onToggle={() => toggleCharacter(char.id)}
            />
          ))}
        </div>
      </section>

      {/* Content Filter */}
      <section className="bg-[#1a1a2e] rounded-2xl p-5 sm:p-6 border border-[#2a2a4a]">
        <h2 className="text-lg font-bold text-white mb-3">Content Type</h2>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-2">
          {CONTENT_OPTIONS.map((opt) => (
            <button
              key={opt.value}
              onClick={() => setContentFilter(opt.value)}
              className={`rounded-xl p-3 border text-left transition-all ${
                contentFilter === opt.value
                  ? "bg-[#6366f1]/15 border-[#6366f1]/50"
                  : "bg-[#0f0f1a] border-[#2a2a4a] hover:border-[#3a3a5a]"
              }`}
            >
              <p
                className={`text-sm font-medium ${
                  contentFilter === opt.value ? "text-white" : "text-gray-300"
                }`}
              >
                {opt.label}
              </p>
              <p className="text-[10px] text-gray-500 mt-0.5">{opt.desc}</p>
            </button>
          ))}
        </div>
      </section>

      {/* Results */}
      <section>
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold text-[#FFD700]">Recommended Teams</h2>
          <div className="flex items-center gap-3 text-xs text-gray-500">
            {fullMatches.length > 0 && (
              <span className="text-[#22C55E]">
                {fullMatches.length} full {fullMatches.length === 1 ? "match" : "matches"}
              </span>
            )}
            {partialMatches.length > 0 && (
              <span>{partialMatches.length} partial</span>
            )}
          </div>
        </div>

        {selectedIds.size === 0 ? (
          <div className="bg-[#1a1a2e] rounded-2xl p-8 border border-[#2a2a4a] text-center">
            <p className="text-gray-400 text-sm">
              Select the characters you own above to get team recommendations.
            </p>
            <p className="text-gray-600 text-xs mt-2">
              Tip: Click &quot;Free Only&quot; to start with characters everyone gets for free.
            </p>
          </div>
        ) : matches.length === 0 ? (
          <div className="bg-[#1a1a2e] rounded-2xl p-8 border border-[#2a2a4a] text-center">
            <p className="text-gray-400 text-sm">
              No teams found for this content type. Try selecting &quot;All Content&quot; or add more characters.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {displayedMatches.map((match) => (
              <TeamCard key={match.team.id} match={match} />
            ))}

            {hasMore && (
              <button
                onClick={() => setShowAllTeams(true)}
                className="w-full py-3 rounded-xl border border-[#2a2a4a] text-gray-400 text-sm hover:text-white hover:border-[#3a3a5a] transition-colors"
              >
                Show {matches.length - 4} more {matches.length - 4 === 1 ? "team" : "teams"}
              </button>
            )}
          </div>
        )}
      </section>

      {/* CTA */}
      <section className="bg-[#2a2a4a] rounded-2xl p-6 text-center">
        <p className="text-gray-300 text-sm mb-1">
          Need a specific character for your team?
        </p>
        <p className="text-gray-500 text-xs mb-3">
          Use the pity calculator to plan your pulls, or check the tier list for detailed character analysis.
        </p>
        <div className="flex justify-center gap-3">
          <Link
            href="/"
            className="inline-block bg-[#FFD700] text-[#0a0a14] font-bold px-5 py-2 rounded-lg hover:bg-[#FFE44D] transition-colors text-sm"
          >
            Pity Calculator
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
