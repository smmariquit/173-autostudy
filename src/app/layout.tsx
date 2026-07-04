import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KIMIRoutes LB | Prototype Showcase",
  description:
    "Showcase of the KIMIRoutes LB prototype for campus navigation and active transport.",
  icons: [
    { rel: "icon", url: "/favicon.ico" },
    { rel: "icon", type: "image/png", url: "/icon.png" },
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
