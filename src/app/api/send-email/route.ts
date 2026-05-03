import { Resend } from 'resend';
import { NextResponse } from 'next/server';

const resend = new Resend(process.env.RESEND_API_KEY || 're_dummy_key');

export async function POST(req: Request) {
  try {
    const { name, email, fbContact, consentTimestamp, isHCIStudent } = await req.json();

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
        <p>Thank you for participating in our research on campus active transport! To ensure the validity of our study, please complete the tasks in the specific order listed below.</p>
        
        <div style="background: #eef2ff; padding: 15px; border-radius: 8px; border: 1px solid #c7d2fe; color: #3730a3; margin-bottom: 25px; font-size: 0.95rem;">
          <strong>CRITICAL:</strong> When asked for your name in the Maze tasks, please use the exact same name you used here: <span style="font-weight: bold; text-decoration: underline;">${name}</span>. This is vital for us to match your results correctly.
        </div>
        
        <div style="background: #f9f9f9; padding: 20px; border-radius: 8px; margin: 25px 0; border-left: 4px solid #014421;">
          <h3 style="margin-top: 0; font-size: 1rem; color: #014421; text-transform: uppercase; letter-spacing: 0.05em;">Your Assigned Study Order:</h3>
          <p style="font-size: 1.25rem; font-weight: bold; color: #333; margin-bottom: 0;">${studyOrder}</p>
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
    const { data, error } = await resend.emails.send({
      from: 'KIMIroutes LB <kimirouteslb@stimmie.dev>',
      to: [email],
      bcc: [
        'smmariquit@up.edu.ph',
        'hmbernados@up.edu.ph',
        'kbdoroja@up.edu.ph',
        'tmbanes@up.edu.ph'
      ],
      subject: 'Your Study Instructions: KIMIroutes LB',
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
