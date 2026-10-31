import type { IncomingMessage, ServerResponse } from 'http';
import nodemailer from 'nodemailer';

export interface ApplicationPayload {
  track: string;
  roleTitle: string;
  fullName: string;
  email: string;
  phone: string;
  education: string;
  gradYear: string;
  locationPref: string;
  githubUrl?: string;
  portfolioUrl?: string;
  projectHighlights: string;
  resume?: {
    filename: string;
    contentType: string;
    base64Content: string;
    size?: number;
  };
}

async function getRequestBody(req: any): Promise<ApplicationPayload> {
  if (req.body) {
    return typeof req.body === 'string' ? JSON.parse(req.body) : req.body;
  }
  return new Promise((resolve, reject) => {
    let body = '';
    req.on('data', (chunk: any) => {
      body += chunk;
    });
    req.on('end', () => {
      try {
        resolve(body ? JSON.parse(body) : {});
      } catch (err) {
        reject(err);
      }
    });
    req.on('error', reject);
  });
}

export default async function handler(req: any, res: any) {
  // CORS headers
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');

  if (req.method === 'OPTIONS') {
    res.statusCode = 200;
    res.end();
    return;
  }

  if (req.method !== 'POST') {
    res.statusCode = 405;
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ error: 'Method not allowed. Use POST.' }));
    return;
  }

  try {
    const data: ApplicationPayload = await getRequestBody(req);

    if (!data.fullName || !data.email || !data.phone || !data.roleTitle) {
      res.statusCode = 400;
      res.setHeader('Content-Type', 'application/json');
      res.end(JSON.stringify({ error: 'Missing required candidate information.' }));
      return;
    }

    const recipient = process.env.RECIPIENT_EMAIL || 'contactalsinfonet@gmail.com';
    const smtpUser = process.env.SMTP_USER || process.env.EMAIL_USER;
    const smtpPass = process.env.SMTP_PASS || process.env.EMAIL_PASS;
    const smtpHost = process.env.SMTP_HOST || 'smtp.gmail.com';
    const smtpPort = parseInt(process.env.SMTP_PORT || '465', 10);
    const smtpSecure = process.env.SMTP_SECURE !== 'false';

    let transporter: any;
    let isTestAccount = false;

    if (smtpUser && smtpPass) {
      transporter = nodemailer.createTransport({
        host: smtpHost,
        port: smtpPort,
        secure: smtpSecure,
        auth: {
          user: smtpUser,
          pass: smtpPass,
        },
      });
    } else {
      isTestAccount = true;
      const testAccount = await nodemailer.createTestAccount();
      transporter = nodemailer.createTransport({
        host: 'smtp.ethereal.email',
        port: 587,
        secure: false,
        auth: {
          user: testAccount.user,
          pass: testAccount.pass,
        },
      });
    }

    // Attachments
    const attachments: any[] = [];
    if (data.resume && data.resume.base64Content) {
      attachments.push({
        filename: data.resume.filename || `${data.fullName.replace(/\s+/g, '_')}_Resume.pdf`,
        content: Buffer.from(data.resume.base64Content, 'base64'),
        contentType: data.resume.contentType || 'application/pdf',
      });
    }

    // Email Body Formatting
    const htmlContent = `
      <div style="font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif; max-width: 650px; margin: 0 auto; padding: 30px; background-color: #FAFAFA; border: 1px solid #EAEAEA;">
        <div style="border-bottom: 2px solid #000000; padding-bottom: 16px; margin-bottom: 24px;">
          <span style="font-size: 11px; text-transform: uppercase; letter-spacing: 0.2em; color: #666666; font-weight: 600;">ALS Infonet &middot; Careers Portal</span>
          <h2 style="font-size: 24px; color: #000000; margin: 6px 0 0 0; font-weight: 600;">New Internship Application</h2>
        </div>

        <table style="width: 100%; border-collapse: collapse; margin-bottom: 24px; background: #FFFFFF; border: 1px solid #EAEAEA;">
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 12px; font-weight: 600; color: #666666; width: 35%;">Internship Track:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 14px; font-weight: bold; color: #000000;">${data.roleTitle}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 12px; font-weight: 600; color: #666666;">Candidate Name:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 14px; color: #000000; font-weight: 500;">${data.fullName}</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 12px; font-weight: 600; color: #666666;">Email:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 13px; color: #000000;"><a href="mailto:${data.email}" style="color: #000000; font-weight: 500;">${data.email}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 12px; font-weight: 600; color: #666666;">Phone / WhatsApp:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 13px; color: #000000;"><a href="tel:${data.phone}" style="color: #000000; font-weight: 500;">${data.phone}</a></td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 12px; font-weight: 600; color: #666666;">College / Degree:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 13px; color: #000000;">${data.education} (${data.gradYear})</td>
          </tr>
          <tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 12px; font-weight: 600; color: #666666;">Location Preference:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 13px; color: #000000;">${data.locationPref}</td>
          </tr>
          ${
            data.githubUrl
              ? `<tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 12px; font-weight: 600; color: #666666;">GitHub Profile:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 13px;"><a href="${data.githubUrl}" style="color: #0066CC;">${data.githubUrl}</a></td>
          </tr>`
              : ''
          }
          ${
            data.portfolioUrl
              ? `<tr>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 12px; font-weight: 600; color: #666666;">Portfolio / LinkedIn:</td>
            <td style="padding: 12px 16px; border-bottom: 1px solid #EAEAEA; font-size: 13px;"><a href="${data.portfolioUrl}" style="color: #0066CC;">${data.portfolioUrl}</a></td>
          </tr>`
              : ''
          }
          <tr>
            <td style="padding: 12px 16px; font-size: 12px; font-weight: 600; color: #666666;">Attached Resume:</td>
            <td style="padding: 12px 16px; font-size: 13px; color: #000000;">
              ${data.resume ? `&#128206; <strong>${data.resume.filename}</strong> (${Math.round((data.resume.size || 0) / 1024)} KB)` : '<em>No file attached (check URLs above)</em>'}
            </td>
          </tr>
        </table>

        <div style="background: #FFFFFF; border: 1px solid #EAEAEA; padding: 20px; margin-bottom: 24px;">
          <h4 style="font-size: 12px; text-transform: uppercase; letter-spacing: 0.15em; color: #666666; margin: 0 0 10px 0;">Technical Background &amp; Projects</h4>
          <p style="font-size: 13px; color: #333333; line-height: 1.6; margin: 0; white-space: pre-wrap;">${data.projectHighlights}</p>
        </div>

        <div style="font-size: 11px; color: #888888; text-align: center; border-top: 1px solid #EAEAEA; padding-top: 16px;">
          This application was transmitted via ALS Infonet Careers Portal &middot; Chennai &amp; Bangalore
        </div>
      </div>
    `;

    const info = await transporter.sendMail({
      from: `"ALS Infonet Careers" <${smtpUser || 'careers@alsinfonet.com'}>`,
      to: recipient,
      replyTo: data.email,
      subject: `[Internship Application] ${data.roleTitle} - ${data.fullName}`,
      text: `New Internship Application
Track: ${data.roleTitle}
Candidate: ${data.fullName}
Email: ${data.email}
Phone: ${data.phone}
Education: ${data.education} (${data.gradYear})
Location: ${data.locationPref}
GitHub: ${data.githubUrl || 'N/A'}
Portfolio: ${data.portfolioUrl || 'N/A'}
Resume: ${data.resume ? data.resume.filename : 'Not attached'}

Project Notes:
${data.projectHighlights}
`,
      html: htmlContent,
      attachments,
    });

    let previewUrl: string | false = false;
    if (isTestAccount) {
      previewUrl = nodemailer.getTestMessageUrl(info);
      console.log('[Nodemailer Ethereal Preview URL]:', previewUrl);
    }

    res.statusCode = 200;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        success: true,
        message: 'Application delivered successfully to ' + recipient,
        isTestAccount,
        previewUrl,
      })
    );
  } catch (error: any) {
    console.error('[Nodemailer Error]:', error);
    res.statusCode = 500;
    res.setHeader('Content-Type', 'application/json');
    res.end(
      JSON.stringify({
        error: 'Failed to dispatch email application.',
        details: error?.message || 'Internal server error',
      })
    );
  }
}
