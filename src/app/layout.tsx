import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "UPLB Active Transport Study",
  description: "A research study on campus mobility and active transportation.",
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
