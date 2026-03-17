import Link from "next/link";
import { GAME_CONFIG } from "@/lib/gameConfig";

export default function SiteFooter() {
  return (
    <footer className="text-center py-8 space-y-4 border-t border-[#2a2a4a] mt-8">
      <div className="flex flex-wrap justify-center gap-4 text-sm">
        <Link href="/" className="text-gray-400 hover:text-[#FFD700] transition-colors">
          Pity Calculator
        </Link>
        <Link href="/tier-list" className="text-gray-400 hover:text-[#FFD700] transition-colors">
          Tier List
        </Link>
        <Link href="/reroll-guide" className="text-gray-400 hover:text-[#FFD700] transition-colors">
          Reroll Guide
        </Link>
        <Link href="/banners" className="text-gray-400 hover:text-[#FFD700] transition-colors">
          Banners
        </Link>
      </div>
      <p className="text-gray-600 text-xs">
        7DS Calc is a fan-made tool and is not affiliated with Netmarble or
        the Seven Deadly Sins franchise.
      </p>
      <p className="text-gray-700 text-xs">
        Last updated: {GAME_CONFIG.lastUpdated} | Data source: in-game rate
        disclosures &amp; community research
      </p>
      <p className="text-gray-700 text-xs">
        &copy; {new Date().getFullYear()} 7dscalc.com
      </p>
    </footer>
  );
}
