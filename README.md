# UPLB Active Transport Study Website

A premium, research-focused landing page for conducting a within-cluster t-test study on campus active transportation.

## Features

- **Screening**: Automated eligibility check for UPLB affiliation and active transport usage.
- **Seamless Consent**: Integrated digital signature pad (no PDF download required).
- **Randomization**: Logic to assign participants to different study orders (Study 1 first vs Study 2 first) to ensure experimental balance.
- **Automated Emails**: Uses [Resend](https://resend.com) to deliver custom Maze links and instructions.
- **Premium Design**: Dark-mode aesthetic with UPLB-inspired colors, glassmorphism, and smooth transitions.

## Tech Stack

- **Framework**: Next.js 15+ (App Router)
- **Styling**: Vanilla CSS with Google Fonts (Outfit & Inter)
- **Email**: Resend API
- **Icons**: Lucide React
- **Signature**: React Signature Canvas

## Getting Started

1. **Clone the repo**
2. **Install dependencies**:
   ```bash
   npm install
   ```
3. **Configure Environment Variables**:
   Create a `.env.local` file and add your Resend API Key:
   ```
   RESEND_API_KEY=re_xxx
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
3. Add the `RESEND_API_KEY` to the **Environment Variables** section in Vercel project settings.
4. Deploy!

## License

Academic Use Only - UPLB
