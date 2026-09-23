import type { Metadata } from "next";
import {
  Playfair_Display,
  Great_Vibes,
  Cormorant_Garamond,
  Noto_Sans_Devanagari,
  Noto_Serif_Devanagari,
} from "next/font/google";
import { LanguageProvider } from "@/context/LanguageContext";
import { AuthProvider } from "@/context/AuthContext";
import "./globals.css";

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"],
});

const greatVibes = Great_Vibes({
  variable: "--font-script",
  weight: "400",
  subsets: ["latin"],
});

const cormorant = Cormorant_Garamond({
  variable: "--font-body",
  weight: ["400", "500", "600"],
  subsets: ["latin"],
});

const notoDevanagari = Noto_Sans_Devanagari({
  variable: "--font-devanagari",
  weight: ["400", "500", "600", "700"],
  subsets: ["devanagari", "latin"],
});

const notoSerifDevanagari = Noto_Serif_Devanagari({
  variable: "--font-devanagari-serif",
  weight: ["500", "600", "700"],
  subsets: ["devanagari", "latin"],
});

export const metadata: Metadata = {
  title: "ShubhInvite \u2014 Your Special Moments, Beautifully Invited",
  description:
    "Create stunning digital invitations for weddings, birthdays, engagements, and every celebration \u2014 with a special focus on Maharashtrian Marathi weddings.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="mr"
      className={`${playfair.variable} ${greatVibes.variable} ${cormorant.variable} ${notoDevanagari.variable} ${notoSerifDevanagari.variable} h-full scroll-smooth antialiased`}
    >
      <body className="min-h-full flex flex-col">
        <LanguageProvider>
          <AuthProvider>{children}</AuthProvider>
        </LanguageProvider>
      </body>
    </html>
  );
}
