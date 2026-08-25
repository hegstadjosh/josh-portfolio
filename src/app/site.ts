export const SITE_ORIGIN = "https://www.joshhegstad.org";
export const SITE_NAME = "Joshua Hegstad";
export const SITE_TITLE = "Co-Founder & CTO";
export const SITE_DESCRIPTION =
  "Joshua Hegstad is a co-founder and CTO building an AI history company. Full stack AI engineer. Computer Science at Columbia University.";
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/joshua-hegstad-976ba2242/";

export const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateCreated: "2025-09-04",
  dateModified: "2026-08-24",
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_ORIGIN}/#person`,
    name: SITE_NAME,
    alternateName: "Josh Hegstad",
    givenName: "Joshua",
    familyName: "Hegstad",
    url: SITE_ORIGIN,
    jobTitle: SITE_TITLE,
    description:
      "Co-founder and CTO building an AI history company. Full stack AI engineer. Computer Science at Columbia University.",
    disambiguatingDescription:
      "American software engineer and startup co-founder, Columbia University",
    worksFor: {
      "@type": "Organization",
      description: "An AI history company (stealth until launch)",
    },
    alumniOf: {
      "@type": "CollegeOrUniversity",
      name: "Columbia University",
      sameAs: "https://www.wikidata.org/wiki/Q49088",
    },
    knowsAbout: [
      "artificial intelligence",
      "retrieval-augmented generation",
      "voice AI",
      "full stack web development",
      "augmented reality",
      "Next.js",
      "TypeScript",
      "Python",
    ],
    sameAs: ["https://github.com/hegstadjosh", LINKEDIN_URL],
  },
};
