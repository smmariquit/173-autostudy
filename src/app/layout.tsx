import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KIMIroutes LB | UPLB Active Transport Study",
  description: "A research study on campus mobility and active transportation.",
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
