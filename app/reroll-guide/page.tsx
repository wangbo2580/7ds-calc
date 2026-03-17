import type { Metadata } from "next";
import Link from "next/link";
import SiteHeader from "@/components/SiteHeader";
import SiteFooter from "@/components/SiteFooter";

export const metadata: Metadata = {
  title:
    "7DS Origin Reroll Guide — How to Reroll & Best Starting Characters | 7DS Calc",
  description:
    "Step-by-step reroll guide for Seven Deadly Sins: Origin. Learn the fastest reroll method, which characters to aim for, and how to avoid common mistakes.",
  keywords: [
    "7ds origin reroll guide",
    "seven deadly sins origin reroll",
    "7ds origin how to reroll",
    "seven deadly sins origin best starting characters",
    "7ds origin reroll tier list",
    "7ds origin beginner guide",
    "7ds origin starter guide",
    "7ds origin free characters",
  ],
  alternates: { canonical: "https://7dscalc.com/reroll-guide" },
  openGraph: {
    title: "7DS Origin Reroll Guide — Fastest Method & Best Characters",
    description:
      "Step-by-step reroll guide for Seven Deadly Sins: Origin. 15-20 minutes per attempt.",
    url: "https://7dscalc.com/reroll-guide",
  },
};

export default function RerollGuidePage() {
  return (
    <div className="min-h-screen bg-[#0a0a14]">
      <SiteHeader />

      <main className="max-w-5xl mx-auto px-4 py-6 sm:py-8">
        <article className="space-y-6">
          {/* Intro */}
          <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
            <h2 className="text-2xl font-bold text-[#FFD700] mb-3">
              How to Reroll in Seven Deadly Sins: Origin
            </h2>
            <p className="text-gray-400 text-sm leading-relaxed mb-3">
              Rerolling in 7DS Origin works a bit differently from most gacha
              games. You can&apos;t just delete your account and start over —
              there&apos;s a <strong className="text-white">30-day cooldown</strong> on
              account deletion. Instead, the fastest method is cycling through
              different platform accounts. Each reroll takes about 15-20 minutes
              once you get the hang of it.
            </p>
            <p className="text-gray-400 text-sm leading-relaxed">
              This guide covers the exact steps, which characters to target, what
              to avoid, and when to stop rerolling.
            </p>
          </section>

          {/* Warning */}
          <div className="bg-[#EF4444]/10 border border-[#EF4444]/30 rounded-xl p-4">
            <p className="text-[#fca5a5] text-sm">
              <strong>Do NOT delete your account to reroll.</strong> 7DS Origin
              has a 30-day account deletion cooldown. If you delete your account,
              you&apos;ll be locked out of that platform for an entire month. Use the
              multi-platform method described below instead.
            </p>
          </div>

          {/* Step by Step */}
          <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
            <h2 className="text-xl font-bold text-white mb-4">
              Reroll Steps (Multi-Platform Method)
            </h2>
            <div className="space-y-4">
              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFD700]/15 flex items-center justify-center">
                  <span className="text-[#FFD700] font-bold text-sm">1</span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">
                    Start a new account on one platform
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Use Steam, Google Play, Apple ID, or PlayStation. Each
                    platform counts as a separate account, so you get 4 attempts
                    before you need to do anything fancy. On PC, you can also use
                    BlueStacks Multi-Instance Manager to run multiple accounts in
                    parallel.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFD700]/15 flex items-center justify-center">
                  <span className="text-[#FFD700] font-bold text-sm">2</span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">
                    Skip all cutscenes and rush through the prologue
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    You&apos;ll play as Tristan &amp; Tioreh finding the Star
                    Book. Skip every cutscene — you can always watch them later.
                    This is the biggest time saver. Skipping vs. watching adds
                    15-20 minutes per run.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFD700]/15 flex items-center justify-center">
                  <span className="text-[#FFD700] font-bold text-sm">3</span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">
                    Complete the gacha tutorial
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    The tutorial walk-through gives you{" "}
                    <strong className="text-[#22C55E]">Slader for free</strong> as
                    your third character. He&apos;s a decent Fire/Physics DPS that
                    will carry you through early content.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFD700]/15 flex items-center justify-center">
                  <span className="text-[#FFD700] font-bold text-sm">4</span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">
                    Push to Liones City and unlock your mailbox
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Keep doing the main story until you reach Liones City. This
                    unlocks the mail system where all your pre-registration
                    rewards, launch event rewards, and free pulls are waiting.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFD700]/15 flex items-center justify-center">
                  <span className="text-[#FFD700] font-bold text-sm">5</span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">
                    Collect everything and pull
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Grab all mail rewards. You should have roughly 40-80 pulls
                    available between pre-registration rewards (10 tickets),
                    launch rewards, story progression gems, and the{" "}
                    <strong className="text-[#FFD700]">WELCOMEORIGIN</strong>{" "}
                    redeem code (5 tickets + materials). Pull on both the
                    Meliodas rate-up banner and the standard banner.
                  </p>
                </div>
              </div>

              <div className="flex gap-4">
                <div className="flex-shrink-0 w-8 h-8 rounded-full bg-[#FFD700]/15 flex items-center justify-center">
                  <span className="text-[#FFD700] font-bold text-sm">6</span>
                </div>
                <div>
                  <h3 className="text-white font-medium text-sm">
                    Evaluate your pulls
                  </h3>
                  <p className="text-gray-400 text-sm mt-1">
                    Got Meliodas? Keep the account. Got Jericho + King? Also
                    worth keeping. Only pulled off-banner SSRs or Guila? Switch
                    to the next platform and try again. See the target priority
                    list below.
                  </p>
                </div>
              </div>
            </div>
          </section>

          {/* Time per Reroll */}
          <div className="bg-[#6366f1]/10 border border-[#6366f1]/30 rounded-xl p-4">
            <p className="text-[#a5b4fc] text-sm">
              <strong>Time per reroll:</strong> ~15-20 minutes if you skip all
              cutscenes. You get 4 clean attempts (one per platform) before
              needing workarounds like BlueStacks instances. Most people land a
              good account within 2-4 tries.
            </p>
          </div>

          {/* Who to Aim For */}
          <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
            <h2 className="text-xl font-bold text-white mb-4">
              Reroll Targets — Who Should You Keep?
            </h2>

            <div className="space-y-4">
              {/* Dream */}
              <div className="bg-[#FF4444]/8 border border-[#FF4444]/25 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#FF4444] font-bold text-sm">
                    DREAM ROLL
                  </span>
                  <span className="text-gray-500 text-xs">— stop immediately</span>
                </div>
                <p className="text-gray-300 text-sm">
                  <strong>Meliodas</strong> + any of King / Jericho / Elaine.
                  This gives you the best DPS in the game plus either top-tier
                  healing (King), burst damage (Jericho), or crowd control
                  (Elaine). You won&apos;t find a better start.
                </p>
              </div>

              {/* Great */}
              <div className="bg-[#FF8C00]/8 border border-[#FF8C00]/25 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#FF8C00] font-bold text-sm">
                    GREAT ROLL
                  </span>
                  <span className="text-gray-500 text-xs">— worth keeping</span>
                </div>
                <p className="text-gray-300 text-sm">
                  <strong>Meliodas</strong> alone, or <strong>Jericho + King</strong>{" "}
                  without Meliodas. A solo Meliodas is still the strongest start
                  possible because you can grab the rate-up guarantee at 120
                  pulls later. Jericho + King without Meliodas gives you the
                  second-best DPS and the best healer — a very solid foundation.
                </p>
              </div>

              {/* OK */}
              <div className="bg-[#FFD700]/8 border border-[#FFD700]/25 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#FFD700] font-bold text-sm">
                    ACCEPTABLE
                  </span>
                  <span className="text-gray-500 text-xs">
                    — keep if you&apos;re tired of rerolling
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  Any 2 of: Jericho, King, Diane, Elaine, Drake, Manny. Two
                  S-tier characters will get you through the story comfortably.
                  You can always pull Meliodas later on the rate-up banner.
                </p>
              </div>

              {/* Don't keep */}
              <div className="bg-[#9E9E9E]/8 border border-[#9E9E9E]/25 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <span className="text-[#9E9E9E] font-bold text-sm">
                    REROLL AGAIN
                  </span>
                  <span className="text-gray-500 text-xs">
                    — not worth keeping
                  </span>
                </div>
                <p className="text-gray-300 text-sm">
                  Only pulled Guila (she&apos;s free from the launch event
                  anyway), only B-tier or lower characters, or zero SSRs. Try
                  the next platform.
                </p>
              </div>
            </div>
          </section>

          {/* Free Characters */}
          <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
            <h2 className="text-xl font-bold text-white mb-4">
              Free Characters You Get Without Pulling
            </h2>
            <p className="text-gray-400 text-sm mb-4">
              These characters are given to every player. Factor them into your
              reroll decisions — there&apos;s no reason to aim for a character
              you&apos;re getting for free.
            </p>
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
              <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
                <h3 className="text-white font-bold text-sm">Tioreh</h3>
                <p className="text-[#22C55E] text-xs font-medium mb-1">
                  Pre-registration reward
                </p>
                <p className="text-gray-400 text-xs">
                  Fire/Wind support with Combustion debuff. Decent early-game
                  character. You start with her.
                </p>
              </div>
              <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
                <h3 className="text-white font-bold text-sm">Slader</h3>
                <p className="text-[#22C55E] text-xs font-medium mb-1">
                  Gacha tutorial reward
                </p>
                <p className="text-gray-400 text-xs">
                  Fire/Physics DPS with a big ultimate. Your third character.
                  Solid enough for story progression.
                </p>
              </div>
              <div className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]">
                <h3 className="text-white font-bold text-sm">Guila</h3>
                <p className="text-[#22C55E] text-xs font-medium mb-1">
                  Launch celebration event
                </p>
                <p className="text-gray-400 text-xs">
                  Fire DPS with Demon Form transformation. Free from the launch
                  event.{" "}
                  <strong className="text-[#EF4444]">
                    Do NOT pull for her on the gacha.
                  </strong>
                </p>
              </div>
            </div>
          </section>

          {/* Redeem Code */}
          <section className="bg-[#22C55E]/10 border border-[#22C55E]/30 rounded-xl p-4">
            <h3 className="text-[#22C55E] font-bold text-sm mb-1">
              Active Redeem Code
            </h3>
            <p className="text-gray-300 text-sm">
              Enter{" "}
              <code className="bg-[#0f0f1a] px-2 py-0.5 rounded text-[#FFD700] font-mono text-sm">
                WELCOMEORIGIN
              </code>{" "}
              in the game&apos;s redeem code menu to get 5 Regular Hero Draw Tickets,
              10 Supreme Mastery EXP, 10 Supreme Enhancement Stones, 10 Supreme
              Refinement Stones, and 50,000 Gold. Don&apos;t forget this — it&apos;s
              free pulls you&apos;d otherwise miss.
            </p>
          </section>

          {/* Common Mistakes */}
          <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
            <h2 className="text-xl font-bold text-white mb-4">
              Common Mistakes to Avoid
            </h2>
            <div className="space-y-3">
              {[
                {
                  mistake: "Pulling for Guila on the gacha",
                  why: "She's given for free from the launch celebration event. Pulling her from the gacha wastes your SSR pity.",
                },
                {
                  mistake: "Deleting your account to reroll",
                  why: "There's a 30-day cooldown on account deletion. You'll be locked out of that platform for a month. Use the multi-platform method instead.",
                },
                {
                  mistake: "Ignoring Drake and Manny",
                  why: "They're not just combat characters — Drake reveals treasure chests and Manny reveals Star Dust Fragments on the map. Having one of them makes exploration and resource farming way faster.",
                },
                {
                  mistake: "Not redeeming WELCOMEORIGIN",
                  why: "Free pulls and upgrade materials. Takes 10 seconds. There's no reason to skip it.",
                },
                {
                  mistake: "Skipping the Path of the Hero missions",
                  why: "These missions give significant early gear and resources. They're easy to overlook in the quest log but they make a real difference in your early power level.",
                },
                {
                  mistake: "Rerolling for hours chasing a perfect start",
                  why: "The SSR rate is 0.8% (combined). With 40-80 pulls per reroll, getting 2+ SSRs is uncommon. Try 2-4 platforms, take the best result, and move on. Your time is better spent progressing.",
                },
              ].map((item) => (
                <div
                  key={item.mistake}
                  className="bg-[#0f0f1a] rounded-xl p-4 border border-[#2a2a4a]/50"
                >
                  <h3 className="text-[#EF4444] font-medium text-sm mb-1">
                    {item.mistake}
                  </h3>
                  <p className="text-gray-400 text-sm">{item.why}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Early Game Tips */}
          <section className="bg-[#1a1a2e] rounded-2xl p-6 border border-[#2a2a4a]">
            <h2 className="text-xl font-bold text-white mb-4">
              After Your Reroll — Early Game Priorities
            </h2>
            <div className="space-y-2 text-sm text-gray-400 leading-relaxed">
              <p>
                <strong className="text-gray-300">1. Push the main story.</strong>{" "}
                Story progression unlocks features, areas, and gives Star Memory
                (pull currency). This is your primary focus for the first several
                hours.
              </p>
              <p>
                <strong className="text-gray-300">
                  2. Complete Path of the Hero.
                </strong>{" "}
                These are essentially guided upgrade missions that give you
                specific gear and resources. They&apos;re designed to walk you
                through the upgrade systems.
              </p>
              <p>
                <strong className="text-gray-300">
                  3. Explore with Drake or Manny in your party.
                </strong>{" "}
                If you pulled either of them, always have them in your active
                party when exploring. Their map reveal passives are invaluable
                for collecting resources you&apos;d otherwise miss.
              </p>
              <p>
                <strong className="text-gray-300">
                  4. Don&apos;t spread your resources thin.
                </strong>{" "}
                Focus on upgrading 3-4 characters, not all of them. Your main
                DPS should always be your top priority for upgrades.
              </p>
              <p>
                <strong className="text-gray-300">
                  5. Save pulls for characters you actually want.
                </strong>{" "}
                The Meliodas banner lasts 21 days from your first login. If you
                already have him, start saving for the next banner. Use our{" "}
                <Link href="/" className="text-[#FFD700] underline">
                  pity calculator
                </Link>{" "}
                to plan how many pulls you&apos;ll need.
              </p>
            </div>
          </section>

          {/* CTA */}
          <section className="bg-[#2a2a4a] rounded-2xl p-6 text-center">
            <p className="text-gray-300 text-sm mb-3">
              Check how many pulls you need for the guaranteed rate-up character.
            </p>
            <div className="flex flex-wrap justify-center gap-3">
              <Link
                href="/"
                className="inline-block bg-[#FFD700] text-[#0a0a14] font-bold px-6 py-2.5 rounded-lg hover:bg-[#FFE44D] transition-colors text-sm"
              >
                Pity Calculator
              </Link>
              <Link
                href="/tier-list"
                className="inline-block bg-[#1a1a2e] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#2a2a4a] transition-colors text-sm border border-[#2a2a4a]"
              >
                View Tier List
              </Link>
              <Link
                href="/banners"
                className="inline-block bg-[#1a1a2e] text-white font-bold px-6 py-2.5 rounded-lg hover:bg-[#2a2a4a] transition-colors text-sm border border-[#2a2a4a]"
              >
                Current Banners
              </Link>
            </div>
          </section>

          <SiteFooter />
        </article>
      </main>

      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify({
            "@context": "https://schema.org",
            "@type": "HowTo",
            name: "How to Reroll in Seven Deadly Sins: Origin",
            description:
              "Step-by-step reroll guide for 7DS Origin using the multi-platform method. Takes 15-20 minutes per attempt.",
            step: [
              {
                "@type": "HowToStep",
                name: "Start a new account on one platform",
                text: "Use Steam, Google Play, Apple ID, or PlayStation.",
              },
              {
                "@type": "HowToStep",
                name: "Rush through the prologue",
                text: "Skip all cutscenes and complete the tutorial to get Slader.",
              },
              {
                "@type": "HowToStep",
                name: "Reach Liones City",
                text: "Push the main story to unlock the mailbox with free rewards.",
              },
              {
                "@type": "HowToStep",
                name: "Collect rewards and pull",
                text: "Grab all mail rewards and redeem code WELCOMEORIGIN. Pull on both banners.",
              },
              {
                "@type": "HowToStep",
                name: "Evaluate",
                text: "Keep the account if you pulled Meliodas or 2+ S-tier characters.",
              },
            ],
            totalTime: "PT20M",
          }),
        }}
      />
    </div>
  );
}
