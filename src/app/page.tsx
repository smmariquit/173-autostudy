"use client";

import { useState } from "react";
import styles from "./page.module.css";
import LegalMicroLink from "@/components/LegalMicroLink";

const screens = [
  { title: "Welcome", src: "/screens/screen-01.png" },
  { title: "Pick a route mode", src: "/screens/screen-02.png" },
  { title: "Route preview", src: "/screens/screen-03.png" },
  { title: "Location details", src: "/screens/screen-04.png" },
  { title: "Start navigation", src: "/screens/screen-05.png" },
];

export default function Home() {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((current + 1) % screens.length);
  const prev = () => setCurrent((current - 1 + screens.length) % screens.length);

  return (
    <main className={styles.page}>
      <div className={styles.pageGlow} />
      <div className={styles.slideshow}>
        <a
          href="https://www.figma.com/proto/BGuwOb8UdNHyzabtkpszxR/KIMIRoutes.lb?node-id=831-6216"
          target="_blank"
          rel="noreferrer"
          className={styles.figmaLink}
        >
          → View on Figma
        </a>

        <div className={styles.slideshowContainer}>
          <button onClick={prev} className={styles.navBtn} aria-label="Previous screen">
            ←
          </button>

          <figure className={styles.slide}>
            <div className={styles.phoneFrame}>
              <div className={styles.phoneScreen}>
                <img src={screens[current].src} alt={screens[current].title} />
              </div>
            </div>
            <figcaption>
              <p>{screens[current].title}</p>
              <span className={styles.counter}>
                {current + 1} / {screens.length}
              </span>
            </figcaption>
          </figure>

          <button onClick={next} className={styles.navBtn} aria-label="Next screen">
            →
          </button>
        </div>
      </div>

      <footer className={styles.legalFooter}>
        <LegalMicroLink href="/privacy">Privacy</LegalMicroLink>
        <span aria-hidden="true">·</span>
        <LegalMicroLink href="/terms">Terms</LegalMicroLink>
      </footer>
    </main>
  );
}
