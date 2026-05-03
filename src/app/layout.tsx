import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "KIMIroutes LB | UPLB Active Transport Study",
  description: "A research study on campus mobility and active transportation.",
  icons: {
    icon: "/emailicon.jpg",
  },
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
