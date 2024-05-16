import { sendMail } from "@/lib/mail";

export async function POST(req) {
  if (req.method !== 'POST') {
    return new Response(JSON.stringify({ success: false, message: 'Method Not Allowed' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 405,
    });
  }
  //simulating a check in a database
  const validEmail = "";

  try {
    const { email } = await req.json();
    if (email === validEmail) {
      const resetLink = 'http://localhost:3000/en/auth/reset';
      const emailSubject = "Відновлення паролю";
      const htmlContent =
        `
<div>
  <table style="margin: 0 auto; width: 600px; text-align: center; box-sizing: border-box; font-family: Arial, sans-serif; font-size: 16px; color: #070707; line-height: 22px; border-spacing: 0; border-collapse: collapse;">
    <tr>
      <td style="padding: 24px 40px;">Вітаємо!</td>
    </tr>
    <tr>
      <td style="padding: 0 40px 21px 40px">
        Ми отримали запит на відновлення паролю для облікового запису
        контрольної панелі на сайті КАРГ, що пов'язаний з Вашою електронною
        адресою ${email}.
      </td>
    </tr>
    <tr>
      <td style="padding: 0 40px 16px 40px;">
        Якщо Ви дійсно бажаєте відновити пароль, можете це зробити натиснувши
        на посилання: <a href="${resetLink}" target="_blank">${resetLink}</a>
      </td>
    </tr>
    <tr>
      <td style="padding: 0 40px 21px 40px">
        Якщо Ви не подавали запит до відновлення паролю - не відповідайте на
        цей лист.
      </td>
    </tr>
    <tr>
      <td style="padding: 0 40px 32px 40px;">З повагою, команда КАРГ.</td>
    </tr>
  </table>
</div>
  `;
      await sendMail(emailSubject, email, htmlContent);

      return new Response(JSON.stringify({ success: true, message: 'Success' }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    } else {
      return new Response(JSON.stringify({ success: false, message: 'Email not confirmed' }), {
        headers: {
          'Content-Type': 'application/json',
        },
        status: 200,
      });
    }
  } catch (err) {
    console.error("Processing error:", err);
    return new Response(JSON.stringify({ success: false, message: 'Failure' }), {
      headers: {
        'Content-Type': 'application/json',
      },
      status: 500,
    });
  }
}
