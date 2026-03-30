import type { Metadata } from "next";
import type { ReactNode } from "react";
import { Analytics } from "@vercel/analytics/react"
import StoreHydration from "@/components/StoreHydration";
import "./globals.css"


export const metadata: Metadata = {
  title: "UWGradGraph | Waterloo Degree Visualizer",
  description: "Map your University of Waterloo CS degree with an interactive prerequisite graph.",
  icons: {
    icon: "/favicon.ico",
  },
};


export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
      </head>
      <body>
        {/*
          Triggers useStore.persist.rehydrate() on the client after mount.
          Must render before any page component reads from the store.
          Placed here (layout) so it covers all routes automatically.
        */}
        <StoreHydration />
        {children}
        <Analytics />
      </body>
    </html>
  );
}
