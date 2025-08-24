
import "./globals.css";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Match Times in Your Timezone | SportsTime",
  description: "See EPL, NBA, UFC, and F1 match times in your local timezone. Never miss a game again.",
  manifest: "/site.webmanifest",
  icons: [{ rel: "icon", url: "/favicon.ico" }]
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <div className="container py-6">
          <header className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-xl bg-neutral-800 border border-neutral-700" />
              <span className="font-semibold">SportsTime</span>
            </div>
            <a href="https://github.com/" className="btn subtle">GitHub</a>
          </header>
          {children}
          <footer className="mt-10 subtle">Built for fans. Times shown in your local timezone.</footer>
        </div>
      </body>
    </html>
  );
}
