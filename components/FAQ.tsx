"use client";

import { useState } from "react";
import { GAME_CONFIG } from "@/lib/gameConfig";

interface FAQItem {
  question: string;
  answer: string;
}

const faqs: FAQItem[] = [
  {
    question:
      "How many pulls do I need for a guaranteed 5-star in 7DS Origin?",
    answer: `Based on current data, the hard pity in Seven Deadly Sins: Origin is ${GAME_CONFIG.hardPity} pulls. This means you are guaranteed to receive a 5-star character within ${GAME_CONFIG.hardPity} pulls on a banner. The base rate for a 5-star is ${(GAME_CONFIG.baseRate * 100).toFixed(0)}%, with increased rates starting at pull ${GAME_CONFIG.softPityStart} (soft pity).`,
  },
  {
    question: "What is soft pity in Seven Deadly Sins Origin?",
    answer: `Soft pity is when the game starts increasing your chances of pulling a 5-star character. In 7DS Origin, soft pity is estimated to begin at pull ${GAME_CONFIG.softPityStart}. After this point, each pull adds approximately ${(GAME_CONFIG.softPityIncrement * 100).toFixed(0)}% to your base rate, making it significantly more likely to pull a 5-star as you approach hard pity.`,
  },
  {
    question: "Does pity carry over between banners in 7DS Origin?",
    answer:
      "This is not yet confirmed for Seven Deadly Sins: Origin. In many gacha games (including the previous 7DS: Grand Cross), pity does carry over between banners of the same type. We will update this information once the game officially launches on March 16, 2026.",
  },
  {
    question: "What is the 50/50 system in 7DS Origin?",
    answer:
      'When you pull a 5-star character, there is a 50% chance it will be the featured (rate-up) character and a 50% chance it will be a standard 5-star character. If you "lose" the 50/50 (get a non-featured character), your next 5-star is guaranteed to be the featured character. This is the "guaranteed" status in our calculator.',
  },
  {
    question:
      "How many Diamonds do I need per pull in Seven Deadly Sins Origin?",
    answer: `Each single pull costs approximately ${GAME_CONFIG.currencyPerPull} ${GAME_CONFIG.currencyName}, and a 10-pull costs ${GAME_CONFIG.currencyPerPull * GAME_CONFIG.multiPullCount} ${GAME_CONFIG.currencyName}. Note: These numbers are estimated based on CBT data and will be updated after the game's official launch.`,
  },
  {
    question: "When does Seven Deadly Sins: Origin launch?",
    answer:
      "Seven Deadly Sins: Origin launches on March 16, 2026 for PC (Steam) and PS5, followed by a mobile (iOS/Android) release on March 23, 2026. The game is developed by Netmarble, the same studio behind 7DS: Grand Cross.",
  },
];

function FAQItemComponent({ item }: { item: FAQItem }) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="border-b border-[#2a2a4a] last:border-b-0">
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left py-4 flex items-center justify-between gap-4 hover:text-[#FFD700] transition-colors"
      >
        <h3 className="font-medium text-sm sm:text-base">{item.question}</h3>
        <span
          className={`text-[#FFD700] text-xl flex-shrink-0 transition-transform ${isOpen ? "rotate-45" : ""}`}
        >
          +
        </span>
      </button>
      {isOpen && (
        <p className="text-gray-400 text-sm leading-relaxed pb-4 pr-8">
          {item.answer}
        </p>
      )}
    </div>
  );
}

export default function FAQ() {
  return (
    <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
      <h2 className="text-xl font-bold text-[#FFD700] mb-4">
        Frequently Asked Questions
      </h2>
      <div>
        {faqs.map((faq, i) => (
          <FAQItemComponent key={i} item={faq} />
        ))}
      </div>
    </section>
  );
}
