import "~/styles/globals.css";

import { type Metadata, type Viewport } from "next";
import { Geist } from "next/font/google";

import { TRPCReactProvider } from "~/trpc/react";
import {
  profilePage,
  SITE_DESCRIPTION,
  SITE_NAME,
  SITE_ORIGIN,
  SITE_TITLE,
} from "./site";

const FULL_TITLE = `${SITE_NAME} | ${SITE_TITLE}`;

export const metadata: Metadata = {
  metadataBase: new URL(SITE_ORIGIN),
  title: { default: FULL_TITLE, template: `%s | ${SITE_NAME}` },
  description: SITE_DESCRIPTION,
  keywords: [
    "Joshua Hegstad",
    "Josh Hegstad",
    "co-founder",
    "CTO",
    "AI history",
    "full stack AI engineer",
    "Columbia University",
    "New York",
  ],
  alternates: { canonical: "/" },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  openGraph: {
    type: "profile",
    url: SITE_ORIGIN,
    siteName: SITE_NAME,
    title: FULL_TITLE,
    description: SITE_DESCRIPTION,
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    title: FULL_TITLE,
    description: SITE_DESCRIPTION,
  },
  authors: [{ name: SITE_NAME, url: SITE_ORIGIN }],
  creator: SITE_NAME,
  verification: {
    google: "FLAclteTHensXJjilBwlDo8So-YrvRRnEphx1DnyQeQ",
  },
};

export const viewport: Viewport = { themeColor: "#000000" };

const geist = Geist({
  subsets: ["latin"],
  variable: "--font-geist-sans",
});

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable}`}>
      <body>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify(profilePage).replace(/</g, "\\u003c"),
          }}
        />
        <TRPCReactProvider>{children}</TRPCReactProvider>
      </body>
    </html>
  );
}
