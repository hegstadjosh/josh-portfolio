"use client";
import Link from "next/link";

const screenshots = [
  {
    src: "/debt-vulture/sim-lab.png",
    alt: "Simulation Lab — multi-panel IDE with live agent activity, event log, and pacing metrics",
    caption: "The Simulation Lab: a 7-panel IDE for running and observing multi-agent simulations",
  },
  {
    src: "/debt-vulture/sim-setup.png",
    alt: "Simulation setup page with scenario presets",
    caption: "Scenario selection: 5 historical case studies or custom scenarios",
  },
  {
    src: "/debt-vulture/sim-graph.png",
    alt: "Causality graph showing provenance DAG of agent actions and consequences",
    caption: "Causality graph: typed DAG tracking how agent actions lead to consequences",
  },
  {
    src: "/debt-vulture/agent-inspector.png",
    alt: "Agent inspector showing memory stream, reflections, and reasoning",
    caption: "Agent inspector: memory stream with importance scoring, reflections, and strategic reasoning",
  },
];

const techStack = [
  { label: "Frontend", items: "Next.js 16, React 19, Tailwind, shadcn/ui, Dockview, @xyflow/react" },
  { label: "Sim Engine", items: "Python, FastAPI, LangGraph, generative agents memory" },
  { label: "LLMs", items: "Gemini 2.5 Pro, Claude Sonnet, routed via Vercel AI Gateway" },
  { label: "Data", items: "Supabase (Postgres + pgvector), PACER, CourtListener, SEC" },
  { label: "Infra", items: "Vercel, Railway, Docker, Caddy, MCP server (27 tools)" },
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
      <header className="pt-32 pb-12 px-6">
        <div className="max-w-4xl mx-auto">
          <Link href="/" className="text-gray-500 text-sm hover:text-[#6CACE4] transition-colors mb-4 inline-block">
            &larr; Back to Portfolio
          </Link>
          <div className="flex items-center gap-4 mb-6">
            <img src="/debt-vulture-logo.png" alt="Debt Vulture" className="w-12 h-12 object-contain" />
            <div>
              <h1 className="text-4xl sm:text-5xl font-bold text-white">Debt Vulture</h1>
              <p className="text-gray-400 text-sm mt-1">Built with Standard Partners Fund LP</p>
            </div>
          </div>
          <p className="text-lg text-gray-300 max-w-3xl leading-relaxed">
            Bankruptcy intelligence platform for distressed debt investors. Monitors federal filings
            in real time, extracts structured data from legal documents, and maps affected public
            companies — competitors, REITs, suppliers. Priced at $500-2k/month, undercutting
            incumbents like Octus and 9fin ($30k-100k/year).
          </p>
        </div>
      </header>

      {/* Screenshots Gallery */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="space-y-8">
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
                        '<div class="text-gray-600 text-sm p-8 text-center">Screenshot placeholder — drop image at<br/><code class="text-gray-500">public' + shot.src + '</code></div>';
                    }}
                  />
                </div>
                <div className="p-4">
                  <p className="text-gray-400 text-sm">{shot.caption}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Simulation Engine */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">The Simulation Engine</h2>
          <p className="text-gray-300 leading-relaxed mb-6">
            The most technically novel part of the platform. A domain-agnostic, multi-agent sandbox
            where AI agents represent competing stakeholders — creditors, debtors, sponsors, judges,
            committees — and negotiate bankruptcy proceedings over multiple rounds. The engine
            doesn&apos;t know anything about bankruptcy. All domain knowledge lives in the scenario
            definition. The engine provides cognition, memory, event routing, and an omniscient
            &quot;God agent&quot; that determines consequences.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
            <div className="bg-gray-900/50 border border-gray-800 p-5">
              <h3 className="text-white font-semibold mb-2">Continuous-Time Events</h3>
              <p className="text-gray-400 text-sm">
                Time doesn&apos;t tick at fixed intervals. The God agent determines action durations,
                and the engine jumps to the next interesting moment — agent finishing, calendar event
                firing, delayed event delivering.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 p-5">
              <h3 className="text-white font-semibold mb-2">Generative Agents Memory</h3>
              <p className="text-gray-400 text-sm">
                Adapted from Park et al. 2023. Each agent maintains a memory stream with importance
                scoring, recency/relevance/importance-weighted retrieval, and reflections that
                generate higher-order insights. Dormancy kicks in after 150 memories.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 p-5">
              <h3 className="text-white font-semibold mb-2">God Agent</h3>
              <p className="text-gray-400 text-sm">
                An omniscient LLM referee that sees everything. Evaluates agent actions for
                feasibility, determines consequences and duration, advances the narrative through
                &quot;beats,&quot; and decides when the simulation should end.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 p-5">
              <h3 className="text-white font-semibold mb-2">Causality Graphs</h3>
              <p className="text-gray-400 text-sm">
                Every action, consequence, and response is tracked in a typed DAG. Visualized as an
                interactive graph showing exactly how one agent&apos;s move caused another&apos;s
                response — full provenance for every outcome.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 p-5">
              <h3 className="text-white font-semibold mb-2">Branching / Counterfactuals</h3>
              <p className="text-gray-400 text-sm">
                Fork a simulation at any point to explore alternate timelines. &quot;What if the
                judge ruled differently?&quot; &quot;What if this creditor accepted the deal?&quot;
                Each branch runs independently with its own state.
              </p>
            </div>
            <div className="bg-gray-900/50 border border-gray-800 p-5">
              <h3 className="text-white font-semibold mb-2">MCP Server (27 Tools)</h3>
              <p className="text-gray-400 text-sm">
                Full agent-accessible API via Model Context Protocol. Any AI agent can create,
                run, query, inspect, inject events into, and branch simulations
                programmatically.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* No Competitors */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <div className="bg-[#012169]/20 border border-[#6CACE4]/20 p-6">
            <h3 className="text-white font-semibold text-lg mb-3">No direct competitor exists</h3>
            <p className="text-gray-300 text-sm leading-relaxed mb-4">
              We surveyed the landscape in March 2026. The closest things are academic: Google
              Research&apos;s LegalSim (adversarial procedure simulation, not productized), Stanford
              CodeX&apos;s M&A negotiation prototype (educational), and Harvard PON&apos;s manual
              classroom exercise. In finance, FCLAgent and ASFM simulate stock markets, not
              bankruptcy proceedings. EmoDebt studies emotional intelligence in debt recovery but
              isn&apos;t a product.
            </p>
            <p className="text-gray-400 text-sm">
              Nobody has built a productized multi-agent simulation for distressed debt with real
              capital structure data and game-theoretic reasoning.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Tech Stack</h2>
          <div className="bg-gray-900/50 border border-gray-800 overflow-hidden">
            {techStack.map((row, i) => (
              <div
                key={row.label}
                className={`flex px-5 py-3 ${i !== techStack.length - 1 ? "border-b border-gray-800" : ""}`}
              >
                <span className="text-[#6CACE4] font-medium text-sm w-28 flex-shrink-0">
                  {row.label}
                </span>
                <span className="text-gray-300 text-sm">{row.items}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      <section className="px-6 pb-16">
        <div className="max-w-4xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-4">Preset Scenarios</h2>
          <p className="text-gray-400 mb-6">
            Five historical case studies ship as presets. Users can also define fully custom scenarios.
          </p>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {[
              { name: "Serta Simmons", desc: "Uptier exchange dispute. Majority lenders restructure over minority objections." },
              { name: "J.Crew", desc: "IP trap door maneuver. Brand assets moved beyond creditor reach." },
              { name: "Hertz", desc: "Surprise equity recovery. Stock retains value through Chapter 11." },
              { name: "Toys R Us", desc: "Full liquidation. Multiple competing creditor groups." },
              { name: "Quick Demo", desc: "Generic retailer scenario for fast demonstrations." },
            ].map((s) => (
              <div key={s.name} className="bg-gray-900/50 border border-gray-800 p-4">
                <h4 className="text-white font-medium text-sm mb-1">{s.name}</h4>
                <p className="text-gray-500 text-xs">{s.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <footer className="py-12 px-6 border-t border-gray-800">
        <div className="max-w-4xl mx-auto text-center">
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
