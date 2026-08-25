import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Debt Vulture",
  description:
    "Bankruptcy intelligence for distressed debt investors, built by Joshua Hegstad.",
  alternates: { canonical: "/debt-vulture" },
};

export default function DebtVulturePage() {
  return (
    <main className="min-h-screen bg-black">
      {/* Nav */}
      <nav className="fixed top-0 right-0 left-0 z-50 border-b border-gray-800 bg-black/80 backdrop-blur-sm">
        <div className="mx-auto flex max-w-6xl items-center justify-between px-6 py-4">
          <Link
            href="/"
            className="font-semibold text-white transition-colors hover:text-gray-300"
          >
            JH
          </Link>
          <div className="flex gap-8 text-sm">
            <Link
              href="/"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Home
            </Link>
          </div>
        </div>
      </nav>

      {/* Hero */}
      <header className="px-6 pt-32 pb-8">
        <div className="mx-auto max-w-3xl">
          <Link
            href="/"
            className="mb-4 inline-block text-sm text-gray-500 transition-colors hover:text-[#6CACE4]"
          >
            &larr; Back
          </Link>
          <div className="mb-6 flex items-center gap-4">
            <Image
              src="/debt-vulture-logo.png"
              alt="Debt Vulture"
              width={48}
              height={48}
              className="h-12 w-12 object-contain"
            />
            <div>
              <h1 className="text-4xl font-bold text-white sm:text-5xl">
                Debt Vulture
              </h1>
              <p className="mt-1 text-sm text-gray-500">
                Ongoing &middot; Built with Standard Partners Fund LP
              </p>
            </div>
          </div>
          <p className="text-xl leading-relaxed text-gray-300">
            Bankruptcy intelligence for distressed debt investors. Monitors
            PACER filings in real time, extracts structured data from legal
            documents, and maps affected public companies.
          </p>
        </div>
      </header>

      {/* The Story */}
      <section className="px-6 pb-12">
        <div className="mx-auto max-w-3xl space-y-6 leading-relaxed text-gray-300">
          <p>
            Hedge fund investors in distressed debt were paying $30k-100k/year
            to incumbents like Octus and 9fin for bankruptcy filing alerts. We
            built a PACER scraper, a filing search dashboard, and email alerts —
            the same core product for $500-2k/month.
          </p>

          <p>
            Then we added an AI research agent. It could search filings, read
            docket entries, pull SEC data, and answer questions about specific
            bankruptcies with citations. Standard Partners was using it to do in
            minutes what used to take analysts hours.
          </p>

          <p className="text-gray-500">
            The simulation engine that grew out of this work — domain-agnostic
            multi-agent sandbox with persistent memory, reflection, and
            causality tracking — has been spun out as its own product:{" "}
            <a
              href="https://simetic.com"
              target="_blank"
              rel="noopener"
              className="text-[#6CACE4] hover:underline"
            >
              simetic.com
            </a>
            .
          </p>
        </div>
      </section>

      {/* Stack (compact) */}
      <section className="px-6 pb-16">
        <div className="mx-auto max-w-3xl">
          <div className="flex flex-wrap gap-2">
            {[
              "Next.js",
              "React",
              "Python",
              "FastAPI",
              "Supabase",
              "PACER",
              "CourtListener",
              "Docker",
            ].map((t) => (
              <span
                key={t}
                className="bg-gray-800 px-3 py-1 text-sm text-gray-400"
              >
                {t}
              </span>
            ))}
          </div>
        </div>
      </section>

      <footer className="border-t border-gray-800 px-6 py-12">
        <div className="mx-auto max-w-3xl text-center">
          <p className="text-sm text-gray-600">
            Built by{" "}
            <Link
              href="/"
              className="text-gray-400 transition-colors hover:text-white"
            >
              Joshua Hegstad
            </Link>{" "}
            in partnership with Standard Partners Fund LP
          </p>
        </div>
      </footer>
    </main>
  );
}
