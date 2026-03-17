"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { GAME_CONFIG } from "@/lib/gameConfig";

const NAV_LINKS = [
  { href: "/", label: "Calculator" },
  { href: "/tier-list", label: "Tier List" },
  { href: "/reroll-guide", label: "Reroll Guide" },
  { href: "/banners", label: "Banners" },
];

export default function SiteHeader() {
  const pathname = usePathname();

  return (
    <header className="border-b border-[#2a2a4a] bg-[#0f0f1a]/80 backdrop-blur-sm sticky top-0 z-50">
      <div className="max-w-5xl mx-auto px-4 py-4 flex items-center justify-between">
        <div>
          <Link href="/" className="block">
            <h1 className="text-xl sm:text-2xl font-bold">
              <span className="text-[#FFD700]">7DS Origin</span>{" "}
              <span className="text-white">Pity Calculator</span>
            </h1>
          </Link>
          <p className="text-gray-500 text-xs sm:text-sm mt-0.5">
            Seven Deadly Sins: Origin — Summon Calculator & Resource Planner
          </p>
        </div>
        <div className="hidden sm:block bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-lg px-3 py-1.5">
          <p className="text-[#22C55E] text-xs font-medium">
            Updated {GAME_CONFIG.lastUpdated}
          </p>
        </div>
      </div>
      <nav className="max-w-5xl mx-auto px-4 pb-3 flex gap-1 overflow-x-auto">
        {NAV_LINKS.map((link) => {
          const isActive = pathname === link.href;
          return (
            <Link
              key={link.href}
              href={link.href}
              className={`px-3 py-1.5 rounded-lg text-sm font-medium whitespace-nowrap transition-colors ${
                isActive
                  ? "bg-[#FFD700]/15 text-[#FFD700]"
                  : "text-gray-400 hover:text-white hover:bg-[#1a1a2e]"
              }`}
            >
              {link.label}
            </Link>
          );
        })}
      </nav>
    </header>
  );
}
