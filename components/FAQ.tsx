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
      "How many pulls for a guaranteed SSR in 7DS Origin?",
    answer: `You are guaranteed an SSR character within ${GAME_CONFIG.hardPity} pulls on any banner. This is the hard pity. Most players will get their SSR earlier thanks to soft pity, which starts increasing your odds around pull ${GAME_CONFIG.softPityStart}.`,
  },
  {
    question: "How many pulls for the featured (rate-up) character?",
    answer: `There are two safety nets for the featured character: (1) The 50/50 system — if you lose it, your next SSR is guaranteed to be the rate-up character (worst case: 80+80 = 160 pulls). (2) The 120-pull one-time guarantee — within 120 pulls, you will get the featured character regardless. So the absolute worst case for a specific rate-up character is ${GAME_CONFIG.guaranteedRateUp} pulls (or ${GAME_CONFIG.absoluteWorstCase} via the 50/50 path).`,
  },
  {
    question: "What is the 50/50 system in 7DS Origin?",
    answer:
      'When you pull an SSR, there\'s a 50% chance it\'s the featured (rate-up) character and a 50% chance it\'s a standard SSR. If you "lose" the 50/50, your next SSR is 100% guaranteed to be the featured character. This resets after you get the featured character.',
  },
  {
    question: "What is soft pity in Seven Deadly Sins Origin?",
    answer: `Soft pity is when the game silently increases your pull rates. In 7DS Origin, this is estimated to start around pull ${GAME_CONFIG.softPityStart}. The exact numbers haven't been officially disclosed yet, but community data suggests rates ramp up significantly in this zone. Most players get their SSR between pull ${GAME_CONFIG.softPityStart} and ${GAME_CONFIG.hardPity}.`,
  },
  {
    question: "Does pity carry over between banners?",
    answer:
      "This is still being confirmed by the community. Based on similar Netmarble games and early player reports, pity is expected to carry over between banners of the same type. We will update this once officially confirmed.",
  },
  {
    question: `How much ${GAME_CONFIG.currencyName} do I need per pull?`,
    answer: `Each single pull costs ${GAME_CONFIG.currencyPerPull} ${GAME_CONFIG.currencyName}. A 10-pull costs ${(GAME_CONFIG.currencyPerPull * GAME_CONFIG.multiPullCount).toLocaleString()} ${GAME_CONFIG.currencyName} (no discount). To reach hard pity (${GAME_CONFIG.hardPity} pulls) you need ${(GAME_CONFIG.hardPity * GAME_CONFIG.currencyPerPull).toLocaleString()} ${GAME_CONFIG.currencyName}. For the 120-pull guarantee: ${(GAME_CONFIG.guaranteedRateUp * GAME_CONFIG.currencyPerPull).toLocaleString()} ${GAME_CONFIG.currencyName}.`,
  },
  {
    question: "How many free pulls do you get at launch?",
    answer: `The game gives approximately ${GAME_CONFIG.launchFreePulls} free pulls through launch events, login rewards, story progression, and missions. That's enough to hit the 120-pull rate-up guarantee at least twice! Make sure to complete all launch missions to maximize your free resources.`,
  },
  {
    question: "Is there a weapon banner in 7DS Origin?",
    answer:
      "No. Seven Deadly Sins: Origin does not have a weapon banner. All summons are character-focused. This is confirmed from the launch livestream.",
  },
  {
    question: "Who is the first rate-up character?",
    answer:
      "The launch banner features Meliodas as the rate-up character. This is a special Pick Up Draw banner available for 3 weeks after your first login. The standard pity system (80 SSR / 120 rate-up guarantee) applies.",
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
