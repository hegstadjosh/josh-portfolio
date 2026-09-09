export const SITE_ORIGIN = "https://www.joshhegstad.org";
export const SITE_NAME = "Joshua Hegstad";
export const SITE_TITLE = "Co-Founder & CTO";
export const SITE_DESCRIPTION =
  "Joshua Hegstad is Co-Founder & CTO of Voices of History and studies computer science at Columbia University.";
export const PROFILE_IMAGE = `${SITE_ORIGIN}/joshua-hegstad-headshot.jpg`;
export const LINKEDIN_URL =
  "https://www.linkedin.com/in/joshua-hegstad-976ba2242/";
export const VOICES_OF_HISTORY_URL = "https://voicesofhistory.co";
export const WIKIDATA_URL = "https://www.wikidata.org/wiki/Q141373073";

export const profilePage = {
  "@context": "https://schema.org",
  "@type": "ProfilePage",
  dateCreated: "2025-09-04",
  dateModified: "2026-09-09",
  mainEntity: {
    "@type": "Person",
    "@id": `${SITE_ORIGIN}/#person`,
    name: SITE_NAME,
    alternateName: "Josh Hegstad",
    givenName: "Joshua",
    familyName: "Hegstad",
    url: SITE_ORIGIN,
    image: PROFILE_IMAGE,
    jobTitle: SITE_TITLE,
    description: SITE_DESCRIPTION,
    disambiguatingDescription:
      "American software engineer and startup co-founder, Columbia University",
    worksFor: {
      "@type": "Organization",
      "@id": `${VOICES_OF_HISTORY_URL}/#organization`,
      name: "Voices of History",
      url: VOICES_OF_HISTORY_URL,
    },
    affiliation: {
      "@type": "CollegeOrUniversity",
      name: "Columbia University",
      sameAs: "https://www.wikidata.org/wiki/Q49088",
    },
    knowsAbout: [
      "artificial intelligence",
      "full stack web development",
      "augmented reality",
      "Next.js",
      "TypeScript",
      "Python",
    ],
    sameAs: ["https://github.com/hegstadjosh", LINKEDIN_URL, WIKIDATA_URL],
  },
};
