import type { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description: "Privacy practices for the KIMIRoutes LB campus active transport research study.",
};

export default function PrivacyPage() {
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
          Privacy Policy
        </h1>
        <p className="text-sm text-[var(--text-muted)] mt-2">Last updated: July 4, 2026</p>
      </header>

      <article className="space-y-6 text-sm leading-relaxed text-[var(--text-muted)]">
        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Overview</h2>
          <p>
            This site supports the <strong>KIMIRoutes LB: Campus Active Transport Study</strong>,
            a human–computer interaction research project at the University of the
            Philippines Los Baños. It collects participant information for screening,
            informed consent, and study coordination. This policy explains what we
            collect, why, and how it is protected.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Information we collect</h2>

          <h3 className="font-medium mt-3 mb-1">Screening and registration</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>Full name and email address.</li>
            <li>Facebook or Messenger contact (optional, for study coordination).</li>
            <li>Whether you are an HCI student (eligibility screening).</li>
          </ul>

          <h3 className="font-medium mt-3 mb-1">Electronic informed consent</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              Your agreement to participate, recorded via checkbox with a timestamp
              (<code className="text-xs">consentTimestamp</code>).
            </li>
            <li>
              A copy of your consent record is emailed to you and the research team.
            </li>
          </ul>

          <h3 className="font-medium mt-3 mb-1">Technical data</h3>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>reCAPTCHA v3</strong> — Google processes interaction signals to
              produce a bot-risk score. See{" "}
              <a
                href="https://policies.google.com/privacy"
                target="_blank"
                rel="noopener noreferrer"
                className="underline"
              >
                Google&apos;s Privacy Policy
              </a>
              .
            </li>
            <li>
              <strong>IP address</strong> — used for rate limiting and abuse prevention
              via Upstash Redis (hashed or keyed per request window, not sold).
            </li>
            <li>Standard server logs from our hosting provider (Vercel).</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">How we use your information</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Determine eligibility for the study.</li>
            <li>Send study instructions and Maze evaluation links via email (Brevo).</li>
            <li>Maintain consent records required for research ethics.</li>
            <li>Prevent spam and automated abuse (Upstash rate limits, reCAPTCHA).</li>
            <li>Contact you about scheduling or follow-up related to the study.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Third-party services</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>
              <strong>Brevo</strong> — transactional email delivery (name, email, study
              content in message body).
            </li>
            <li>
              <strong>Google reCAPTCHA</strong> — bot detection on form submission.
            </li>
            <li>
              <strong>Upstash Redis</strong> — per-IP and per-email rate limiting counters.
            </li>
            <li>
              <strong>Vercel</strong> — hosts the website and may retain access logs.
            </li>
          </ul>
          <p className="mt-2">
            We do not sell participant data. Data is used for this research study
            only, subject to your consent.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Retention</h2>
          <p>
            Consent records and participant contact information are retained for the
            duration of the study and as required by UPLB research ethics guidelines,
            then deleted or anonymized when no longer needed.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Your rights</h2>
          <ul className="list-disc pl-5 space-y-1">
            <li>Participation is voluntary — you may withdraw at any time.</li>
            <li>Request access to or correction of your submitted information.</li>
            <li>Ask questions before consenting via the study contact email.</li>
          </ul>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Security</h2>
          <p>
            Form submissions are sent over HTTPS. API keys for Brevo, reCAPTCHA, and
            Upstash are stored as server-side environment variables, not exposed to
            browsers. Rate limiting reduces automated abuse.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Changes</h2>
          <p>
            This policy may be updated as the study progresses. The date above reflects
            the latest revision.
          </p>
        </section>

        <section>
          <h2 className="text-base font-semibold text-[var(--text-strong)] mb-2">Contact</h2>
          <p>
            Questions about privacy or your participation? Contact the KIMIRoutes LB
            research team through the email address provided in the informed consent
            form.
          </p>
        </section>
      </article>
    </main>
  );
}
