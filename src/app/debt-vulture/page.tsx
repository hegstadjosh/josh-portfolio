"use client";
import Link from "next/link";

const screenshots = [
  {
    src: "/debt-vulture/sim-lab.png",
    alt: "Simulation Lab — multi-panel IDE with live agent activity",
    caption: "The Simulation Lab",
  },
  {
    src: "/debt-vulture/sim-graph.png",
    alt: "Causality graph tracking how agent actions produce consequences",
    caption: "Causality graph",
  },
  {
    src: "/debt-vulture/agent-inspector.png",
    alt: "Agent inspector with memory stream and reflections",
    caption: "Agent inspector",
  },
];

export default function DebtVulturePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Nav */}
      <nav className="fixed top-0 left-0 right-0 z-50 bg-black/80 backdrop-blur-sm border-b border-gray-800">
        <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
          <Link href="/" className="text-white font-semibold hover:text-gray-300 transition-colors">
            JH
          </Link>
          <div className="flex gap-8 text-sm">
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">Home</Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="pt-32 pb-8 px-6">
        <div className="max-w-3xl mx-auto">
          <Link href="/" className="text-gray-500 text-sm hover:text-[#6CACE4] transition-colors mb-4 inline-block">
            &larr; Back
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <img src="/debt-vulture-logo.png" alt="Debt Vulture" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">Debt Vulture</h1>
              <p className="text-gray-500 text-sm mt-1">
                Ongoing &middot; Built with Standard Partners Fund LP
              </p>
            </div>
          </div>
          <p className="text-xl text-gray-300 leading-relaxed">
            Bankruptcy intelligence for distressed debt investors, built around a
            multi-agent simulation engine that has no direct competitor.
          </p>
        </div>
      </header>

      {/* The Story */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto space-y-6 text-gray-300 leading-relaxed">
          <p>
            It started as a simple monitoring tool. Hedge fund investors in distressed
            debt were paying $30k-100k/year to incumbents like Octus and 9fin for
            bankruptcy filing alerts. We built a PACER scraper, a filing search
            dashboard, and email alerts — the same core product for $500-2k/month.
          </p>

          <p>
            Then we added an AI research agent. It could search filings, read docket
            entries, pull SEC data, and answer questions about specific bankruptcies
            with citations. Standard Partners was using it to do in minutes what used
            to take analysts hours.
          </p>

          <p>
            But the real question investors kept asking was: <em>what happens next?</em>{" "}
            Not &quot;what has been filed&quot; but &quot;if I buy this tranche, what
            are the likely outcomes?&quot; That&apos;s a simulation problem. So we
            started building agents that could represent the competing parties in a
            bankruptcy — creditors, debtors, sponsors, committees — and negotiate
            against each other.
          </p>

          <p>
            The early version was bankruptcy-specific. But as we built the cognitive
            architecture — memory systems, an omniscient &quot;God agent&quot; referee,
            event-driven time, causality tracking — we realized the engine had nothing
            to do with bankruptcy. All the domain knowledge lived in the scenario
            description. The engine just provided cognition, memory, and consequences.
            Swap the scenario from a bankruptcy to a geopolitical crisis or a boardroom
            negotiation, and it works the same way.
          </p>

          <p>
            So we made it domain-agnostic. The simulation engine is now a general-purpose
            multi-agent sandbox. Agents have{" "}
            <span className="text-white">generative-agents-style memory</span> (adapted
            from Park et al. 2023) with importance scoring and reflections.
            Time is{" "}
            <span className="text-white">continuous, not tick-based</span> — the engine
            jumps to the next interesting moment. Every action and consequence is tracked
            in a{" "}
            <span className="text-white">typed causality graph</span>. You can{" "}
            <span className="text-white">branch simulations</span> to explore
            counterfactuals. And the whole thing is accessible via a{" "}
            <span className="text-white">27-tool MCP server</span> so any AI agent can
            run simulations programmatically.
          </p>

          <p>
            It ships with five historical bankruptcy presets — Serta Simmons, J.Crew,
            Hertz, Toys R Us — plus a quick demo scenario. But users can define
            anything. The frontend is a 7-panel lab IDE with live event streams,
            pacing metrics, agent inspection, and an interactive causality graph.
          </p>

          <p className="text-gray-500">
            We surveyed the landscape in March 2026. Nobody has built a productized
            multi-agent simulation for distressed debt — or any negotiation domain —
            with real capital structure data and game-theoretic reasoning. The closest
            things are academic prototypes.
          </p>
        </div>
      </section>

      {/* Screenshots */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="space-y-6">
            {screenshots.map((shot, i) => (
              <div key={i} className="bg-gray-900/50 border border-gray-800 overflow-hidden">
                <div className="aspect-video bg-gray-950 flex items-center justify-center">
                  <img
                    src={shot.src}
                    alt={shot.alt}
                    className="w-full h-full object-contain"
                    onError={(e) => {
                      const target = e.target as HTMLImageElement;
                      target.style.display = "none";
                      target.parentElement!.innerHTML =
                        '<div class="text-gray-600 text-sm p-8 text-center">Screenshot placeholder<br/><code class="text-gray-500">public' + shot.src + '</code></div>';
                    }}
                  />
                </div>
                <div className="px-4 py-3">
                  <p className="text-gray-500 text-sm">{shot.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stack (compact) */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js", "React", "Python", "FastAPI", "LangGraph",
              "Supabase", "PACER", "Vercel AI Gateway", "Docker",
              "MCP", "SSE", "Dockview", "@xyflow/react",
            ].map((t) => (
              <span key={t} className="px-3 py-1 bg-gray-800 text-gray-400 text-sm">
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-3xl mx-auto text-center">
          <p className="text-gray-600 text-sm">
            Built by{" "}
            <Link href="/" className="text-gray-400 hover:text-white transition-colors">
              Joshua Hegstad
            </Link>
            {" "}in partnership with Standard Partners Fund LP
          </p>
        </div>
      </footer>
    </main>
  );
}
