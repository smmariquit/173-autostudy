# UPLB Active Transport Study Website

A premium, research-focused landing page for conducting a within-cluster t-test study on campus active transportation.

## Features

- **Screening**: Automated eligibility check for UPLB affiliation and active transport usage.
- **smooth Consent**: Integrated digital signature pad (no PDF download required).
- **Randomization**: Logic to assign participants to different study orders (Study 1 first vs Study 2 first) to ensure experimental balance.
- **Automated Emails**: Uses [Brevo](https://www.brevo.com) to deliver custom Maze links and instructions.
- **Rate Limiting**: Per-IP and per-email throttling via Upstash Redis.
- **Premium Design**: Dark-mode aesthetic with UPLB-inspired colors, glassmorphism, and smooth transitions.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Vanilla CSS with Google Fonts (Outfit & Inter)
- **Email**: Brevo API
- **Rate Limiting**: Upstash Redis
- **Icons**: Lucide React
- **Signature**: React Signature Canvas

## Getting Started

1. **Clone the repo**
2. **Install dependencies**:
 ```bash
 npm install
 ```
3. **Configure Environment Variables**:
 Create a `.env.local` file and add your Brevo API key and sender:
 ```
 BREVO_API_KEY=your_brevo_api_key
 BREVO_SENDER_EMAIL=verified_sender@up.edu.ph
 BREVO_SENDER_NAME=KIMIroutes LB
 # Optional:
 # BREVO_REPLY_TO=your_reply_to@up.edu.ph
 ```
 Add your reCAPTCHA v3 keys:
 ```
 NEXT_PUBLIC_RECAPTCHA_SITE_KEY=your_site_key
 RECAPTCHA_SECRET_KEY=your_secret_key
 ```
 Add Upstash Redis credentials for rate limiting:
 ```
 UPSTASH_REDIS_REST_URL=your_upstash_redis_rest_url
 UPSTASH_REDIS_REST_TOKEN=your_upstash_redis_rest_token
 ```
4. **Customize Maze Links**:
 Update the links in `src/app/api/send-email/route.ts`:
 ```javascript
 const mazeLinkA = "YOUR_MAZE_LINK_A";
 const mazeLinkB = "YOUR_MAZE_LINK_B";
 ```
5. **Run Locally**:
 ```bash
 npm run dev
 ```

## Deployment on Vercel

1. Push this code to a GitHub repository.
2. Connect the repository to [Vercel](https://vercel.com).
3. Add `BREVO_API_KEY`, `BREVO_SENDER_EMAIL`, and `BREVO_SENDER_NAME` in Vercel project settings.
4. Add `NEXT_PUBLIC_RECAPTCHA_SITE_KEY` and `RECAPTCHA_SECRET_KEY` in Vercel project settings.
5. Add `UPSTASH_REDIS_REST_URL` and `UPSTASH_REDIS_REST_TOKEN` in Vercel project settings.
6. Deploy!

## License

Academic Use Only - UPLB
