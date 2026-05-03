import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  try {
    const { name, email, studyOrder, signature } = await req.json();

    // Maze links (Placeholders - User should replace these)
    const mazeLinkA = "https://t.maze.co/530031921";
    const mazeLinkB = "https://t.maze.co/530030819";

    const emailContent = `
      <div style="font-family: sans-serif; color: #333; max-width: 600px; margin: 0 auto; padding: 20px; border: 1px solid #eee; border-radius: 10px;">
        <h2 style="color: #014421;">UPLB Active Transport Study</h2>
        <p>Hello <strong>${name}</strong>,</p>
        <p>Thank you for participating in our study! To ensure valid results for our within-cluster t-test, please follow the specific order below:</p>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 20px 0; border-left: 4px solid #014421;">
          <h3 style="margin-top: 0;">Your Assigned Study Order:</h3>
          <p style="font-size: 1.2rem; font-weight: bold; color: #014421;">${studyOrder}</p>
        </div>

        <h3>Step 1:</h3>
        <p>Click the link below to start your first task:</p>
        <a href="${studyOrder.includes('Study A first') ? mazeLinkA : mazeLinkB}" 
           style="display: inline-block; padding: 12px 24px; background: #014421; color: white; text-decoration: none; border-radius: 5px;">
           Start Task 1
        </a>

        <h3>Step 2:</h3>
        <p>After completing Task 1, please proceed to Task 2:</p>
        <a href="${studyOrder.includes('Study A first') ? mazeLinkB : mazeLinkA}" 
           style="display: inline-block; padding: 12px 24px; background: #eee; color: #333; text-decoration: none; border-radius: 5px;">
           Start Task 2
        </a>

        <hr style="margin: 30px 0; border: 0; border-top: 1px solid #eee;" />
        <p style="font-size: 0.8rem; color: #777;">
          This is an automated email. If you have questions, please reply to this email or contact us via Facebook.
          <br/>
          <em>Your digital signature has been recorded and attached to your consent record.</em>
        </p>
      </div>
    `;

    // Send email to participant
    const { data, error } = await resend.emails.send({
      from: 'Study Team <kimirouteslb@stimmie.dev>',
      to: [email],
      subject: 'Your Study Instructions: Campus Active Transport',
      html: emailContent,
    });

    if (error) {
      console.error('Resend Error:', error);
      return NextResponse.json({ error }, { status: 400 });
    }

    return NextResponse.json({ success: true, data });
  } catch (error) {
    return NextResponse.json({ error: (error as Error).message }, { status: 500 });
  }
}
