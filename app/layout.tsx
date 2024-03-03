import type { Metadata } from "next";
import { ThemeProvider } from "@/components/themeprovider";
import { SpeedInsights } from "@vercel/speed-insights/next";
import "./globals.css";
import localFont from "next/font/local";
import { Toaster } from "@/components/ui/toaster";
const Intro = localFont({
  src: "../assets/4488-font.otf",
});

export const metadata: Metadata = {
  title: "Monkey Garage",
  description: "Monkey Garage Shop",
  manifest: "/manifest.webmanifest",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      <html lang="en" suppressHydrationWarning>
        <head />
        <body className={Intro.className}>
          <SpeedInsights />
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            <main>{children}</main>
          </ThemeProvider>
          <Toaster />
        </body>
      </html>
    </>
  );
}
