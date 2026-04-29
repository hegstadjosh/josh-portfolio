"use client";
import Link from "next/link";

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
            Bankruptcy intelligence for distressed debt investors. Monitors PACER
            filings in real time, extracts structured data from legal documents,
            and maps affected public companies.
          </p>
        </div>
      </header>

      {/* The Story */}
      <section className="px-6 pb-12">
        <div className="max-w-3xl mx-auto space-y-6 text-gray-300 leading-relaxed">
          <p>
            Hedge fund investors in distressed debt were paying $30k-100k/year to
            incumbents like Octus and 9fin for bankruptcy filing alerts. We built a
            PACER scraper, a filing search dashboard, and email alerts — the same
            core product for $500-2k/month.
          </p>

          <p>
            Then we added an AI research agent. It could search filings, read docket
            entries, pull SEC data, and answer questions about specific bankruptcies
            with citations. Standard Partners was using it to do in minutes what used
            to take analysts hours.
          </p>

          <p className="text-gray-500">
            The simulation engine that grew out of this work — domain-agnostic
            multi-agent sandbox with persistent memory, reflection, and causality
            tracking — has been spun out as its own product:{" "}
            <a href="https://simetic.com" target="_blank" rel="noopener" className="text-[#6CACE4] hover:underline">simetic.com</a>.
          </p>
        </div>
      </section>

      {/* Stack (compact) */}
      <section className="px-6 pb-16">
        <div className="max-w-3xl mx-auto">
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js", "React", "Python", "FastAPI",
              "Supabase", "PACER", "CourtListener", "Docker",
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
