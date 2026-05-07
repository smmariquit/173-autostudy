import { Redis } from '@upstash/redis';
import { NextResponse } from 'next/server';

const brevoApiKey = process.env.BREVO_API_KEY;
const brevoSenderEmail = process.env.BREVO_SENDER_EMAIL;
const brevoSenderName = process.env.BREVO_SENDER_NAME || 'KIMIroutes LB';
const brevoReplyTo = process.env.BREVO_REPLY_TO;
const recaptchaAction = 'study_form_submit';
const recaptchaMinScore = 0.1;
const ipRateLimit = { max: 5, windowSeconds: 600 };
const emailRateLimit = { max: 5, windowSeconds: 600 };
const redis = Redis.fromEnv();

type RecaptchaVerifyResponse = {
  success: boolean;
  score?: number;
  action?: string;
  challenge_ts?: string;
  hostname?: string;
  'error-codes'?: string[];
};

const isUpEmail = (email: string) => email.toLowerCase().endsWith('@up.edu.ph');

const getClientIp = (req: Request) => {
  const forwardedFor = req.headers.get('x-forwarded-for');
  if (forwardedFor) {
    return forwardedFor.split(',')[0]?.trim();
  }

  return (
    req.headers.get('x-real-ip') ||
    req.headers.get('cf-connecting-ip') ||
    null
  );
};

const incrementWithTtl = async (key: string, ttlSeconds: number) => {
  const count = await redis.incr(key);
  if (count === 1) {
    await redis.expire(key, ttlSeconds);
  }
  return count as number;
};

const verifyRecaptcha = async (token: string, remoteIp?: string | null) => {
  const secret = process.env.RECAPTCHA_SECRET_KEY;
  if (!secret) {
    throw new Error('Missing RECAPTCHA_SECRET_KEY');
  }

  const params = new URLSearchParams({
    secret,
    response: token,
  });

  if (remoteIp) {
    params.set('remoteip', remoteIp);
  }

  const response = await fetch('https://www.google.com/recaptcha/api/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: params.toString(),
    cache: 'no-store',
  });

  return (await response.json()) as RecaptchaVerifyResponse;
};

const sendBrevoEmail = async (payload: { to: string; bcc: string[]; subject: string; html: string }) => {
  if (!brevoApiKey || !brevoSenderEmail) {
    throw new Error('Missing Brevo configuration.');
  }

  const response = await fetch('https://api.brevo.com/v3/smtp/email', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      'api-key': brevoApiKey,
    },
    body: JSON.stringify({
      sender: { email: brevoSenderEmail, name: brevoSenderName },
      to: [{ email: payload.to }],
      bcc: payload.bcc.map((email) => ({ email })),
      subject: payload.subject,
      htmlContent: payload.html,
      replyTo: brevoReplyTo ? { email: brevoReplyTo } : undefined,
    }),
    cache: 'no-store',
  });

  if (!response.ok) {
    const errorBody = await response.text();
    throw new Error(`Brevo Error: ${response.status} ${errorBody}`);
  }
};

export async function POST(req: Request) {
  try {
    const { name, email, fbContact, consentTimestamp, isHCIStudent, recaptchaToken } = await req.json();

    if (!email || !isUpEmail(email)) {
      return NextResponse.json({ error: 'Only @up.edu.ph emails are allowed.' }, { status: 400 });
    }

    const clientIp = getClientIp(req) || 'unknown';

    try {
      const [ipCount, emailCount] = await Promise.all([
        incrementWithTtl(`rate:ip:${clientIp}`, ipRateLimit.windowSeconds),
        incrementWithTtl(`rate:email:${email.toLowerCase()}`, emailRateLimit.windowSeconds),
      ]);

      if (ipCount > ipRateLimit.max) {
        return NextResponse.json({ error: 'Too many requests. Please try again later.' }, { status: 429 });
      }

      if (emailCount > emailRateLimit.max) {
        return NextResponse.json({ error: 'Too many requests for this email. Please try again later.' }, { status: 429 });
      }
    } catch (error) {
      console.error('Rate limit error:', error);
      return NextResponse.json({ error: 'Rate limit unavailable. Please try again later.' }, { status: 503 });
    }

    if (!recaptchaToken) {
      return NextResponse.json({ error: 'Missing reCAPTCHA token.' }, { status: 400 });
    }

    const recaptcha = await verifyRecaptcha(recaptchaToken, clientIp);

    if (!recaptcha.success) {
      return NextResponse.json({ error: 'reCAPTCHA verification failed.' }, { status: 403 });
    }

    if (recaptcha.action !== recaptchaAction) {
      return NextResponse.json({ error: 'reCAPTCHA action mismatch.' }, { status: 403 });
    }

    if ((recaptcha.score ?? 0) < recaptchaMinScore) {
      return NextResponse.json({ error: 'reCAPTCHA score too low.' }, { status: 403 });
    }

    // Deterministic Assignment (Statistically Balanced 50/50 Split)
    // We sum the character codes of the email to decide the order without a database.
    const emailHash = email.toLowerCase().split('').reduce((acc: number, char: string) => acc + char.charCodeAt(0), 0);
    const isOrderA = emailHash % 2 === 0;
    const studyOrder = isOrderA ? 'Study A first, then Study B' : 'Study B first, then Study A';

    // Maze links (Placeholders - User should replace these)
    const mazeLinkA = "https://t.maze.co/530031921";
    const mazeLinkB = "https://t.maze.co/530030819";

    const emailContent = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 30px; border: 1px solid #eee; border-radius: 12px; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
        <div style="text-align: center; margin-bottom: 20px;">
          <img src="https://evals.kimirouteslb.stimmie.dev/emailicon.jpg" alt="KIMIroutes LB" style="width: 64px; height: 64px; border-radius: 50%; border: 2px solid #014421; padding: 2px;" />
        </div>
        <h2 style="color: #014421; margin-top: 0; text-align: center;">KIMIroutes LB: Study Instructions</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p style="margin-bottom: 1.2em;">
          Thank you for participating in our research on campus active transport! <b>KIMIroutes.lb</b> is a campus navigation app prototype designed to help UPLB students, faculty, and staff get around safely and efficiently. It features crowdsourced hazard reporting, class schedule syncing, weekly leaderboards, and a campus map of facilities and services. The app aims to compile this all in one place to make campus life easier and safer. <strong>This study involves testing a Figma prototype.</strong>
        </p>
        <div style="background: #fff3cd; color: #856404; padding: 12px 18px; border-radius: 8px; border: 1px solid #ffeeba; margin: 18px 0 24px 0; font-size: 0.98rem;">
          <strong>What does it mean to test a Figma prototype?</strong><br/>
          You will interact with a clickable mockup, not a real app.<br/>
          <ul style="margin: 8px 0 0 18px; padding: 0;">
            <li>You <b>cannot type</b> or enter text.</li>
            <li>Some buttons or fields may not be interactive.</li>
            <li>Only certain flows are clickable to simulate the experience.</li>
          </ul>
          Please focus on the navigation and overall experience, not on entering data.
        </div>
        <p>Please follow the instructions and study order assigned to you below:</p>
        
        <div style="background: #fdfdfd; padding: 25px; border-radius: 12px; border: 1px solid #e5e7eb; margin: 25px 0;">
          <div style="margin-bottom: 20px; padding-bottom: 15px; border-bottom: 1px solid #f3f4f6;">
            <p style="margin: 0 0 8px 0; font-size: 0.8rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Participant Name:</p>
            <p style="margin: 0; font-size: 1.1rem; color: #111827; font-weight: 700;">${name}</p>
            <p style="margin: 8px 0 0 0; font-size: 0.85rem; color: #3730a3;">
              <strong>Important:</strong> Use this exact name in all Maze tasks to match your results.
            </p>
          </div>
          
          <div>
            <p style="margin: 0 0 8px 0; font-size: 0.8rem; color: #6b7280; text-transform: uppercase; letter-spacing: 0.05em; font-weight: 600;">Your Assigned Study Order:</p>
            <p style="margin: 0; font-size: 1.25rem; color: #014421; font-weight: 800;">${studyOrder}</p>
          </div>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="font-size: 1.1rem; margin-bottom: 10px;">Step 1: First Task</h3>
          <p style="margin-bottom: 15px;">Please click the button below to begin your first task on the Maze platform:</p>
          <a href="${studyOrder.includes('Study A first') ? mazeLinkA : mazeLinkB}" 
             style="display: inline-block; padding: 14px 28px; background: #014421; color: white; text-decoration: none; border-radius: 6px; font-weight: 600;">
             Start Task 1
          </a>
        </div>

        <div style="margin-bottom: 30px;">
          <h3 style="font-size: 1.1rem; margin-bottom: 10px;">Step 2: Second Task</h3>
          <p style="margin-bottom: 15px;">After completing Task 1, proceed immediately to your second task:</p>
          <a href="${studyOrder.includes('Study A first') ? mazeLinkB : mazeLinkA}" 
             style="display: inline-block; padding: 14px 28px; background: #f3f4f6; color: #374151; text-decoration: none; border-radius: 6px; font-weight: 600; border: 1px solid #d1d5db;">
             Start Task 2
          </a>
        </div>

        <div style="background: #fff9f0; padding: 15px; border-radius: 8px; border: 1px solid #ffecb3; font-size: 0.85rem; color: #856404; margin-bottom: 30px;">
          <strong>Consent Record:</strong><br/>
          Name: ${name}<br/>
          Email: ${email}<br/>
          FB/Contact: ${fbContact}<br/>
          HCI Student (CMSC 173): ${isHCIStudent ? 'Yes' : 'No'}<br/>
          Timestamp: ${new Date(consentTimestamp).toLocaleString('en-PH', { timeZone: 'Asia/Manila' })} (PHT)<br/>
          Status: Electronically Consented via Checkbox
        </div>

        <hr style="margin: 40px 0; border: 0; border-top: 1px solid #eee;" />
        
        <div style="font-size: 0.9rem; color: #666;">
          <p style="margin-bottom: 15px;"><strong>Research Team Contact Details:</strong></p>
          <table width="100%" cellpadding="0" cellspacing="0" border="0">
            <tr>
              <td width="50%" style="padding-bottom: 15px;">
                <p style="margin: 0; font-weight: bold; color: #333;">Simonee Ezekiel M. Mariquit</p>
                <p style="margin: 0; font-size: 0.8rem;">smmariquit@up.edu.ph</p>
              </td>
              <td width="50%" style="padding-bottom: 15px;">
                <p style="margin: 0; font-weight: bold; color: #333;">Hugz Christian Bernados</p>
                <p style="margin: 0; font-size: 0.8rem;">hmbernados@up.edu.ph</p>
              </td>
            </tr>
            <tr>
              <td>
                <p style="margin: 0; font-weight: bold; color: #333;">Kristina Doroja</p>
                <p style="margin: 0; font-size: 0.8rem;">kbdoroja@up.edu.ph</p>
              </td>
              <td>
                <p style="margin: 0; font-weight: bold; color: #333;">Lane Bañes</p>
                <p style="margin: 0; font-size: 0.8rem;">tmbanes@up.edu.ph</p>
              </td>
            </tr>
          </table>
          <p style="font-size: 0.8rem; font-style: italic; margin-top: 25px;">
            This is an automated email. A copy of this consent record has been sent to the research team.
          </p>
        </div>
      </div>
    `;

    // Send email to participant
    try {
      await sendBrevoEmail({
        to: email,
        bcc: [
          'smmariquit@up.edu.ph',
          'hmbernados@up.edu.ph',
          'kbdoroja@up.edu.ph',
          'tmbanes@up.edu.ph',
        ],
        subject: 'Your Study Instructions: KIMIroutes LB',
        html: emailContent,
      });
    } catch (error) {
      console.error('Brevo Error:', error);
      return NextResponse.json({ error: 'Email delivery failed.' }, { status: 502 });
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
