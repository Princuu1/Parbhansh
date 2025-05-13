import nodemailer from 'nodemailer';
import dotenv from "dotenv";
dotenv.config();

if (!process.env.GMAIL_USER || !process.env.GMAIL_APP_PASSWORD) {
  throw new Error("Email credentials are required");
}

const transporter = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD
  }
});

interface EmailData {
  name: string;
  email: string;
  message: string;
}

export async function sendContactEmail(data: EmailData): Promise<void> {
  const adminMailOptions = {
    from: process.env.GMAIL_USER,
    to: process.env.GMAIL_USER,
    subject: `New Contact Form Message from ${data.name}`,
    html: `
      <html>
    <head>
      <style>
        /* Base Styles */
        body {
          margin: 0;
          padding: 0;
          background: linear-gradient(to right, #ece9e6, #ffffff);
          font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
          -webkit-font-smoothing: antialiased;
        }

        .container {
          max-width: 600px;
          margin: 40px auto;
          background-color: #ffffff;
          border-radius: 12px;
          overflow: hidden;
          box-shadow: 0 8px 20px rgba(0, 0, 0, 0.1);
        }

        .header {
          background: linear-gradient(to right, #4facfe, #ff70bc);
          color: white;
          padding: 24px;
          text-align: center;
        }

        .header h2 {
          margin: 0;
          font-size: 24px;
        }

        .content {
          padding: 30px;
          color: #333;
        }

        .label {
          font-weight: 600;
          color: #555;
          margin-top: 20px;
          margin-bottom: 6px;
          display: block;
        }

        .value {
          font-size: 16px;
          color: #222;
        }

        .message-box {
          background-color: #f5f5f5;
          padding: 15px;
          border-left: 4px solid #4facfe;
          border-radius: 6px;
          font-size: 15px;
          color: #333;
          white-space: pre-line;
          margin-top: 10px;
        }

        .email-link:hover {
          color: #0077cc;
        }

        .footer {
          padding: 20px;
          font-size: 13px;
          text-align: center;
          color: #999;
          background-color: #f0f0f0;
        }

        /* Mobile Responsive */
        @media screen and (max-width: 600px) {
          .content {
            padding: 20px;
          }

          .header h2 {
            font-size: 20px;
          }
        }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h2>📬 New Contact Form Submission</h2>
        </div>
        <div class="content">
          <span class="label">Name:</span>
          <div class="value">${data.name}</div>

          <span class="label">Email:</span>
          <div class="value"><a href="mailto:${data.email}" class="email-link">${data.email}</a></div>

          <span class="label">Message:</span>
          <div class="message-box">${data.message}</div>
        </div>
        <div class="footer">
          This message was sent from your website's contact form.
        </div>
      </div>
    </body>
  </html>
    `
  };

  const userConfirmationOptions = {
    from: process.env.GMAIL_USER,
    to: data.email,
    subject: `Thanks for contacting us, ${data.name}!`,
    html: `
      <html>
        <head>
          <style>
            body {
              margin: 0;
              padding: 0;
              background: #f4f4f4;
              font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
            }
            .container {
              max-width: 600px;
              margin: 40px auto;
              background-color: #ffffff;
              border-radius: 12px;
              overflow: hidden;
              box-shadow: 0 4px 12px rgba(0,0,0,0.1);
            }
            .header {
              background: linear-gradient(to right, #4facfe, #ff70bc);
              color: white;
              padding: 24px;
              text-align: center;
            }
            .header h2 {
              margin: 0;
              font-size: 22px;
            }
            .content {
              padding: 30px;
              color: #333;
            }
            .message {
              font-size: 16px;
              line-height: 1.6;
            }
            .box {
              background-color: #f5f5f5;
              padding: 15px;
              border-left: 4px solid #4facfe;
              border-radius: 6px;
              white-space: pre-line;
              margin-top: 10px;
            }
            .footer {
              padding: 20px;
              font-size: 13px;
              text-align: center;
              color: #999;
              background-color: #f0f0f0;
            }
          </style>
        </head>
        <body>
          <div class="container">
            <div class="header">
              <h2>Thanks for contacting us, ${data.name}!</h2>
            </div>
            <div class="content">
              <p class="message">
                We’ve received your message and will get back to you shortly.
              </p>
              <p class="message">
                <strong>Here’s what you sent:</strong>
                <br><br>
                <strong>Name:</strong> ${data.name}<br>
                <strong>Email:</strong> ${data.email}<br>
                <strong>Message:</strong>
                <div class="box">${data.message}</div>
              </p>
              <p class="message">Best regards,<br>Parbhansh sharma</p>
            </div>
            <div class="footer">
  This is an automated confirmation email. <strong>If you did not initiate this request, please ignore this message.</strong>
</div>

          </div>
        </body>
      </html>
    `
  };

  try {
    await transporter.sendMail(adminMailOptions);
    await transporter.sendMail(userConfirmationOptions);
    console.log("Both emails sent successfully.");
  } catch (error) {
    console.error('Error sending email:', error);
    throw new Error('Failed to send email');
  }
}
