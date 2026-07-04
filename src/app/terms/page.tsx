import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Terms of Service",
  description: "Terms for using the KIMIRoutes LB research study website.",
};

export default function TermsPage() {
  return (
    <main className="max-w-2xl mx-auto px-6 py-10 pb-16">
      <Link
        href="/"
        className="text-sm text-[var(--text-faint)] hover:text-[var(--text-muted)] hover:underline mb-8 inline-block"
      >
        ← Back to KIMIRoutes LB
      </Link>

      <header className="mb-8">
        <p className="text-xs uppercase tracking-widest text-[var(--text-faint)]">Legal</p>
        <h1 className="text-3xl font-bold mt-1 font-[family-name:var(--font-display)]">
          Terms of Service
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-2">Last updated: July 4, 2026</p>
      </header>

      <article className="space-y-6 text-sm leading-relaxed text-[var(--text-muted)]">
        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Agreement</h2>
          <p>
            By using this website or submitting the study registration form, you agree
            to these Terms. Research participation itself requires separate informed
            consent — agreeing to these Terms does not obligate you to join the study.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Purpose</h2>
          <p>
            This site showcases the KIMIRoutes LB prototype and supports recruitment
            for an HCI research study on campus active transport navigation. It is an
            academic project, not a commercial navigation product.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Acceptable use</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Provide accurate information on registration forms.</li>
            <li>Do not submit false consent or impersonate another person.</li>
            <li>Do not abuse forms, APIs, or rate limits (automated spam, flooding).</li>
            <li>Do not scrape or redistribute study materials without permission.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Prototype disclaimer</h2>
          <p>
            Route previews and UI screenshots are design prototypes. Do not rely on
            them for real-world navigation or safety decisions. The study evaluates
            concepts — not production routing data.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Intellectual property</h2>
          <p>
            KIMIRoutes LB designs, copy, and research materials belong to the project
            team unless otherwise credited. Figma prototypes linked from this site
            remain subject to their own terms.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Limitation of liability</h2>
          <p>
            The site and study materials are provided &quot;as is.&quot; The research
            team is not liable for damages arising from use of this website or
            participation in the study beyond what is required by applicable law and
            research ethics policies.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Changes</h2>
          <p>
            These Terms may be updated during the study period. Continued use after
            changes constitutes acceptance.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Contact</h2>
          <p>
            Questions? Contact the KIMIRoutes LB research team via the email in the
            informed consent materials.
          </p>
        </section>
      </article>
    </main>
  );
}
